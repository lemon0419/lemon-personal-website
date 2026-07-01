import { useI18n } from '@/contexts/I18nContext';
import { useTheme } from '@/contexts/ThemeContext';
import { t } from '@/lib/i18n';
import { Eye, ExternalLink, Github } from 'lucide-react';

// 作品集项目数据
const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: '个人网站项目',
    description: '基于React + Vite构建的个人主页，包含手绘风格动画和音乐播放器',
    image: 'https://picsum.photos/400/300?random=1',
    tags: ['React', 'TypeScript', 'Vite'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 2,
    title: '作品集项目二',
    description: '第二个作品集项目的描述，可以替换为实际内容',
    image: 'https://picsum.photos/400/300?random=2',
    tags: ['Vue', 'CSS', 'Responsive'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 3,
    title: '作品集项目三',
    description: '第三个作品集项目的描述，可以替换为实际内容',
    image: 'https://picsum.photos/400/300?random=3',
    tags: ['Node.js', 'MongoDB', 'API'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 4,
    title: '作品集项目四',
    description: '第四个作品集项目的描述，可以替换为实际内容',
    image: 'https://picsum.photos/400/300?random=4',
    tags: ['UI/UX', 'Figma', 'Design'],
    liveUrl: '#',
    githubUrl: '#',
  },
];

// 作品集卡片组件
function PortfolioCard({ item, index }: { item: typeof PORTFOLIO_ITEMS[0]; index: number }) {
  const { locale } = useI18n();
  
  return (
    <div 
      className="group relative bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-lg animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* 项目图片 */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* 悬浮时显示的按钮 */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a
            href={item.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-foreground hover:bg-white transition-colors"
            title={t(locale, 'viewLive') || '查看 live'}
          >
            <Eye className="w-4 h-4" />
          </a>
          <a
            href={item.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-foreground hover:bg-white transition-colors"
            title={t(locale, 'viewGithub') || '查看 GitHub'}
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* 项目信息 */}
      <div className="p-5 space-y-3">
        <h3 
          className="text-lg font-bold text-foreground group-hover:text-primary transition-colors"
          style={{ fontFamily: "'LXGW WenKai', sans-serif" }}
        >
          {item.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {item.description}
        </p>
        
        {/* 标签 */}
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// 主作品集部分组件
export default function PortfolioSection() {
  const { locale } = useI18n();
  const { theme } = useTheme();

  return (
    <section className="space-y-6 animate-fade-in-up">
      {/* 标题 */}
      <div className="flex items-center gap-2">
        <ExternalLink className="w-5 h-5 text-primary" />
        <h2
          className="text-lg md:text-xl font-bold text-foreground"
          style={{ fontFamily: "'LXGW WenKai', sans-serif" }}
        >
          {t(locale, 'portfolio') || '作品集'}
        </h2>
      </div>

      {/* 作品集网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PORTFOLIO_ITEMS.map((item, index) => (
          <PortfolioCard key={item.id} item={item} index={index} />
        ))}
      </div>

      {/* 查看全部按钮 */}
      <div className="text-center pt-4">
        <button
          onClick={() => window.location.href = '/portfolio'}
          className="px-6 py-2.5 rounded-full border border-primary/30 text-primary text-sm font-medium hover:bg-primary/10 transition-colors"
          style={{ fontFamily: "'LXGW WenKai', sans-serif" }}
        >
          {t(locale, 'viewAllPortfolio') || '查看全部作品 →'}
        </button>
      </div>
    </section>
  );
}
