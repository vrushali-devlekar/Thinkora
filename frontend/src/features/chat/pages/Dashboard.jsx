import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import { FaRegLightbulb } from "react-icons/fa";
import remarkGfm from "remark-gfm";

const SendIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const ChatIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const SUGGESTIONS = [
  { label: "Explain a concept", icon: "💡" },
  { label: "Write some code", icon: "🖥️" },
  { label: "Summarise an article", icon: "📄" },
  { label: "Help me brainstorm", icon: "🧠" },
];

const mdComponents = {
  p: ({ children }) => <p className="mb-2.5 last:mb-0 leading-7">{children}</p>,
  ul: ({ children }) => (
    <ul className="mb-2.5 list-disc pl-5 space-y-1 leading-7">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-2.5 list-decimal pl-5 space-y-1 leading-7">{children}</ol>
  ),
  li: ({ children }) => <li>{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-white">{children}</strong>
  ),
  code: ({ children }) => (
    <code className="rounded-md bg-white/10 px-1.5 py-0.5 text-[0.82em] font-mono text-violet-300">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="mb-3 overflow-x-auto rounded-xl bg-black/40 border border-white/10 p-4 text-sm font-mono leading-relaxed">
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-violet-500 pl-4 my-3 italic text-white/70">
      {children}
    </blockquote>
  ),
};

const formatTime = (timestamp) => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "";
  return date
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .replace(/\s+/g, "");
};

