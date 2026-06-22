import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const config = {
    playing: true,
    speed: 1,
    coreColor: "#00d2ff",
    nebulaColor: "#4a00e0",
    size: 0.5,
    count: 21000,
    force: 0.05,
    mode: 4,
    bgType: "solid",
    bgColor: "#000000",
    bigBang: true,
    bigBangDuration: 2.5,
    introStartDist: 35,
    introEndDist: 10
};

const NativeGalaxy = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        // Clear ghost renders
        while (mountRef.current.firstChild) {
            mountRef.current.removeChild(mountRef.current.firstChild);
        }

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x000000, 0.02);

        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(20, 15, 20); 
        camera.position.setLength(config.bigBang ? config.introStartDist : config.introEndDist);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(config.bgColor, 1);
        mountRef.current.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; 
        controls.autoRotate = config.playing; 
        controls.autoRotateSpeed = 0.5;
        
        // CRITICAL: Disables zoom so the user can scroll the website normally
        controls.enableZoom = false; 
        controls.enablePan = false;

        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(config.count * 3);
        const randomness = new Float32Array(config.count * 3);
        const radius = 20;

        for (let i = 0; i < config.count; i++) {
            const i3 = i * 3;
            const r = radius * Math.pow(Math.random(), 2);
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2.0 * Math.random() - 1.0);
            
            positions[i3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = r * Math.cos(phi);

            randomness[i3] = (Math.random() - 0.5) * 0.5;
            randomness[i3 + 1] = (Math.random() - 0.5) * 0.5;
            randomness[i3 + 2] = (Math.random() - 0.5) * 0.5;
        }
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3));

        const mouse3D = new THREE.Vector3(-9999, -9999, -9999);
        const material = new THREE.ShaderMaterial({
            depthWrite: false, blending: THREE.AdditiveBlending, transparent: true,
            uniforms: {
                uTime: { value: 0 }, uSpeed: { value: config.speed },
                uParticleSize: { value: config.size * renderer.getPixelRatio() },
                uCoreColor: { value: new THREE.Color(config.coreColor) },
                uNebulaColor: { value: new THREE.Color(config.nebulaColor) },
                uMouse3D: { value: mouse3D }, uInteractionForce: { value: config.force },
                uInteractionMode: { value: config.mode }, uBigBang: { value: config.bigBang ? 0.0 : 1.0 }
            },
            vertexShader: `
                uniform float uTime; uniform float uSpeed; uniform float uParticleSize;
                uniform vec3 uCoreColor; uniform vec3 uNebulaColor;
                uniform vec3 uMouse3D; uniform float uInteractionForce; uniform int uInteractionMode;
                uniform float uBigBang;
                attribute vec3 aRandomness; varying vec3 vColor;
                void main() {
                    vec3 pos = position;
                    pos *= uBigBang;
                    
                    float dist3D = length(pos);
                    float distXZ = length(pos.xz);
                    float angle = atan(pos.x, pos.z) + (1.0 / (distXZ + 1.0)) * uTime * uSpeed;
                    pos.x = cos(angle) * distXZ; pos.z = sin(angle) * distXZ;
                    pos += aRandomness * uBigBang;

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
                    vColor = mix(uCoreColor, uNebulaColor, smoothstep(0.0, 10.0, dist3D));
                }`,
            fragmentShader: `
                varying vec3 vColor;
                void main() {
                    float str = pow(1.0 - distance(gl_PointCoord, vec2(0.5)), 3.0);
                    if(str < 0.05) discard;
                    gl_FragColor = vec4(vColor, str);
                }`
        });

        scene.add(new THREE.Points(geometry, material));

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2(-9999, -9999);
        const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
        
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

        let introTime = 0;
        const clock = new THREE.Clock();
        let animationFrameId;

        function animate() {
            const delta = clock.getDelta();
            if(config.playing) material.uniforms.uTime.value += delta;
            
            if (config.bigBang && introTime < config.bigBangDuration) {
                introTime += delta;
                let t = Math.min(introTime / config.bigBangDuration, 1.0);
                let easeT = 1.0 - Math.pow(1.0 - t, 4.0); 
                material.uniforms.uBigBang.value = easeT;
                
                const currentDist = config.introStartDist + (config.introEndDist - config.introStartDist) * easeT;
                camera.position.setLength(currentDist);
            } else {
                material.uniforms.uBigBang.value = 1.0;
            }

            controls.update(); 
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
            controls.dispose();
        };
    }, []);

    return (
        <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-auto bg-black overflow-hidden" />
    );
};

export default NativeGalaxy;