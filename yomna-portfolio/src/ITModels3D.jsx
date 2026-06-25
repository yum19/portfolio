import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/* ══════════════════════════════════════════════════════════════
   ITModels3D.jsx — Midnight Gold palette
   4 animated 3D IT models, hover-reactive
══════════════════════════════════════════════════════════════ */

const C = {
  gold:      "#f0a830",
  cyan:      "#5eb8d4",
  ember:     "#e06b3c",
  sage:      "#4ecf8a",
  champagne: "#e8d5a0",
};

function hex(h) {
  return parseInt(h.replace("#", ""), 16);
}

/* ══════════════════════════════════════════════════════════════
   MODEL 1 — Kubernetes Sphere (orbiting pods)
══════════════════════════════════════════════════════════════ */
function KubernetesSphere({ canvasRef, hovered }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 4;

    const coreGeo = new THREE.SphereGeometry(0.7, 32, 32);
    const coreMat = new THREE.MeshPhongMaterial({
      color: hex(C.gold),
      emissive: hex(C.gold),
      emissiveIntensity: 0.25,
      transparent: true,
      opacity: 0.9,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    const wireGeo = new THREE.SphereGeometry(0.72, 12, 12);
    const wireMat = new THREE.MeshBasicMaterial({
      color: hex(C.champagne),
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const wire = new THREE.Mesh(wireGeo, wireMat);
    scene.add(wire);

    const ringGeo = new THREE.TorusGeometry(1.15, 0.015, 8, 60);
    const ringMat = new THREE.MeshBasicMaterial({ color: hex(C.gold), transparent: true, opacity: 0.45 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);

    const pods = [];
    const podCount = 6;
    for (let i = 0; i < podCount; i++) {
      const angle = (i / podCount) * Math.PI * 2;
      const podGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.18, 6);
      const podMat = new THREE.MeshPhongMaterial({
        color: i % 2 === 0 ? hex(C.cyan) : hex(C.ember),
        emissive: i % 2 === 0 ? hex(C.cyan) : hex(C.ember),
        emissiveIntensity: 0.4,
      });
      const pod = new THREE.Mesh(podGeo, podMat);
      pod.userData = { angle, radius: 1.15, speed: 0.008 };
      pod.position.set(Math.cos(angle) * 1.15, 0, Math.sin(angle) * 1.15);
      scene.add(pod);
      pods.push(pod);
    }

    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(120);
    for (let i = 0; i < 120; i++) positions[i] = (Math.random() - 0.5) * 5;
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({ color: hex(C.gold), size: 0.03, transparent: true, opacity: 0.55 });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const pt = new THREE.PointLight(hex(C.gold), 2, 10);
    pt.position.set(2, 2, 2);
    scene.add(pt);
    const pt2 = new THREE.PointLight(hex(C.cyan), 1.5, 10);
    pt2.position.set(-2, -1, 1);
    scene.add(pt2);

    let frameId;
    const mouseRef = { x: 0, y: 0 };
    const onMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseRef.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    canvas.addEventListener("mousemove", onMouse);

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const hov = hovered.current;
      const speed = hov ? 2.2 : 1;

      core.rotation.y += 0.005 * speed;
      core.rotation.x += 0.002 * speed;
      wire.rotation.y -= 0.003 * speed;
      wire.rotation.z += 0.002 * speed;
      ring.rotation.z += 0.004 * speed;
      particles.rotation.y += 0.001 * speed;

      pods.forEach((pod) => {
        pod.userData.angle += pod.userData.speed * speed;
        pod.position.x = Math.cos(pod.userData.angle) * pod.userData.radius;
        pod.position.z = Math.sin(pod.userData.angle) * pod.userData.radius;
        pod.position.y = Math.sin(pod.userData.angle * 2) * 0.18;
        pod.rotation.y += 0.04 * speed;
      });

      if (hov) {
        core.rotation.x += mouseRef.y * 0.02;
        core.rotation.y += mouseRef.x * 0.02;
        coreMat.emissiveIntensity = 0.6;
        pt.intensity = 3.5;
      } else {
        coreMat.emissiveIntensity = 0.25;
        pt.intensity = 2;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      canvas.removeEventListener("mousemove", onMouse);
      renderer.dispose();
    };
  }, []);

  return null;
}

/* ══════════════════════════════════════════════════════════════
   MODEL 2 — Docker Container Stack
══════════════════════════════════════════════════════════════ */
function DockerStack({ canvasRef, hovered }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(3, 2.5, 3);
    camera.lookAt(0, 0.5, 0);

    // Alternating gold/cyan/ember/sage/champagne layers
    const colors = [hex(C.gold), hex(C.cyan), hex(C.ember), hex(C.sage), hex(C.champagne)];
    const containers = [];
    const group = new THREE.Group();

    for (let i = 0; i < 5; i++) {
      const geo = new THREE.BoxGeometry(1.4, 0.38, 0.85);
      const mat = new THREE.MeshPhongMaterial({
        color: colors[i],
        emissive: colors[i],
        emissiveIntensity: 0.15,
        transparent: true,
        opacity: 0.88,
      });
      const box = new THREE.Mesh(geo, mat);
      box.position.y = i * 0.45 - 0.9;
      group.add(box);

      const edgeGeo = new THREE.EdgesGeometry(geo);
      const edgeMat = new THREE.LineBasicMaterial({ color: colors[i], transparent: true, opacity: 0.55 });
      const edges = new THREE.LineSegments(edgeGeo, edgeMat);
      edges.position.y = i * 0.45 - 0.9;
      group.add(edges);

      for (let d = 0; d < 3; d++) {
        const dotGeo = new THREE.SphereGeometry(0.04, 6, 6);
        const dotMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const dot = new THREE.Mesh(dotGeo, dotMat);
        dot.position.set(-0.45 + d * 0.18, i * 0.45 - 0.9, 0.43);
        group.add(dot);
      }

      containers.push({ mesh: box, mat, baseY: i * 0.45 - 0.9 });
    }

    scene.add(group);

    const whaleBodyGeo = new THREE.SphereGeometry(0.22, 16, 16);
    whaleBodyGeo.scale(1.6, 0.7, 0.9);
    const whaleMat = new THREE.MeshPhongMaterial({ color: hex(C.cyan), emissive: hex(C.cyan), emissiveIntensity: 0.4 });
    const whale = new THREE.Mesh(whaleBodyGeo, whaleMat);
    whale.position.set(0, 1.6, 0);
    scene.add(whale);

    const pGeo = new THREE.BufferGeometry();
    const pos = new Float32Array(90);
    for (let i = 0; i < 90; i++) pos[i] = (Math.random() - 0.5) * 5;
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const pMat = new THREE.PointsMaterial({ color: hex(C.gold), size: 0.04, transparent: true, opacity: 0.45 });
    scene.add(new THREE.Points(pGeo, pMat));

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const pl = new THREE.PointLight(hex(C.gold), 2, 12);
    pl.position.set(3, 3, 3);
    scene.add(pl);
    const pl2 = new THREE.PointLight(hex(C.cyan), 1.5, 10);
    pl2.position.set(-2, 1, -1);
    scene.add(pl2);

    const mouseRef = { x: 0, y: 0 };
    const onMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseRef.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    canvas.addEventListener("mousemove", onMouse);

    let frameId;
    let t = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      t += 0.012;
      const hov = hovered.current;
      const speed = hov ? 2 : 1;

      group.rotation.y += 0.006 * speed;
      whale.position.y = 1.6 + Math.sin(t * 1.5) * 0.12;
      whale.rotation.y += 0.01 * speed;

      containers.forEach((c, i) => {
        c.mesh.position.y = c.baseY + Math.sin(t + i * 0.6) * 0.04;
        c.mat.emissiveIntensity = hov ? 0.4 + Math.sin(t + i) * 0.2 : 0.15;
      });

      if (hov) {
        group.rotation.x = mouseRef.y * 0.3;
        group.rotation.y += mouseRef.x * 0.03;
        pl.intensity = 4;
      } else {
        group.rotation.x *= 0.92;
        pl.intensity = 2;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      canvas.removeEventListener("mousemove", onMouse);
      renderer.dispose();
    };
  }, []);

  return null;
}

