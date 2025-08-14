"use client";

import React, { useRef, useEffect, useCallback } from "react";
import * as THREE from "three";
import html2canvas from "html2canvas";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform sampler2D uTexture;
  varying vec2 vUv;

  float ripple(vec2 uv, vec2 center, float time) {
    float dist = distance(uv, center);
    // Adjust the ripple parameters for a more subtle effect
    // 0.02 -> amplitude, 30.0 -> frequency, 4.0 -> speed
    return 0.02 * sin(dist * 30.0 - time * 4.0) / (1.0 + dist * 20.0);
  }

  void main() {
    vec2 uv = vUv;
    float mouseRipple = ripple(uv, uMouse, uTime);
    
    // Add distortion to the texture coordinates
    vec2 distortedUv = vec2(uv.x + mouseRipple, uv.y + mouseRipple);

    // Sample the texture with the distorted coordinates
    vec4 textureColor = texture(uTexture, distortedUv);
    
    gl_FragColor = textureColor;
  }
`;

const WaterEffect: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const animationFrameId = useRef<number>();
    const lastCaptureTime = useRef<number>(0);
    const captureInterval = 500; // ms

    const captureAndApplyTexture = useCallback(async (material: THREE.ShaderMaterial) => {
        try {
            const canvas = await html2canvas(document.body, {
                useCORS: true,
                scale: 0.5, // Lower scale for performance
                logging: false,
                backgroundColor: null,
                ignoreElements: (element) => element.id === 'water-effect-mount'
            });

            if (material.uniforms.uTexture.value) {
                material.uniforms.uTexture.value.dispose();
            }
            const texture = new THREE.CanvasTexture(canvas);
            texture.needsUpdate = true;
            material.uniforms.uTexture.value = texture;

        } catch (error) {
            console.error("html2canvas error:", error);
        }
    }, []);


    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000);
        camera.position.z = 1;

        if (!rendererRef.current) {
            rendererRef.current = new THREE.WebGLRenderer({ alpha: true });
        }
        const renderer = rendererRef.current;
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        
        // Clear previous canvas if it exists
        while (mount.firstChild) {
            mount.removeChild(mount.firstChild);
        }
        mount.appendChild(renderer.domElement);

        const geometry = new THREE.PlaneGeometry(2, 2);

        const uniforms = {
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(0.5, 0.5) },
            uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            uTexture: { value: null }
        };
        const material = new THREE.ShaderMaterial({
            uniforms,
            vertexShader,
            fragmentShader,
            transparent: true
        });

        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);

        captureAndApplyTexture(material);

        const onMouseMove = (e: MouseEvent) => {
            uniforms.uMouse.value.x = e.clientX / window.innerWidth;
            uniforms.uMouse.value.y = 1.0 - e.clientY / window.innerHeight;
        };
        document.body.addEventListener("mousemove", onMouseMove);

        const onResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            // camera.aspect = width / height;
            // camera.updateProjectionMatrix();
            uniforms.uResolution.value.set(width, height);
            captureAndApplyTexture(material);
        };
        window.addEventListener("resize", onResize);

        const clock = new THREE.Clock();
        const animate = () => {
            animationFrameId.current = requestAnimationFrame(animate);

            const elapsedTime = clock.getElapsedTime();
            uniforms.uTime.value = elapsedTime;

            // Re-capture periodically for dynamic content
            if (Date.now() - lastCaptureTime.current > captureInterval) {
                 captureAndApplyTexture(material);
                 lastCaptureTime.current = Date.now();
            }

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
            window.removeEventListener("resize", onResize);
            document.body.removeEventListener("mousemove", onMouseMove);
            if (mount && renderer.domElement) {
                try {
                  // mount.removeChild(renderer.domElement);
                } catch(e) {}
            }
            geometry.dispose();
            material.dispose();
            if (material.uniforms.uTexture.value) {
                material.uniforms.uTexture.value.dispose();
            }
        };
    }, [captureAndApplyTexture]);

    return <div id="water-effect-mount" ref={mountRef} className="fixed inset-0 pointer-events-none z-[9999]" />;
};

export default WaterEffect;
