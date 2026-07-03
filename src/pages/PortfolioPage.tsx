import { useNavigate } from 'react-router-dom';
import { useI18n } from '@/contexts/I18nContext';
import { useTheme } from '@/contexts/ThemeContext';
import { t } from '@/lib/i18n';
import {
  Sun, Moon, Sparkles, ArrowLeft, ExternalLink, MessageSquareText,
  Gamepad2, Library, Timer
} from 'lucide-react';

const PROJECTS = [
  {
    id: 'project1',
    descId: 'project1Desc',
    url: '/works/sudoku.html',
    color: 'hsl(30 50% 90%)',
    icon: Gamepad2,
    typeLabel: 'webProject',
  },
  {
    id: 'project2',
    descId: 'project2Desc',
    url: '/works/prototypes.html',
    color: 'hsl(210 25% 92%)',
    icon: Library,
    typeLabel: 'webProject',
  },
  {
    id: 'project3',
    descId: 'project3Desc',
    url: '/works/pomodoro.html',
    color: 'hsl(0 60% 90%)',
    icon: Timer,
    typeLabel: 'webProject',
  },
];

const ARTICLES = [
  { id: 'article1', url: 'https://mp.weixin.qq.com/s/XBVZgWBNEST4x3hKpdiFLg', color: 'hsl(15 55% 90%)' },
  { id: 'article2', url: 'https://mp.weixin.qq.com/s/w4PFpnbhtAbt45dsdBYolA', color: 'hsl(90 25% 90%)' },
  { id: 'article3', url: 'https://mp.weixin.qq.com/s/bBx8E5e5Fi1Gdn-_xwmIhA', color: 'hsl(200 30% 92%)' },
  { id: 'article4', url: 'https://mp.weixin.qq.com/s/TGOMee_4d9YN_wwR2aUX0w', color: 'hsl(45 40% 90%)' },
  { id: 'article5', url: 'https://mp.weixin.qq.com/s/6BTxkiyG5LBfbbF4j1d7jg', color: 'hsl(340 25% 92%)' },
  { id: 'article6', url: 'https://mp.weixin.qq.com/s/UZFAJFk3aFJPr99tiJSyZw', color: 'hsl(160 20% 92%)' },
  { id: 'article7', url: 'https://mp.weixin.qq.com/s/rFKE2955F1gj8SGO16ROsQ', color: 'hsl(270 20% 92%)' },
];

// 手绘风格纸张装饰
function PaperClip({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
    </svg>
  );
}

// 作品卡片
function WorkCard({
  title,
  subtitle,
  url,
  color,
  index,
  typeIcon: TypeIcon,
  typeLabel,
  actionLabel,
}: {
  title: string;
  subtitle: string;
  url: string;
  color: string;
  index: number;
  typeIcon: typeof Gamepad2;
  typeLabel: string;
  actionLabel: string;
}) {
  return (
    <div
      className="group relative animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* 胶带 */}
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 opacity-50 z-10"
        style={{
          background: 'hsl(45 70% 75%)',
          borderRadius: '2px',
          transform: 'translateX(-50%) rotate(-1deg)',
        }}
      />

      {/* 卡片 */}
      <div
        className="relative h-full p-5 md:p-6 border border-border bg-card transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md cursor-pointer"
        style={{
          background: color,
          borderRadius: '4px 16px 4px 16px',
          boxShadow: '3px 3px 0 hsl(0 0% 0% / 0.06)',
        }}
        onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
      >
        {/* 回形针装饰 */}
        <PaperClip className="absolute top-3 right-3 w-5 h-5 text-foreground/15" />

        {/* 类型标签 */}
        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-background/60 text-muted-foreground mb-3">
          <TypeIcon className="w-3 h-3" />
          <span>{typeLabel}</span>
        </div>

        {/* 标题 */}
        <h3
          className="text-base font-bold text-foreground leading-snug mb-1 pr-4"
          style={{ fontFamily: "'LXGW WenKai', sans-serif" }}
        >
          {title}
        </h3>

        {/* 副标题 */}
        <p className="text-xs text-muted-foreground leading-relaxed mb-3">
          {subtitle}
        </p>

        {/* 底部按钮 */}
        <div className="flex items-center gap-1 text-xs font-medium text-primary group-hover:text-accent transition-colors">
          <span>{actionLabel}</span>
          <ExternalLink className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const { locale, toggleLocale } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-background">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/')}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-4 h-4 text-muted-foreground" />
            </button>
            <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground" style={{ fontFamily: "'LXGW WenKai', sans-serif" }}>
              {t(locale, 'name')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
              aria-label={theme === 'light' ? t(locale, 'darkMode') : t(locale, 'lightMode')}
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 text-muted-foreground" />
              ) : (
                <Sun className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
            <button
              onClick={toggleLocale}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-muted transition-colors text-xs font-medium text-muted-foreground"
              aria-label="Switch language"
            >
              {t(locale, 'switchLang')}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 md:py-12 space-y-10">
        {/* 页面标题 */}
        <section className="text-center space-y-3 animate-fade-in-up">
          <h1
            className="text-2xl md:text-3xl font-bold text-foreground inline-block relative"
            style={{ fontFamily: "'LXGW WenKai', sans-serif" }}
          >
            {t(locale, 'portfolio')}
            <span className="absolute -bottom-1 left-0 w-full h-1 bg-accent/40 rounded-full" />
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-lg mx-auto">
            {t(locale, 'portfolioDesc')}
          </p>
        </section>

        {/* 装饰分隔 */}
        <div className="flex items-center justify-center gap-3">
          <div className="w-16 h-px bg-border" />
          <div className="w-2 h-2 rounded-full bg-accent/50" />
          <div className="w-16 h-px bg-border" />
        </div>

        {/* 个人项目区 */}
        <section className="space-y-5">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 rounded-full bg-primary" />
            <h2
              className="text-base md:text-lg font-bold text-foreground"
              style={{ fontFamily: "'LXGW WenKai', sans-serif" }}
            >
              {t(locale, 'projectSection')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROJECTS.map((project, index) => (
              <WorkCard
                key={project.id}
                title={t(locale, project.id as any)}
                subtitle={t(locale, project.descId as any)}
                url={project.url}
                color={project.color}
                index={index}
                typeIcon={project.icon}
                typeLabel={t(locale, project.typeLabel as any)}
                actionLabel={t(locale, 'viewProject')}
              />
            ))}
          </div>
        </section>

        {/* 装饰分隔 */}
        <div className="flex items-center justify-center gap-3">
          <div className="w-16 h-px bg-border" />
          <div className="w-2 h-2 rounded-full bg-accent/50" />
          <div className="w-16 h-px bg-border" />
        </div>

        {/* 公众号推文区 */}
        <section className="space-y-5">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 rounded-full bg-accent" />
            <h2
              className="text-base md:text-lg font-bold text-foreground"
              style={{ fontFamily: "'LXGW WenKai', sans-serif" }}
            >
              {t(locale, 'articleSection')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ARTICLES.map((article, index) => (
              <WorkCard
                key={article.id}
                title={t(locale, article.id as any)}
                subtitle=""
                url={article.url}
                color={article.color}
                index={index + PROJECTS.length}
                typeIcon={MessageSquareText}
                typeLabel={t(locale, 'wechatArticle')}
                actionLabel={t(locale, 'viewOriginal')}
              />
            ))}
          </div>
        </section>
      </main>

      {/* 底部 */}
      <footer className="border-t border-border/50 py-6 mt-8">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="text-xs text-muted-foreground">
            {t(locale, 'contactDesc')}
          </p>
        </div>
      </footer>
    </div>
  );
}