/* ══════════════════════════════════════════════════════════════
   MODEL 3 — Cloud Server / Data Node
══════════════════════════════════════════════════════════════ */
function CloudServer({ canvasRef, hovered }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 4.5);

    const group = new THREE.Group();

    const rackGeo = new THREE.BoxGeometry(1.6, 2.2, 0.7);
    const rackMat = new THREE.MeshPhongMaterial({ color: 0x0d1020, emissive: hex(C.gold), emissiveIntensity: 0.04 });
    group.add(new THREE.Mesh(rackGeo, rackMat));

    const bladeColors = [hex(C.gold), hex(C.cyan), hex(C.ember), hex(C.sage), hex(C.champagne), hex(C.gold)];
    const blades = [];
    for (let i = 0; i < 6; i++) {
      const bGeo = new THREE.BoxGeometry(1.3, 0.26, 0.08);
      const bMat = new THREE.MeshPhongMaterial({
        color: bladeColors[i],
        emissive: bladeColors[i],
        emissiveIntensity: 0.28,
        transparent: true,
        opacity: 0.9,
      });
      const blade = new THREE.Mesh(bGeo, bMat);
      blade.position.set(0, -0.82 + i * 0.32, 0.39);
      group.add(blade);

      for (let l = 0; l < 4; l++) {
        const ledGeo = new THREE.SphereGeometry(0.03, 6, 6);
        const ledMat = new THREE.MeshBasicMaterial({ color: l === 0 ? hex(C.sage) : bladeColors[i] });
        const led = new THREE.Mesh(ledGeo, ledMat);
        led.position.set(-0.5 + l * 0.12, -0.82 + i * 0.32, 0.44);
        group.add(led);
      }

      blades.push({ mesh: blade, mat: bMat, index: i });
    }

    for (let r = 0; r < 3; r++) {
      const torusGeo = new THREE.TorusGeometry(0.35 + r * 0.22, 0.025, 8, 40);
      const torusMat = new THREE.MeshBasicMaterial({
        color: r === 0 ? hex(C.gold) : r === 1 ? hex(C.cyan) : hex(C.sage),
        transparent: true,
        opacity: 0.5 - r * 0.1,
      });
      const torus = new THREE.Mesh(torusGeo, torusMat);
      torus.position.y = 1.5 + r * 0.22;
      torus.userData = { rotSpeed: 0.012 - r * 0.003, baseY: 1.5 + r * 0.22, r };
      group.add(torus);
    }

    const lineMat = new THREE.LineBasicMaterial({ color: hex(C.gold), transparent: true, opacity: 0.35 });
    for (let i = 0; i < 5; i++) {
      const points = [
        new THREE.Vector3(0, 1.1, 0.35),
        new THREE.Vector3((Math.random() - 0.5) * 1.5, 1.4 + Math.random() * 0.5, 0.35),
      ];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      group.add(new THREE.Line(lineGeo, lineMat));
    }

    scene.add(group);

    const satGeo = new THREE.OctahedronGeometry(0.18);
    const satMat = new THREE.MeshPhongMaterial({ color: hex(C.ember), emissive: hex(C.ember), emissiveIntensity: 0.5 });
    const satellite = new THREE.Mesh(satGeo, satMat);
    scene.add(satellite);

    scene.add(new THREE.AmbientLight(0xffffff, 0.3));
    const pl = new THREE.PointLight(hex(C.gold), 2.5, 10);
    pl.position.set(2, 2, 2);
    scene.add(pl);
    const pl2 = new THREE.PointLight(hex(C.cyan), 1.5, 8);
    pl2.position.set(-2, 0, 1);
    scene.add(pl2);

    const mouseRef = { x: 0, y: 0 };
    const onMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseRef.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    canvas.addEventListener("mousemove", onMouse);

    let frameId, t = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      t += 0.015;
      const hov = hovered.current;
      const speed = hov ? 2.5 : 1;

      group.rotation.y += 0.005 * speed;

      group.children.forEach((child) => {
        if (child.userData.rotSpeed !== undefined) {
          child.rotation.x += child.userData.rotSpeed * speed;
          child.rotation.z += child.userData.rotSpeed * 0.7 * speed;
          child.position.y = child.userData.baseY + Math.sin(t + child.userData.r) * 0.08;
        }
      });

      blades.forEach((b, i) => {
        b.mat.emissiveIntensity = hov
          ? 0.5 + Math.sin(t * 3 + i * 0.8) * 0.3
          : 0.15 + Math.sin(t + i * 0.5) * 0.1;
      });

      satellite.position.x = Math.cos(t * 0.7) * 1.6;
      satellite.position.y = Math.sin(t * 0.5) * 0.5;
      satellite.position.z = Math.sin(t * 0.7) * 1.6;
      satellite.rotation.x += 0.03 * speed;
      satellite.rotation.y += 0.04 * speed;

      if (hov) {
        group.rotation.x = mouseRef.y * 0.25;
        group.rotation.y += mouseRef.x * 0.025;
        pl.intensity = 5;
      } else {
        group.rotation.x *= 0.9;
        pl.intensity = 2.5;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      canvas.removeEventListener("mousemove", onMouse);
      renderer.dispose();
    };
  }, []);

  return null;
}

