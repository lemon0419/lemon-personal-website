import { useState, useMemo } from 'react';
import { useI18n } from '@/contexts/I18nContext';
import { t } from '@/lib/i18n';

interface SplashPageProps {
  onEnter: () => void;
}

// ====== 手绘风人物（全身长卷发、戴眼镜的女孩 - 正常身材比例） ======
function SketchCharacter() {
  return (
    <svg viewBox="0 0 200 420" className="w-28 h-52 md:w-36 md:h-72" xmlns="http://www.w3.org/2000/svg">
      {/* ====== 长发（整体轮廓）===== */}
      {/* 头顶蓬松区 */}
      <path d="M60 18 Q75 4 100 6 Q125 8 138 20 Q146 32 144 46"
            fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M68 14 Q85 2 108 5 Q126 10 136 20"
            fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />

      {/* 左侧长发 - 从头顶垂到小腿 */}
      <path d="M58 28 Q42 48 34 82 Q26 125 30 170 Q33 210 28 250 Q24 285 30 315 Q34 340 40 358"
            fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
      {/* 左侧发丝层次 */}
      <path d="M44 70 Q36 100 34 140 Q33 178 37 210"
            fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.4" />
      <path d="M38 110 Q32 148 33 186 Q34 220 38 248"
            fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.25" />
      {/* 左侧发尾卷曲 */}
      <path d="M36 348 Q32 360 38 372 Q44 382 54 386"
            fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M43 355 Q39 368 45 378 Q52 385 62 387"
            fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />

      {/* 右侧长发 - 从头顶垂到小腿 */}
      <path d="M144 28 Q162 50 170 88 Q177 132 172 178 Q167 222 173 264 Q178 300 172 336 Q166 364 158 384"
            fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
      {/* 右侧发丝层次 */}
      <path d="M158 72 Q168 104 170 146 Q171 188 166 224"
            fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.4" />
      <path d="M165 112 Q172 152 171 194 Q170 232 164 268"
            fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.25" />
      {/* 右侧发尾卷曲 */}
      <path d="M163 374 Q168 388 161 400 Q153 410 142 414"
            fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M155 380 Q161 394 154 404 Q146 412 135 415"
            fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />

      {/* ====== 脸（鹅蛋脸，适中大小）===== */}
      <ellipse cx="101" cy="48" rx="26" ry="30" fill="none" stroke="currentColor" strokeWidth="2.1" />

      {/* ====== 刘海（碎发）===== */}
      <path d="M76 28 Q83 38 89 31 Q95 24 102 33 Q109 24 116 32 Q122 25 128 33 Q133 40 127 29"
            fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M81 34 Q86 41 91 34" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.35" />
      <path d="M111 34 Q117 41 122 34" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.35" />

      {/* ====== 眼镜（圆框）===== */}
      <circle cx="87" cy="45" r="9.5" fill="none" stroke="currentColor" strokeWidth="1.9" />
      <circle cx="115" cy="45" r="9.5" fill="none" stroke="currentColor" strokeWidth="1.9" />
      <line x1="96.5" y1="45" x2="105.5" y2="45" stroke="currentColor" strokeWidth="1.9" />
      <line x1="77.5" y1="43" x2="70" y2="40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="124.5" y1="43" x2="132" y2="40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

      {/* 眼睛 */}
      <circle cx="87" cy="46" r="2.2" fill="currentColor" opacity="0.72" />
      <circle cx="115" cy="46" r="2.2" fill="currentColor" opacity="0.72" />
      <path d="M83.5 44 Q85 43 86.5 44" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.45" />
      <path d="M113.5 44 Q115 43 116.5 44" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.45" />

      {/* 腮红 */}
      <ellipse cx="77" cy="55" rx="5" ry="3.5" fill="currentColor" opacity="0.06" />
      <ellipse cx="125" cy="55" rx="5" ry="3.5" fill="currentColor" opacity="0.06" />

      {/* 鼻子 + 嘴巴 */}
      <path d="M101 53 L99 59 L103 59 Z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" opacity="0.45" />
      <path d="M93 65 Q101 71 109 65" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M93 66 Q96 68 99 67" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.35" />
      <path d="M109 66 Q106 68 103 67" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.35" />

      {/* ====== 脖子（细长）===== */}
      <line x1="92" y1="77" x2="90" y2="93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="110" y1="77" x2="112" y2="93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

      {/* ====== 上身 / 连衣裙上半部分 ===== */}
      <path d="M70 94 Q60 97 52 118 L48 175 Q46 184 56 187 L146 187 Q156 184 154 175 L150 118 Q142 97 132 94 Z"
            fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinejoin="round" />
      {/* 领口 */}
      <path d="M84 93 Q94 103 101 100 Q108 103 118 93"
            fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

      {/* ====== 手臂（比例加长）===== */}
      {/* 左手臂 - 自然下垂 */}
      <path d="M52 130 Q36 155 28 190 Q23 218 26 245"
            fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      {/* 左手 */}
      <path d="M24 248 Q21 256 27 260 Q34 262 39 256"
            fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />

      {/* 右手臂 - 微弯抬起 */}
      <path d="M150 130 Q166 148 176 168 Q183 182 186 192"
            fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      {/* 右手 */}
      <ellipse cx="188" cy="196" rx="6" ry="8" fill="none" stroke="currentColor" strokeWidth="1.9"
               transform="rotate(15 188 196)" />

      {/* ====== 裙摆（A字裙，过膝）===== */}
      <path d="M56 187 Q48 230 44 270 Q42 300 46 320"
            fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
      <path d="M146 187 Q154 230 158 270 Q162 300 158 320"
            fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
      {/* 裙底弧线暗示 */}
      <path d="M46 320 Q70 328 101 326 Q132 328 158 320"
            fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />

      {/* ====== 腿（修长）===== */}
      {/* 左腿 */}
      <path d="M64 322 Q60 355 58 385"
            fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      {/* 右腿 */}
      <path d="M138 322 Q142 355 144 385"
            fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />

      {/* ====== 鞋子 ===== */}
      {/* 左鞋 */}
      <path d="M51 385 Q48 396 58 398 L72 395 Q77 390 70 388 L54 386"
            fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinejoin="round" strokeLinecap="round" />
      {/* 右鞋 */}
      <path d="M130 385 Q128 396 138 398 L152 395 Q157 390 150 388 L134 386"
            fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

// ====== 手绘风格大标题文字（不规则轮廓） ======
function SketchTitle({ children }: { children: string }) {
  // 为每个字符生成略微不同的手绘路径偏移
  const letters = useMemo(() =>
    children.split('').map((char, i) => ({
      char,
      id: i,
      offsetX: (Math.sin(i * 1.7) * 2),
      offsetY: (Math.cos(i * 2.3) * 1.5),
      rotate: (i % 2 === 0 ? 1 : -1) * (0.5 + Math.random() * 1.5),
    })),
    [children],
  );

  return (
    <div className="relative inline-flex items-center justify-center select-none">
      {letters.map(({ char, id, offsetX, offsetY, rotate }) => (
        <span
          key={id}
          className="relative mx-[1px] md:mx-[2px]"
          style={{
            transform: `translate(${offsetX}px, ${offsetY}px) rotate(${rotate}deg)`,
            display: 'inline-block',
          }}
        >
          <span
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold relative"
            style={{
              fontFamily: "'Courier New', 'LXGW WenKai', monospace",
              WebkitTextStroke: '2px currentColor',
              WebkitTextFillColor: 'transparent',
              paintOrder: 'stroke fill',
              filter: 'url(#sketch-texture)',
              letterSpacing: '0.02em',
              lineHeight: 1,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        </span>
      ))}
      {/* SVG 滤镜：给文字添加手绘纹理效果 */}
      <svg width="0" height="0" aria-hidden="true">
        <defs>
          <filter id="sketch-texture">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.2" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

// ====== 浮动装饰元素 ======
function FloatingDecorations() {
  const items = useMemo(() => [
    { type: 'star', left: '12%', top: '18%', size: 14, delay: 0 },
    { type: 'star', left: '78%', top: '15%', size: 11, delay: 0.8 },
    { type: 'star', left: '25%', top: '68%', size: 10, delay: 1.5 },
    { type: 'circle', left: '18%', top: '32%', size: 13, delay: 0.4 },
    { type: 'circle', left: '82%', top: '62%', size: 11, delay: 1.2 },
    { type: 'dot-line', left: '8%', top: '50%', delay: 0.6 },
    { type: 'dot-line', left: '88%', top: '42%', delay: 1.8 },
    { type: 'plane', left: '68%', top: '12%', size: 18, delay: 0.3 },
    { type: 'coffee', left: '75%', top: '28%', size: 14, delay: 1.0 },
    { type: 'square-dot', left: '68%', top: '22%', size: 16, delay: 0.5 },
    { type: 'plus', left: '15%', top: '75%', size: 10, delay: 1.4 },
    { type: 'sparkle', left: '85%', top: '75%', size: 12, delay: 0.9 },
  ], []);

  const renderIcon = (item: typeof items[0]) => {
    switch (item.type) {
      case 'star':
        return (
          <span className="font-mono font-light leading-none" style={{ fontSize: item.size }}>
            ✦
          </span>
        );
      case 'circle':
        return (
          <svg width={item.size} height={item.size} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        );
      case 'dot-line':
        return (
          <div className="flex gap-1.5 items-center">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-full bg-current" style={{
                width: 3 + i,
                height: 3 + i,
                opacity: 0.4 + i * 0.15,
              }} />
            ))}
          </div>
        );
      case 'plane':
        return (
          <svg width={item.size} height={item.size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 17l5-5 8 2 6-11-5 5-8-2z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
        );
      case 'coffee':
        return (
          <svg width={item.size} height={item.size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 10h12v6a4 4 0 01-4 4H8a4 4 0 01-4-4v-6z" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <path d="M16 12h1a3 3 0 010 6h-1" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <line x1="7" y1="21" x2="13" y2="21" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        );
      case 'square-dot':
        return (
          <svg width={item.size} height={item.size} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <rect x="7" y="7" width="6" height="6" rx="1" fill="none" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        );
      case 'plus':
        return (
          <svg width={item.size} height={item.size} viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
            <line x1="7" y1="2" x2="7" y2="12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <line x1="2" y1="7" x2="12" y2="7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        );
      case 'sparkle':
        return (
          <span style={{ fontSize: item.size }}>✧</span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {items.map((item, i) => (
        <div
          key={i}
          className="absolute text-muted-foreground/50"
          style={{
            left: item.left,
            top: item.top,
            animation: `deco-float ${3 + Math.random() * 2}s ease-in-out ${item.delay}s infinite alternate`,
          }}
        >
          {renderIcon(item)}
        </div>
      ))}
    </div>
  );
}

// ====== 透视木地板 ======
function PerspectiveFloor() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[45%] pointer-events-none overflow-hidden opacity-[0.08]">
      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
        {/* 透视消失点：顶部中央 */}
        {/* 木地板线条 */}
        {[...Array(20)].map((_, i) => {
          const offset = (i - 10) * 18;
          return (
            <line key={`left-${i}`}
              x1={200 + offset * 0.05}
              y1="0"
              x2={offset + 200}
              y2="200"
              stroke="currentColor"
              strokeWidth={(i % 3 === 0 ? 1.2 : 0.7)}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
        {/* 横向地板缝隙 */}
        {[...Array(6)].map((_, i) => {
          const y = 120 + i * 16;
          const spread = i * 30 + 20;
          return (
            <line key={`h-${i}`}
              x1={200 - spread}
              y1={y}
              x2={200 + spread}
              y2={y}
              stroke="currentColor"
              strokeWidth={0.8}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </svg>
    </div>
  );
}

// ====== 天花板线条 ======
function CeilingLines() {
  return (
    <div className="absolute top-0 left-0 right-0 h-[20%] pointer-events-none overflow-hidden opacity-[0.06]">
      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 80" xmlns="http://www.w3.org/2000/svg">
        {/* 天花板透视线 */}
        {[...Array(8)].map((_, i) => {
          const offset = (i - 4) * 40;
          return (
            <line key={i}
              x1={200 + offset * 0.03}
              y1="80"
              x2={200 + offset}
              y2="0"
              stroke="currentColor"
              strokeWidth="0.6"
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
        {/* 灯具 */}
        <rect x="165" y="8" width="70" height="4" rx="1" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <line x1="180" y1="12" x2="175" y2="22" stroke="currentColor" strokeWidth="0.5" />
        <line x1="220" y1="12" x2="225" y2="22" stroke="currentColor" strokeWidth="0.5" />
      </svg>
    </div>
  );
}

export default function SplashPage({ onEnter }: SplashPageProps) {
  const { locale } = useI18n();
  const [isAnimating, setIsAnimating] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      onEnter();
    }, 1400);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden cursor-pointer transition-colors duration-700 ${
        isAnimating ? 'bg-transparent' : ''
      }`}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* 透视线背景 */}
      <PerspectiveFloor />
      <CeilingLines />

      {/* 浮动装饰物 */}
      <FloatingDecorations />

      {/* 主内容区 */}
      <div
        className={`relative z-10 flex flex-col items-center gap-4 md:gap-6 transition-all duration-700 ease-out ${
          isAnimating
            ? 'opacity-0 scale-95 translate-y-[-20px]'
            : 'opacity-100'
        }`}
      >
        {/* 大标题 */}
        <div className="text-foreground mb-1 md:mb-2 animate-sketch-enter">
          <SketchTitle>ZQN</SketchTitle>
        </div>

        {/* 副标题 */}
        <p
          className="text-sm md:text-base text-muted-foreground tracking-wider font-mono"
          style={{
            fontFamily: "'Courier New', monospace",
            opacity: hovered ? 1 : 0.75,
            transition: 'opacity 0.3s ease',
          }}
        >
          &lt; {t(locale, 'splashSubtitle')} /&gt;
        </p>

        {/* 人物插图 */}
        <div className="mt-2 md:mt-4 animate-character-float">
          <SketchCharacter />
        </div>

        {/* 进入提示 */}
        <div
          className="mt-3 md:mt-5 text-xs text-muted-foreground/60 font-mono tracking-wider animate-hint-bounce"
          style={{ fontFamily: "'Courier New', monospace" }}
        >
          [ {t(locale, 'clickToEnter')} ]
        </div>
      </div>

      {/* 退出动画遮罩层 - 从中心扩散变白再透明 */}
      {isAnimating && (
        <div
          className="absolute inset-0 z-20 bg-background"
          style={{
            animation: 'splash-exit 1.4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
          }}
        />
      )}

      {/* 动画注入 */}
      <style>{`
        @keyframes deco-float {
          0%   { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-6px) rotate(3deg); }
        }
        @keyframes sketch-enter {
          0%   { opacity: 0; transform: translateY(20px); filter: blur(4px); }
          60%  { opacity: 1; transform: translateY(-3px); filter: blur(0); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .animate-sketch-enter {
          animation: sketch-enter 0.8s ease-out both;
          animation-delay: 0.2s;
        }
        @keyframes character-float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        .animate-character-float {
          animation: character-float 3.5s ease-in-out infinite;
        }
        @keyframes hint-bounce {
          0%, 100% { opacity: 0.5; transform: translateY(0); }
          50%      { opacity: 1;   transform: translateY(-3px); }
        }
        .animate-hint-bounce {
          animation: hint-bounce 2.5s ease-in-out infinite;
          animation-delay: 1s;
        }
        @keyframes splash-exit {
          0%   { clip-path: circle(0% at 50% 50%); }
          30%  { clip-path: circle(70% at 50% 50%); }
          100% { clip-path: circle(140% at 50% 50%); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
