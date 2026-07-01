import { useState, useRef, useCallback } from 'react';

interface DiscPlayerProps {
  /** 音频文件路径，放在 public 目录下 */
  audioSrc: string;
  /** 唱片标签文案，两行 */
  labelLine1?: string;
  labelLine2?: string;
}

export default function DiscPlayer({
  audioSrc,
  labelLine1 = 'You Will',
  labelLine2 = 'Be Found',
}: DiscPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch((e) => {
        console.warn('音频播放失败:', e);
      });
      setPlaying(true);
    }
  }, [playing]);

  const handleEnded = useCallback(() => {
    // 循环播放
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
  }, []);

  return (
    <div className="relative inline-flex flex-col items-center select-none">
      {/* 隐藏的 audio 元素 */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} src={audioSrc} preload="auto" onEnded={handleEnded} loop />

      {/* 唱片机底座 / 背景盘 */}
      <div
        className="relative w-56 h-56 rounded-full flex items-center justify-center cursor-pointer group"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, hsl(30 25% 92%), hsl(34 13% 87%))',
          boxShadow:
            '0 0 0 8px hsl(34 13% 81%), 0 4px 24px hsl(0 0% 0% / 0.08), inset 0 1px 2px hsl(0 0% 100% / 0.6)',
        }}
        onClick={togglePlay}
        role="button"
        tabIndex={0}
        aria-label={playing ? '暂停音乐' : '播放音乐'}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            togglePlay();
          }
        }}
      >
        {/* 旋转的唱片 */}
        <div
          className="w-44 h-44 rounded-full relative transition-transform"
          style={{
            animation: playing ? 'disc-spin 3s linear infinite' : 'none',
            background:
              'radial-gradient(circle at 50% 50%, hsl(0 0% 15%), hsl(0 0% 8%) 40%, hsl(0 0% 12%) 42%, hsl(0 0% 10%) 44%, hsl(0 0% 14%) 46%, hsl(0 0% 9%) 48%, hsl(0 0% 13%) 50%, hsl(0 0% 8%) 52%, hsl(0 0% 11%) 54%, hsl(0 0% 9%) 56%, hsl(0 0% 13%) 60%, hsl(0 0% 8%) 64%, hsl(0 0% 12%) 68%, hsl(0 0% 9%) 72%, hsl(0 0% 14%) 76%, hsl(0 0% 8%) 100%)',
            boxShadow: '0 0 0 1px hsl(0 0% 20% / 0.3), 0 2px 8px hsl(0 0% 0% / 0.3)',
          }}
        >
          {/* 唱片光泽 */}
          <div
            className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 35% 35%, hsl(0 0% 25% / 0.2), transparent 50%)',
            }}
          />

          {/* 中心标签 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-14 h-14 rounded-full flex flex-col items-center justify-center gap-0.5"
              style={{
                background:
                  'radial-gradient(circle at 50% 50%, hsl(15 30% 92%), hsl(15 20% 85%))',
                boxShadow: '0 1px 3px hsl(0 0% 0% / 0.2), inset 0 1px 1px hsl(0 0% 100% / 0.5)',
              }}
            >
              <span
                className="text-[7px] font-semibold leading-none"
                style={{
                  color: 'hsl(0 0% 24%)',
                  fontFamily: "'LXGW WenKai', 'PingFang SC', 'Microsoft YaHei', sans-serif",
                }}
              >
                {labelLine1}
              </span>
              <span
                className="text-[7px] leading-none"
                style={{
                  color: 'hsl(0 0% 40%)',
                  fontFamily: "'LXGW WenKai', 'PingFang SC', 'Microsoft YaHei', sans-serif",
                }}
              >
                {labelLine2}
              </span>
              {/* 中心小圆点 */}
              <div className="w-1.5 h-1.5 rounded-full mt-0.5" style={{ background: 'hsl(0 0% 70%)' }} />
            </div>
          </div>
        </div>

        {/* 播放指示点（暂停时也可见） */}
        {!playing && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-primary/80 pointer-events-none animate-bounce-soft" />
        )}
      </div>

      {/* 唱臂 */}
      <svg
        className="absolute -top-12 right-0 w-32 h-40 pointer-events-none overflow-visible"
        viewBox="0 0 120 150"
        style={{
          transform: playing ? 'rotate(18deg)' : 'rotate(0deg)',
          transformOrigin: '100% 0%',
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* 唱臂底座 */}
        <rect
          x="98"
          y="8"
          width="18"
          height="14"
          rx="2"
          fill="hsl(0 0% 50%)"
          stroke="hsl(0 0% 35%)"
          strokeWidth="0.5"
        />
        {/* 底座高光 */}
        <rect x="100" y="9" width="14" height="4" rx="1" fill="hsl(0 0% 65%)" opacity="0.6" />

        {/* 唱臂杆 */}
        <line
          x1="107"
          y1="22"
          x2="30"
          y2="100"
          stroke="hsl(0 0% 60%)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="107"
          y1="22"
          x2="30"
          y2="100"
          stroke="hsl(0 0% 80%)"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* 唱头 */}
        <ellipse
          cx="28"
          cy="102"
          rx="6"
          ry="3"
          fill="hsl(0 0% 35%)"
          stroke="hsl(0 0% 20%)"
          strokeWidth="0.5"
          transform="rotate(-20 28 102)"
        />
        {/* 唱针 */}
        <line
          x1="23"
          y1="103"
          x2="18"
          y2="108"
          stroke="hsl(0 0% 30%)"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>

      {/* 提示文字 */}
      <span
        className="mt-3 text-xs text-muted-foreground transition-opacity"
        style={{
          fontFamily: "'LXGW WenKai', 'PingFang SC', 'Microsoft YaHei', sans-serif",
          opacity: playing ? 0.6 : 0.9,
        }}
      >
        {playing ? '♪ 正在播放...' : '点击唱片播放 ♪'}
      </span>

      {/* 旋转动画注入到全局 */}
      <style>{`
        @keyframes disc-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
