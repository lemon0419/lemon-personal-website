import { useRef } from 'react';
import { useI18n } from '@/contexts/I18nContext';
import { useTheme } from '@/contexts/ThemeContext';
import { t } from '@/lib/i18n';
import {
  Sun, Moon, Sparkles, Music, BookOpen, Clapperboard, Theater,
  Feather, Brain, Compass, GraduationCap, Building2, Award,
  BarChart3, Package, MonitorSmartphone, Trophy, ArrowRight,
  ExternalLink, Mail, ChevronDown
} from 'lucide-react';
import DigitalTwinChat from '@/components/DigitalTwinChat';
import PortfolioSection from '@/components/PortfolioSection';
import ContactDock from '@/components/ContactDock';
import { useSpotlight, useScrollReveal, useMagnetic } from '@/hooks/useSpotlight';

// ========== 子组件 ==========

// 手绘风格头像 SVG
function SketchAvatar() {
  return (
    <svg viewBox="0 0 120 120" className="w-28 h-28 md:w-36 md:h-36" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 35 Q25 15 50 8 Q75 2 90 15 Q100 30 92 45" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="60" cy="48" rx="26" ry="28" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M42 38 Q48 35 54 38" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M66 38 Q72 35 78 38" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="48" cy="45" r="3.5" fill="currentColor" />
      <circle cx="72" cy="45" r="3.5" fill="currentColor" />
      <path d="M60 50 L58 58 L62 58" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M48 66 Q60 75 72 66" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="38" cy="55" rx="5" ry="3" fill="currentColor" opacity="0.1" />
      <ellipse cx="82" cy="55" rx="5" ry="3" fill="currentColor" opacity="0.1" />
      <path d="M35 78 Q30 100 35 115" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
      <path d="M85 78 Q90 100 85 115" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
      <path d="M20 30 Q15 40 20 50" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <path d="M100 30 Q105 40 100 50" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2" />
    </svg>
  );
}

// 便签纸风格标签
function StickyTag({ label, icon: Icon, color }: { label: string; icon: typeof Music; color: string }) {
  return (
    <div className="relative inline-block group">
      <div
        className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4 opacity-60 z-10"
        style={{ background: 'hsl(45 70% 75%)', borderRadius: '2px', transform: 'translateX(-50%) rotate(-2deg)' }}
      />
      <div
        className="relative px-4 py-2.5 text-sm font-medium transition-all duration-300 group-hover:-translate-y-1"
        style={{
          background: color,
          borderRadius: '3px 12px 3px 12px',
          color: 'hsl(0 0% 22%)',
          boxShadow: '2px 2px 0 hsl(0 0% 0% / 0.08)',
          fontFamily: "'LXGW WenKai', sans-serif",
        }}
      >
        <div className="flex items-center gap-1.5">
          <Icon className="w-3.5 h-3.5" />
          <span>{label}</span>
        </div>
      </div>
    </div>
  );
}


// 工作经历条目 — 交替布局
function WorkEntry({
  company, role, period, descriptions, index
}: {
  company: string;
  role: string;
  period: string;
  descriptions: string[];
  index: number;
}) {
  const isEven = index % 2 === 0;
  return (
    <div className="animate-stagger" style={{ animationDelay: `${index * 120}ms` }}>
      <div className={`flex items-start gap-6 md:gap-12 ${isEven ? '' : 'md:flex-row-reverse'}`}>
        {/* 内容区 */}
        <div className="flex-1 space-y-3 min-w-0">
          <div className="flex items-center gap-3">
            <h3
              className="text-base md:text-lg font-bold text-foreground"
              style={{ fontFamily: "'LXGW WenKai', sans-serif" }}
            >
              {company}
            </h3>
            <div className="h-px flex-1 bg-border/50 hidden md:block" />
          </div>
          <p className="text-sm text-accent font-medium">{role}</p>
          <ul className="pt-2 space-y-2.5">
            {descriptions.map((desc, idx) => (
              <li
                key={idx}
                className="text-sm text-muted-foreground leading-relaxed pl-4 relative"
              >
                <span
                  className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full"
                  style={{ background: 'hsl(var(--primary) / 0.35)' }}
                />
                {desc}
              </li>
            ))}
          </ul>
        </div>

        {/* 日期锚点 */}
        <span
          className="shrink-0 pt-1 text-lg md:text-2xl font-light select-none font-outfit tracking-wider"
          style={{
            color: 'hsl(var(--border))',
            lineHeight: 1,
          }}
        >
          {period.split(' ')[0]}
        </span>
      </div>
    </div>
  );
}

