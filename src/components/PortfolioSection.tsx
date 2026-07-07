import { useState, useCallback, useEffect, useRef } from 'react';
import { useI18n } from '@/contexts/I18nContext';
import { t } from '@/lib/i18n';
import { ExternalLink, ChevronLeft, ChevronRight, Eye, FileText, ArrowUpRight, Library, Timer, Clock, EyeIcon } from 'lucide-react';
import { useSpotlight } from '@/hooks/useSpotlight';

// ========== 数据 ==========

// 数独三版迭代数据
const SUDOKU_VERSIONS = [
  {
    id: 1,
    version: 'v1',
    title: '喵露谷数独',
    subtitle: '初代 · 原型',
    image: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="260" viewBox="0 0 400 260"><defs><linearGradient id="bg1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#f0ebe3"/><stop offset="100%" stop-color="#e8e0d5"/></linearGradient></defs><rect width="400" height="260" fill="url(#bg1)" rx="12"/><rect x="115" y="35" width="170" height="190" rx="14" fill="#fff" stroke="#c4b8a8" stroke-width="1.5"/><text x="200" y="22" font-size="12" fill="#8e7b6a" text-anchor="middle" font-family="sans-serif">MIAODA</text><g transform="translate(130,48)"><rect x="0" y="0" width="140" height="140" rx="8" fill="#faf8f5" stroke="#d4ccc0"/><line x1="46" y1="0" x2="46" y2="140" stroke="#c4b8a8"/><line x1="93" y1="0" x2="93" y2="140" stroke="#c4b8a8"/><line x1="0" y1="46" x2="140" y2="46" stroke="#c4b8a8"/><line x1="0" y1="93" x2="140" y2="93" stroke="#c4b8a8"/><text x="16" y="33" font-size="16" font-weight="bold" fill="#6b5c4e">5</text><text x="55" y="33" font-size="16" font-weight="bold" fill="#6b5c4e">3</text><text x="102" y="33" font-size="16" font-weight="bold" fill="#6b5c4e">7</text><text x="16" y="80" font-size="16" font-weight="bold" fill="#6b5c4e">6</text><text x="102" y="80" font-size="16" font-weight="bold" fill="#6b5c4e">2</text><text x="55" y="125" font-size="16" font-weight="bold" fill="#6b5c4e">9</text></g><text x="200" y="238" font-size="11" fill="#8e7b6a" text-anchor="middle" font-family="sans-serif">初代数独</text></svg>'),
  },
  {
    id: 2,
    version: 'v2',
    title: '治愈数独 2.0',
    subtitle: '网页版',
    image: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="260" viewBox="0 0 400 260"><defs><linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#f9f6f0"/><stop offset="100%" stop-color="#f2ece4"/></linearGradient></defs><rect width="400" height="260" fill="url(#bg2)" rx="12"/><rect x="110" y="25" width="180" height="210" rx="16" fill="#fff" stroke="#b8a096" stroke-width="1.5"/><text x="200" y="16" font-size="11" fill="#c7c86a" text-anchor="middle" font-family="sans-serif">✨ 治愈系</text><g transform="translate(120,40)"><rect x="0" y="0" width="160" height="160" rx="10" fill="#fff" stroke="#e0dcd5"/><text x="20" y="38" font-size="20" font-weight="bold" fill="#8e826c">5</text><text x="68" y="38" font-size="20" font-weight="bold" fill="#81c9b5">3</text><text x="116" y="38" font-size="20" font-weight="bold" fill="#f69582">7</text><text x="20" y="94" font-size="20" font-weight="bold" fill="#f8b17b">6</text><text x="116" y="94" font-size="20" font-weight="bold" fill="#c7c86a">2</text><text x="68" y="148" font-size="20" font-weight="bold" fill="#81c9b5">9</text></g><text x="200" y="223" font-size="11" fill="#8e7b6a" text-anchor="middle" font-family="sans-serif">500关治愈数独</text></svg>'),
    liveUrl: '/works/sudoku.html',
  },
  {
    id: 3,
    version: 'v3',
    title: '治愈数独 3.0',
    subtitle: '移动端 App',
    image: '/works/sudoku3-preview.mp4',
    poster: '/works/sudoku3-poster.jpg',
    isVideo: true,
  },
];

