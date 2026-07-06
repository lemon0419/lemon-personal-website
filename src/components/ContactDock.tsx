import { useState } from 'react';
import { Mail, QrCode, BookOpen, MessageCircle } from 'lucide-react';
import { useSpotlight, useMagnetic } from '@/hooks/useSpotlight';

// 联系方式数据
const CONTACTS = [
  {
    id: 'email',
    icon: Mail,
    label: '邮箱',
    value: '490348253@qq.com',
    href: 'mailto:490348253@qq.com',
    color: '#ea4335',
  },
  {
    id: 'xiaohongshu',
    icon: BookOpen,
    label: '小红书',
    value: '@似我随性',
    href: 'https://www.xiaohongshu.com/user/profile/5a2b5dc64eacab724b1e3488?xsec_token=YBA7M32Cpwzd11ZORUtCrlbc2CBMcWLLXURDO3pok_Pa0%3D&xsec_source=app_share&xhsshare=&shareRedId=N0c0QjhJRz86TEZFSko3ODpFOkw3OT5B&apptime=1782896441&share_id=fee804a85b94418eb7238236fa550b3e&share_channel=wechat',
    color: '#ff2442',
  },
];

export default function ContactDock() {
  const [showQr, setShowQr] = useState(false);
  const chatBtnRef = useMagnetic<HTMLButtonElement>(0.35);

  const scrollToChat = () => {
    const chatSection = document.querySelector('section:has(> div > h2)');
    if (chatSection) chatSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* 固定在右下角的快捷聊天按钮 — 磁性效果 */}
      <button
        ref={chatBtnRef}
        onClick={scrollToChat}
        className="magnetic-btn fixed right-4 bottom-4 z-50 w-12 h-12 rounded-full bg-primary text-primary-foreground diffusion-shadow
                   flex items-center justify-center hover:scale-110 hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
        title="和我聊聊"
      >
        <MessageCircle className="w-5 h-5" />
      </button>

      {/* 固定在左下角的联系栏 — Liquid Glass */}
      <div className="fixed left-4 bottom-4 z-50 flex items-end gap-2.5">
        {/* 联系方式图标 */}
        <div className="flex flex-col gap-2">
          {CONTACTS.map((contact) => (
            <a
              key={contact.id}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-10 h-10 rounded-full liquid-glass flex items-center justify-center
                         hover:scale-110 hover:-translate-y-1 transition-all duration-300"
              title={`${contact.label}: ${contact.value}`}
            >
              <contact.icon className="w-[18px] h-[18px]" style={{ color: contact.color }} />

              {/* 悬浮提示 */}
              <span className="absolute left-full ml-2.5 px-2.5 py-1 rounded-md bg-foreground text-background text-xs font-medium
                               opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-all duration-200
                               -translate-x-1 group-hover:translate-x-0">
                {contact.value}
              </span>
            </a>
          ))}

          {/* 微信二维码按钮 */}
          <button
            onClick={() => setShowQr(!showQr)}
            className="group relative w-10 h-10 rounded-full liquid-glass flex items-center justify-center
                       hover:scale-110 hover:-translate-y-1 transition-all duration-300"
            title="微信: 似我随性"
          >
            <QrCode className="w-[18px] h-[18px]" color="#07c160" />
            <span className="absolute left-full ml-2.5 px-2.5 py-1 rounded-md bg-foreground text-background text-xs font-medium
                             opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-all duration-200
                             -translate-x-1 group-hover:translate-x-0">
              微信 · 似我随性
            </span>
          </button>
        </div>
      </div>

      {/* 微信二维码弹窗 — Liquid Glass */}
      {showQr && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/20 backdrop-blur-md"
          onClick={() => setShowQr(false)}
        >
          <div
            className="liquid-glass relative rounded-3xl p-6 max-w-xs mx-4 animate-fade-in-scale"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowQr(false)}
              className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full bg-muted border border-border text-muted-foreground
                         hover:bg-foreground hover:text-background transition-colors text-sm font-bold flex items-center justify-center"
            >
              ×
            </button>
            <p className="text-center text-sm font-bold mb-3" style={{ fontFamily: "'LXGW WenKai', sans-serif", color: '#07c160' }}>
              扫码加微信 · 似我随性
            </p>
            <img
              src="/wechat-qr.jpg"
              alt="微信二维码"
              className="w-56 h-auto mx-auto rounded-2xl border border-border"
            />
            <p className="text-center text-xs text-muted-foreground mt-3">扫一扫，添加我为朋友</p>
          </div>
        </div>
      )}
    </>
  );
}
