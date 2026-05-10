import React, {
  Suspense,
  useState,
  useRef,
  useMemo,
  useEffect,
  useCallback,
} from "react"

import { Canvas, useFrame } from "@react-three/fiber"

import {
  OrbitControls,
  Float,
  Stars,
  Sparkles,
  Environment,
  ContactShadows,
  useTexture,
  useVideoTexture,
  PerspectiveCamera,
} from "@react-three/drei"

import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
} from "@react-three/postprocessing"

import { motion, AnimatePresence } from "framer-motion"

import {
  Volume2,
  VolumeX,
  Lock,
  Unlock,
  X,
  Heart,
  ChevronLeft,
  ChevronRight,
  Star,
  Clock,
} from "lucide-react"

import * as THREE from "three"

import {
  galleryData,
  secretData,
  constellationStars,
  constellationLines,
  timelineData,
  moodColors,
} from "./gallery.config.js"

/* =========================================================
   🎥 VIDEO MATERIAL
========================================================= */
function VideoMaterial({ url }) {
  const texture = useVideoTexture(url, {
    muted: true, loop: true, start: true, crossOrigin: "Anonymous",
  })
  return <meshBasicMaterial map={texture} toneMapped={false} />
}

/* =========================================================
   🖼️ IMAGE MATERIAL
========================================================= */
function ImageMaterial({ url }) {
  const texture = useTexture(url)
  texture.anisotropy = 16
  return <meshBasicMaterial map={texture} toneMapped={false} />
}

function MediaFallback() {
  return <meshBasicMaterial color="#1a1a1a" />
}

function MediaContent({ data }) {
  return data.type === "video"
    ? <VideoMaterial url={data.url} />
    : <ImageMaterial url={data.url} />
}

/* =========================================================
   🌸 ROMANTIC PARTICLES
========================================================= */
function RomanticParticles() {
  const petalGroup = useRef()
  const heartGroup = useRef()

  const petals = useMemo(() => Array.from({ length: 18 }, () => ({
    position: new THREE.Vector3(
      THREE.MathUtils.randFloatSpread(28),
      THREE.MathUtils.randFloat(8, 18),
      THREE.MathUtils.randFloatSpread(20),
    ),
    speed:    Math.random() * 0.012 + 0.005,
    drift:    (Math.random() - 0.5) * 0.004,
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.02,
    scale:    Math.random() * 0.12 + 0.06,
    color:    ["#ffb6d9", "#ffd6ea", "#ffe0f0", "#ffffff"][Math.floor(Math.random() * 4)],
  })), [])

  const hearts = useMemo(() => Array.from({ length: 10 }, () => ({
    position: new THREE.Vector3(
      THREE.MathUtils.randFloatSpread(22),
      THREE.MathUtils.randFloat(-12, -4),
      THREE.MathUtils.randFloatSpread(16),
    ),
    speed:   Math.random() * 0.008 + 0.003,
    drift:   (Math.random() - 0.5) * 0.003,
    scale:   Math.random() * 0.09 + 0.04,
    opacity: Math.random() * 0.4 + 0.15,
    phase:   Math.random() * Math.PI * 2,
  })), [])

  useFrame((state) => {
    if (petalGroup.current) {
      petalGroup.current.children.forEach((mesh, i) => {
        mesh.position.y -= petals[i].speed
        mesh.position.x += petals[i].drift
        mesh.rotation.z += petals[i].rotSpeed
        mesh.material.opacity = 0.35 + Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.12
        if (mesh.position.y < -14) {
          mesh.position.y = THREE.MathUtils.randFloat(12, 20)
          mesh.position.x = THREE.MathUtils.randFloatSpread(28)
        }
      })
    }
    if (heartGroup.current) {
      heartGroup.current.children.forEach((mesh, i) => {
        mesh.position.y += hearts[i].speed
        mesh.position.x += Math.sin(state.clock.elapsedTime * 0.6 + hearts[i].phase) * 0.003
        mesh.material.opacity = hearts[i].opacity * (0.7 + Math.sin(state.clock.elapsedTime + i) * 0.3)
        if (mesh.position.y > 14) {
          mesh.position.y = THREE.MathUtils.randFloat(-14, -8)
          mesh.position.x = THREE.MathUtils.randFloatSpread(22)
        }
      })
    }
  })

  return (
    <>
      <group ref={petalGroup}>
        {petals.map((p, i) => (
          <mesh key={`petal-${i}`} position={p.position} rotation={[0, 0, p.rotation]} scale={p.scale}>
            <circleGeometry args={[1, 5]} />
            <meshBasicMaterial color={p.color} transparent opacity={0.35} side={THREE.DoubleSide} />
          </mesh>
        ))}
      </group>
      <group ref={heartGroup}>
        {hearts.map((h, i) => (
          <mesh key={`heart-${i}`} position={h.position} scale={h.scale}>
            <sphereGeometry args={[1, 6, 6]} />
            <meshBasicMaterial color="#ffb6d9" transparent opacity={h.opacity} />
          </mesh>
        ))}
      </group>
    </>
  )
}

/* =========================================================
   ✨ FIREFLIES
========================================================= */
function Fireflies({ count = 60 }) {
  const group = useRef()
  const particles = useMemo(() => Array.from({ length: count }, () => ({
    position: [
      THREE.MathUtils.randFloatSpread(35),
      THREE.MathUtils.randFloatSpread(20),
      THREE.MathUtils.randFloatSpread(35),
    ],
    scale: Math.random() * 0.08 + 0.03,
    speed: Math.random() * 0.5 + 0.2,
    color: ["#ffb7df", "#ffffff", "#ffe27a"][Math.floor(Math.random() * 3)],
  })), [count])

  useFrame((state) => {
    if (!group.current) return
    group.current.children.forEach((child, i) => {
      const t = state.clock.elapsedTime * particles[i].speed
      child.position.y += Math.sin(t) * 0.002
      child.material.opacity = 0.5 + Math.sin(t * 2) * 0.25
    })
  })

  return (
    <group ref={group}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.position}>
          <sphereGeometry args={[p.scale, 8, 8]} />
          <meshBasicMaterial color={p.color} transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  )
}