// 公众号推文数据 — 带日期、阅读量、描述、缩略图
const ARTICLES = [
  {
    id: 1,
    titleKey: 'article1' as const,
    url: 'https://mp.weixin.qq.com/s/a8dwIGVhyFCiai50s4p1zw',
    date: '2022.06.09',
    reads: '图文',
    desc: '武汉学院图书馆学生管理委员会2022表彰暨第六届换届大会圆满举行，新一届干部接过使命，续写华章...',
    thumb: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="160" height="120" viewBox="0 0 160 120"><rect width="160" height="120" fill="#f5f0e8" rx="8"/><rect x="55" y="20" width="50" height="65" rx="6" fill="#fff" stroke="#c4a882" stroke-width="1.5"/><rect x="62" y="28" width="36" height="3" rx="1.5" fill="#8e7355" opacity="0.4"/><rect x="62" y="35" width="28" height="3" rx="1.5" fill="#8e7355" opacity="0.3"/><circle cx="80" cy="55" r="12" fill="none" stroke="#c4a882" stroke-width="1.5"/><path d="M75 55 L79 59 L86 50" stroke="#8e7355" stroke-width="1.5" fill="none"/><rect x="60" y="72" width="40" height="3" rx="1.5" fill="#8e7355" opacity="0.25"/><rect x="65" y="78" width="30" height="3" rx="1.5" fill="#8e7355" opacity="0.2"/></svg>'),
  },
  {
    id: 2,
    titleKey: 'article2' as const,
    url: 'https://mp.weixin.qq.com/s/1XQAlb4H9vWqE4cEW-Mk_g',
    date: '2022.04.27',
    reads: '图文',
    desc: '武汉学院图书馆第十期倾听读书会，四位同学分别分享《红楼梦》《日知录》《三字经》《老子》四部国学经典...',
    thumb: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="160" height="120" viewBox="0 0 160 120"><rect width="160" height="120" fill="#eef0f5" rx="8"/><rect x="35" y="30" width="30" height="55" rx="3" fill="#fff" stroke="#8a9aa8" stroke-width="1.2"/><rect x="42" y="38" width="16" height="2" rx="1" fill="#8a9aa8" opacity="0.35"/><rect x="42" y="43" width="12" height="2" rx="1" fill="#8a9aa8" opacity="0.25"/><rect x="42" y="48" width="14" height="2" rx="1" fill="#8a9aa8" opacity="0.25"/><rect x="70" y="25" width="30" height="60" rx="3" fill="#fff" stroke="#8a9aa8" stroke-width="1.2"/><rect x="77" y="33" width="16" height="2" rx="1" fill="#8a9aa8" opacity="0.35"/><rect x="77" y="38" width="12" height="2" rx="1" fill="#8a9aa8" opacity="0.25"/><rect x="77" y="43" width="14" height="2" rx="1" fill="#8a9aa8" opacity="0.25"/><rect x="77" y="48" width="10" height="2" rx="1" fill="#8a9aa8" opacity="0.2"/><rect x="105" y="32" width="30" height="53" rx="3" fill="#fff" stroke="#8a9aa8" stroke-width="1.2"/><rect x="112" y="40" width="16" height="2" rx="1" fill="#8a9aa8" opacity="0.35"/><rect x="112" y="45" width="12" height="2" rx="1" fill="#8a9aa8" opacity="0.25"/><path d="M55 95 Q80 88 105 95" stroke="#c4b8a8" stroke-width="1" fill="none" opacity="0.3"/></svg>'),
  },
  {
    id: 3,
    titleKey: 'article3' as const,
    url: 'https://mp.weixin.qq.com/s/6BTxkiyG5LBfbbF4j1d7jg',
    date: '2022.11.21',
    reads: '图文',
    desc: '图书馆第十一期倾听读书会，6位同学分享《稀缺》《心安即是归处》《房思琪的初恋乐园》《额尔古纳河右岸》等书籍...',
    thumb: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="160" height="120" viewBox="0 0 160 120"><rect width="160" height="120" fill="#f5eef0" rx="8"/><rect x="45" y="30" width="70" height="55" rx="4" fill="#fff" stroke="#c4a0a8" stroke-width="1.5"/><path d="M80 40 C76 40 73 43 73 46 C73 49 76 52 80 52 C84 52 87 49 87 46 C87 43 84 40 80 40 Z" fill="#e8b8c0" opacity="0.6"/><path d="M73 46 C70 46 67 48 67 51 C67 54 70 56 73 56 L87 56 C90 56 93 54 93 51 C93 48 90 46 87 46" fill="#e8b8c0" opacity="0.4"/><rect x="55" y="66" width="50" height="3" rx="1.5" fill="#c4a0a8" opacity="0.3"/><rect x="58" y="72" width="44" height="3" rx="1.5" fill="#c4a0a8" opacity="0.25"/><rect x="62" y="78" width="36" height="3" rx="1.5" fill="#c4a0a8" opacity="0.2"/></svg>'),
  },
  {
    id: 4,
    titleKey: 'article4' as const,
    url: 'https://mp.weixin.qq.com/s/rFKE2955F1gj8SGO16ROsQ',
    date: '2021.12.01',
    reads: '图文',
    desc: '建党一百周年爱国主义教育观影活动第四场《八佰》，讲述淞沪会战末期"八百壮士"坚守四行仓库的故事...',
    thumb: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="160" height="120" viewBox="0 0 160 120"><rect width="160" height="120" fill="#f0e8e8" rx="8"/><rect x="40" y="25" width="80" height="55" rx="4" fill="#fff" stroke="#b08a8a" stroke-width="1.5"/><rect x="48" y="33" width="64" height="39" rx="2" fill="#3a2a2a"/><circle cx="80" cy="52" r="14" fill="none" stroke="#d4a8a8" stroke-width="1.5" opacity="0.5"/><circle cx="80" cy="52" r="8" fill="none" stroke="#d4a8a8" stroke-width="1" opacity="0.4"/><rect x="55" y="85" width="50" height="3" rx="1.5" fill="#b08a8a" opacity="0.3"/><rect x="60" y="91" width="40" height="3" rx="1.5" fill="#b08a8a" opacity="0.25"/></svg>'),
  },
  {
    id: 5,
    titleKey: 'article5' as const,
    url: 'https://mp.weixin.qq.com/s/UZFAJFk3aFJPr99tiJSyZw',
    date: '2023.03.30',
    reads: '图文',
    desc: '武汉学院第十三届读书月启动仪式暨迎校庆共读活动，师生共读《少年中国说》，庆祝建校20周年...',
    thumb: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="160" height="120" viewBox="0 0 160 120"><rect width="160" height="120" fill="#e8f0f5" rx="8"/><rect x="50" y="28" width="60" height="58" rx="4" fill="#fff" stroke="#8aa8c0" stroke-width="1.5"/><path d="M80 38 L80 76" stroke="#8aa8c0" stroke-width="1" opacity="0.3"/><path d="M58 45 Q65 42 72 45 L72 52 Q65 49 58 52 Z" fill="#8aa8c0" opacity="0.2"/><path d="M102 45 Q95 42 88 45 L88 52 Q95 49 102 52 Z" fill="#8aa8c0" opacity="0.2"/><rect x="62" y="60" width="36" height="2.5" rx="1" fill="#8aa8c0" opacity="0.3"/><rect x="65" y="66" width="30" height="2.5" rx="1" fill="#8aa8c0" opacity="0.25"/><rect x="68" y="72" width="24" height="2.5" rx="1" fill="#8aa8c0" opacity="0.2"/><circle cx="80" cy="20" r="6" fill="none" stroke="#8aa8c0" stroke-width="1.5" opacity="0.4"/></svg>'),
  },
  {
    id: 6,
    titleKey: 'article6' as const,
    url: 'https://mp.weixin.qq.com/s/TGOMee_4d9YN_wwR2aUX0w',
    date: '2022.10.07',
    reads: '图文',
    desc: '"图管会"第六届全体大会，新成员授牌仪式，馆长致辞，副主席宣读成员名单及行为规范...',
    thumb: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="160" height="120" viewBox="0 0 160 120"><rect width="160" height="120" fill="#f5f0e8" rx="8"/><circle cx="55" cy="45" r="8" fill="none" stroke="#c4a882" stroke-width="1.5"/><path d="M47 62 Q47 55 55 55 Q63 55 63 62" fill="none" stroke="#c4a882" stroke-width="1.5"/><circle cx="80" cy="45" r="8" fill="none" stroke="#c4a882" stroke-width="1.5"/><path d="M72 62 Q72 55 80 55 Q88 55 88 62" fill="none" stroke="#c4a882" stroke-width="1.5"/><circle cx="105" cy="45" r="8" fill="none" stroke="#c4a882" stroke-width="1.5"/><path d="M97 62 Q97 55 105 55 Q113 55 113 62" fill="none" stroke="#c4a882" stroke-width="1.5"/><rect x="40" y="72" width="80" height="3" rx="1.5" fill="#c4a882" opacity="0.25"/><rect x="50" y="78" width="60" height="3" rx="1.5" fill="#c4a882" opacity="0.2"/><rect x="60" y="84" width="40" height="3" rx="1.5" fill="#c4a882" opacity="0.15"/></svg>'),
  },
];

