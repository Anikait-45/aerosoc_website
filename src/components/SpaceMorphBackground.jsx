import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import * as THREE from 'three';

const SpaceMorphBackground = forwardRef(({ active = false }, ref) => {
  const mountRef = useRef(null);
  const materialRef = useRef(null);

  useImperativeHandle(ref, () => ({
    setMorphState: (value) => {
      if (materialRef.current) {
        materialRef.current.uniforms.uState.value = value;
      }
    }
  }));

  useEffect(() => {
    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }

    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 25);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 1);
    mountRef.current.appendChild(renderer.domElement);

    // --- THE FIX: MASSIVE DENSITY ---
    const totalCount = 70000; // 100k total particles
    const shapeCount = 15000;  // 15k for the shape, leaving 85,000 for the dense background!

    const geometry = new THREE.BufferGeometry();
    
    const posAmbient = new Float32Array(totalCount * 3);
    const posCube = new Float32Array(totalCount * 3);
    const posTetra = new Float32Array(totalCount * 3);
    const isBg = new Float32Array(totalCount);

    const tetVerts = [
      new THREE.Vector3(1, 1, 1), new THREE.Vector3(1, -1, -1),
      new THREE.Vector3(-1, 1, -1), new THREE.Vector3(-1, -1, 1)
    ];
    const tetFaces = [ [0,1,2], [0,1,3], [0,2,3], [1,2,3] ];

    for (let i = 0; i < totalCount; i++) {
      const i3 = i * 3;

      // THE FIX: Compressing the bounding box from 120 down to 65. 
      // This packs the 85,000 background particles tightly together.
      posAmbient[i3] = (Math.random() - 0.5) * 65;
      posAmbient[i3 + 1] = (Math.random() - 0.5) * 65;
      posAmbient[i3 + 2] = (Math.random() - 0.5) * 30 - 5; 

      if (i < shapeCount) {
        isBg[i] = 0.0; 

        // Cube Positions (Right Side: x + 12)
        const sizeC = 9;
        let cx = (Math.random() - 0.5) * sizeC;
        let cy = (Math.random() - 0.5) * sizeC;
        let cz = (Math.random() - 0.5) * sizeC;
        const axis = Math.floor(Math.random() * 3);
        const sign = Math.random() > 0.5 ? 1 : -1;
        if (axis === 0) cx = (sizeC / 2) * sign;
        if (axis === 1) cy = (sizeC / 2) * sign;
        if (axis === 2) cz = (sizeC / 2) * sign;
        
        posCube[i3] = cx + 12;
        posCube[i3 + 1] = cy;
        posCube[i3 + 2] = cz;

        // Tetrahedron Positions (Left Side: x - 12)
        const face = tetFaces[Math.floor(Math.random() * 4)];
        const vA = tetVerts[face[0]], vB = tetVerts[face[1]], vC = tetVerts[face[2]];
        let r1 = Math.random(), r2 = Math.random();
        if (r1 + r2 > 1) { r1 = 1 - r1; r2 = 1 - r2; }
        const r3 = 1 - r1 - r2;
        
        const sizeT = 10;
        posTetra[i3] = ((vA.x * r1 + vB.x * r2 + vC.x * r3) * sizeT) - 12;
        posTetra[i3 + 1] = (vA.y * r1 + vB.y * r2 + vC.y * r3) * sizeT;
        posTetra[i3 + 2] = (vA.z * r1 + vB.z * r2 + vC.z * r3) * sizeT;
      } else {
        isBg[i] = 1.0; 
        posCube[i3] = posAmbient[i3];
        posCube[i3 + 1] = posAmbient[i3 + 1];
        posCube[i3 + 2] = posAmbient[i3 + 2];

        posTetra[i3] = posAmbient[i3];
        posTetra[i3 + 1] = posAmbient[i3 + 1];
        posTetra[i3 + 2] = posAmbient[i3 + 2];
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(posAmbient, 3));
    geometry.setAttribute('aCube', new THREE.BufferAttribute(posCube, 3));
    geometry.setAttribute('aTetra', new THREE.BufferAttribute(posTetra, 3));
    geometry.setAttribute('aIsBg', new THREE.BufferAttribute(isBg, 1));

    const mouse3D = new THREE.Vector3(-9999, -9999, -9999);
    
    const vertexShader = `
      uniform float uTime;
      uniform vec3 uPointer;
      uniform float uState;
      
      attribute vec3 aCube;
      attribute vec3 aTetra;
      attribute float aIsBg;
      
      varying vec3 vColor;
      
      // --- Curl Noise Math ---
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
      
      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        i = mod289(i);
        vec4 p = permute(permute(permute(
                  i.z + vec4(0.0, i1.z, i2.z, 1.0))
                + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_ );
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
        vec3 p0 = vec3(a0.xy,h.x);
        vec3 p1 = vec3(a0.zw,h.y);
        vec3 p2 = vec3(a1.xy,h.z);
        vec3 p3 = vec3(a1.zw,h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
      }

      vec3 snoiseVec3(vec3 x){
        float s  = snoise(vec3(x));
        float s1 = snoise(vec3(x.y - 19.1, x.z + 33.4, x.x + 47.2));
        float s2 = snoise(vec3(x.z + 74.2, x.x - 124.5, x.y + 99.4));
        return vec3(s, s1, s2);
      }

      vec3 curlNoise(vec3 p){
        const float e = .1;
        vec3 dx = vec3(e, 0.0, 0.0);
        vec3 dy = vec3(0.0, e, 0.0);
        vec3 dz = vec3(0.0, 0.0, e);
        vec3 p_x0 = snoiseVec3(p - dx);
        vec3 p_x1 = snoiseVec3(p + dx);
        vec3 p_y0 = snoiseVec3(p - dy);
        vec3 p_y1 = snoiseVec3(p + dy);
        vec3 p_z0 = snoiseVec3(p - dz);
        vec3 p_z1 = snoiseVec3(p + dz);
        float x = p_y1.z - p_y0.z - p_z1.y + p_z0.y;
        float y = p_z1.x - p_z0.x - p_x1.z + p_x0.z;
        float z = p_x1.y - p_x0.y - p_y1.x + p_y0.x;
        return normalize(vec3(x, y, z) * (1.0 / (2.0 * e)));
      }
      
      void main() {
        vec3 shapePos;
        float state = clamp(uState, 0.0, 3.0);
        
        if (state < 1.0) {
            shapePos = mix(position, aCube, state);
        } else if (state < 2.0) {
            shapePos = mix(aCube, aTetra, state - 1.0);
        } else {
            shapePos = mix(aTetra, position, state - 2.0);
        }
        
        vec3 basePos = mix(shapePos, position, aIsBg);
        
        vec3 noise = curlNoise(vec3(basePos.x * 0.2, basePos.y * 0.2, uTime * 0.1)) * 1.5;
        vec3 finalPos = basePos + noise;
        
        float dist = distance(finalPos, uPointer);
        if(dist < 4.0) {
            vec3 dir = normalize(finalPos - uPointer);
            float force = smoothstep(4.0, 0.0, dist);
            finalPos += dir * force * 1.5;
        }
        
        vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        
        float baseSize = mix(80.0, 45.0, aIsBg);
        gl_PointSize = (baseSize / -mvPosition.z);
        
        vec3 coreColor = vec3(0.0, 0.82, 1.0); 
        vec3 nebulaColor = vec3(0.0, 0.05, 0.35); 
        vColor = mix(coreColor, nebulaColor, smoothstep(0.0, 15.0, length(finalPos)));
      }
    `;

    const fragmentShader = `
      varying vec3 vColor;
      void main() {
        vec2 cxy = 2.0 * gl_PointCoord - 1.0;
        float r = dot(cxy, cxy);
        if (r > 1.0) discard;
        gl_FragColor = vec4(vColor, (1.0 - (r * r)) * 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
      depthWrite: false, 
      blending: THREE.AdditiveBlending, 
      transparent: true,
      uniforms: {
        uTime: { value: 0 }, 
        uPointer: { value: mouse3D }, 
        uState: { value: 0.0 } 
      },
      vertexShader,
      fragmentShader
    });

    materialRef.current = material;
    scene.add(new THREE.Points(geometry, material));

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-9999, -9999);
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      raycaster.ray.intersectPlane(plane, mouse3D);
    };
    
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', () => mouse3D.set(-9999, -9999, -9999));
    
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight; 
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    let animationFrameId;

    function animate() {
      const delta = clock.getDelta();
      if (active) material.uniforms.uTime.value += delta;

      material.uniforms.uPointer.value.lerp(mouse3D, 0.1);

      renderer.render(scene, camera); 
      animationFrameId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [active]); 

  return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-auto bg-black overflow-hidden" />;
});

export default SpaceMorphBackground;