/* =========================================================
   🖼️ MEDIA FRAME
========================================================= */
function MediaFrame({ data, position, isZoomed, onClick, revealDelay }) {
  const group    = useRef()
  const opacity  = useRef(0)
  const revealed = useRef(false)
  const revealTime = useRef(null)

  useFrame((state) => {
    if (!group.current) return

    if (!revealed.current) {
      if (revealTime.current === null) revealTime.current = state.clock.elapsedTime
      const elapsed = state.clock.elapsedTime - revealTime.current
      if (elapsed < revealDelay) return
      revealed.current = true
    }

    if (opacity.current < 1) {
      opacity.current = Math.min(opacity.current + 0.015, 1)
      group.current.children.forEach((child) => {
        if (child.material) child.material.opacity = opacity.current
      })
    }

    const target = isZoomed
      ? new THREE.Vector3(0, 0, 1.2)
      : new THREE.Vector3(...position)

    group.current.position.lerp(target, 0.07)

    if (isZoomed) {
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y, state.mouse.x * 0.08, 0.04
      )
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x, -state.mouse.y * 0.06, 0.04
      )
    } else {
      group.current.rotation.y += 0.0015
      group.current.position.y += Math.sin(state.clock.elapsedTime + data.id) * 0.0015
    }
  })

  return (
    <group ref={group} onClick={(e) => { e.stopPropagation(); onClick() }}>
      <Float speed={isZoomed ? 0 : 1.5} rotationIntensity={isZoomed ? 0 : 0.4} floatIntensity={0.6}>
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[3.4, 4.4]} />
          <meshBasicMaterial color={data.color} transparent opacity={0.12} />
        </mesh>
        <mesh castShadow>
          <boxGeometry args={[3.2, 4.2, 0.15]} />
          <meshPhysicalMaterial
            transmission={0.55} thickness={0.5} roughness={0.15}
            metalness={0.3} clearcoat={1} envMapIntensity={1.5} color={data.color}
          />
        </mesh>
        <mesh position={[0, 0, 0.08]}>
          <planeGeometry args={[2.95, 3.95]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0, 0, 0.09]}>
          <planeGeometry args={[2.8, 3.8]} />
          <Suspense fallback={<MediaFallback />}>
            <MediaContent data={data} />
          </Suspense>
        </mesh>
      </Float>
    </group>
  )
}

/* =========================================================
   🫙 WISH JAR — helpers
========================================================= */
function loadWishes() {
  try { return JSON.parse(localStorage.getItem("rr_wishes") || "[]") }
  catch { return [] }
}
function saveWishes(wishes) {
  try { localStorage.setItem("rr_wishes", JSON.stringify(wishes)) } catch {}
}

const JAR_POSITION = [-4, -2.5, -6]

/* =========================================================
   🫙 FALLING PAPER
========================================================= */
function FallingPaper({ startPos, onDone }) {
  const mesh     = useRef()
  const progress = useRef(0)

  const color = useMemo(() =>
    ["#ffd6ea", "#ffe0b2", "#e1f5fe", "#f3e5f5", "#e8f5e9"][Math.floor(Math.random() * 5)],
  [])

  const targetPos = useMemo(
    () => new THREE.Vector3(JAR_POSITION[0], JAR_POSITION[1] + 1.2, JAR_POSITION[2]),
    []
  )
  const start = useMemo(() => new THREE.Vector3(...startPos), [startPos])

  useFrame((_, delta) => {
    if (!mesh.current) return
    progress.current = Math.min(progress.current + delta * 0.55, 1)
    const t = progress.current

    const p0 = start
    const p1 = new THREE.Vector3(
      (start.x + targetPos.x) / 2 + 1.5,
      Math.max(start.y, targetPos.y) + 3,
      (start.z + targetPos.z) / 2
    )
    const p2 = targetPos

    const a = new THREE.Vector3().lerpVectors(p0, p1, t)
    const b = new THREE.Vector3().lerpVectors(p1, p2, t)
    mesh.current.position.lerpVectors(a, b, t)

    mesh.current.rotation.x += delta * 2.5
    mesh.current.rotation.z += delta * 1.8

    const scale = t < 0.85 ? 1 : THREE.MathUtils.lerp(1, 0.05, (t - 0.85) / 0.15)
    mesh.current.scale.setScalar(scale)

    if (progress.current >= 1) onDone()
  })

  return (
    <mesh ref={mesh} position={startPos}>
      <planeGeometry args={[0.4, 0.3, 2, 2]} />
      <meshStandardMaterial color={color} side={THREE.DoubleSide} roughness={0.8} />
    </mesh>
  )
}

