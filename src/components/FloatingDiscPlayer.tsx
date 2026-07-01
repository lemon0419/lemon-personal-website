import { useState, useRef, useCallback, useEffect } from 'react';

interface FloatingDiscPlayerProps {
  audioSrc: string;
  labelLine1?: string;
  labelLine2?: string;
}

// 音符粒子组件
function MusicNoteParticles({ active }: { active: boolean }) {
  const [notes] = useState(() =>
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      left: 15 + Math.random() * 70,
      delay: Math.random() * 2,
      size: 10 + Math.random() * 8,
      duration: 2 + Math.random() * 2,
    })),
  );

  if (!active) return null;

  return (
    <div className="absolute inset-0 overflow-visible pointer-events-none z-[-1]">
      {notes.map((n) => (
        <span
          key={n.id}
          className="absolute bottom-full"
          style={{
            left: `${n.left}%`,
            fontSize: `${n.size}px`,
            animation: `note-float ${n.duration}s ease-out ${n.delay}s infinite`,
            opacity: 0,
          }}
        >
          ♪
        </span>
      ))}
    </div>
  );
}

export default function FloatingDiscPlayer({
  audioSrc,
  labelLine1 = 'You Will',
  labelLine2 = 'Be Found',
}: FloatingDiscPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, startX: 0, startY: 0 });
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showLabel, setShowLabel] = useState(false);

  // 唱片手动旋转角度（用户拖拽唱片时）
  const [discRotation, setDiscRotation] = useState(0);
  const discDragRef = useRef({ active: false, startAngle: 0, startRotation: 0 });
  // 播放时的自动旋转偏移
  const autoRotationRef = useRef(0);
  const autoAngleRef = useRef(0);

  // 初始位置：右下角
  useEffect(() => {
    setPos({ x: window.innerWidth - 140, y: window.innerHeight - 140 });
    const onResize = () => {
      setPos((p) => ({
        x: Math.min(p.x, window.innerWidth - 130),
        y: Math.min(p.y, window.innerHeight - 130),
      }));
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // 自动旋转动画帧
  useEffect(() => {
    if (!playing) {
      autoRotationRef.current && cancelAnimationFrame(autoRotationRef.current);
      autoRotationRef.current = 0;
      return;
    }

    let lastTime = performance.now();
    const speed = 90; // 度每秒

    const tick = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      autoAngleRef.current += speed * dt;
      setDiscRotation(discDragRef.current.startRotation + autoAngleRef.current);
      autoRotationRef.current = requestAnimationFrame(tick);
    };

    autoRotationRef.current = requestAnimationFrame(tick);
    return () => {
      if (autoRotationRef.current) cancelAnimationFrame(autoRotationRef.current);
    };
  }, [playing]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      // 停止时记录当前角度作为手动基准
      discDragRef.current.startRotation = discRotation;
    } else {
      audio.play().catch((e) => {
        console.warn('音频播放失败:', e);
      });
      setPlaying(true);
      // 开始自动播放时，从当前角度继续转
      discDragRef.current.startRotation = discRotation;
      autoAngleRef.current = 0;
    }
  }, [playing, discRotation]);

  // 整体容器拖拽逻辑
  const onContainerPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if ((e.target as HTMLElement).closest('.disc-inner')) return; // 让给唱片内部处理
      if (e.button !== 0) return;
      dragStart.current = { x: e.clientX, y: e.clientY, startX: pos.x, startY: pos.y };
      setDragging(true);
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [pos],
  );

  const onContainerPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      const newX = Math.max(0, Math.min(window.innerWidth - 130, dragStart.current.startX + dx));
      const newY = Math.max(0, Math.min(window.innerHeight - 130, dragStart.current.startY + dy));
      setPos({ x: newX, y: newY });
    },
    [dragging],
  );

  const onContainerPointerUp = useCallback(() => {
    setDragging(false);
  }, []);

  // 唱片旋转交互
  const onDiscPointerDown = useCallback((e: React.PointerEvent) => {
    e.stopPropagation();
    if (e.button !== 0) return;
    if (playing) {
      // 正在播放时，也可以手动拨动唱片改变速度感
    }
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
    discDragRef.current = { active: true, startAngle: angle, startRotation: discRotation };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, [discRotation, playing]);

  const onDiscPointerMove = useCallback((e: React.PointerEvent) => {
    if (!discDragRef.current.active) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
    const delta = angle - discDragRef.current.startAngle;
    if (!playing) {
      setDiscRotation(discDragRef.current.startRotation + delta);
    } else {
      // 播放中拖拽增加额外旋转量
      discDragRef.current.startRotation += delta;
      autoAngleRef.current += delta;
    }
  }, [playing]);

  const onDiscPointerUp = useCallback(() => {
    discDragRef.current.active = false;
  }, []);

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} src={audioSrc} preload="auto" loop />

      {/* 音符特效 */}
      <MusicNoteParticles active={playing} />

      <div
        className="fixed z-50 select-none"
        style={{
          left: pos.x,
          top: pos.y,
        }}
      >
        {/* 唱片机本体容器 */}
        <div
          className="relative w-[120px] h-[120px]"
          style={{ touchAction: 'none' }}
          role="button"
          tabIndex={0}
          aria-label={playing ? '暂停音乐' : '播放音乐'}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              togglePlay();
            }
          }}
          onMouseEnter={() => setShowLabel(true)}
          onMouseLeave={() => setShowLabel(false)}
          onClick={(e) => {
            if (!dragging && !discDragRef.current.active) {
              e.stopPropagation();
              togglePlay();
            }
          }}
          onPointerDown={onContainerPointerDown}
          onPointerMove={onContainerPointerMove}
          onPointerUp={onContainerPointerUp}
          onPointerCancel={onContainerPointerUp}
          onPointerLeave={onContainerPointerUp}
        >
          {/* ====== 底座阴影 ====== */}
          <div
            className="absolute inset-x-4 bottom-0 h-3 rounded-[50%]"
            style={{
              background: 'radial-gradient(ellipse, hsl(0 0% 50% / 0.25), transparent 70%)',
            }}
          />

          {/* ====== 唱片机底座 ====== */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 120 120">
            {/* 外圈底座 */}
            <circle cx="60" cy="60" r="58" fill="#E8DDD0" stroke="#D4C5B8" strokeWidth="1.5" />
          </svg>

          {/* ====== 蓝色黑胶唱片 ====== */}
          <div
            className="disc-inner absolute w-[92px] h-[92px] rounded-full"
            style={{
              left: '14px',
              top: '12px',
              transform: `rotate(${discRotation}deg)`,
              cursor: 'grab',
              transition: !discDragRef.current.active ? '' : 'none',
            }}
            onPointerDown={onDiscPointerDown}
            onPointerMove={onDiscPointerMove}
            onPointerUp={onDiscPointerUp}
            onPointerCancel={onDiscPointerUp}
          >
            {/* 唱片主体 - 蓝色带沟槽纹理 */}
            <div
              className="absolute inset-0 rounded-full overflow-hidden"
              style={{
                background:
                  'conic-gradient(from 0deg, #6BA3B8 0deg, #7DB8CC 15deg, #5D94A9 30deg, #82BDD0 45deg, #6AAABF 60deg, #72B5C8 75deg, #5E98AD 90deg, #79B9CD 105deg, #66A5BC 120deg, #7BBBD0 135deg, #62A0B5 150deg, #74B6CA 165deg, #5D96AB 180deg, #78BACD 195deg, #68A8BE 210deg, #80C0D2 225deg, #63A3B8 240deg, #76B9CB 255deg, #5E99AE 270deg, #7BBBD0 285deg, #65A5BA 300deg, #73B4C7 315deg, #5F9CB1 330deg, #7BBDCD 345deg, #6BA3B8 360deg)',
                boxShadow: 'inset 0 0 0 2px hsl(200 25% 35%), 0 2px 8px hsl(200 20% 40% / 0.35)',
              }}
            >
              {/* 同心圆沟槽纹理 */}
              {[...Array(18)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full border border-white/10 pointer-events-none"
                  style={{
                    inset: `${12 + i * 4}%`,
                    boxShadow: 'inset 0 0 0 0.5px hsl(190 15% 85% / 0.08)',
                  }}
                />
              ))}

              {/* 高光 */}
              <div
                className="absolute w-[55%] h-[55%] rounded-full pointer-events-none"
                style={{
                  left: '-5%',
                  top: '-5%',
                  background:
                    'radial-gradient(circle at 40% 35%, rgba(255,255,255,0.22) 0%, transparent 65%)',
                }}
              />
            </div>

            {/* 橙红色中心标签 */}
            <div
              className="absolute inset-0 flex items-center justify-center"
            >
              <div
                className="w-[34px] h-[34px] rounded-full flex items-center justify-center"
                style={{
                  background:
                    'linear-gradient(145deg, #E07A5F, #C86A52)',
                  boxShadow:
                    '0 1.5px 4px hsl(10 35% 35% / 0.35), inset 0 1px 1.5px rgba(255,255,255,0.25)',
                }}
              >
                {/* 标签中心孔 */}
                <div
                  className="w-[5px] h-[5px] rounded-full"
                  style={{
                    background: '#E8DDD0',
                    boxShadow: 'inset 0 0.5px 1.5px hsl(0 0% 0% / 0.15)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* ====== 唱臂 ====== */}
          <div
            className="absolute pointer-events-none"
            style={{
              right: '2px',
              top: '4px',
              width: '42px',
              height: '88px',
              transformOrigin: '38px 16px',
              transition: 'transform 0.6s cubic-bezier(.34,1.56,.64,1)',
              transform: playing ? 'rotate(-24deg)' : 'rotate(-54deg)',
            }}
          >
            <svg viewBox="0 0 42 88" className="w-full h-full" fill="none">
              {/* 唱臂底座 - 橙色圆盘 */}
              <circle cx="36" cy="18" r="11" fill="#E07A5F" stroke="#C86A52" strokeWidth="0.8" />
              {/* 底座内圈 */}
              <circle cx="36" cy="18" r="5" fill="#D4694E" opacity="0.6" />
              {/* 底座支点 */}
              <circle cx="36" cy="18" r="3" fill="#4A3728" />

              {/* 唱臂杆 - 白色/米白色 */}
              <path
                d="M34 17 Q26 32 20 60 Q18 70 23 80 L27 81 Q22 71 24 61 Q30 33 37 19 Z"
                fill="#F5EEE4"
                stroke="#D4C5B8"
                strokeWidth="0.6"
              />

              {/* 唱头 - 橙色小方块 */}
              <rect
                x="21"
                y="77"
                width="9"
                height="6"
                rx="1.5"
                fill="#E07A5F"
                stroke="#C86A52"
                strokeWidth="0.5"
                transform="rotate(15 25.5 80)"
              />
              {/* 唱头上的两个小白点 */}
              <circle cx="24" cy="79.5" r="1" fill="#F5EEE4" opacity="0.8" />
              <circle cx="27.5" cy="79" r="1" fill="#F5EEE4" opacity="0.8" />

              {/* 针头 */}
              <line
                x1="29.5"
                y1="83"
                x2="31"
                y2="87"
                stroke="#999"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* 播放状态光晕 */}
          {playing && (
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                animation: 'float-glow 2s ease-in-out infinite alternate',
              }}
            >
              <div
                className="w-full h-full rounded-full"
                style={{
                  boxShadow: '0 0 20px 4px hsl(var(--primary) / 0.2), 0 0 40px 8px hsl(200 40% 55% / 0.12)',
                }}
              />
            </div>
          )}
        </div>

        {/* 歌曲名浮动标签 */}
        <div
          className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-250 pointer-events-none"
          style={{
            opacity: showLabel ? 1 : 0,
            transform: showLabel ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(4px)',
          }}
        >
          <span
            className="inline-block px-3 py-1.5 text-xs rounded-lg shadow-md"
            style={{
              background: 'hsl(var(--card))',
              color: 'hsl(var(--foreground))',
              fontFamily: "'LXGW WenKai', 'PingFang SC', sans-serif",
              border: '1px solid hsl(var(--border))',
              letterSpacing: '0.02em',
            }}
          >
            {labelLine1} {labelLine2} {playing ? '♪' : ''}
          </span>
        </div>
      </div>

      {/* 动画注入 */}
      <style>{`
        @keyframes float-glow {
          0%   { opacity: 0.5; transform: scale(0.97); }
          100% { opacity: 1;   transform: scale(1.02); }
        }
        @keyframes note-float {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg) scale(0.6);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          100% {
            transform: translateY(-60px) translateX(${Math.random() > 0.5 ? '' : '-'}15px) rotate(${-20 + Math.random() * 40}deg) scale(1.1);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
