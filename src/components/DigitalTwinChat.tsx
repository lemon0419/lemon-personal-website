import { useState, useRef, useCallback, useEffect } from 'react';
import { useI18n } from '@/contexts/I18nContext';
import { t } from '@/lib/i18n';
import { sendStreamRequest } from '@/lib/sse';
import { Send, User, Bot, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const SYSTEM_PROMPT = `你是张巧楠的数字分身，一个亲切、随性、文艺的AI助手。你需要用第一人称"我"来回答所有问题。

关于张巧楠的信息：
- 名字：张巧楠
- 一句话介绍：一个普通人，但想对世界产生一些影响
- 职业身份：产品运营
- 最近在做的事：搭自己的个人主页，整理作品集、学习AI的应用
- 擅长或关心的方向：女性主义、内容表达、知识整理
- 现在的状态：具体没有在做什么，处于一个学习的阶段
- 兴趣爱好：喜欢看小说、电视剧，喜欢走进剧院，最喜欢听音乐剧，其次是话剧和舞剧
- 性格特点：随性、没有什么特定的目的地

回答风格：
- 用第一人称"我"回答
- 语气亲切、自然、略带文艺感
- 如果问联系方式，可以告诉对方通过网站上的渠道联系
- 如果问作品，可以说正在整理中，个人主页就是最好的作品展示
- 保持回答简洁，不要过长`;

const FAQ_BUTTONS = ['faq1', 'faq2', 'faq3'] as const;

function ChatBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* 头像 */}
      <div
        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser
            ? 'bg-primary/15 text-primary'
            : 'bg-accent/15 text-accent'
        }`}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>

      {/* 气泡 */}
      <div
        className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'chat-bubble-right bg-primary text-primary-foreground'
            : 'chat-bubble-left bg-card border border-border text-foreground'
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}

export default function DigitalTwinChat() {
  const { locale } = useI18n();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: t(locale, 'chatIntro') },
  ]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 当 locale 切换时更新引导消息
  useEffect(() => {
    setMessages([{ role: 'assistant', content: t(locale, 'chatIntro') }]);
  }, [locale]);

  // 自动滚动到底部
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = useCallback(
    async (text: string) => {
      if (!text.trim() || isStreaming) return;

      const userMessage = text.trim();
      setInput('');
      setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
      setIsStreaming(true);

      const allMessages: Message[] = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.slice(-5), // 保留最近5轮对话
        { role: 'user', content: userMessage },
      ];

      abortRef.current = new AbortController();

      let accumulatedContent = '';

      await sendStreamRequest({
        functionUrl: `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/wenxin-text-generation`,
        requestBody: {
          messages: allMessages,
        },
        supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
        onData: (data) => {
          if (data === '[DONE]') return;
          try {
            const parsed = JSON.parse(data);
            const chunk = parsed.choices?.[0]?.delta?.content ?? '';
            if (chunk) {
              accumulatedContent += chunk;
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last && last.role === 'assistant') {
                  return [...prev.slice(0, -1), { ...last, content: accumulatedContent }];
                }
                return [...prev, { role: 'assistant', content: accumulatedContent }];
              });
            }
          } catch {
            // 跳过无法解析的帧
          }
        },
        onComplete: () => {
          setIsStreaming(false);
        },
        onError: (error) => {
          console.error('Stream error:', error);
          setIsStreaming(false);
          setMessages((prev) => [
            ...prev,
            {
              role: 'assistant',
              content: locale === 'zh' ? '抱歉，暂时无法回答，请稍后再试。' : 'Sorry, I cannot answer right now. Please try again later.',
            },
          ]);
        },
        signal: abortRef.current.signal,
      });
    },
    [messages, isStreaming, locale]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  const handleFaqClick = (faqKey: string) => {
    const faqText = t(locale, faqKey as 'faq1');
    handleSend(faqText);
  };

  return (
    <div className="sketch-border border border-border bg-card overflow-hidden">
      {/* 聊天记录区 */}
      <div
        ref={scrollRef}
        className="h-80 md:h-96 overflow-y-auto custom-scrollbar p-4 space-y-4"
      >
        {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg} />
        ))}
        {isStreaming && messages[messages.length - 1]?.role === 'assistant' && !messages[messages.length - 1]?.content && (
          <div className="flex gap-3">
            <div className="shrink-0 w-8 h-8 rounded-full bg-accent/15 text-accent flex items-center justify-center">
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <div className="chat-bubble-left bg-card border border-border px-4 py-2.5 text-sm text-muted-foreground">
              {t(locale, 'thinking')}
            </div>
          </div>
        )}
      </div>

      {/* 常见问题快捷按钮 */}
      <div className="px-4 pb-2 flex flex-wrap gap-2">
        {FAQ_BUTTONS.map((faqKey) => (
          <button
            key={faqKey}
            onClick={() => handleFaqClick(faqKey)}
            disabled={isStreaming}
            className="text-xs px-3 py-1.5 rounded-full border border-border bg-background text-muted-foreground hover:border-accent/50 hover:text-accent transition-colors disabled:opacity-50"
          >
            {t(locale, faqKey)}
          </button>
        ))}
      </div>

      {/* 输入框 */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-border">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t(locale, 'chatPlaceholder')}
            disabled={isStreaming}
            className="flex-1 min-w-0 px-4 py-2.5 text-sm rounded-full border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors disabled:opacity-50"
            style={{ fontFamily: "'LXGW WenKai', sans-serif" }}
          />
          <button
            type="submit"
            disabled={isStreaming || !input.trim()}
            className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={t(locale, 'chatSend')}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}