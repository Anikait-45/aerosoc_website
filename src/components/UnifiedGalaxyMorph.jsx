import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import * as THREE from 'three';

const config = {
    speed: 0.11,
    coreColor: "#00d2ff",
    nebulaColor: "#4a00e0",
    size: 1.4,
    count: 36000,
    force: 0.7,
};

const UnifiedGalaxyMorph = forwardRef(({ active = false }, ref) => {
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
        scene.fog = new THREE.FogExp2(0x000000, 0.02);

        // Camera locked dead center so X-axis maps perfectly to Left/Right.
        // No OrbitControls: the only camera-relative interaction is the
        // mouse-repulsion raycast below, matching usta.agency's behavior
        // (the user never drags to rotate the scene there).
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 0, 28);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 1);
        mountRef.current.appendChild(renderer.domElement);

        const geometry = new THREE.BufferGeometry();
        const posAmbient = new Float32Array(config.count * 3);
        const posCube = new Float32Array(config.count * 3);
        const posTetra = new Float32Array(config.count * 3);
        const randomness = new Float32Array(config.count * 3);
        const isShape = new Float32Array(config.count);

        const radius = 22;
        const morphCount = 20000;

        const tetVerts = [
            new THREE.Vector3(1, 1, 1), new THREE.Vector3(1, -1, -1),
            new THREE.Vector3(-1, 1, -1), new THREE.Vector3(-1, -1, 1)
        ];
        const tetFaces = [[0, 1, 2], [0, 1, 3], [0, 2, 3], [1, 2, 3]];

        for (let i = 0; i < config.count; i++) {
            const i3 = i * 3;

            // 1. Ambient Background Position
            const rG = radius * Math.cbrt(Math.random());
            const thetaG = Math.random() * Math.PI * 2;
            const phiG = Math.acos(2.0 * Math.random() - 1.0);
            const gx = rG * Math.sin(phiG) * Math.cos(thetaG);
            const gy = rG * Math.sin(phiG) * Math.sin(thetaG);
            const gz = rG * Math.cos(phiG);

            posAmbient[i3] = gx; posAmbient[i3 + 1] = gy; posAmbient[i3 + 2] = gz;

            if (i < morphCount) {
                isShape[i] = 1.0;

                // 2. CUBE POSITION (Right Side: x + 14)
                const sizeC = 10;
                let cx = (Math.random() - 0.5) * sizeC;
                let cy = (Math.random() - 0.5) * sizeC;
                let cz = (Math.random() - 0.5) * sizeC;
                const axis = Math.floor(Math.random() * 3);
                const sign = Math.random() > 0.5 ? 1 : -1;
                if (axis === 0) cx = (sizeC / 2) * sign;
                if (axis === 1) cy = (sizeC / 2) * sign;
                if (axis === 2) cz = (sizeC / 2) * sign;

                posCube[i3] = cx + 14;
                posCube[i3 + 1] = cy;
                posCube[i3 + 2] = cz;

                // 3. TETRAHEDRON POSITION (Left Side: x - 14)
                const face = tetFaces[Math.floor(Math.random() * 4)];
                const vA = tetVerts[face[0]], vB = tetVerts[face[1]], vC = tetVerts[face[2]];
                let r1 = Math.random(), r2 = Math.random();
                if (r1 + r2 > 1) { r1 = 1 - r1; r2 = 1 - r2; }
                const r3 = 1 - r1 - r2;

                const sizeT = 11;
                posTetra[i3] = ((vA.x * r1 + vB.x * r2 + vC.x * r3) * sizeT) - 14;
                posTetra[i3 + 1] = (vA.y * r1 + vB.y * r2 + vC.y * r3) * sizeT;
                posTetra[i3 + 2] = (vA.z * r1 + vB.z * r2 + vC.z * r3) * sizeT;
            } else {
                isShape[i] = 0.0;
                posCube[i3] = gx; posCube[i3 + 1] = gy; posCube[i3 + 2] = gz;
                posTetra[i3] = gx; posTetra[i3 + 1] = gy; posTetra[i3 + 2] = gz;
            }

            randomness[i3] = (Math.random() - 0.5) * 0.5;
            randomness[i3 + 1] = (Math.random() - 0.5) * 0.5;
            randomness[i3 + 2] = (Math.random() - 0.5) * 0.5;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(posAmbient, 3));
        geometry.setAttribute('aCube', new THREE.BufferAttribute(posCube, 3));
        geometry.setAttribute('aTetra', new THREE.BufferAttribute(posTetra, 3));
        geometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3));
        geometry.setAttribute('aIsShape', new THREE.BufferAttribute(isShape, 1));

        const mouse3D = new THREE.Vector3(-9999, -9999, -9999);
        const material = new THREE.ShaderMaterial({
            depthWrite: false, blending: THREE.AdditiveBlending, transparent: true,
            uniforms: {
                uTime: { value: 0 },
                uSpeed: { value: config.speed },
                uParticleSize: { value: config.size * renderer.getPixelRatio() },
                uCoreColor: { value: new THREE.Color(config.coreColor) },
                uNebulaColor: { value: new THREE.Color(config.nebulaColor) },
                uMouse3D: { value: mouse3D },
                uInteractionForce: { value: config.force },
                uState: { value: 0.0 }
            },
            vertexShader: `
                uniform float uTime; uniform float uSpeed; uniform float uParticleSize;
                uniform vec3 uCoreColor; uniform vec3 uNebulaColor;
                uniform vec3 uMouse3D; uniform float uInteractionForce;
                uniform float uState;

                attribute vec3 aCube;
                attribute vec3 aTetra;
                attribute vec3 aRandomness;
                attribute float aIsShape;
                varying vec3 vColor;

                void main() {
                    vec3 finalPos;
                    float state = clamp(uState, 0.0, 3.0);

                    if (state < 1.0) {
                        finalPos = mix(position, aCube, state);
                        float chaos = smoothstep(0.0, 0.5, state) * (1.0 - smoothstep(0.5, 1.0, state));
                        finalPos += aRandomness * chaos * 40.0;
                    } else if (state < 2.0) {
                        float p = state - 1.0;
                        finalPos = mix(aCube, aTetra, p);
                        float chaos = smoothstep(0.0, 0.5, p) * (1.0 - smoothstep(0.5, 1.0, p));
                        finalPos += aRandomness * chaos * 40.0;
                    } else {
                        float p = state - 2.0;
                        finalPos = mix(aTetra, position, p);
                        float chaos = smoothstep(0.0, 0.5, p) * (1.0 - smoothstep(0.5, 1.0, p));
                        finalPos += aRandomness * chaos * 40.0;
                    }

                    float shapePresence = 0.0;
                    if (state < 1.0) shapePresence = state;
                    else if (state < 2.0) shapePresence = 1.0;
                    else if (state < 3.0) shapePresence = 1.0 - (state - 2.0);

                    // Only ambient particles keep drifting; shape particles stop
                    // rotating once assembled so the figure reads clearly.
                    float rotationFactor = mix(1.0, 1.0 - shapePresence, aIsShape);

                    float dist3D = length(finalPos);
                    float distXZ = length(finalPos.xz);
                    float angle = atan(finalPos.x, finalPos.z) + (1.0 / (distXZ + 1.0)) * uTime * uSpeed * rotationFactor;
                    finalPos.x = cos(angle) * distXZ;
                    finalPos.z = sin(angle) * distXZ;

                    float bounce = sin(uTime * 2.0 + finalPos.x * 0.2) * 0.5;
                    finalPos.y += bounce * shapePresence * aIsShape;

                    // Mouse Repulsion
                    float distToMouse = distance(finalPos, uMouse3D);
                    if (distToMouse < 5.0) {
                        float strength = pow((5.0 - distToMouse) / 5.0, 2.0) * uInteractionForce;
                        vec3 dir = normalize(finalPos - uMouse3D);
                        finalPos -= dir * strength * 2.0;
                    }

                    vec4 viewPos = viewMatrix * modelMatrix * vec4(finalPos, 1.0);
                    gl_Position = projectionMatrix * viewPos;
                    gl_PointSize = (20.0 * uParticleSize) / -viewPos.z;

                    vColor = mix(uCoreColor, uNebulaColor, smoothstep(0.0, 15.0, dist3D));
                }`,
            fragmentShader: `
                varying vec3 vColor;
                void main() {
                    float str = pow(1.0 - distance(gl_PointCoord, vec2(0.5)), 3.0);
                    if(str < 0.05) discard;
                    gl_FragColor = vec4(vColor, str);
                }`
        });

        materialRef.current = material;
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

        const clock = new THREE.Clock();
        let animationFrameId;

        function animate() {
            const delta = clock.getDelta();
            if (active) material.uniforms.uTime.value += delta;
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

    // pointer-events-none: this is a background layer. Mouse tracking happens
    // via the window listener above, not by this div receiving events, so it
    // never needs to intercept clicks meant for your real UI.
    return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none bg-black overflow-hidden" />;
});

export default UnifiedGalaxyMorph;
