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

    const totalCount = 30000; 
    const shapeCount = 20000;  

    const geometry = new THREE.BufferGeometry();
    
    const posAmbient = new Float32Array(totalCount * 3);
    const posSat = new Float32Array(totalCount * 3);
    const posEarth = new Float32Array(totalCount * 3); 
    const isBg = new Float32Array(totalCount);
    
    const highlightSat = new Float32Array(totalCount);
    const highlightEarth = new Float32Array(totalCount);

    const smoothstepJS = (min, max, value) => {
      const t = Math.max(0, Math.min(1, (value - min) / (max - min)));
      return t * t * (3 - 2 * t);
    };

    const getSatellitePoint = () => {
      const p = Math.random();
      let vec;
      
      if (p < 0.15) { 
        const angle = Math.floor(Math.random() * 8) * (Math.PI / 4);
        const r = 1.6 * Math.random(); 
        const y = (Math.random() - 0.5) * 5.5;
        vec = new THREE.Vector3(r * Math.cos(angle), y, r * Math.sin(angle));
      } else if (p < 0.6) { 
        let valid = false;
        while(!valid) {
          const sign = Math.random() > 0.5 ? 1 : -1;
          const x = sign * (2.2 + Math.random() * 9.0); 
          const y = (Math.random() - 0.5) * 4.0; 
          const z = (Math.random() - 0.5) * 0.15;
          
          const localX = Math.abs(x) - 2.2; 
          const localY = y + 2.0; 
          
          const col = localX / 2.25; 
          const row = localY / 2.0; 
          
          const fractX = col - Math.floor(col);
          const fractY = row - Math.floor(row);
          
          const frameThick = 0.15; 
          const isFrame = fractX < frameThick || fractX > 1.0 - frameThick || fractY < frameThick || fractY > 1.0 - frameThick;
          
          if (isFrame || Math.random() < 0.05) {
            vec = new THREE.Vector3(x, y, z);
            valid = true;
          }
        }
      } else if (p < 0.8) { 
        const angle = Math.random() * Math.PI * 2;
        const rRadius = Math.random();
        const r = Math.sqrt(rRadius) * 3.2;
        const y = 2.8 + (r * r * 0.35); 
        const thickness = (Math.random() - 0.5) * 0.2;
        vec = new THREE.Vector3(r * Math.cos(angle), y + thickness, r * Math.sin(angle));
      } else if (p < 0.9) { 
        const r = Math.random() * 0.5;
        const angle = Math.random() * Math.PI * 2;
        vec = new THREE.Vector3(r * Math.cos(angle), 6.5 + (Math.random() - 0.5) * 0.5, r * Math.sin(angle));
      } else { 
        const angle = Math.random() * Math.PI * 2;
        const r = Math.random() * 1.2;
        vec = new THREE.Vector3(r * Math.cos(angle), -2.8 - Math.random() * 2.0, r * Math.sin(angle));
      }

      const gradient = smoothstepJS(-5.0, 7.0, vec.x + vec.y * 2.0);
      return { pos: vec, highlight: gradient };
    };

    const getEarthPoint = () => {
      let vec = new THREE.Vector3();
      let valid = false;
      let highlight = 0.0;
      
      while(!valid) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        const nx = Math.sin(phi) * Math.cos(theta);
        const ny = Math.cos(phi);
        const nz = Math.sin(phi) * Math.sin(theta);
        
        let n = 0;
        n += Math.sin(nx * 3.0) * Math.cos(ny * 3.0) * Math.sin(nz * 3.0);
        n += 0.5 * Math.sin(nx * 6.0 + 1.5) * Math.cos(ny * 6.0 + 1.5) * Math.sin(nz * 6.0 + 1.5);
        n += 0.25 * Math.sin(nx * 12.0) * Math.cos(ny * 12.0) * Math.sin(nz * 12.0);
        
        const isLand = n > 0.1;
        
        if (isLand || Math.random() < 0.25) {
          let r = 6.0; 
          
          if (isLand) {
            r += 0.15 + Math.random() * 0.3; 
            highlight = 1.0; 
          } else {
            r += (Math.random() - 0.5) * 0.05; 
            highlight = 0.0; 
          }
          
          vec.set(nx * r, ny * r, nz * r);
          valid = true;
        }
      }
      return { pos: vec, highlight };
    };

    const eulerSat = new THREE.Euler(Math.PI / 6, -Math.PI / 4, 0);
    const eulerEarth = new THREE.Euler(0.41, 0, 0);

    for (let i = 0; i < totalCount; i++) {
      const i3 = i * 3;

      posAmbient[i3] = (Math.random() - 0.5) * 65;
      posAmbient[i3 + 1] = (Math.random() - 0.5) * 65;
      posAmbient[i3 + 2] = (Math.random() - 0.5) * 30 - 5; 

      if (i < shapeCount) {
        isBg[i] = 0.0; 

        const satData = getSatellitePoint();
        const vSat = satData.pos.applyEuler(eulerSat);
        posSat[i3] = vSat.x;
        posSat[i3 + 1] = vSat.y;
        posSat[i3 + 2] = vSat.z;
        highlightSat[i] = satData.highlight;

        const earthData = getEarthPoint();
        const vEarth = earthData.pos.applyEuler(eulerEarth);
        posEarth[i3] = vEarth.x;
        posEarth[i3 + 1] = vEarth.y;
        posEarth[i3 + 2] = vEarth.z;
        highlightEarth[i] = earthData.highlight;

      } else {
        isBg[i] = 1.0; 
        
        posSat[i3] = posAmbient[i3];
        posSat[i3 + 1] = posAmbient[i3 + 1];
        posSat[i3 + 2] = posAmbient[i3 + 2];
        highlightSat[i] = 0.0;

        posEarth[i3] = posAmbient[i3];
        posEarth[i3 + 1] = posAmbient[i3 + 1];
        posEarth[i3 + 2] = posAmbient[i3 + 2];
        highlightEarth[i] = 0.0;
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(posAmbient, 3));
    geometry.setAttribute('aSat', new THREE.BufferAttribute(posSat, 3));
    geometry.setAttribute('aEarth', new THREE.BufferAttribute(posEarth, 3));
    geometry.setAttribute('aIsBg', new THREE.BufferAttribute(isBg, 1));
    geometry.setAttribute('aHighlightSat', new THREE.BufferAttribute(highlightSat, 1));
    geometry.setAttribute('aHighlightEarth', new THREE.BufferAttribute(highlightEarth, 1));

    const mouse3D = new THREE.Vector3(-9999, -9999, -9999);
    const isMobileInit = window.innerWidth < 768 ? 1.0 : 0.0;
    
    const vertexShader = `
      uniform float uTime;
      uniform vec3 uPointer;
      uniform float uState;
      uniform vec2 uMouseRot; 
      uniform float uIsMobile;
      
      attribute vec3 aSat;
      attribute vec3 aEarth;
      attribute float aIsBg;
      attribute float aHighlightSat;
      attribute float aHighlightEarth;
      
      varying vec3 vColor;
      
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

      mat3 getRotationMatrix(vec2 rot) {
        float cx = cos(rot.x), sx = sin(rot.x);
        float cy = cos(rot.y), sy = sin(rot.y);
        mat3 rx = mat3(1.0, 0.0, 0.0, 0.0, cx, -sx, 0.0, sx, cx);
        mat3 ry = mat3(cy, 0.0, sy, 0.0, 1.0, 0.0, -sy, 0.0, cy);
        return ry * rx;
      }
      
      mat3 getSpinMatrix(float angle) {
        float s = sin(angle);
        float c = cos(angle);
        return mat3(c, 0.0, s, 0.0, 1.0, 0.0, -s, 0.0, c);
      }
      
      void main() {
        mat3 rotMat = getRotationMatrix(uMouseRot);
        
        // SATELLITE: Shifted to Y = -3.0 on mobile so it sits safely in the bottom half of ALL phone screens
        vec3 satBounce = mix(
          vec3(12.0, sin(uTime * 1.5) * 0.7, 0.0),
          vec3(0.0, -3.0 + sin(uTime * 1.5) * 0.5, 0.0),
          uIsMobile
        );
        // EARTH: Sits at Y = -5.8 on mobile below the About Us text
        vec3 earthBounce = mix(
          vec3(-12.0, sin(uTime * 1.2 + 1.0) * 0.8, 0.0),
          vec3(0.0, -5.8 + sin(uTime * 1.2 + 1.0) * 0.5, 0.0),
          uIsMobile
        );

        // Scaled to 0.55 on mobile to guarantee no clipping on tall or short viewports
        float shapeScale = mix(1.0, 0.55, uIsMobile);

        vec3 rotatedSat = ((rotMat * aSat) * shapeScale) + satBounce;
        vec3 rotatedEarth = ((rotMat * getSpinMatrix(uTime * 0.3) * aEarth) * shapeScale) + earthBounce;

        vec3 shapePos;
        float state = clamp(uState, 0.0, 3.0);
        float currentHighlight = 0.0;
        
        if (state < 1.0) {
            shapePos = mix(position, rotatedSat, state);
            currentHighlight = mix(0.0, aHighlightSat, state);
        } else if (state < 2.0) {
            shapePos = mix(rotatedSat, rotatedEarth, state - 1.0);
            currentHighlight = mix(aHighlightSat, aHighlightEarth, state - 1.0);
        } else {
            shapePos = mix(rotatedEarth, position, state - 2.0);
            currentHighlight = mix(aHighlightEarth, 0.0, state - 2.0);
        }
        
        vec3 basePos = mix(shapePos, position, aIsBg);
        
        vec3 noise = curlNoise(vec3(basePos.x * 0.2, basePos.y * 0.2, uTime * 0.1));
        float noiseIntensity = mix(0.02, 1.5, aIsBg);
        vec3 finalPos = basePos + (noise * noiseIntensity);
        
        float dist = distance(finalPos, uPointer);
        // DISABLED ON MOBILE: Repulsion force only runs on desktop (uIsMobile < 0.5)
        if (dist < 4.0 && uIsMobile < 0.5) {
            vec3 dir = normalize(finalPos - uPointer);
            float force = smoothstep(4.0, 0.0, dist);
            finalPos += dir * force * 1.5;
        }
        
        vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        
        float baseSize = mix(55.0, 45.0, aIsBg);
        gl_PointSize = (baseSize / -mvPosition.z);
        
        float bgStar = step(0.985, fract(sin(dot(position.xy, vec2(12.9898,78.233))) * 43758.5453));
        float finalHighlight = mix(currentHighlight, bgStar, aIsBg);

        vec3 coreColor = vec3(0.0, 0.82, 1.0); 
        vec3 nebulaColor = vec3(0.0, 0.05, 0.35); 
        vec3 baseColor = mix(coreColor, nebulaColor, smoothstep(0.0, 15.0, length(finalPos)));
        
        vColor = mix(baseColor, vec3(1.0, 1.0, 1.0), finalHighlight);
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
        uState: { value: 0.0 },
        uMouseRot: { value: new THREE.Vector2(0, 0) },
        uIsMobile: { value: isMobileInit }
      },
      vertexShader,
      fragmentShader
    });

    materialRef.current = material;
    scene.add(new THREE.Points(geometry, material));

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-9999, -9999);
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    
    const targetRotation = new THREE.Vector2(0, 0);
    const currentRotation = new THREE.Vector2(0, 0);

    const onMouseMove = (e) => {
      // Ignore mousemove on mobile/touch screens so simulated touch events don't move uPointer
      if (window.innerWidth < 768) return;

      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      raycaster.ray.intersectPlane(plane, mouse3D);

      targetRotation.y = mouse.x * Math.PI; 
      targetRotation.x = mouse.y * Math.PI * 0.5; 
    };

    let touchStartX = 0;
    let touchStartY = 0;

    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e) => {
      if (e.touches.length === 1) {
        const deltaX = (e.touches[0].clientX - touchStartX) / window.innerWidth;
        const deltaY = (e.touches[0].clientY - touchStartY) / window.innerHeight;

        targetRotation.y += deltaX * Math.PI * 2.0;
        targetRotation.x += deltaY * Math.PI * 1.0;

        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };
    
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', () => {
      mouse3D.set(-9999, -9999, -9999);
      targetRotation.set(0, 0); 
    });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight; 
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      if (materialRef.current) {
        materialRef.current.uniforms.uIsMobile.value = window.innerWidth < 768 ? 1.0 : 0.0;
      }
    };
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    let animationFrameId;

    function animate() {
      const delta = clock.getDelta();
      if (active) material.uniforms.uTime.value += delta;

      material.uniforms.uPointer.value.lerp(mouse3D, 0.1);
      currentRotation.lerp(targetRotation, 0.05);
      material.uniforms.uMouseRot.value.copy(currentRotation);

      renderer.render(scene, camera); 
      animationFrameId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
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