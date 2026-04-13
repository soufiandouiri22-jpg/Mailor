import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { sendAgentMessage, type ChatMessage } from '../lib/agentService';
import { useIntegrations } from '../lib/integrations';

interface UiMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AiAgent() {
  const [messages, setMessages] = useState<UiMessage[]>([
    {
      id: '0',
      role: 'assistant',
      content: 'Hoi! Ik ben de Scanly AI Agent. Ik kan je database bevragen, statistieken ophalen, merken analyseren en meer. Wat wil je weten?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');
  const historyRef = useRef<ChatMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const integrations = useIntegrations();
  const connectedNames = integrations.filter((i) => i.connected).map((i) => i.name);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, status]);

  async function handleSend() {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: UiMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setStatus('');

    try {
      const { reply, updatedHistory } = await sendAgentMessage(
        historyRef.current,
        text,
        (partial) => setStatus(partial),
      );

      historyRef.current = updatedHistory;

      const assistantMsg: UiMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: reply,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: unknown) {
      const assistantMsg: UiMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Er ging iets mis: ${err instanceof Error ? err.message : String(err)}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } finally {
      setIsLoading(false);
      setStatus('');
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-60px)]">
      <div className="p-8 pb-0 shrink-0">
        <PageHeader title="AI Agent" description="Stel vragen over je data, geef opdrachten, of vraag om analyses" />
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto px-8 py-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                <Bot size={16} className="text-emerald-600" />
              </div>
            )}
            <div
              className={`max-w-[75%] px-4 py-3 rounded-xl text-[13px] leading-relaxed whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {msg.content}
            </div>
            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center shrink-0 mt-0.5">
                <User size={16} className="text-gray-500" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
              <Bot size={16} className="text-emerald-600" />
            </div>
            <div className="bg-gray-100 px-4 py-3 rounded-xl">
              {status.startsWith('[') ? (
                <p className="text-[12px] text-gray-500 italic">{status}</p>
              ) : (
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-8 py-4 border-t border-gray-200 shrink-0">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Stel een vraag of geef een opdracht..."
            className="flex-1 px-4 py-2.5 text-[13px] border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="px-4 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:opacity-30 transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
        <p className="text-[11px] text-gray-400 mt-2">
          Verbonden met {connectedNames.join(' · ')} · Ondersteunt tool calling
        </p>
      </div>
    </div>
  );
}