/* ══════════════════════════════════════════════════════════════
   MODEL 4 — Neural Network / AI Brain
══════════════════════════════════════════════════════════════ */
function NeuralNet({ canvasRef, hovered }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 5;

    const group = new THREE.Group();

    const layers = [
      { count: 3, x: -1.2, color: hex(C.gold)   },
      { count: 5, x: 0,    color: hex(C.cyan)    },
      { count: 3, x: 1.2,  color: hex(C.sage)    },
    ];

    const nodePositions = [];
    const nodeMeshes = [];

    layers.forEach((layer) => {
      const layerNodes = [];
      const step = 2.2 / Math.max(layer.count - 1, 1);
      for (let i = 0; i < layer.count; i++) {
        const geo = new THREE.SphereGeometry(0.14, 16, 16);
        const mat = new THREE.MeshPhongMaterial({
          color: layer.color,
          emissive: layer.color,
          emissiveIntensity: 0.5,
        });
        const node = new THREE.Mesh(geo, mat);
        const y = layer.count === 1 ? 0 : -1.1 + i * step;
        node.position.set(layer.x, y, 0);
        group.add(node);
        layerNodes.push({ pos: node.position.clone(), mat });
        nodeMeshes.push(node);
      }
      nodePositions.push(layerNodes);
    });

    const connections = [];
    for (let l = 0; l < nodePositions.length - 1; l++) {
      nodePositions[l].forEach((from) => {
        nodePositions[l + 1].forEach((to) => {
          const points = [from.pos, to.pos];
          const geo = new THREE.BufferGeometry().setFromPoints(points);
          const mat = new THREE.LineBasicMaterial({
            color: hex(C.champagne),
            transparent: true,
            opacity: 0.28,
          });
          const line = new THREE.Line(geo, mat);
          group.add(line);
          connections.push({ mat, baseOpacity: 0.28 });
        });
      });
    }

    for (let i = 0; i < 8; i++) {
      const sGeo = new THREE.SphereGeometry(0.055, 8, 8);
      const sMat = new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? hex(C.gold) : hex(C.ember) });
      const signal = new THREE.Mesh(sGeo, sMat);
      signal.userData = { t: Math.random(), from: Math.floor(Math.random() * 3), to: Math.floor(Math.random() * 5) };
      scene.add(signal);
    }

    const signalMeshes = scene.children.filter(c => c.userData.from !== undefined);

    const orbitGeo = new THREE.TorusGeometry(2.0, 0.018, 8, 80);
    const orbitMat = new THREE.MeshBasicMaterial({ color: hex(C.gold), transparent: true, opacity: 0.28 });
    const orbit = new THREE.Mesh(orbitGeo, orbitMat);
    orbit.rotation.x = Math.PI / 4;
    scene.add(orbit);

    const orbit2 = new THREE.Mesh(
      new THREE.TorusGeometry(2.2, 0.012, 8, 80),
      new THREE.MeshBasicMaterial({ color: hex(C.cyan), transparent: true, opacity: 0.18 })
    );
    orbit2.rotation.x = -Math.PI / 5;
    orbit2.rotation.z = Math.PI / 6;
    scene.add(orbit2);

    scene.add(group);

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const pl = new THREE.PointLight(hex(C.gold), 2.5, 12);
    pl.position.set(2, 2, 2);
    scene.add(pl);
    const pl2 = new THREE.PointLight(hex(C.cyan), 2, 10);
    pl2.position.set(-2, -1, 1);
    scene.add(pl2);

    const mouseRef = { x: 0, y: 0 };
    const onMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseRef.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    canvas.addEventListener("mousemove", onMouse);

    const fromPositions = nodePositions[0];
    const toPositions = nodePositions[1];

    let frameId, t = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      t += 0.012;
      const hov = hovered.current;
      const speed = hov ? 2.2 : 1;

      group.rotation.y += 0.005 * speed;
      orbit.rotation.z += 0.006 * speed;
      orbit2.rotation.z -= 0.004 * speed;

      nodeMeshes.forEach((n, i) => {
        n.scale.setScalar(1 + Math.sin(t * 2 + i * 0.7) * 0.12);
        n.material.emissiveIntensity = hov ? 0.8 + Math.sin(t * 3 + i) * 0.3 : 0.5 + Math.sin(t + i) * 0.2;
      });

      connections.forEach((c, i) => {
        c.mat.opacity = hov
          ? 0.5 + Math.sin(t * 2 + i * 0.3) * 0.3
          : 0.18 + Math.sin(t + i * 0.2) * 0.08;
      });

      signalMeshes.forEach((sig) => {
        sig.userData.t += 0.015 * speed;
        if (sig.userData.t > 1) sig.userData.t = 0;
        const fi = sig.userData.from % fromPositions.length;
        const ti = sig.userData.to % toPositions.length;
        const from = fromPositions[fi].pos;
        const to = toPositions[ti].pos;
        sig.position.lerpVectors(from, to, sig.userData.t);
      });

      if (hov) {
        group.rotation.x = mouseRef.y * 0.3;
        group.rotation.y += mouseRef.x * 0.025;
        pl.intensity = 5;
      } else {
        group.rotation.x *= 0.9;
        pl.intensity = 2.5;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      canvas.removeEventListener("mousemove", onMouse);
      renderer.dispose();
    };
  }, []);

  return null;
}