// Bento 技能卡片 — 带 Spotlight 边框效果
function BentoSkillCard({
  icon: Icon, title, desc, color, large = false, tall = false
}: {
  icon: typeof Award; title: string; desc: string; color: string; large?: boolean; tall?: boolean;
}) {
  const spotlightRef = useSpotlight<HTMLDivElement>();

  return (
    <div
      ref={spotlightRef}
      className={`spotlight-card bento-card ${tall ? 'bento-tall' : ''} ${large ? 'bento-wide' : ''} group cursor-default`}
    >
      <div className="relative z-10 space-y-3">
        <div className="flex items-start gap-3">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
            style={{ background: `${color}18`, border: `1px solid ${color}30` }}
          >
            <Icon className="w-5 h-5" style={{ color }} />
          </div>
          <div className="pt-0.5 space-y-1.5 flex-1">
            <h3 className="text-sm font-bold text-foreground font-wenkai">{title}</h3>
            <p className={`text-xs text-muted-foreground leading-relaxed ${large ? '' : 'line-clamp-3'}`}>{desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 奖项卡片
function AwardCard({ text, delay }: { text: string; delay: number }) {
  const spotlightRef = useSpotlight<HTMLDivElement>();

  return (
    <div
      ref={spotlightRef}
      className="spotlight-card animate-stagger sketch-border-subtle px-5 py-3.5 border border-border/60 bg-surface-elevated/50 flex items-start gap-3 transition-all duration-300"
      style={{ animationDelay: `${delay}ms` }}
    >
      <Trophy className="w-4 h-4 text-accent shrink-0 mt-0.5" />
      <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
    </div>
  );
}

// 滚动揭示包装器
function ScrollSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  return (
    <section ref={ref} className={`scroll-reveal ${isVisible ? 'is-visible' : ''} ${className}`}>
      {children}
    </section>
  );
}

// 章节标题
function SectionHeader({ icon: Icon, title, accent = false }: { icon: typeof Award; title: string; accent?: boolean }) {
  return (
    <div className="flex items-center gap-3 animate-fade-in-up">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${accent ? 'bg-accent/10' : 'bg-primary/10'}`}>
        <Icon className={`w-4 h-4 ${accent ? 'text-accent' : 'text-primary'}`} />
      </div>
      <h2 className="text-lg md:text-xl font-bold text-foreground font-wenkai">
        {title}
      </h2>
      <div className="h-px flex-1 bg-border/30" />
    </div>
  );
}

const TAGS = [
  { labelKey: 'tagMusical' as const, icon: Music, color: 'hsl(15 60% 88%)' },
  { labelKey: 'tagTheater' as const, icon: Theater, color: 'hsl(90 25% 88%)' },
  { labelKey: 'tagDance' as const, icon: Clapperboard, color: 'hsl(35 50% 88%)' },
  { labelKey: 'tagNovel' as const, icon: BookOpen, color: 'hsl(200 30% 90%)' },
  { labelKey: 'tagTV' as const, icon: Clapperboard, color: 'hsl(45 40% 88%)' },
  { labelKey: 'tagFeminism' as const, icon: Feather, color: 'hsl(340 30% 90%)' },
  { labelKey: 'tagContent' as const, icon: Feather, color: 'hsl(160 25% 90%)' },
  { labelKey: 'tagKnowledge' as const, icon: Brain, color: 'hsl(270 20% 90%)' },
  { labelKey: 'tagProduct' as const, icon: Compass, color: 'hsl(50 35% 88%)' },
  { labelKey: 'tagSpontaneity' as const, icon: Sparkles, color: 'hsl(30 30% 90%)' },
];

// ========== 页面主体 ==========

export default function HomePage() {
  const { locale, toggleLocale } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const chatRef = useRef<HTMLDivElement>(null);
  const heroBtnRef = useMagnetic<HTMLButtonElement>(0.25);

  const scrollToChat = () => {
    chatRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Mesh Gradient Background — organic animated color blobs */}
      <div className="mesh-gradient-bg" />

      {/* ========== 顶部导航 — Liquid Glass ========== */}
      <header className="sticky top-0 z-40 w-full border-b border-border/40 liquid-glass">
        <div className="mx-auto max-w-4xl px-4 md:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground font-wenkai">
              {t(locale, 'name')}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => window.location.href = '/portfolio'}
              className="directional-hover px-3 py-1.5 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground transition-colors font-wenkai"
            >
              {t(locale, 'portfolio')}
            </button>
            <div className="w-px h-4 bg-border mx-1" />
            <button
              onClick={toggleTheme}
              className="directional-hover w-9 h-9 flex items-center justify-center rounded-full transition-colors"
              aria-label={theme === 'light' ? t(locale, 'darkMode') : t(locale, 'lightMode')}
            >
              {theme === 'light' ? <Moon className="w-4 h-4 text-muted-foreground" /> : <Sun className="w-4 h-4 text-muted-foreground" />}
            </button>
            <button
              onClick={toggleLocale}
              className="directional-hover w-9 h-9 flex items-center justify-center rounded-full transition-colors text-xs font-medium text-muted-foreground"
              aria-label="Switch language"
            >
              {t(locale, 'switchLang')}
            </button>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-4xl px-4 md:px-6 py-8 md:py-16 space-y-20 md:space-y-28">
        {/* ========== 个人宣言 / 身份区 — 非对称 Hero ========== */}
        <section className="space-y-8 md:space-y-10 animate-fade-in-up">
          {/* 个人宣言区域 */}
          <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
            {/* 左侧：身份声明 */}
            <div className="flex-1 space-y-4 md:space-y-5 md:pt-6">
              <div className="space-y-3">
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground/50 font-outfit font-medium">
                  Personal · {t(locale, 'name')}
                </p>
                <h1
                  className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground"
                  style={{ fontFamily: "'LXGW WenKai', 'PingFang SC', sans-serif" }}
                >
                  {t(locale, 'tagline')}
                </h1>
              </div>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-md">
                {t(locale, 'aboutDesc1')}
              </p>
              <div className="flex items-center gap-4 pt-2">
                <button
                  ref={heroBtnRef}
                  onClick={scrollToChat}
                  className="magnetic-btn group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium
                             hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-300 font-wenkai"
                >
                  <Sparkles className="w-4 h-4 group-hover:animate-pulse" />
                  <span>{t(locale, 'chatWithMe')}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
                <p className="text-xs text-muted-foreground/50">{t(locale, 'askMeAnything')}</p>
              </div>
            </div>

{/* 右侧：个人照片 — 融入背景 */}
            <div className="shrink-0 relative">
              <div
                className="relative w-40 h-52 md:w-52 md:h-68 overflow-hidden"
                style={{
                  borderRadius: '60% 40% 50% 50% / 50% 45% 55% 50%',
                  maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 50%, transparent 100%)',
                  WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 50%, transparent 100%)',
                }}
              >
                <img
                  src="/images/character/一位年轻的中国女性_黑色长发_戴圆框眼镜_穿浅色衬衫_极简黑_2026-07-06T09-08-10.png"
                  alt="Portrait"
                  className="w-full h-full object-cover"
                  style={{
                    opacity: 0.85,
                  }}
                />
              </div>
              {/* 装饰光晕 */}
              <div
                className="absolute -inset-4 -z-10 rounded-full opacity-30"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.15), transparent 70%)',
                  filter: 'blur(20px)',
                }}
              />
            </div>
          </div>

          {/* 补充描述 + 标签 */}
          <div className="space-y-4">
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl">
              {t(locale, 'aboutDesc2')}
            </p>
            <div className="flex flex-wrap gap-3 md:gap-4">
              {TAGS.map((tag, index) => (
                <div key={tag.labelKey} className="animate-stagger" style={{ animationDelay: `${index * 80}ms` }}>
                  <StickyTag label={t(locale, tag.labelKey)} icon={tag.icon} color={tag.color} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== 分隔 ========== */}
        <div className="section-divider">
          <div className="section-divider-dot" />
        </div>

        {/* ========== 教育经历 — 编辑风 ========== */}
        <ScrollSection className="space-y-8">
          <SectionHeader icon={GraduationCap} title={t(locale, 'education')} />

          <div className="animate-stagger" style={{ animationDelay: '100ms' }}>
            <div className="flex items-start gap-6 md:gap-12">
              <div className="flex-1 space-y-3 min-w-0">
                <h3 className="text-base md:text-lg font-bold text-foreground font-wenkai">
                  {t(locale, 'eduSchool')}
                </h3>
                <p className="text-sm text-accent font-medium">{t(locale, 'eduMajor')}</p>
                <div className="pt-2 space-y-2">
                  <p className="text-xs text-muted-foreground/60 uppercase tracking-wider">{t(locale, 'eduCourse')}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-md">{t(locale, 'eduCourseDesc')}</p>
                </div>
              </div>
              <span
                className="shrink-0 pt-1 text-lg md:text-2xl font-light select-none text-border"
                style={{ fontFamily: "'Outfit', sans-serif", letterSpacing: '0.03em', lineHeight: 1 }}
              >
                {t(locale, 'eduPeriod').split(' ')[0]}
              </span>
            </div>
          </div>
        </ScrollSection>

        {/* ========== 分隔 ========== */}
        <div className="section-divider">
          <div className="section-divider-dot" />
        </div>

        {/* ========== 工作经历 — 交替时间线 ========== */}
        <ScrollSection className="space-y-8">
          <SectionHeader icon={Building2} title={t(locale, 'workExperience')} />

          <div className="space-y-10 md:space-y-14 relative">
            {/* 时间线 */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border/40 hidden md:block" style={{ left: 'calc(50% - 0.5px)' }} />

            <WorkEntry
              company={t(locale, 'work1Company')}
              role={t(locale, 'work1Role')}
              period={t(locale, 'work1Period')}
              descriptions={[t(locale, 'work1Desc1'), t(locale, 'work1Desc2'), t(locale, 'work1Desc3')]}
              index={0}
            />

            <WorkEntry
              company={t(locale, 'work2Company')}
              role={t(locale, 'work2Role')}
              period={t(locale, 'work2Period')}
              descriptions={[t(locale, 'work2Desc1'), t(locale, 'work2Desc2')]}
              index={1}
            />

            <WorkEntry
              company={t(locale, 'work3Company')}
              role={t(locale, 'work3Role')}
              period={t(locale, 'work3Period')}
              descriptions={[t(locale, 'work3Desc1'), t(locale, 'work3Desc2'), t(locale, 'work3Desc3')]}
              index={2}
            />
          </div>
        </ScrollSection>

        {/* ========== 分隔 ========== */}
        <div className="section-divider">
          <div className="section-divider-dot" />
        </div>

        {/* ========== 作品集 ========== */}
        <ScrollSection className="space-y-8">
          <PortfolioSection />
        </ScrollSection>

        {/* ========== 分隔 ========== */}
        <div className="section-divider">
          <div className="section-divider-dot" />
        </div>

        {/* ========== 技能与奖项 — Bento Grid ========== */}
        <ScrollSection className="space-y-8">
          <SectionHeader icon={Award} title={t(locale, 'skillsAwards')} accent />

          {/* Bento 非对称技能网格 */}
          <div className="bento-grid">
            <BentoSkillCard
              icon={MonitorSmartphone}
              title={t(locale, 'skillPlatform')}
              desc={t(locale, 'skillPlatformDesc')}
              color="hsl(30 35% 55%)"
              large
            />
            <BentoSkillCard
              icon={BarChart3}
              title={t(locale, 'skillOffice')}
              desc={t(locale, 'skillOfficeDesc')}
              color="hsl(90 10% 55%)"
            />
            <BentoSkillCard
              icon={Package}
              title={t(locale, 'skillErp')}
              desc={t(locale, 'skillErpDesc')}
              color="hsl(200 30% 55%)"
            />
          </div>

          {/* 奖项 + 场景插画 */}
          <div className="space-y-3 pt-2">
            <AwardCard text={t(locale, 'award1')} delay={200} />
            <AwardCard text={t(locale, 'award2')} delay={400} />
          </div>
          <div className="flex justify-end pt-1">
            <div className="img-framed">
              <img
                src="/images/character/scene-creating.png"
                alt="Creating scene"
                className="w-36 h-36 md:w-48 md:h-48 object-cover"
              />
            </div>
          </div>
        </ScrollSection>

        {/* ========== 分隔 ========== */}
        <div className="section-divider">
          <div className="section-divider-dot" />
        </div>

        {/* ========== 数字分身聊天区 ========== */}
        <ScrollSection className="space-y-6">
          <SectionHeader icon={Mail} title={t(locale, 'digitalTwin')} />
          <div ref={chatRef}>
            <DigitalTwinChat />
          </div>
        </ScrollSection>
      </main>

      {/* ========== 底部 — 分隔线 + 渐变文字 ========== */}
      <footer className="pt-8 pb-8">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <div className="section-divider mb-6">
            <div className="section-divider-dot" />
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground font-wenkai">{t(locale, 'name')}</span>
            </div>
            <p className="text-xs text-muted-foreground/50">
              {t(locale, 'contactDesc')}
            </p>
          </div>
        </div>
      </footer>

      {/* 联系方式悬浮栏 */}
      <ContactDock />
    </div>
  );
}