// 平面设计作品数据
const DESIGN_WORKS = [
  {
    id: 1,
    titleKey: 'poster1' as const,
    image: '/images/portfolio/poster-recruit-1.jpg',
    category: 'poster',
  },
  {
    id: 2,
    titleKey: 'poster2' as const,
    image: '/images/portfolio/poster-recruit-2.jpg',
    category: 'poster',
  },
  {
    id: 3,
    titleKey: 'template1' as const,
    image: '/images/portfolio/template-movie.jpg',
    category: 'template',
  },
  {
    id: 4,
    titleKey: 'template2' as const,
    image: '/images/portfolio/template-book-1.jpg',
    category: 'template',
  },
  {
    id: 5,
    titleKey: 'template3' as const,
    image: '/images/portfolio/template-book-2.jpg',
    category: 'template',
  },
  {
    id: 6,
    titleKey: 'template4' as const,
    image: '/images/portfolio/template-quote.jpg',
    category: 'template',
  },
];

// ========== 子组件 ==========

/* 数独轮播卡片 — 等大布局，保留内部版本切换 */
function SudokuCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const spotlightRef = useSpotlight<HTMLDivElement>();
  const total = SUDOKU_VERSIONS.length;

  const changeSlide = useCallback((newIdx: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(newIdx);
    setTimeout(() => setIsTransitioning(false), 400);
  }, [isTransitioning]);

  useEffect(() => {
    if (videoRef.current) {
      const item = SUDOKU_VERSIONS[currentIndex];
      if (item.isVideo && currentIndex === 2) {
        videoRef.current.play().catch(() => {});
      } else if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [currentIndex]);

  const currentItem = SUDOKU_VERSIONS[currentIndex];

  return (
    <div
      ref={spotlightRef}
      className="spotlight-card relative bg-card border border-border/60 rounded-2xl overflow-hidden diffusion-shadow
                 hover:border-primary/20 transition-all duration-400 flex flex-col h-full"
    >
      {/* 媒体区域 — 统一比例 */}
      <div className="relative h-[180px] overflow-hidden bg-muted/30 flex-shrink-0">
        {currentItem.isVideo ? (
          <video
            ref={videoRef}
            src={currentItem.image}
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster={currentItem.poster}
          />
        ) : (
          <img
            src={currentItem.image}
            alt={currentItem.title}
            className="w-full h-full object-contain p-2"
          />
        )}

        {/* 版本标签 */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-primary/90 text-primary-foreground text-[10px] font-bold z-10">
          {currentItem.version.toUpperCase()}
        </div>

        {/* 切换箭头 — 图片区域 */}
        <button
          onClick={() => changeSlide((currentIndex - 1 + total) % total)}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 dark:bg-black/40 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white dark:hover:bg-black/60 transition-colors z-10"
          aria-label="上一个版本"
        >
          <ChevronLeft className="w-4 h-4 text-foreground" />
        </button>
        <button
          onClick={() => changeSlide((currentIndex + 1) % total)}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 dark:bg-black/40 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white dark:hover:bg-black/60 transition-colors z-10"
          aria-label="下一个版本"
        >
          <ChevronRight className="w-4 h-4 text-foreground" />
        </button>
      </div>

      {/* 信息区 */}
      <div className="relative z-10 p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-bold text-foreground">{currentItem.title}</h4>
          <span className="text-[10px] text-muted-foreground">{currentItem.subtitle}</span>
        </div>

        <p className="text-[11px] text-muted-foreground leading-relaxed mb-3 flex-1">
          简约可爱风格的数独小游戏，从初代原型到移动端 App 的三次迭代。
        </p>

        {/* 版本指示器 + 操作按钮 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {SUDOKU_VERSIONS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => changeSlide(idx)}
                className={`transition-all duration-300 ${
                  idx === currentIndex
                    ? 'w-5 h-2 rounded-full bg-primary'
                    : 'w-2 h-2 rounded-full bg-border hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
          {currentItem.liveUrl && (
            <a
              href={currentItem.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-medium hover:bg-primary/20 transition-colors"
            >
              <Eye className="w-3 h-3" /> 玩
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* 人物原型卡片 — 等大统一格式 */
function PrototypeCard({ locale }: { locale: 'zh' | 'en' }) {
  const spotlightRef = useSpotlight<HTMLAnchorElement>();

  return (
    <a
      ref={spotlightRef}
      href="/works/prototypes.html"
      target="_blank"
      rel="noopener noreferrer"
      className="spotlight-card group relative bg-card border border-border/60 rounded-2xl overflow-hidden
                 diffusion-shadow hover:border-primary/20 transition-all duration-400 flex flex-col h-full"
    >
      {/* 视觉区域 — 统一比例 */}
      <div className="relative h-[180px] bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950/20 dark:to-blue-950/20 flex items-center justify-center overflow-hidden flex-shrink-0">
        <svg viewBox="0 0 120 120" className="w-20 h-20 text-primary/20" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="32" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M28 108 Q28 68 60 58 Q92 68 92 108" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="54" cy="28" r="2.5" fill="currentColor" opacity="0.5" />
          <circle cx="66" cy="28" r="2.5" fill="currentColor" opacity="0.5" />
          <path d="M54 38 Q60 44 66 38" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        </svg>

        <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/70 dark:bg-black/30 backdrop-blur-sm text-[10px] font-medium text-muted-foreground">
          <Library className="w-3 h-3" />
          <span>{t(locale, 'webProject')}</span>
        </div>
      </div>

      {/* 信息区 */}
      <div className="relative z-10 p-4 flex flex-col flex-1">
        <h4 className="text-sm font-bold text-foreground leading-tight group-hover:text-primary transition-colors mb-2">
          {t(locale, 'project2')}
        </h4>
        <p className="text-[11px] text-muted-foreground leading-relaxed mb-3 flex-1">
          {t(locale, 'project2Desc')}
        </p>
        <div className="flex items-center gap-1 text-xs font-medium text-primary group-hover:text-accent transition-colors">
          <span>{t(locale, 'viewProject')}</span>
          <ArrowUpRight className="w-3 h-3" />
        </div>
      </div>
    </a>
  );
}

/* 番茄钟卡片 — 等大统一格式 */
function PomodoroCard({ locale }: { locale: 'zh' | 'en' }) {
  const spotlightRef = useSpotlight<HTMLAnchorElement>();

  return (
    <a
      ref={spotlightRef}
      href="/works/pomodoro.html"
      target="_blank"
      rel="noopener noreferrer"
      className="spotlight-card group relative bg-card border border-border/60 rounded-2xl overflow-hidden
                 diffusion-shadow hover:border-primary/20 transition-all duration-400 flex flex-col h-full"
    >
      {/* 视觉区域 — 统一比例 */}
      <div className="relative h-[180px] bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 flex items-center justify-center overflow-hidden flex-shrink-0">
        <svg viewBox="0 0 120 120" className="w-20 h-20 text-red-500/20" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="65" r="40" fill="none" stroke="currentColor" strokeWidth="3" />
          <path d="M60 25 L60 40 M45 30 L52 42 M75 30 L68 42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="60" cy="65" rx="35" ry="38" fill="currentColor" opacity="0.1" />
        </svg>

        <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/70 dark:bg-black/30 backdrop-blur-sm text-[10px] font-medium text-muted-foreground">
          <Timer className="w-3 h-3" />
          <span>{t(locale, 'webProject')}</span>
        </div>
      </div>

      {/* 信息区 */}
      <div className="relative z-10 p-4 flex flex-col flex-1">
        <h4 className="text-sm font-bold text-foreground leading-tight group-hover:text-primary transition-colors mb-2">
          {t(locale, 'project3')}
        </h4>
        <p className="text-[11px] text-muted-foreground leading-relaxed mb-3 flex-1">
          {t(locale, 'project3Desc')}
        </p>
        <div className="flex items-center gap-1 text-xs font-medium text-primary group-hover:text-accent transition-colors">
          <span>{t(locale, 'viewProject')}</span>
          <ArrowUpRight className="w-3 h-3" />
        </div>
      </div>
    </a>
  );
}

/* 公众号推文列表项 — 带缩略图 */
function ArticleListItem({ article, locale, index }: { article: typeof ARTICLES[0]; locale: 'zh' | 'en'; index: number }) {
  const spotlightRef = useSpotlight<HTMLAnchorElement>();

  return (
    <a
      ref={spotlightRef}
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="spotlight-card group flex items-center gap-4 md:gap-5 bg-card border border-border/40 rounded-2xl p-4 md:p-5
                 diffusion-shadow hover:border-primary/20 transition-all duration-400"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* 左侧文字区 */}
      <div className="flex-1 min-w-0 space-y-2">
        {/* 日期 + 阅读量 */}
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground/70">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {article.date}
          </span>
          <span className="w-px h-3 bg-border" />
          <span className="flex items-center gap-1">
            <EyeIcon className="w-3 h-3" />
            {article.reads}
          </span>
        </div>

        {/* 标题 */}
        <h5 className="text-sm font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {t(locale, article.titleKey)}
        </h5>

        {/* 摘要 */}
        <p className="text-[11px] text-muted-foreground/70 leading-relaxed line-clamp-2 hidden md:block">
          {article.desc}
        </p>

        {/* 查看原文 */}
        <div className="flex items-center gap-1 text-[10px] text-primary/70 group-hover:text-primary transition-colors pt-0.5">
          <FileText className="w-3 h-3" />
          <span>{t(locale, 'viewOriginal')}</span>
          <ArrowUpRight className="w-2.5 h-2.5" />
        </div>
      </div>

      {/* 右侧缩略图 */}
      <div className="shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-muted/30 border border-border/30">
        <img
          src={article.thumb}
          alt={t(locale, article.titleKey)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
    </a>
  );
}

/* 平面设计作品卡片 — 图片画廊风格 */
function DesignCard({ work, locale, index }: { work: typeof DESIGN_WORKS[0]; locale: 'zh' | 'en'; index: number }) {
  const spotlightRef = useSpotlight<HTMLDivElement>();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={spotlightRef}
      className="spotlight-card group relative bg-card border border-border/40 rounded-2xl overflow-hidden
                 diffusion-shadow hover:border-primary/20 transition-all duration-400"
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 图片区域 — 固定高度，overflow hidden */}
      <div className="relative h-[280px] md:h-[320px] overflow-hidden bg-muted/20">
        <img
          src={work.image}
          alt={t(locale, work.titleKey)}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />
        {/* Hover 遮罩 — 显示标题 */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent
                        flex items-end p-4 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 md:opacity-0'}`}>
          <p className="text-white text-sm font-medium drop-shadow-md">
            {t(locale, work.titleKey)}
          </p>
        </div>
      </div>

      {/* 底部标题栏 */}
      <div className="p-3 flex items-center justify-between">
        <h5 className="text-xs font-medium text-foreground truncate">
          {t(locale, work.titleKey)}
        </h5>
        <span className="text-[10px] text-muted-foreground/60 shrink-0 ml-2">
          {work.category === 'poster' ? '海报' : '模板'}
        </span>
      </div>
    </div>
  );
}

// ========== 主组件 ==========

export default function PortfolioSection() {
  const { locale } = useI18n();

  return (
    <section className="space-y-8 animate-fade-in-up">
      {/* 标题行 */}
      <div className="flex items-center gap-2">
        <ExternalLink className="w-5 h-5 text-primary" />
        <h2
          className="text-lg md:text-xl font-bold text-foreground"
          style={{ fontFamily: "'LXGW WenKai', sans-serif" }}
        >
          {t(locale, 'portfolio')}
        </h2>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed -mt-4">
        {t(locale, 'portfolioDesc')}
      </p>

      {/* ===== 个人项目 — 等大卡片，切换式展示 ===== */}
      <div className="space-y-3">
        <p className="text-xs text-muted-foreground font-medium pl-1" style={{ fontFamily: "'LXGW WenKai', sans-serif" }}>
          {t(locale, 'projectSection')}
        </p>

        {/* 3列等大卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SudokuCard />
          <PrototypeCard locale={locale} />
          <PomodoroCard locale={locale} />
        </div>
      </div>

      {/* ===== 公众号推文 — 列表式，带缩略图 ===== */}
      <div className="space-y-3">
        <p className="text-xs text-muted-foreground font-medium pl-1" style={{ fontFamily: "'LXGW WenKai', sans-serif" }}>
          {t(locale, 'articleSection')}
        </p>

        <div className="space-y-3">
          {ARTICLES.map((article, idx) => (
            <ArticleListItem
              key={article.id}
              article={article}
              locale={locale}
              index={idx}
            />
          ))}
        </div>
      </div>

      {/* ===== 平面设计 — 图片画廊网格 ===== */}
      <div className="space-y-3">
        <p className="text-xs text-muted-foreground font-medium pl-1" style={{ fontFamily: "'LXGW WenKai', sans-serif" }}>
          {t(locale, 'designSection')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DESIGN_WORKS.map((work, idx) => (
            <DesignCard
              key={work.id}
              work={work}
              locale={locale}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