/* ══════════════════════════════════════════════════════════════
   CANVAS WRAPPER
══════════════════════════════════════════════════════════════ */
function Model3DCard({ label, sublabel, accent, ModelComponent }) {
  const canvasRef = useRef(null);
  const hoveredRef = useRef(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => { hoveredRef.current = true; setIsHovered(true); }}
      onMouseLeave={() => { hoveredRef.current = false; setIsHovered(false); }}
      style={{
        position: "relative",
        borderRadius: 20,
        overflow: "hidden",
        background: "rgba(8,9,26,0.75)",
        border: `1px solid ${isHovered ? accent + "66" : accent + "20"}`,
        boxShadow: isHovered
          ? `0 0 40px ${accent}2e, 0 0 80px ${accent}12`
          : `0 0 20px ${accent}08`,
        transition: "border-color 0.4s, box-shadow 0.4s",
        cursor: "grab",
      }}
    >
      {/* Top glow line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, transparent, ${accent}88, transparent)`,
        opacity: isHovered ? 1 : 0.35,
        transition: "opacity 0.4s",
        zIndex: 2,
      }} />

      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: 240 }}
        width={300}
        height={240}
      />
      <ModelComponent canvasRef={canvasRef} hovered={hoveredRef} />

      {/* Label overlay */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "16px 18px",
        background: "linear-gradient(to top, rgba(8,9,26,0.96) 0%, transparent 100%)",
        zIndex: 2,
      }}>
        <p style={{
          margin: 0,
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          fontWeight: 800,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: accent,
          textShadow: `0 0 12px ${accent}77`,
        }}>{label}</p>
        <p style={{
          margin: "3px 0 0",
          fontFamily: "'Inter', sans-serif",
          fontSize: 11,
          color: "rgba(232,213,160,0.4)",
          letterSpacing: "0.06em",
        }}>{sublabel}</p>
      </div>

      {/* Hover badge */}
      <div style={{
        position: "absolute", top: 14, right: 14,
        padding: "4px 10px",
        borderRadius: 20,
        background: `${accent}18`,
        border: `1px solid ${accent}44`,
        color: accent,
        fontSize: 9,
        fontWeight: 700,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        opacity: isHovered ? 1 : 0,
        transform: isHovered ? "translateY(0)" : "translateY(-6px)",
        transition: "opacity 0.3s, transform 0.3s",
        fontFamily: "'Inter', sans-serif",
        zIndex: 3,
      }}>
        INTERACTIVE
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════════ */
export default function ITModels3D() {
  const models = [
    {
      label: "Kubernetes",
      sublabel: "Orchestration · 6 orbiting pods",
      accent: C.gold,
      ModelComponent: KubernetesSphere,
    },
    {
      label: "Docker",
      sublabel: "Containerization · stacked layers",
      accent: C.cyan,
      ModelComponent: DockerStack,
    },
    {
      label: "Cloud Server",
      sublabel: "Infrastructure · live data flow",
      accent: C.sage,
      ModelComponent: CloudServer,
    },
    {
      label: "Neural Network",
      sublabel: "AI / ML · signal propagation",
      accent: C.ember,
      ModelComponent: NeuralNet,
    },
  ];

  return (
    <section
      id="models3d"
      style={{
        position: "relative",
        zIndex: 10,
        padding: "40px 32px 80px",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      <div style={{ marginBottom: 40 }}>
        <h2 style={{
          fontFamily: "'Caveat', cursive",
          fontSize: "clamp(40px, 7vw, 84px)",
          color: "white",
          lineHeight: 1,
          margin: 0,
        }}>
          My Stack{" "}
          <span style={{ color: C.gold }}>✦</span>
        </h2>
        <p style={{
          marginTop: 8,
          fontSize: 11,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(232,213,160,0.3)",
          fontFamily: "'Inter', sans-serif",
        }}>
          Hover to interact · built in three.js
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 20,
      }}>
        {models.map((m) => (
          <Model3DCard key={m.label} {...m} />
        ))}
      </div>

      {/* Ambient glow */}
      <div style={{
        position: "absolute",
        top: "30%", left: "20%",
        width: 400, height: 400,
        borderRadius: "50%",
        background: C.gold,
        filter: "blur(160px)",
        opacity: 0.04,
        pointerEvents: "none",
      }} />
    </section>
  );
}