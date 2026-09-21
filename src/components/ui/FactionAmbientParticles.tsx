import React, { useMemo } from 'react';
import { FactionId } from '../../data/factionDataProvider';

interface FactionAmbientParticlesProps {
  faction: FactionId;
  isEnabled?: boolean;
  themeMode?: 'dark' | 'light';
}

interface ParticleConfig {
  id: number;
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
  glowColor: string;
  particleType: 'ember' | 'feather' | 'wisp' | 'leaf' | 'spore' | 'crystal';
}

export const FactionAmbientParticles: React.FC<FactionAmbientParticlesProps> = ({
  faction,
  isEnabled = true,
  themeMode = 'dark',
}) => {
  const isDark = themeMode === 'dark';

  // Generamos partículas optimizadas y ligeras con posiciones predecibles por facción
  const particles: ParticleConfig[] = useMemo(() => {
    if (!isEnabled) return [];

    const normalizedFaction: FactionId = faction;

    const count = 18; // Cantidad moderada para 60fps constantes
    const list: ParticleConfig[] = [];

    for (let i = 0; i < count; i++) {
      const left = `${(i * 5.5 + (i % 3) * 7) % 96 + 2}%`;
      const top = `${(i * 7.1 + (i % 4) * 11) % 92 + 3}%`;
      const size = 3 + (i % 5) * 2; // entre 3px y 11px
      const duration = 7 + (i % 6) * 2.5; // entre 7s y 19s
      const delay = (i * 0.7) % 6; // retardo escalonado
      const opacity = isDark ? 0.25 + (i % 4) * 0.15 : 0.18 + (i % 3) * 0.12;

      let color = '#c084fc';
      let glowColor = 'rgba(192, 132, 252, 0.4)';
      let particleType: ParticleConfig['particleType'] = 'ember';

      switch (normalizedFaction) {
        case 'Mazmorra': // Ascuas volcánicas y chispas violáceas
          color = i % 3 === 0 ? '#f43f5e' : i % 2 === 0 ? '#c084fc' : '#e11d48';
          glowColor = 'rgba(225, 29, 72, 0.5)';
          particleType = 'ember';
          break;

        case 'Templo': // Plumas de luz y destellos solares
          color = i % 3 === 0 ? '#fef08a' : i % 2 === 0 ? '#fbbf24' : '#f59e0b';
          glowColor = 'rgba(251, 191, 36, 0.45)';
          particleType = 'feather';
          break;

        case 'Necrópolis': // Niebla espectral y fuegos fatuos
          color = i % 3 === 0 ? '#34d399' : i % 2 === 0 ? '#2dd4bf' : '#94a3b8';
          glowColor = 'rgba(45, 212, 191, 0.4)';
          particleType = 'wisp';
          break;

        case 'Foresta': // Hojas doradas y esporas de la arboleda
          color = i % 3 === 0 ? '#fcd34d' : i % 2 === 0 ? '#34d399' : '#10b981';
          glowColor = 'rgba(16, 185, 129, 0.35)';
          particleType = 'leaf';
          break;

        case 'Colmena': // Zumbido de esporas bio-luminiscentes
          color = i % 3 === 0 ? '#fdba74' : i % 2 === 0 ? '#fb923c' : '#ea580c';
          glowColor = 'rgba(249, 115, 22, 0.45)';
          particleType = 'spore';
          break;

        case 'Cisma': // Cristales de hielo y esquirlas del vacío de Vori
          color = i % 3 === 0 ? '#7dd3fc' : i % 2 === 0 ? '#a5b4fc' : '#38bdf8';
          glowColor = 'rgba(56, 189, 248, 0.45)';
          particleType = 'crystal';
          break;
      }

      list.push({
        id: i,
        left,
        top,
        size,
        duration,
        delay,
        opacity,
        color,
        glowColor,
        particleType,
      });
    }

    return list;
  }, [faction, isEnabled, isDark]);

  if (!isEnabled) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden select-none"
    >
      <style>{`
        @keyframes floatEmberUp {
          0% {
            transform: translateY(20px) translateX(0) scale(0.8);
            opacity: 0;
          }
          20% {
            opacity: var(--particle-opacity);
          }
          80% {
            opacity: var(--particle-opacity);
            transform: translateY(-80px) translateX(15px) scale(1.1);
          }
          100% {
            transform: translateY(-160px) translateX(-10px) scale(0.6);
            opacity: 0;
          }
        }

        @keyframes floatFeatherDrift {
          0% {
            transform: translateY(-20px) translateX(0) rotate(0deg);
            opacity: 0;
          }
          25% {
            opacity: var(--particle-opacity);
            transform: translateY(30px) translateX(25px) rotate(15deg);
          }
          75% {
            opacity: var(--particle-opacity);
            transform: translateY(90px) translateX(-20px) rotate(-10deg);
          }
          100% {
            transform: translateY(150px) translateX(10px) rotate(20deg);
            opacity: 0;
          }
        }

        @keyframes floatWispPulse {
          0% {
            transform: scale(0.9) translate(0, 0);
            opacity: 0.1;
          }
          50% {
            transform: scale(1.25) translate(15px, -25px);
            opacity: var(--particle-opacity);
          }
          100% {
            transform: scale(0.85) translate(-10px, -50px);
            opacity: 0.05;
          }
        }

        @keyframes floatLeafSway {
          0% {
            transform: translateY(-30px) translateX(-20px) rotate(-20deg);
            opacity: 0;
          }
          30% {
            opacity: var(--particle-opacity);
          }
          70% {
            opacity: var(--particle-opacity);
            transform: translateY(70px) translateX(35px) rotate(35deg);
          }
          100% {
            transform: translateY(140px) translateX(-15px) rotate(60deg);
            opacity: 0;
          }
        }

        @keyframes floatSporeJitter {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.2;
          }
          35% {
            transform: translate(8px, -14px) scale(1.2);
            opacity: var(--particle-opacity);
          }
          70% {
            transform: translate(-10px, 12px) scale(0.9);
            opacity: var(--particle-opacity);
          }
          100% {
            transform: translate(4px, -20px) scale(1.1);
            opacity: 0.1;
          }
        }

        @keyframes floatCrystalTwinkle {
          0% {
            transform: rotate(0deg) translateY(0) scale(0.8);
            opacity: 0.2;
          }
          50% {
            transform: rotate(180deg) translateY(40px) scale(1.15);
            opacity: var(--particle-opacity);
          }
          100% {
            transform: rotate(360deg) translateY(80px) scale(0.7);
            opacity: 0.1;
          }
        }
      `}</style>

      {particles.map((p) => {
        let animationName = 'floatEmberUp';
        let borderRadius = '50%';
        let shapeClip = '';

        if (p.particleType === 'ember') {
          animationName = 'floatEmberUp';
          borderRadius = '50%';
        } else if (p.particleType === 'feather') {
          animationName = 'floatFeatherDrift';
          borderRadius = '40% 60% 70% 30% / 40% 50% 60% 50%';
        } else if (p.particleType === 'wisp') {
          animationName = 'floatWispPulse';
          borderRadius = '60% 40% 30% 70% / 60% 30% 70% 40%';
        } else if (p.particleType === 'leaf') {
          animationName = 'floatLeafSway';
          borderRadius = '0 70% 0 70%';
        } else if (p.particleType === 'spore') {
          animationName = 'floatSporeJitter';
          borderRadius = '50%';
        } else if (p.particleType === 'crystal') {
          animationName = 'floatCrystalTwinkle';
          borderRadius = '2px';
        }

        return (
          <div
            key={p.id}
            style={
              {
                position: 'absolute',
                left: p.left,
                top: p.top,
                width: `${p.size}px`,
                height: `${p.size * (p.particleType === 'feather' || p.particleType === 'leaf' ? 1.6 : 1)}px`,
                backgroundColor: p.color,
                boxShadow: `0 0 ${p.size * 1.5}px ${p.glowColor}`,
                borderRadius,
                '--particle-opacity': p.opacity,
                animation: `${animationName} ${p.duration}s ease-in-out ${p.delay}s infinite`,
                willChange: 'transform, opacity',
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
};
