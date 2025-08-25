import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Chart3D = ({ data, config }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!data || !config.xAxis || !config.yAxis) return;

    // Clean up previous scene
    if (sceneRef.current) {
      while (sceneRef.current.children.length > 0) {
        sceneRef.current.remove(sceneRef.current.children[0]);
      }
    }

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // Clear and append renderer
    mountRef.current.innerHTML = '';
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Process data
    const processedData = data.map(item => ({
      x: parseFloat(item[config.xAxis]) || 0,
      y: parseFloat(item[config.yAxis]) || 0,
      label: item[config.xAxis]
    }));

    // Normalize data for 3D space
    const maxX = Math.max(...processedData.map(d => d.x));
    const maxY = Math.max(...processedData.map(d => d.y));
    const minX = Math.min(...processedData.map(d => d.x));
    const minY = Math.min(...processedData.map(d => d.y));

    const normalizeX = (x) => ((x - minX) / (maxX - minX)) * 8 - 4;
    const normalizeY = (y) => ((y - minY) / (maxY - minY)) * 6;

    // Create 3D chart based on type
    if (config.type === 'bar') {
      createBar3D(scene, processedData, normalizeX, normalizeY);
    } else if (config.type === 'scatter') {
      createScatter3D(scene, processedData, normalizeX, normalizeY);
    } else {
      createSurface3D(scene, processedData, normalizeX, normalizeY);
    }

    // Add grid
    const gridHelper = new THREE.GridHelper(10, 10, 0xcccccc, 0xcccccc);
    gridHelper.position.y = 0;
    scene.add(gridHelper);

    // Camera position
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 2, 0);

    // Controls (basic rotation)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      targetX = mouseX * 0.5;
      targetY = mouseY * 0.5;
    };

    mountRef.current.addEventListener('mousemove', onMouseMove);

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      // Smooth camera movement
      camera.position.x += (targetX * 10 - camera.position.x) * 0.05;
      camera.position.y += (targetY * 10 + 8 - camera.position.y) * 0.05;
      camera.lookAt(0, 2, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (mountRef.current) {
        camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      mountRef.current?.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [data, config]);

  const createBar3D = (scene, processedData, normalizeX, normalizeY) => {
    const colors = [0x3b82f6, 0x10b981, 0xf59e0b, 0xef4444, 0x8b5cf6, 0xec4899];
    
    processedData.forEach((item, index) => {
      const geometry = new THREE.BoxGeometry(0.5, normalizeY(item.y), 0.5);
      const material = new THREE.MeshLambertMaterial({ 
        color: colors[index % colors.length],
        transparent: true,
        opacity: 0.8
      });
      
      const bar = new THREE.Mesh(geometry, material);
      bar.position.set(normalizeX(item.x), normalizeY(item.y) / 2, 0);
      bar.castShadow = true;
      bar.receiveShadow = true;
      
      scene.add(bar);
    });
  };

  const createScatter3D = (scene, processedData, normalizeX, normalizeY) => {
    const colors = [0x3b82f6, 0x10b981, 0xf59e0b, 0xef4444, 0x8b5cf6, 0xec4899];
    
    processedData.forEach((item, index) => {
      const geometry = new THREE.SphereGeometry(0.2, 16, 16);
      const material = new THREE.MeshLambertMaterial({ 
        color: colors[index % colors.length],
        transparent: true,
        opacity: 0.8
      });
      
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(normalizeX(item.x), normalizeY(item.y), Math.random() * 2 - 1);
      sphere.castShadow = true;
      
      scene.add(sphere);
    });
  };

  const createSurface3D = (scene, processedData, normalizeX, normalizeY) => {
    // Create a simple surface representation
    const geometry = new THREE.PlaneGeometry(8, 6, processedData.length - 1, 1);
    const material = new THREE.MeshLambertMaterial({ 
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide
    });
    
    const vertices = geometry.attributes.position.array;
    for (let i = 0; i < processedData.length; i++) {
      if (vertices[i * 3 + 1] !== undefined) {
        vertices[i * 3 + 1] = normalizeY(processedData[i].y);
      }
    }
    
    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();
    
    const surface = new THREE.Mesh(geometry, material);
    surface.rotation.x = -Math.PI / 2;
    surface.position.y = 2;
    surface.receiveShadow = true;
    
    scene.add(surface);
  };

  const downloadChart = () => {
    if (rendererRef.current) {
      const link = document.createElement('a');
      link.download = `${config.title || 'chart-3d'}.png`;
      link.href = rendererRef.current.domElement.toDataURL();
      link.click();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Move your mouse to rotate the 3D view
        </p>
        <button
          onClick={downloadChart}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Download PNG
        </button>
      </div>
      
      <div 
        ref={mountRef} 
        className="three-container border border-gray-200 rounded-lg"
        style={{ width: '100%', height: '500px' }}
      />
    </div>
  );
};

export default Chart3D;
