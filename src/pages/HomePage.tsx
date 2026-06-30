import { useRef } from 'react';
import { useI18n } from '@/contexts/I18nContext';
import { useTheme } from '@/contexts/ThemeContext';
import { t } from '@/lib/i18n';
import {
  Sun, Moon, Sparkles, Mail, Music, BookOpen, Clapperboard, Theater,
  Feather, Brain, Compass, GraduationCap, Building2, Award, CheckCircle2,
  FileText, BarChart3, Package, MonitorSmartphone, Trophy
} from 'lucide-react';
import DigitalTwinChat from '@/components/DigitalTwinChat';

// ========== 组件 ==========

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
          color: 'hsl(0 0% 24%)',
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

// 小装饰 - 星星
function LittleStar({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor">
      <path d="M12 2l2.5 6.5L21 9l-5 4.5L17.5 21 12 17l-5.5 4 1.5-7.5L3 9l6.5-.5z" opacity="0.6" />
    </svg>
  );
}

// 小装饰 - 调色盘
function LittlePalette({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="8" cy="10" r="1.5" fill="currentColor" />
      <circle cx="15" cy="8" r="1.5" fill="currentColor" />
      <circle cx="16" cy="14" r="1.5" fill="currentColor" />
      <circle cx="10" cy="16" r="1.5" fill="currentColor" />
    </svg>
  );
}

// 时间轴节点
interface TimelineItemProps {
  period: string;
  company: string;
  role: string;
  descriptions: string[];
  isLast?: boolean;
  delay?: number;
}

