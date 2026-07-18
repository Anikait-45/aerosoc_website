import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import * as THREE from 'three';

const ParticleMorph = forwardRef((props, ref) => {
  const mountRef = useRef(null);
  const materialRef = useRef(null);

  useImperativeHandle(ref, () => ({
    // GSAP will call this directly to update the shader without re-rendering React
    setProgress: (value) => {
      if (materialRef.current) {
        materialRef.current.uniforms.uProgress.value = value;
      }
    }
  }));

  useEffect(() => {
    const container = mountRef.current;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.02);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 25);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 1); // Solid black background
    container.appendChild(renderer.domElement);

    // --- PARTICLE GENERATION ---
    const count = 30000;
    const geometry = new THREE.BufferGeometry();

    const pos1 = new Float32Array(count * 3); // Shape 1: Sphere (Right)
    const pos2 = new Float32Array(count * 3); // Shape 2: Cube (Left)
    const pos3 = new Float32Array(count * 3); // Shape 3: Torus (Right)
    const randoms = new Float32Array(count * 3); // For dispersion chaos

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // 1. Sphere (Right side of screen: X offset +8)
      const radius = 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2.0 * Math.random() - 1.0);
      pos1[i3] = (radius * Math.sin(phi) * Math.cos(theta)) + 8;
      pos1[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos1[i3 + 2] = radius * Math.cos(phi);

      // 2. Cube (Left side of screen: X offset -8)
      const size = 10;
      pos2[i3] = (Math.random() - 0.5) * size - 8;
      pos2[i3 + 1] = (Math.random() - 0.5) * size;
      pos2[i3 + 2] = (Math.random() - 0.5) * size;

      // 3. Torus-ish Disc (Right side again: X offset +8)
      const r = 5 + Math.random() * 3;
      const t = Math.random() * Math.PI * 2;
      pos3[i3] = (r * Math.cos(t)) + 8;
      pos3[i3 + 1] = (Math.random() - 0.5) * 2; // Flat Y
      pos3[i3 + 2] = r * Math.sin(t);

      // Random dispersion vectors for the shattering effect
      randoms[i3] = (Math.random() - 0.5) * 20;
      randoms[i3 + 1] = (Math.random() - 0.5) * 20;
      randoms[i3 + 2] = (Math.random() - 0.5) * 20;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(pos1, 3));
    geometry.setAttribute('aPositionTarget', new THREE.BufferAttribute(pos2, 3));
    geometry.setAttribute('aPositionThird', new THREE.BufferAttribute(pos3, 3));
    geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 3));

    // --- GLSL SHADER MATERIAL ---
    const material = new THREE.ShaderMaterial({
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 }, // Driven by GSAP scroll (0 to 2)
        uColor: { value: new THREE.Color("#00d2ff") }
      },
      vertexShader: `
        uniform float uTime;
        uniform float uProgress;
        
        attribute vec3 aPositionTarget;
        attribute vec3 aPositionThird;
        attribute vec3 aRandom;
        
        varying vec3 vColor;
        
        void main() {
          vec3 currentPos;
          
          // Determine which two shapes we are interpolating between based on progress
          // Progress 0 to 1: Sphere to Cube
          // Progress 1 to 2: Cube to Torus
          float localProgress;
          
          if (uProgress < 1.0) {
            localProgress = uProgress;
            currentPos = mix(position, aPositionTarget, localProgress);
          } else {
            localProgress = uProgress - 1.0;
            currentPos = mix(aPositionTarget, aPositionThird, localProgress);
          }
          
          // ADD CHAOS DISPERSION: Peaks at 0.5 of any transition
          float dispersion = smoothstep(0.0, 0.5, localProgress) * (1.0 - smoothstep(0.5, 1.0, localProgress));
          currentPos += aRandom * dispersion;
          
          // Add a subtle idle float animation
          currentPos.y += sin(uTime + currentPos.x * 0.5) * 0.5;

          vec4 viewPos = viewMatrix * modelMatrix * vec4(currentPos, 1.0);
          gl_Position = projectionMatrix * viewPos;
          
          // Particles get smaller as they get further away
          gl_PointSize = 15.0 / -viewPos.z;
          vColor = vec3(0.0, 0.8, 1.0); // Cyan
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          // Circular particle mask
          float dist = distance(gl_PointCoord, vec2(0.5));
          if(dist > 0.5) discard;
          
          gl_FragColor = vec4(vColor, 1.0 - (dist * 2.0));
        }
      `
    });

    materialRef.current = material;
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // --- ANIMATION LOOP ---
    const clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      const delta = clock.getDelta();
      material.uniforms.uTime.value += delta;

      // Slowly rotate the entire point cloud
      points.rotation.y = Math.sin(material.uniforms.uTime.value * 0.2) * 0.5;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // --- RESIZE HANDLER ---
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) container.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none bg-black overflow-hidden" />;
});

export default ParticleMorph;