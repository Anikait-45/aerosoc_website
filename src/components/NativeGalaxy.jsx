import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const config = {
  playing: true,
  speed: 0.2,
  coreColor: "#00d2ff",
  nebulaColor: "#4a00e0",
  size: 0.7,
  count: 20000,
  force: 0.05,
  mode: 4, 
  bgType: "transparent",
  bgColor: "#000000"
};

const NativeGalaxy = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.02);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(20, 15, 20);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 1); 
    mountRef.current.appendChild(renderer.domElement);

    // 2. Interactive Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; 
    controls.autoRotate = config.playing; 
    controls.autoRotateSpeed = 0.5;
    
    // THE CRITICAL FIX: Disabling zoom ensures the scroll wheel ONLY scrolls your website
    controls.enableZoom = false; 
    controls.enablePan = false;

    // 3. Geometry & Particles
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(config.count * 3);
    const randomness = new Float32Array(config.count * 3);
    const radius = 20;

    for (let i = 0; i < config.count; i++) {
      const i3 = i * 3;
      const r = radius * Math.pow(Math.random(), 2);
      const theta = Math.random() * Math.PI * 2;
      positions[i3] = Math.cos(theta) * r;
      positions[i3 + 1] = 0;
      positions[i3 + 2] = Math.sin(theta) * r;

      const thickness = Math.max(2.0 - (r / (radius * 0.3)), 0.1);
      randomness[i3] = (Math.random() - 0.5) * 0.5;
      randomness[i3 + 1] = (Math.random() - 0.5) * thickness;
      randomness[i3 + 2] = (Math.random() - 0.5) * 0.5;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3));

    // 4. Shaders
    const material = new THREE.ShaderMaterial({
      depthWrite: false, blending: THREE.AdditiveBlending, transparent: true,
      uniforms: {
        uTime: { value: 0 }, 
        uSpeed: { value: config.speed },
        uParticleSize: { value: config.size * renderer.getPixelRatio() },
        uCoreColor: { value: new THREE.Color(config.coreColor) },
        uNebulaColor: { value: new THREE.Color(config.nebulaColor) },
        uMouse3D: { value: new THREE.Vector3(-9999, -9999, -9999) }, 
        uInteractionForce: { value: config.force },
        uInteractionMode: { value: config.mode }
      },
      vertexShader: `
        uniform float uTime; uniform float uSpeed; uniform float uParticleSize;
        uniform vec3 uCoreColor; uniform vec3 uNebulaColor;
        uniform vec3 uMouse3D; uniform float uInteractionForce; uniform int uInteractionMode;
        attribute vec3 aRandomness; varying vec3 vColor;
        void main() {
            vec3 pos = position;
            float distCenter = length(pos.xz);
            float angle = atan(pos.x, pos.z) + (1.0 / distCenter) * uTime * uSpeed;
            pos.x = cos(angle) * distCenter; pos.z = sin(angle) * distCenter;
            pos += aRandomness;

            float distToMouse = distance(pos, uMouse3D);
            if (uInteractionMode != 0 && distToMouse < 5.0) {
                float strength = pow((5.0 - distToMouse) / 5.0, 2.0) * uInteractionForce;
                vec3 dir = normalize(pos - uMouse3D);
                if (uInteractionMode == 1) pos -= dir * strength * 2.0;
                else if (uInteractionMode == 2) pos += dir * strength * 3.0;
                else if (uInteractionMode == 3) { pos += vec3(-dir.z, dir.y, dir.x) * strength * 3.0; pos.y += strength; }
                else if (uInteractionMode == 4) { float warp = pow(strength, 1.5) * 5.0; pos.y += warp * 2.0; pos.x -= dir.x * warp * 2.0; pos.z -= dir.z * warp * 2.0; }
            }

            vec4 viewPos = viewMatrix * modelMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * viewPos;
            gl_PointSize = (20.0 * uParticleSize) / -viewPos.z;
            vColor = mix(uCoreColor, uNebulaColor, smoothstep(0.0, 10.0, distCenter));
        }`,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
            float str = pow(1.0 - distance(gl_PointCoord, vec2(0.5)), 3.0);
            if(str < 0.05) discard;
            gl_FragColor = vec4(vColor, str);
        }`
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // 5. Mouse Warp Tracking
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-9999, -9999);
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const target = new THREE.Vector3();
    
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const result = raycaster.ray.intersectPlane(plane, target);
      if (result) {
        material.uniforms.uMouse3D.value.copy(target);
      }
    };
    
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', () => {
      material.uniforms.uMouse3D.value.set(-9999, -9999, -9999);
    });

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // 6. Failsafe Animation Loop
    const clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      if(config.playing) {
        // getElapsedTime guarantees continuous flow without freezing
        material.uniforms.uTime.value = clock.getElapsedTime() * config.speed;
      }
      
      controls.update(); 
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
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
      controls.dispose();
    };
  }, []);

  return (
    // pointer-events-auto ensures it accepts click+drag input
    <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-auto overflow-hidden bg-black" />
  );
};

export default NativeGalaxy;