/* =========================================================
   🫙 PAPERS INSIDE JAR
========================================================= */
function PapersInsideJar({ count }) {
  const papers = useMemo(() =>
    Array.from({ length: Math.min(count, 12) }, (_, i) => ({
      id:    i,
      pos:   [
        THREE.MathUtils.randFloatSpread(0.55),
        THREE.MathUtils.randFloat(-0.9, 0.0),
        THREE.MathUtils.randFloatSpread(0.55),
      ],
      rot:   [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      color: ["#ffd6ea", "#ffe0b2", "#e1f5fe", "#f3e5f5", "#e8f5e9"][i % 5],
      scale: Math.random() * 0.12 + 0.08,
    })),
  [count])

  return (
    <>
      {papers.map((p) => (
        <mesh key={p.id} position={p.pos} rotation={p.rot} scale={p.scale}>
          <planeGeometry args={[1.5, 1, 1, 1]} />
          <meshStandardMaterial color={p.color} side={THREE.DoubleSide} roughness={0.9} />
        </mesh>
      ))}
    </>
  )
}

/* =========================================================
   🫙 WISH JAR MESH
========================================================= */
function WishJar({ wishes, onTap, glowing }) {
  const group   = useRef()
  const glowRef = useRef()

  useFrame((state) => {
    if (!group.current) return
    group.current.position.y =
      JAR_POSITION[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.12
    group.current.rotation.y += 0.003

    if (glowRef.current) {
      glowRef.current.material.opacity = glowing
        ? 0.18 + Math.sin(state.clock.elapsedTime * 6) * 0.1
        : 0
    }
  })

  return (
    <group
      ref={group}
      position={JAR_POSITION}
      onClick={(e) => { e.stopPropagation(); onTap() }}
    >
      {/* Glow saat animasi */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.1, 16, 16]} />
        <meshBasicMaterial color="#ffd6ea" transparent opacity={0} side={THREE.BackSide} />
      </mesh>

      {/* Badan toples */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.7, 0.65, 2.0, 32, 1, true]} />
        <meshPhysicalMaterial
          transmission={0.92} thickness={0.3} roughness={0.05}
          metalness={0.1} transparent opacity={0.35}
          side={THREE.DoubleSide} color="#d6eeff" envMapIntensity={2}
        />
      </mesh>

      {/* Dasar */}
      <mesh position={[0, -1.0, 0]}>
        <cylinderGeometry args={[0.65, 0.65, 0.08, 32]} />
        <meshPhysicalMaterial transmission={0.7} roughness={0.1} color="#b8d8f8" transparent opacity={0.6} />
      </mesh>

      {/* Tutup */}
      <group position={[0, 1.08, 0]}>
        <mesh>
          <cylinderGeometry args={[0.72, 0.72, 0.12, 32]} />
          <meshPhysicalMaterial color="#a0c4e8" metalness={0.3} roughness={0.4} transparent opacity={0.8} />
        </mesh>
        <mesh position={[0, 0.12, 0]}>
          <sphereGeometry args={[0.14, 12, 12]} />
          <meshPhysicalMaterial color="#88b4d8" metalness={0.4} roughness={0.3} />
        </mesh>
      </group>

      {/* Kertas di dalam */}
      <group position={[0, -0.1, 0]}>
        <PapersInsideJar count={wishes.length} />
      </group>

      {/* Sparkle jika ada wishes */}
      {wishes.length > 0 && (
        <Sparkles count={20} scale={1.8} size={1.2} speed={0.4} color="#ffb6d9" />
      )}
    </group>
  )
}

/* =========================================================
   🌌 GENERATE POSITIONS
========================================================= */
function generatePositions(count) {
  const positions = []
  const MIN_DIST  = 5.5
  const MAX_TRIES = 80

  const layers = [
    { zMin: -8,  zMax: -12, spread: 7  },
    { zMin: -12, zMax: -18, spread: 9  },
    { zMin: -18, zMax: -26, spread: 11 },
    { zMin: -26, zMax: -34, spread: 13 },
  ]

  for (let i = 0; i < count; i++) {
    const layer   = layers[Math.floor(i / 3) % layers.length]
    let   placed  = false
    let   attempt = 0

    while (!placed && attempt < MAX_TRIES) {
      const x = THREE.MathUtils.randFloatSpread(layer.spread * 2)
      const y = THREE.MathUtils.randFloatSpread(layer.spread * 0.9)
      const z = THREE.MathUtils.randFloat(layer.zMin, layer.zMax)

      const tooClose = positions.some(([px, py, pz]) => {
        const dx = x - px, dy = y - py, dz = z - pz
        return Math.sqrt(dx * dx + dy * dy + dz * dz) < MIN_DIST
      })

      if (!tooClose) { positions.push([x, y, z]); placed = true }
      attempt++
    }

    if (!placed) {
      const fl = layers[i % layers.length]
      positions.push([
        THREE.MathUtils.randFloatSpread(fl.spread * 2),
        THREE.MathUtils.randFloatSpread(fl.spread * 0.9),
        THREE.MathUtils.randFloat(fl.zMin, fl.zMax) - i * 0.5,
      ])
    }
  }

  return positions
}

/* =========================================================
   🌌 SCENE
========================================================= */
function Scene({ data, zoomedIndex, setZoomedIndex, wishes, onJarTap, fallingPapers, onPaperDone }) {
  const positions = useMemo(() => generatePositions(data.length), [data.length])
  const [jarGlowing, setJarGlowing] = useState(false)

  useEffect(() => {
    setJarGlowing(fallingPapers.length > 0)
  }, [fallingPapers.length])

  return (
    <>
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 10, 38]} />
      <ambientLight intensity={0.55} />
      <pointLight position={[0, 6, 6]} intensity={1.5} color="#ffd6ea" />
      <pointLight position={[10, -5, 0]} intensity={1} color="#fff1aa" />
      <pointLight position={JAR_POSITION} intensity={0.8} color="#d6eeff" distance={4} />

      <Stars radius={120} depth={60} count={3000} factor={4} saturation={0} fade speed={0.5} />
      <Sparkles count={80} scale={30} size={2} speed={0.3} color="#ffffff" />
      <Fireflies count={60} />
      <RomanticParticles />

      {/* Toples */}
      <WishJar wishes={wishes} onTap={onJarTap} glowing={jarGlowing} />

      {/* Kertas jatuh */}
      {fallingPapers.map((paper) => (
        <FallingPaper
          key={paper.id}
          startPos={paper.startPos}
          onDone={() => onPaperDone(paper.id)}
        />
      ))}

      {data.map((item, i) => (
        <MediaFrame
          key={item.id}
          data={item}
          position={positions[i] ?? [0, 0, -8]}
          isZoomed={zoomedIndex === i}
          onClick={() => setZoomedIndex(zoomedIndex === i ? null : i)}
          revealDelay={i * 0.45}
        />
      ))}

      <Environment preset="night" />
      <ContactShadows position={[0, -6, 0]} opacity={0.25} scale={40} blur={2.5} far={15} />
      <OrbitControls
        enablePan={false}
        enableZoom={zoomedIndex === null}
        minDistance={5} maxDistance={18}
        autoRotate={zoomedIndex === null} autoRotateSpeed={0.2}
        touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_ROTATE }}
      />
    </>
  )
}

