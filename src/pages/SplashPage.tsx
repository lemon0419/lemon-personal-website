import { useState } from 'react';
import { useI18n } from '@/contexts/I18nContext';
import { t } from '@/lib/i18n';

interface SplashPageProps {
  onEnter: () => void;
}

// 手绘风格小人 SVG
function SketchPerson() {
  return (
    <svg viewBox="0 0 120 160" className="w-32 h-44 md:w-40 md:h-56" xmlns="http://www.w3.org/2000/svg">
      {/* 头发 */}
      <path
        d="M35 25 Q30 10 50 5 Q70 0 85 10 Q95 20 90 35 Q88 45 80 50"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* 脸 */}
      <ellipse cx="60" cy="45" rx="22" ry="25" fill="none" stroke="currentColor" strokeWidth="2" />
      {/* 眼睛 */}
      <circle cx="52" cy="40" r="3" fill="currentColor" />
      <circle cx="68" cy="40" r="3" fill="currentColor" />
      {/* 嘴巴 - 微笑 */}
      <path d="M50 55 Q60 62 70 55" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* 身体 */}
      <path d="M45 70 Q40 110 42 130" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M75 70 Q80 110 78 130" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* 手臂 - 欢迎姿势 */}
      <path d="M42 80 Q20 70 15 60" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M78 80 Q100 70 105 60" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* 腿 */}
      <path d="M48 130 Q45 150 40 155" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M72 130 Q75 150 80 155" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* 装饰线条 */}
      <path d="M25 100 Q15 120 25 140" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      <path d="M95 100 Q105 120 95 140" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      {/* 小花装饰 */}
      <circle cx="20" cy="50" r="2" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <circle cx="100" cy="80" r="2" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

export default function SplashPage({ onEnter }: SplashPageProps) {
  const { locale } = useI18n();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      onEnter();
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      {/* 左幕布 */}
      <div
        className={`fixed top-0 left-0 w-1/2 h-full bg-primary/10 transition-transform duration-1000 ${
          isAnimating ? 'animate-curtain-left' : ''
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
      >
        <div className="absolute inset-0 flex items-center justify-end pr-4">
          <div className="w-1 h-3/4 bg-border/50 rounded-full" />
        </div>
      </div>

      {/* 右幕布 */}
      <div
        className={`fixed top-0 right-0 w-1/2 h-full bg-primary/10 transition-transform duration-1000 ${
          isAnimating ? 'animate-curtain-right' : ''
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
      >
        <div className="absolute inset-0 flex items-center justify-start pl-4">
          <div className="w-1 h-3/4 bg-border/50 rounded-full" />
        </div>
      </div>

      {/* 中间内容 */}
      <div className={`relative z-10 flex flex-col items-center gap-6 ${isAnimating ? 'opacity-0 transition-opacity duration-500' : ''}`}>
        {/* 手绘小人 */}
        <div className="animate-float text-foreground">
          <SketchPerson />
        </div>

        {/* 欢迎文案 */}
        <div className="text-center space-y-2 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <h1 className="text-xl md:text-2xl font-bold text-foreground" style={{ fontFamily: "'LXGW WenKai', sans-serif" }}>
            {t(locale, 'welcome')}
          </h1>
          <p className="text-sm text-muted-foreground animate-bounce-soft" style={{ fontFamily: "'LXGW WenKai', sans-serif" }}>
            {t(locale, 'clickToEnter')}
          </p>
        </div>

        {/* 装饰线条 */}
        <div className="flex items-center gap-3 mt-4">
          <div className="w-12 h-px bg-border" />
          <div className="w-2 h-2 rounded-full bg-accent/60" />
          <div className="w-12 h-px bg-border" />
        </div>
      </div>
    </div>
  );
}