const Dashboard = () => {
  const chat = useChat();
  const [chatInput, setChatInput] = useState("");
  const chats = useSelector((state) => state.chat.chats);
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const isLoading = useSelector((state) => state.chat.isLoading);

  useEffect(() => {
    chat.initializeSocketConnection();
    chat.handleGetChats();
  }, []);

  const handleSubmitMessage = (event) => {
    event.preventDefault();

    const trimmedMessage = chatInput.trim();
    if (!trimmedMessage) {
      return;
    }

    chat.handleSendMessage({ message: trimmedMessage, chatId: currentChatId });
    setChatInput("");
  };

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId, chats);
  };

  const hasMessages = chats[currentChatId]?.messages?.length > 0;

  return (
    <main className="h-screen w-full bg-[#08090e] text-white flex overflow-hidden">
      {/* ── Sidebar ── */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 h-full bg-[#0c0d15] border-r border-white/[0.06]">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/[0.06]">
          <div className="w-8 h-8 rounded-lg bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
            <FaRegLightbulb title="Thinking..." />
          </div>
          <span className="text-base font-semibold tracking-tight">
            Thinkora
          </span>
        </div>

        {/* Chat list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <p className="text-[10px] uppercase tracking-widest text-white/25 font-medium px-2 mb-3">
            Recent Chats
          </p>
          {Object.values(chats).map((item, index) => (
            <button
              key={index}
              onClick={() => openChat(item.id)}
              type="button"
              className={`w-full flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm transition-all duration-150 group ${
                currentChatId === item.id
                  ? "bg-violet-600/15 text-white border border-violet-500/20"
                  : "text-white/45 hover:text-white/80 hover:bg-white/[0.04] border border-transparent"
              }`}
            >
              <span
                className={`shrink-0 transition-colors ${currentChatId === item.id ? "text-violet-400" : "text-white/20 group-hover:text-white/40"}`}
              >
                <ChatIcon />
              </span>
              <span className="truncate">{item.title}</span>
              {currentChatId === item.id && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 animate-pulse" />
              )}
            </button>
          ))}
        </div>

        {/* Sidebar footer */}
        <div className="px-4 py-4 border-t border-white/[0.06]">
          <p className="text-[10px] text-white/15 text-center tracking-widest uppercase font-mono">
            v1.0.0
          </p>
        </div>
      </aside>

      {/* ── Main ── */}
      <section className="flex-1 flex flex-col h-full overflow-hidden relative bg-linear-to-r from-[#0b0c13] via-[#0e1018] to-[#080a0d]">
        {/* Top bar */}
        <header className="h-14 flex items-center px-6  border-white/6  backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-sm text-white/50">
              {chats[currentChatId]?.title || "New conversation"}
            </span>
          </div>
        </header>

        {/* Messages */}
        <div className="messages flex-1 overflow-y-auto px-4 md:px-4 py-6 pb-36">
          <div className="max-w-3xl mx-auto">
            {hasMessages || isLoading ? (
              <div className="flex flex-col gap-5">
                {hasMessages &&
                  chats[currentChatId].messages.map((message) => {
                    const isUserMessage = message.role === "user";

                    return (
                      <div
                        key={message.id}
                        className={`flex flex-col gap-1 ${isUserMessage ? "items-end" : "items-start"}`}
                      >
                        <span className="text-[10px] tracking-widest uppercase font-mono px-1 text-white/60 flex items-center gap-2">
                          {isUserMessage ? "You" : "AI"}
                          {message.timestamp && (
                            <span className="text-[10px] text-white/40 whitespace-nowrap">
                              · {formatTime(message.timestamp)}
                            </span>
                          )}
                        </span>
                        <div
                          className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-7 ${
                            isUserMessage
                              ? "bg-violet-600/40 border border-violet-500/25 text-white rounded-tr-sm"
                              : "bg-olive-900/40 border border-white/[0.07] text-white/85 rounded-tl-sm"
                          }`}
                        >
                          {isUserMessage ? (
                            <p>{message.content}</p>
                          ) : (
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={mdComponents}
                            >
                              {message.content}
                            </ReactMarkdown>
                          )}
                        </div>
                      </div>
                    );
                  })}
                {isLoading && (
                  <div className="flex items-center gap-2 animate-pulse">
                    <span className="inline-flex items-center justify-center w-2.5 h-2.5 rounded-full bg-violet-400" />
                    <span className="text-[15px] tracking-widest uppercase font-mono px-1 text-violet-400 whitespace-nowrap">
                      AI thinking
                    </span>
                  </div>
                )}
              </div>
            ) : (
              /* ── Empty state ── */
              <div className="flex flex-col items-center text-center pt-16">
                <div className="w-14 h-14 rounded-2xl bg-violet-600/15 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-6">
                  <FaRegLightbulb title="Thinking..." />
                </div>
                <h2 className="text-2xl font-semibold tracking-tight text-white mb-2">
                  How can I help you?
                </h2>
                <p className="text-sm text-white/35 mb-10 max-w-xs">
                  Ask anything. Get clear, concise answers instantly.
                </p>
                <div className="grid grid-cols-2 gap-2.5 w-full max-w-sm">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s.label}
                      onClick={() => setChatInput(s.label)}
                      className="flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/[0.14] px-4 py-3 text-left text-sm text-white/50 hover:text-white/90 transition-all duration-150"
                    >
                      <span className="text-base">{s.icon}</span>
                      <span>{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input */}
        <footer className="absolute bottom-0 left-0 right-0 px-4 md:px-8 pb-6 pt-10 bg-linear-to-t from-[#08090e] via-[#08090e]/90 to-transparent">
          <div className="max-w-3xl mx-auto">
            <form
              onSubmit={handleSubmitMessage}
              className="flex items-center gap-3 rounded-4xl border border-white/10 bg-[#0e0f1a] px-4 py-3 shadow-2xl shadow-black/50 focus-within:border-violet-500/40 transition-all duration-200"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-white/25 tracking-wide"
              />
              <button
                type="submit"
                disabled={!chatInput.trim()}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-150 ${
                  chatInput.trim()
                    ? "bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-900/40 hover:scale-105 cursor-pointer"
                    : "bg-white/5 text-white/20 cursor-not-allowed"
                }`}
              >
                <SendIcon />
                <span>Send</span>
              </button>
            </form>
            <p className="text-center text-[10px] text-white/10 mt-3 tracking-wide">
              AI can make mistakes. Verify important information.
            </p>
          </div>
        </footer>
      </section>
    </main>
  );
};

export default Dashboard;