/* =========================================================
   🌌 CONSTELLATION SCREEN
========================================================= */
function ConstellationScreen({ onClose }) {
  const [activeStar,    setActiveStar]    = useState(null)
  const [visibleLines,  setVisibleLines]  = useState([])
  const [visibleStars,  setVisibleStars]  = useState([])
  const svgRef = useRef()

  useEffect(() => {
    constellationStars.forEach((s, i) => {
      setTimeout(() => setVisibleStars((prev) => [...prev, s.id]), i * 160)
    })
    constellationLines.forEach((_, i) => {
      setTimeout(() => setVisibleLines((prev) => [...prev, i]), 300 + i * 120)
    })
  }, [])

  const getStarPos = (id) => constellationStars.find((s) => s.id === id)

  return (
    <motion.div
      key="constellation"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="fixed inset-0 z-[150] bg-[#020408] overflow-hidden flex flex-col"
      style={{ willChange: "opacity" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-blue-500/5 blur-[100px] rounded-full" />
      </div>

      <div
        className="relative z-10 flex items-center justify-between px-5 flex-shrink-0"
        style={{ paddingTop: "max(1.25rem, env(safe-area-inset-top))" }}
      >
        <div>
          <h2 className="text-base italic font-light text-white/80">Konstelasi Kenangan</h2>
          <p className="text-[9px] uppercase tracking-[0.3em] text-white/30 mt-0.5">
            Tap bintang untuk membuka kenangan
          </p>
        </div>
        <button
          onClick={onClose}
          className="w-11 h-11 rounded-full bg-white/8 border border-white/10 backdrop-blur-xl flex items-center justify-center active:scale-90 transition-transform"
        >
          <X size={16} />
        </button>
      </div>

      <div className="relative flex-1 w-full" ref={svgRef}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {constellationLines.map((line, i) => {
            if (!visibleLines.includes(i)) return null
            const a = getStarPos(line[0])
            const b = getStarPos(line[1])
            if (!a || !b) return null
            return (
              <motion.line
                key={`line-${i}`}
                x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke="rgba(255,200,220,0.18)" strokeWidth="0.25"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            )
          })}
        </svg>

        {constellationStars.map((star) => (
          <AnimatePresence key={star.id}>
            {visibleStars.includes(star.id) && (
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={() => setActiveStar(activeStar?.id === star.id ? null : star)}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                style={{
                  left: `${star.x}%`, top: `${star.y}%`,
                  width: `${star.size * 18 + 20}px`, height: `${star.size * 18 + 20}px`,
                  willChange: "transform",
                }}
                aria-label={star.label}
              >
                {star.isMain && (
                  <motion.div
                    animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="absolute rounded-full"
                    style={{
                      width: `${star.size * 18 + 28}px`, height: `${star.size * 18 + 28}px`,
                      background: `radial-gradient(circle, ${star.color}40, transparent 70%)`,
                    }}
                  />
                )}
                <motion.div
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ repeat: Infinity, duration: 2 + Math.random() * 2 }}
                  className="rounded-full"
                  style={{
                    width: `${star.size * 7}px`, height: `${star.size * 7}px`,
                    background: star.color, boxShadow: `0 0 ${star.size * 8}px ${star.color}99`,
                    willChange: "opacity",
                  }}
                />
              </motion.button>
            )}
          </AnimatePresence>
        ))}
      </div>

      <AnimatePresence>
        {activeStar && (
          <motion.div
            key="star-popup"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="relative z-10 mx-4 flex-shrink-0"
            style={{ marginBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
          >
            <div
              className="rounded-2xl border backdrop-blur-2xl px-5 py-4"
              style={{ background: `${activeStar.color}12`, borderColor: `${activeStar.color}30` }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: activeStar.color, boxShadow: `0 0 6px ${activeStar.color}` }} />
                <p className="text-xs uppercase tracking-[0.2em] text-white/50">{activeStar.label}</p>
              </div>
              <p className="text-sm italic font-light leading-relaxed text-white/85">
                &ldquo;{activeStar.message}&rdquo;
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!activeStar && (
        <div
          className="relative z-10 mx-4 flex-shrink-0 text-center"
          style={{ marginBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
        >
          <p className="text-[10px] text-white/20 tracking-widest uppercase">
            ✦ {constellationStars.length} kenangan tersimpan ✦
          </p>
        </div>
      )}
    </motion.div>
  )
}

/* =========================================================
   📅 TIMELINE SCREEN
========================================================= */
function TimelineScreen({ onClose }) {
  const scrollRef = useRef()
  const [activeIdx, setActiveIdx] = useState(0)

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return
    const el  = scrollRef.current
    const idx = Math.round(el.scrollLeft / el.offsetWidth)
    setActiveIdx(Math.min(idx, timelineData.length - 1))
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener("scroll", handleScroll, { passive: true })
    return () => el.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  return (
    <motion.div
      key="timeline"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="fixed inset-0 z-[150] bg-[#06030a] overflow-hidden flex flex-col"
      style={{ willChange: "opacity" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-pink-500/5 blur-[100px] rounded-full" />
      </div>

      <div
        className="relative z-10 flex items-center justify-between px-5 flex-shrink-0"
        style={{ paddingTop: "max(1.25rem, env(safe-area-inset-top))" }}
      >
        <div>
          <h2 className="text-base italic font-light text-white/80">Linimasa Kenangan</h2>
          <p className="text-[9px] uppercase tracking-[0.3em] text-white/30 mt-0.5">Geser untuk menjelajahi</p>
        </div>
        <button
          onClick={onClose}
          className="w-11 h-11 rounded-full bg-white/8 border border-white/10 backdrop-blur-xl flex items-center justify-center active:scale-90 transition-transform"
        >
          <X size={16} />
        </button>
      </div>

      <div className="relative z-10 flex justify-center gap-1.5 py-3 flex-shrink-0">
        {timelineData.map((_, i) => (
          <motion.div
            key={i}
            animate={{ width: activeIdx === i ? 20 : 6, opacity: activeIdx === i ? 1 : 0.3 }}
            transition={{ duration: 0.3 }}
            className="h-1.5 rounded-full bg-pink-300"
            style={{ willChange: "width, opacity" }}
          />
        ))}
      </div>

      <div
        ref={scrollRef}
        className="relative z-10 flex-1 flex overflow-x-auto snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch", touchAction: "pan-x" }}
      >
        {timelineData.map((item, i) => {
          const mc = moodColors[item.mood] ?? moodColors.sweet
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="flex-shrink-0 w-full h-full snap-center flex flex-col justify-center px-6 py-4"
              style={{ willChange: "transform, opacity" }}
            >
              <div
                className="w-full rounded-3xl border overflow-hidden flex flex-col"
                style={{ background: mc.glow, borderColor: `${mc.accent}30`, maxHeight: "calc(100vh - 200px)" }}
              >
                {item.url && (
                  <div className="w-full aspect-[4/3] bg-black/40 overflow-hidden flex-shrink-0">
                    {item.type === "video" ? (
                      <video src={item.url} className="w-full h-full object-cover" autoPlay muted loop playsInline />
                    ) : (
                      <img src={item.url} alt={item.label} className="w-full h-full object-cover" loading="lazy" />
                    )}
                  </div>
                )}
                <div className="px-5 py-5 flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: mc.accent }} />
                    <span className="text-[10px] uppercase tracking-[0.25em]" style={{ color: mc.accent }}>
                      {item.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-light italic text-white/90 mb-2 leading-snug">{item.label}</h3>
                  <p className="text-sm text-white/55 leading-relaxed font-light">{item.caption}</p>
                </div>
                <div
                  className="h-px mx-5 mb-4 rounded-full opacity-30"
                  style={{ background: `linear-gradient(to right, transparent, ${mc.accent}, transparent)` }}
                />
              </div>
            </motion.div>
          )
        })}
      </div>

      <div
        className="relative z-10 text-center flex-shrink-0 pb-2"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <p className="text-[10px] text-white/20 tracking-widest">{activeIdx + 1} / {timelineData.length}</p>
      </div>
    </motion.div>
  )
}

/* =========================================================
   🔔 TOAST
========================================================= */
function Toast({ message, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="toast"
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed z-[400] left-1/2 -translate-x-1/2 pointer-events-none"
          style={{ bottom: "calc(160px + env(safe-area-inset-bottom))", willChange: "transform, opacity" }}
        >
          <div className="bg-red-500/20 border border-red-400/30 backdrop-blur-2xl px-5 py-3 rounded-2xl text-red-200 text-sm tracking-wide whitespace-nowrap">
            {message}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* =========================================================
   📱 APP
========================================================= */
export default function App() {
  const [started,      setStarted]      = useState(false)
  const [muted,        setMuted]        = useState(false)
  const [isSecret,     setIsSecret]     = useState(false)
  const [showPass,     setShowPass]     = useState(false)
  const [passInput,    setPassInput]    = useState("")
  const [zoomedIndex,  setZoomedIndex]  = useState(null)
  const [passShake,    setPassShake]    = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const [uiVisible,    setUiVisible]    = useState(true)
  const [mode,         setMode]         = useState("gallery")

  // 🫙 Wish Jar state
  const [wishes,        setWishes]        = useState(loadWishes)
  const [showWishInput, setShowWishInput] = useState(false)
  const [showWishList,  setShowWishList]  = useState(false)
  const [wishText,      setWishText]      = useState("")
  const [fallingPapers, setFallingPapers] = useState([])
  const paperIdRef = useRef(0)

  const audioRef   = useRef(null)
  const toastTimer = useRef(null)
  const idleTimer  = useRef(null)

  const activeData = isSecret ? [...galleryData, ...secretData] : galleryData

  /* ---- Idle UI ---- */
  const resetIdle = useCallback(() => {
    setUiVisible(true)
    clearTimeout(idleTimer.current)
    if (zoomedIndex === null && mode === "gallery") {
      idleTimer.current = setTimeout(() => setUiVisible(false), 5000)
    }
  }, [zoomedIndex, mode])

  useEffect(() => {
    if (!started) return
    const events = ["touchstart", "touchmove", "mousedown", "mousemove"]
    events.forEach((e) => window.addEventListener(e, resetIdle, { passive: true }))
    resetIdle()
    return () => {
      events.forEach((e) => window.removeEventListener(e, resetIdle))
      clearTimeout(idleTimer.current)
    }
  }, [started, resetIdle])

  useEffect(() => {
    if (zoomedIndex !== null || mode !== "gallery") {
      setUiVisible(true)
      clearTimeout(idleTimer.current)
    } else {
      resetIdle()
    }
  }, [zoomedIndex, mode, resetIdle])

  /* ---- Keyboard ---- */
  useEffect(() => {
    const handleKey = (e) => {
      if (!started || mode !== "gallery") return
      if (e.key === "Escape" && zoomedIndex !== null) setZoomedIndex(null)
      if (e.key === "ArrowRight" && zoomedIndex !== null)
        setZoomedIndex((p) => (p < activeData.length - 1 ? p + 1 : 0))
      if (e.key === "ArrowLeft" && zoomedIndex !== null)
        setZoomedIndex((p) => (p > 0 ? p - 1 : activeData.length - 1))
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [started, zoomedIndex, activeData.length, mode])

  /* ---- Toast ---- */
  const showToast = useCallback(() => {
    setToastVisible(true)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToastVisible(false), 2500)
  }, [])

  /* ---- Unlock ---- */
  const unlockSecret = useCallback(() => {
    const val = passInput.toLowerCase().trim()
    if (val === "sayang" || val === "dhea") {
      setIsSecret(true)
      setShowPass(false)
      setPassInput("")
    } else {
      setPassInput("")
      setPassShake(true)
      setTimeout(() => setPassShake(false), 600)
      showToast()
    }
  }, [passInput, showToast])

  /* ---- Prev / Next ---- */
  const handlePrev = useCallback(() => {
    setZoomedIndex((p) => p !== null ? (p > 0 ? p - 1 : activeData.length - 1) : null)
  }, [activeData.length])

  const handleNext = useCallback(() => {
    setZoomedIndex((p) => p !== null ? (p < activeData.length - 1 ? p + 1 : 0) : null)
  }, [activeData.length])

  /* ---- Mode ---- */
  const handleModeChange = useCallback((newMode) => {
    setZoomedIndex(null)
    setMode(newMode)
  }, [])

  /* ---- Wish Jar ---- */
  const submitWish = useCallback(() => {
    const text = wishText.trim()
    if (!text) return

    const newWish = {
      id:   Date.now(),
      text,
      date: new Date().toLocaleDateString("id-ID"),
    }
    const updated = [...wishes, newWish]
    setWishes(updated)
    saveWishes(updated)
    setWishText("")
    setShowWishInput(false)

    const paperId = paperIdRef.current++
    setFallingPapers((prev) => [
      ...prev,
      {
        id: paperId,
        startPos: [
          THREE.MathUtils.randFloatSpread(3),
          2 + Math.random(),
          -2,
        ],
      },
    ])
  }, [wishText, wishes])

  const removePaper = useCallback((id) => {
    setFallingPapers((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const handleJarTap = useCallback(() => {
    if (wishes.length === 0) {
      setShowWishInput(true)
    } else {
      setShowWishList(true)
    }
  }, [wishes.length])

  const imageCount = activeData.filter((d) => d.type === "image").length
  const videoCount = activeData.filter((d) => d.type === "video").length

  /* ============================================================
     RENDER
  ============================================================ */
  return (
    <div
      className="h-screen w-full bg-black text-white overflow-hidden relative"
      style={{ touchAction: "none" }}
    >
      <audio ref={audioRef} src="/musik.mp3" loop autoPlay />

      {/* ====================================================
          🎬 INTRO
      ==================================================== */}
      <AnimatePresence>
        {!started && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="fixed inset-0 z-[200] overflow-hidden bg-black flex items-center justify-center"
            style={{ willChange: "opacity" }}
          >
            <div className="absolute w-[500px] h-[500px] bg-pink-500/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_60%)] pointer-events-none" />
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 6 }}
              className="absolute w-[380px] h-[380px] border border-pink-300/10 rounded-full pointer-events-none"
              style={{ willChange: "transform, opacity" }}
            />

            <div className="relative z-10 text-center px-6 max-w-sm w-full">
              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2 }}
                className="uppercase tracking-[0.6em] text-[9px] text-pink-100/40 mb-8"
              >
                RR Memory Space
              </motion.p>

              <div className="space-y-4 mb-12">
                {[
                  "Di antara jutaan bintang...",
                  "Hanya satu yang paling terang.",
                  "Dan bintang itu...",
                  "Adalah dirimu.",
                ].map((text, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 1.8, duration: 2 }}
                    className="text-base italic font-extralight tracking-wide text-white/70"
                    style={{ willChange: "transform, opacity" }}
                  >
                    {text}
                  </motion.p>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 6.5, duration: 2 }}
                style={{ willChange: "transform, opacity" }}
              >
                <h1 className="text-5xl font-light italic tracking-tight text-white drop-shadow-[0_0_24px_rgba(255,255,255,0.12)]">
                  Rafika Dhea
                </h1>
                <p className="mt-4 text-white/35 text-sm leading-relaxed px-2">
                  Sebuah ruang kecil yang menyimpan kenangan,
                  tawa, dan semua hal sederhana yang terasa begitu berarti.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 8, duration: 1.5 }}
                className="mt-14"
                style={{ willChange: "transform, opacity", paddingBottom: "max(0px, env(safe-area-inset-bottom))" }}
              >
                <button
                  onClick={() => { setStarted(true); audioRef.current?.play() }}
                  className="group relative overflow-hidden px-10 py-4 rounded-full border border-white/15 bg-white/5 backdrop-blur-xl uppercase tracking-[0.3em] text-xs min-h-[48px] active:scale-95 transition-all duration-700 hover:bg-white hover:text-black"
                  style={{ willChange: "transform" }}
                >
                  <span className="relative z-10">Mulai Perjalanan</span>
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                </button>
              </motion.div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====================================================
          🎛 UI OVERLAY
      ==================================================== */}
      {started && (
        <>
          {/* TOP BAR */}
          <div
            className="fixed top-0 left-0 w-full z-[100] flex justify-between items-start px-5 pointer-events-none"
            style={{ paddingTop: "max(1.25rem, env(safe-area-inset-top))" }}
          >
            <div className="pointer-events-none">
              <h2 className="text-base italic font-light text-pink-100/90 leading-none">Memory Space</h2>
              <p className="text-[9px] uppercase tracking-[0.3em] text-white/30 mt-1">
                {mode === "gallery" ? "Explore The Moments"
                  : mode === "constellation" ? "Konstelasi Kenangan"
                  : "Linimasa Kenangan"}
              </p>
            </div>

            {mode === "gallery" && (
              <motion.div
                initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex gap-2 pointer-events-none"
              >
                <div className="flex items-center gap-1.5 bg-white/8 border border-white/10 backdrop-blur-xl rounded-full px-3 py-1">
                  <span className="text-[10px]">🖼</span>
                  <span className="text-[10px] text-white/60 tabular-nums font-light">{imageCount}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/8 border border-white/10 backdrop-blur-xl rounded-full px-3 py-1">
                  <span className="text-[10px]">🎞</span>
                  <span className="text-[10px] text-white/60 tabular-nums font-light">{videoCount}</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* CLOSE + PREV/NEXT saat zoom */}
          <AnimatePresence>
            {zoomedIndex !== null && mode === "gallery" && (
              <motion.div
                key="nav-controls"
                initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className="fixed left-0 w-full z-[120] flex items-center justify-center gap-3 px-5"
                style={{ paddingTop: "max(1rem, env(safe-area-inset-top))", willChange: "transform, opacity" }}
              >
                <button
                  onClick={handlePrev}
                  className="w-12 h-12 rounded-full bg-black/40 border border-white/15 backdrop-blur-xl flex items-center justify-center active:scale-90 transition-transform"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => setZoomedIndex(null)}
                  className="flex items-center gap-2 px-5 h-12 rounded-full bg-black/40 border border-white/20 backdrop-blur-xl text-xs uppercase tracking-[0.2em] active:scale-95 transition-transform"
                >
                  <X size={13} /> Tutup
                </button>
                <button
                  onClick={handleNext}
                  className="w-12 h-12 rounded-full bg-black/40 border border-white/15 backdrop-blur-xl flex items-center justify-center active:scale-90 transition-transform"
                >
                  <ChevronRight size={16} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* QUOTE saat zoom */}
          <AnimatePresence>
            {zoomedIndex !== null && mode === "gallery" && (
              <motion.div
                key="quote-box"
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }}
                transition={{ type: "spring", stiffness: 280, damping: 26 }}
                className="fixed left-0 w-full px-4 z-[100] pointer-events-none"
                style={{ bottom: "calc(90px + env(safe-area-inset-bottom))", willChange: "transform, opacity" }}
              >
                <div className="max-w-sm mx-auto bg-black/25 border border-white/10 backdrop-blur-2xl rounded-2xl px-5 py-4">
                  <p className="text-sm italic font-light leading-relaxed text-white/85 text-center">
                    &ldquo;{activeData[zoomedIndex]?.quote}&rdquo;
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* BOTTOM BAR */}
          <motion.div
            animate={{ opacity: uiVisible ? 1 : 0, y: uiVisible ? 0 : 14 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed left-0 w-full z-[100] px-4 pointer-events-none"
            style={{ bottom: "max(1rem, env(safe-area-inset-bottom))", willChange: "transform, opacity" }}
          >
            <div className="flex items-center justify-between gap-2 pointer-events-auto">
              {/* Kiri: mute + lock + wish jar */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const next = !muted
                    setMuted(next)
                    if (audioRef.current) audioRef.current.muted = next
                  }}
                  className="w-12 h-12 rounded-full bg-white/10 border border-white/12 backdrop-blur-xl flex items-center justify-center active:scale-90 transition-transform"
                  aria-label={muted ? "Nyalakan audio" : "Matikan audio"}
                >
                  {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>

                <button
                  onClick={() => setShowPass(true)}
                  className="w-12 h-12 rounded-full bg-white/10 border border-white/12 backdrop-blur-xl flex items-center justify-center active:scale-90 transition-transform relative"
                  aria-label={isSecret ? "Secret terbuka" : "Buka secret"}
                >
                  {isSecret
                    ? <Unlock size={18} className="text-yellow-300" />
                    : <Lock size={18} />}
                  {isSecret && (
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-yellow-300 rounded-full border border-black" />
                  )}
                </button>

                {/* 🫙 Tombol Wish Jar */}
                <button
                  onClick={() => setShowWishInput(true)}
                  className="w-12 h-12 rounded-full bg-white/10 border border-white/12 backdrop-blur-xl flex items-center justify-center active:scale-90 transition-transform relative text-base"
                  aria-label="Tulis harapan"
                >
                  🫙
                  {wishes.length > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-pink-400 rounded-full text-[9px] flex items-center justify-center text-black font-medium">
                      {wishes.length > 9 ? "9+" : wishes.length}
                    </span>
                  )}
                </button>
              </div>

              {/* Kanan: mode tabs */}
              <div className="flex items-center gap-1.5 bg-white/8 border border-white/10 backdrop-blur-xl rounded-full p-1">
                <button
                  onClick={() => handleModeChange("gallery")}
                  className={`flex items-center gap-1.5 px-3 h-9 rounded-full text-[10px] uppercase tracking-wider transition-all active:scale-95 ${
                    mode === "gallery" ? "bg-white/15 text-white" : "text-white/40"
                  }`}
                  aria-label="Mode galeri"
                >
                  <span>🖼</span>
                </button>
                <button
                  onClick={() => handleModeChange("constellation")}
                  className={`flex items-center gap-1.5 px-3 h-9 rounded-full text-[10px] uppercase tracking-wider transition-all active:scale-95 ${
                    mode === "constellation" ? "bg-white/15 text-white" : "text-white/40"
                  }`}
                  aria-label="Mode konstelasi"
                >
                  <Star size={14} />
                </button>
                <button
                  onClick={() => handleModeChange("timeline")}
                  className={`flex items-center gap-1.5 px-3 h-9 rounded-full text-[10px] uppercase tracking-wider transition-all active:scale-95 ${
                    mode === "timeline" ? "bg-white/15 text-white" : "text-white/40"
                  }`}
                  aria-label="Mode timeline"
                >
                  <Clock size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}

      {/* ====================================================
          🌌 3D CANVAS
      ==================================================== */}
      {started && (
        <div
          className="absolute inset-0"
          style={{
            opacity:       mode === "gallery" ? 1 : 0,
            pointerEvents: mode === "gallery" ? "auto" : "none",
            transition:    "opacity 0.6s ease",
          }}
        >
          <Canvas
            shadows
            dpr={[1, Math.min(window.devicePixelRatio, 2)]}
            gl={{ antialias: true, powerPreference: "high-performance" }}
          >
            <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
            <Scene
              data={activeData}
              zoomedIndex={zoomedIndex}
              setZoomedIndex={setZoomedIndex}
              wishes={wishes}
              onJarTap={handleJarTap}
              fallingPapers={fallingPapers}
              onPaperDone={removePaper}
            />
            <EffectComposer multisampling={2}>
              <Bloom intensity={0.4} luminanceThreshold={0.7} mipmapBlur />
              <Noise opacity={0.02} />
              <Vignette eskil={false} offset={0.2} darkness={0.85} />
            </EffectComposer>
          </Canvas>
        </div>
      )}

      {/* ====================================================
          🌌 CONSTELLATION SCREEN
      ==================================================== */}
      <AnimatePresence>
        {started && mode === "constellation" && (
          <ConstellationScreen onClose={() => handleModeChange("gallery")} />
        )}
      </AnimatePresence>

      {/* ====================================================
          📅 TIMELINE SCREEN
      ==================================================== */}
      <AnimatePresence>
        {started && mode === "timeline" && (
          <TimelineScreen onClose={() => handleModeChange("gallery")} />
        )}
      </AnimatePresence>

      {/* ====================================================
          🔔 TOAST
      ==================================================== */}
      <Toast message="Kode salah, coba lagi 💔" visible={toastVisible} />

      {/* ====================================================
          🔐 PASSWORD MODAL
      ==================================================== */}
      <AnimatePresence>
        {showPass && (
          <motion.div
            key="pass-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[300] bg-black/85 backdrop-blur-2xl flex items-end justify-center"
            onClick={(e) => { if (e.target === e.currentTarget) { setShowPass(false); setPassInput("") } }}
          >
            <motion.div
              key="pass-sheet"
              initial={{ y: "100%" }}
              animate={
                passShake
                  ? { y: 0, x: [0, -10, 10, -8, 8, -4, 4, 0], transition: { duration: 0.45 } }
                  : { y: 0, x: 0 }
              }
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="w-full max-w-sm bg-white/6 border-t border-white/12 rounded-t-[2rem] p-8 text-center backdrop-blur-2xl"
              style={{ paddingBottom: "max(2.5rem, env(safe-area-inset-bottom))", willChange: "transform" }}
            >
              <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-6" />
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Heart size={26} className="mx-auto mb-4 text-pink-400" />
              </motion.div>
              <h2 className="text-xl italic font-light mb-1">Secret Chamber</h2>
              <p className="text-white/40 text-xs mb-7">Masukkan kode spesial</p>
              <input
                type="password"
                value={passInput}
                onChange={(e) => setPassInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && unlockSecret()}
                className="w-full bg-transparent border-b border-white/20 text-center text-2xl tracking-[0.4em] pb-3 outline-none focus:border-pink-400 transition-all"
                placeholder="••••••"
                autoFocus
                autoComplete="off"
                inputMode="text"
              />
              <div className="flex gap-3 mt-7">
                <button
                  onClick={() => { setShowPass(false); setPassInput("") }}
                  className="flex-1 py-3.5 min-h-[48px] rounded-2xl bg-white/6 border border-white/12 text-sm active:scale-95 transition-transform"
                >
                  Tutup
                </button>
                <button
                  onClick={unlockSecret}
                  className="flex-1 py-3.5 min-h-[48px] rounded-2xl bg-white text-black text-sm font-medium active:scale-95 transition-transform"
                >
                  Buka
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====================================================
          🫙 WISH INPUT SHEET
      ==================================================== */}
      <AnimatePresence>
        {showWishInput && (
          <motion.div
            key="wish-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-2xl flex items-end justify-center"
            onClick={(e) => { if (e.target === e.currentTarget) { setShowWishInput(false); setWishText("") } }}
          >
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="w-full max-w-sm bg-white/6 border-t border-white/12 rounded-t-[2rem] p-8 backdrop-blur-2xl"
              style={{ paddingBottom: "max(2.5rem, env(safe-area-inset-bottom))" }}
            >
              <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-6" />

              <div className="text-center mb-6">
                <span className="text-3xl">🫙</span>
                <h2 className="text-xl italic font-light mt-2 mb-1">Wish Jar</h2>
                <p className="text-white/40 text-xs leading-relaxed">
                  Tuliskan harapan atau doamu —<br />tersimpan di dalam toples untuk selamanya
                </p>
              </div>

              <textarea
                value={wishText}
                onChange={(e) => setWishText(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && e.metaKey) submitWish() }}
                placeholder="Semoga suatu hari..."
                rows={3}
                className="w-full bg-white/5 border border-white/15 rounded-2xl px-4 py-3 text-sm text-white/85 placeholder-white/25 outline-none focus:border-pink-400/60 transition-all resize-none leading-relaxed"
                autoFocus
              />

              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => { setShowWishInput(false); setWishText("") }}
                  className="flex-1 py-3.5 min-h-[48px] rounded-2xl bg-white/6 border border-white/12 text-sm active:scale-95 transition-transform"
                >
                  Batal
                </button>
                <button
                  onClick={submitWish}
                  disabled={!wishText.trim()}
                  className="flex-1 py-3.5 min-h-[48px] rounded-2xl bg-pink-400/90 text-white text-sm font-medium active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Masukkan ✨
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====================================================
          🫙 WISH LIST SHEET
      ==================================================== */}
      <AnimatePresence>
        {showWishList && (
          <motion.div
            key="wishlist-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-2xl flex items-end justify-center"
            onClick={(e) => { if (e.target === e.currentTarget) setShowWishList(false) }}
          >
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="w-full max-w-sm bg-white/6 border-t border-white/12 rounded-t-[2rem] backdrop-blur-2xl overflow-hidden"
              style={{ maxHeight: "75vh", paddingBottom: "env(safe-area-inset-bottom)" }}
            >
              <div className="px-8 pt-8 pb-4">
                <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-6" />
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-base italic font-light">Isi Wish Jar</h2>
                    <p className="text-white/35 text-[10px] mt-0.5">{wishes.length} harapan tersimpan</p>
                  </div>
                  <button
                    onClick={() => { setShowWishList(false); setShowWishInput(true) }}
                    className="px-3 py-2 rounded-full bg-pink-400/20 border border-pink-400/30 text-pink-300 text-[11px] active:scale-95 transition-transform"
                  >
                    + Tambah
                  </button>
                </div>
              </div>

              <div className="overflow-y-auto px-6 pb-8" style={{ maxHeight: "calc(75vh - 140px)" }}>
                {wishes.map((w, i) => (
                  <motion.div
                    key={w.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="mb-3 p-4 rounded-2xl bg-white/5 border border-white/8"
                  >
                    <p className="text-sm italic font-light text-white/80 leading-relaxed mb-2">
                      &ldquo;{w.text}&rdquo;
                    </p>
                    <p className="text-[10px] text-white/30 tracking-wide">{w.date}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}