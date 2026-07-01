import { useState, useCallback, useEffect, useRef } from 'react';
import { useI18n } from '@/contexts/I18nContext';
import { t } from '@/lib/i18n';
import { ExternalLink, ChevronLeft, ChevronRight, Eye, FileText, ArrowUpRight, Library } from 'lucide-react';

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

// 公众号推文数据（来自 PortfolioPage 真实链接）
const ARTICLES = [
  { id: 1, titleKey: 'article1' as const, url: 'https://mp.weixin.qq.com/s/XBVZgWBNEST4x3hKpdiFLg', color: 'hsl(15 55% 90%)' },
  { id: 2, titleKey: 'article2' as const, url: 'https://mp.weixin.qq.com/s/w4PFpnbhtAbt45dsdBYolA', color: 'hsl(90 25% 90%)' },
  { id: 3, titleKey: 'article3' as const, url: 'https://mp.weixin.qq.com/s/bBx8E5e5Fi1Gdn-_xwmIhA', color: 'hsl(200 30% 92%)' },
  { id: 4, titleKey: 'article4' as const, url: 'https://mp.weixin.qq.com/s/TGOMee_4d9YN_wwR2aUX0w', color: 'hsl(45 40% 90%)' },
  { id: 5, titleKey: 'article5' as const, url: 'https://mp.weixin.qq.com/s/6BTxkiyG5LBfbbF4j1d7jg', color: 'hsl(340 25% 92%)' },
  { id: 6, titleKey: 'article6' as const, url: 'https://mp.weixin.qq.com/s/UZFAJFk3aFJPr99tiJSyZw', color: 'hsl(160 20% 92%)' },
  { id: 7, titleKey: 'article7' as const, url: 'https://mp.weixin.qq.com/s/rFKE2955F1gj8SGO16ROsQ', color: 'hsl(270 20% 92%)' },
];

// ========== 子组件 ==========

/* 迷你数独轮播卡 */
function MiniSudokuCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
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
    <div className="relative h-full min-h-[220px]">
      <div className="relative w-full h-full bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 hover:shadow-md transition-all duration-300">
        {/* 媒体区域 */}
        <div className="relative h-[150px] overflow-hidden bg-muted/30">
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
              className="w-full h-full object-contain p-1"
            />
          )}

          {/* 版本标签 */}
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-primary/90 text-primary-foreground text-[10px] font-bold">
            {currentItem.version.toUpperCase()}
          </div>

          {/* 游玩按钮 */}
          {currentItem.liveUrl && (
            <a
              href={currentItem.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-2 right-2 px-2.5 py-1 rounded-full bg-white/90 text-[11px] font-medium shadow-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Eye className="w-3 h-3" /> 玩
            </a>
          )}
        </div>

        {/* 信息区 */}
        <div className="p-3 space-y-1.5">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-foreground leading-tight">{currentItem.title}</h4>
            <span className="text-[10px] text-muted-foreground">{currentItem.subtitle}</span>
          </div>

          {/* 切换控制 */}
          <div className="flex items-center gap-1.5 pt-1">
            <button
              onClick={() => changeSlide((currentIndex - 1 + total) % total)}
              className="w-5 h-5 rounded-full border border-border flex items-center justify-center hover:bg-accent/10 transition-colors shrink-0"
              aria-label="上一个版本"
            >
              <ChevronLeft className="w-3 h-3" />
            </button>
            <div className="flex items-center gap-1 flex-1 justify-center">
              {SUDOKU_VERSIONS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => changeSlide(idx)}
                  className={`transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-4 h-1.5 rounded-full bg-primary'
                      : 'w-1.5 h-1.5 rounded-full bg-border hover:bg-primary/50'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => changeSlide((currentIndex + 1) % total)}
              className="w-5 h-5 rounded-full border border-border flex items-center justify-center hover:bg-accent/10 transition-colors shrink-0"
              aria-label="下一个版本"
            >
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 人物原型学习站卡片 */
function PrototypeCard({ locale }: { locale: 'zh' | 'en' }) {
  return (
    <a
      href="/works/prototypes.html"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative w-full h-full min-h-[220px] bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 hover:shadow-md transition-all duration-300 flex flex-col"
    >
      {/* 上部：视觉区域 */}
      <div className="relative flex-1 bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950/20 dark:to-blue-950/20 p-4 flex items-center justify-center overflow-hidden">
        {/* 装饰性 SVG：人形轮廓 */}
        <svg viewBox="0 0 120 120" className="w-24 h-24 text-primary/20" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="32" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M28 108 Q28 68 60 58 Q92 68 92 108" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="54" cy="28" r="2.5" fill="currentColor" opacity="0.5" />
          <circle cx="66" cy="28" r="2.5" fill="currentColor" opacity="0.5" />
          <path d="M54 38 Q60 44 66 38" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        </svg>

        {/* 类型标签 */}
        <div className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-background/60 text-[10px] font-medium text-muted-foreground">
          <Library className="w-3 h-3" />
          <span>{t(locale, 'webProject')}</span>
        </div>
      </div>

      {/* 下部：信息 */}
      <div className="p-3 space-y-1.5">
        <h4 className="text-sm font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
          {t(locale, 'project2')}
        </h4>
        <p className="text-[10px] text-muted-foreground">{t(locale, 'project2Desc')}</p>
        <div className="flex items-center gap-1 pt-0.5 text-xs font-medium text-primary group-hover:text-accent transition-colors">
          <span>{t(locale, 'viewProject')}</span>
          <ArrowUpRight className="w-3 h-3" />
        </div>
      </div>
    </a>
  );
}

/* 推文小卡片 */
function ArticleCard({ article, locale }: { article: typeof ARTICLES[0]; locale: 'zh' | 'en' }) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block border border-border rounded-lg p-3 hover:border-primary/30 hover:shadow-sm transition-all duration-300"
      style={{ background: article.color }}
    >
      <div className="space-y-1.5">
        <div className="flex items-start gap-2">
          <FileText className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
          <h5 className="text-xs font-semibold text-foreground leading-tight line-clamp-1 group-hover:text-primary transition-colors">
            {t(locale, article.titleKey)}
          </h5>
        </div>
        <div className="flex items-center gap-1 pl-5.5 text-[9px] text-primary/60 group-hover:text-primary transition-colors">
          <span>{t(locale, 'viewOriginal')}</span>
          <ArrowUpRight className="w-2.5 h-2.5" />
        </div>
      </div>
    </a>
  );
}

// ========== 主组件 ==========

export default function PortfolioSection() {
  const { locale } = useI18n();

  return (
    <section className="space-y-6 animate-fade-in-up">
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

      {/* ===== 个人项目 ===== */}
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground font-medium pl-1" style={{ fontFamily: "'LXGW WenKai', sans-serif" }}>
          {t(locale, 'projectSection')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 左：数独轮播 */}
          <div className="group">
            <MiniSudokuCarousel />
          </div>

          {/* 右：人物原型学习站 */}
          <PrototypeCard locale={locale} />
        </div>
      </div>

      {/* ===== 公众号推文 ===== */}
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground font-medium pl-1" style={{ fontFamily: "'LXGW WenKai', sans-serif" }}>
          {t(locale, 'articleSection')}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {ARTICLES.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