function TimelineItem({ period, company, role, descriptions, isLast, delay = 0 }: TimelineItemProps) {
  return (
    <div className="flex gap-4 md:gap-6 animate-fade-in-up" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex flex-col items-center shrink-0">
        <div className="w-4 h-4 rounded-full border-[2.5px] border-accent bg-background z-10 mt-1.5" />
        {!isLast && (
          <div
            className="w-0.5 flex-1 min-h-[40px] mt-1"
            style={{
              background: 'repeating-linear-gradient(to bottom, hsl(var(--border)) 0, hsl(var(--border)) 6px, transparent 6px, transparent 10px)',
            }}
          />
        )}
      </div>
      <div className="flex-1 pb-6">
        <div className="sketch-border bg-card border border-border p-4 md:p-5 space-y-2 transition-all duration-300 hover:border-accent/40">
          <div className="flex items-center gap-2 text-xs font-medium text-accent">
            <FileText className="w-3.5 h-3.5" />
            <span>{period}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
            <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'LXGW WenKai', sans-serif" }}>
              {company}
            </h3>
            <span className="hidden md:block w-1 h-1 rounded-full bg-muted-foreground" />
            <span className="text-sm text-primary font-medium">{role}</span>
          </div>
          <ul className="space-y-1.5 pt-1">
            {descriptions.map((desc, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary/60 shrink-0 mt-0.5" />
                <span>{desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// 技能卡片
function SkillCard({ icon: Icon, title, desc, color }: { icon: typeof Award; title: string; desc: string; color: string }) {
  return (
    <div className="sketch-border p-4 md:p-5 border border-border bg-card transition-all duration-300 hover:border-primary/40 space-y-2">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${color}20` }}>
          <Icon className="w-4 h-4" style={{ color }} />
        </div>
        <h3 className="text-sm font-bold text-foreground" style={{ fontFamily: "'LXGW WenKai', sans-serif" }}>
          {title}
        </h3>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed pl-10">{desc}</p>
    </div>
  );
}

// 奖项卡片
function AwardCard({ text, delay }: { text: string; delay: number }) {
  return (
    <div
      className="sketch-border px-4 py-3 border border-border bg-card flex items-start gap-2 transition-all duration-300 hover:border-accent/40 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <Trophy className="w-4 h-4 text-accent shrink-0 mt-0.5" />
      <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
    </div>
  );
}

const TAGS = [
  { label: '音乐剧', icon: Music, color: 'hsl(15 60% 88%)' },
  { label: '话剧', icon: Theater, color: 'hsl(90 25% 88%)' },
  { label: '舞剧', icon: Clapperboard, color: 'hsl(35 50% 88%)' },
  { label: '小说', icon: BookOpen, color: 'hsl(200 30% 90%)' },
  { label: '电视剧', icon: Clapperboard, color: 'hsl(45 40% 88%)' },
  { label: '女性主义', icon: Feather, color: 'hsl(340 30% 90%)' },
  { label: '内容表达', icon: Feather, color: 'hsl(160 25% 90%)' },
  { label: '知识整理', icon: Brain, color: 'hsl(270 20% 90%)' },
  { label: '产品运营', icon: Compass, color: 'hsl(50 35% 88%)' },
  { label: '随性', icon: Sparkles, color: 'hsl(30 30% 90%)' },
];

// ========== 页面 ==========

export default function HomePage() {
  const { locale, toggleLocale } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const chatRef = useRef<HTMLDivElement>(null);

  const scrollToChat = () => {
    chatRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full bg-background">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground" style={{ fontFamily: "'LXGW WenKai', sans-serif" }}>
              {t(locale, 'name')}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => window.location.href = '/portfolio'}
              className="px-3 py-1.5 rounded-full text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              style={{ fontFamily: "'LXGW WenKai', sans-serif" }}
            >
              {t(locale, 'portfolio')}
            </button>
            <div className="w-px h-4 bg-border mx-1" />
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

      <main className="mx-auto max-w-3xl px-4 py-8 md:py-12 space-y-12">
        {/* 首行 CTA */}
        <section className="flex flex-col items-center text-center animate-fade-in-up">
          <button
            onClick={scrollToChat}
            className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            style={{ fontFamily: "'LXGW WenKai', sans-serif" }}
          >
            {t(locale, 'chatWithMe')}
          </button>
        </section>

        {/* 装饰分隔 */}
        <div className="flex items-center justify-center gap-3">
          <div className="w-16 h-px bg-border" />
          <div className="w-2 h-2 rounded-full bg-accent/50" />
          <div className="w-16 h-px bg-border" />
        </div>

        {/* 关于我 */}
        <section className="space-y-8 animate-fade-in-up">
          <div className="text-center">
            <h2
              className="text-2xl md:text-3xl font-bold text-foreground inline-block relative"
              style={{ fontFamily: "'LXGW WenKai', sans-serif" }}
            >
              {t(locale, 'aboutMe')}
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-accent/40 rounded-full" />
            </h2>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
            <div className="relative shrink-0">
              <div
                className="relative p-4 md:p-6"
                style={{
                  borderRadius: '50% 45% 55% 48% / 55% 48% 52% 45%',
                  border: '2.5px solid hsl(var(--border))',
                  background: 'hsl(var(--card))',
                }}
              >
                <div className="text-foreground">
                  <SketchAvatar />
                </div>
              </div>
              <LittleStar className="absolute -top-2 -right-2 w-5 h-5 text-accent/60 animate-float" />
              <LittlePalette className="absolute -bottom-1 -left-3 w-6 h-6 text-primary/50 animate-float" style={{ animationDelay: '1s' }} />
              <LittleStar className="absolute top-1/2 -right-5 w-3 h-3 text-accent/40 animate-float" style={{ animationDelay: '0.5s' }} />
            </div>

            <div className="flex-1 space-y-4 text-center md:text-left">
              <p
                className="text-base md:text-lg font-semibold"
                style={{ fontFamily: "'LXGW WenKai', sans-serif", color: 'hsl(var(--accent))' }}
              >
                {t(locale, 'tagline')}
              </p>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {t(locale, 'aboutDesc1')}
              </p>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {t(locale, 'aboutDesc2')}
              </p>
            </div>
          </div>

          <div className="pt-4">
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {TAGS.map((tag, index) => (
                <div key={tag.label} className="animate-fade-in-up" style={{ animationDelay: `${index * 80}ms` }}>
                  <StickyTag label={tag.label} icon={tag.icon} color={tag.color} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 装饰分隔 */}
        <div className="flex items-center justify-center gap-3">
          <div className="w-16 h-px bg-border" />
          <div className="w-2 h-2 rounded-full bg-accent/50" />
          <div className="w-16 h-px bg-border" />
        </div>

        {/* 教育经历 */}
        <section className="space-y-6 animate-fade-in-up">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            <h2
              className="text-lg md:text-xl font-bold text-foreground"
              style={{ fontFamily: "'LXGW WenKai', sans-serif" }}
            >
              {t(locale, 'education')}
            </h2>
          </div>

          <div className="sketch-border bg-card border border-border p-5 md:p-6 space-y-3">
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
              <span className="text-sm font-medium text-accent">{t(locale, 'eduPeriod')}</span>
              <span className="hidden md:block w-1 h-1 rounded-full bg-muted-foreground" />
              <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'LXGW WenKai', sans-serif" }}>
                {t(locale, 'eduSchool')}
              </h3>
              <span className="hidden md:block w-1 h-1 rounded-full bg-muted-foreground" />
              <span className="text-sm text-muted-foreground">{t(locale, 'eduMajor')}</span>
            </div>

            <div className="pt-2 border-t border-border/60">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-primary/70" />
                <span className="text-sm font-medium text-foreground">{t(locale, 'eduCourse')}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed pl-6">
                {t(locale, 'eduCourseDesc')}
              </p>
            </div>
          </div>
        </section>

        {/* 装饰分隔 */}
        <div className="flex items-center justify-center gap-3">
          <div className="w-16 h-px bg-border" />
          <div className="w-2 h-2 rounded-full bg-accent/50" />
          <div className="w-16 h-px bg-border" />
        </div>

        {/* 工作经历 - 时间轴 */}
        <section className="space-y-6 animate-fade-in-up">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            <h2
              className="text-lg md:text-xl font-bold text-foreground"
              style={{ fontFamily: "'LXGW WenKai', sans-serif" }}
            >
              {t(locale, 'workExperience')}
            </h2>
          </div>

          <div className="pl-1">
            <TimelineItem
              period={t(locale, 'work1Period')}
              company={t(locale, 'work1Company')}
              role={t(locale, 'work1Role')}
              descriptions={[t(locale, 'work1Desc1'), t(locale, 'work1Desc2'), t(locale, 'work1Desc3')]}
              delay={100}
            />
            <TimelineItem
              period={t(locale, 'work2Period')}
              company={t(locale, 'work2Company')}
              role={t(locale, 'work2Role')}
              descriptions={[t(locale, 'work2Desc1'), t(locale, 'work2Desc2')]}
              delay={300}
            />
            <TimelineItem
              period={t(locale, 'work3Period')}
              company={t(locale, 'work3Company')}
              role={t(locale, 'work3Role')}
              descriptions={[t(locale, 'work3Desc1'), t(locale, 'work3Desc2'), t(locale, 'work3Desc3')]}
              isLast
              delay={500}
            />
          </div>
        </section>

        {/* 装饰分隔 */}
        <div className="flex items-center justify-center gap-3">
          <div className="w-16 h-px bg-border" />
          <div className="w-2 h-2 rounded-full bg-accent/50" />
          <div className="w-16 h-px bg-border" />
        </div>

        {/* 技能与奖项 */}
        <section className="space-y-6 animate-fade-in-up">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            <h2
              className="text-lg md:text-xl font-bold text-foreground"
              style={{ fontFamily: "'LXGW WenKai', sans-serif" }}
            >
              {t(locale, 'skillsAwards')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SkillCard
              icon={MonitorSmartphone}
              title={t(locale, 'skillPlatform')}
              desc={t(locale, 'skillPlatformDesc')}
              color="hsl(30 35% 55%)"
            />
            <SkillCard
              icon={BarChart3}
              title={t(locale, 'skillOffice')}
              desc={t(locale, 'skillOfficeDesc')}
              color="hsl(90 10% 55%)"
            />
            <SkillCard
              icon={Package}
              title={t(locale, 'skillErp')}
              desc={t(locale, 'skillErpDesc')}
              color="hsl(200 30% 55%)"
            />
          </div>

          <div className="space-y-3">
            <AwardCard text={t(locale, 'award1')} delay={200} />
            <AwardCard text={t(locale, 'award2')} delay={400} />
          </div>
        </section>

        {/* 装饰分隔 */}
        <div className="flex items-center justify-center gap-3">
          <div className="w-16 h-px bg-border" />
          <div className="w-2 h-2 rounded-full bg-accent/50" />
          <div className="w-16 h-px bg-border" />
        </div>

        {/* 数字分身聊天区 */}
        <section ref={chatRef} className="space-y-4">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            <h2
              className="text-lg md:text-xl font-bold text-foreground"
              style={{ fontFamily: "'LXGW WenKai', sans-serif" }}
            >
              {t(locale, 'digitalTwin')}
            </h2>
          </div>
          <DigitalTwinChat />
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
