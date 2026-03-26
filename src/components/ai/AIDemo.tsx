import { useCallback } from "react";
import { ChatBubble, ThinkingIndicator, AIAvatar, MessageInput } from "./index";
import { ChatProvider, useChat, simulateStreamingResponse } from "../../hooks/useChat";
import { I18nProvider, useI18n } from "../../i18n";
import type { TextMessage } from "../../types/ai";
import "./AIDemo.css";

const DEMO_RESPONSES = [
  "Hello! I'm an AI assistant. I can help you with various tasks like answering questions, writing code, or just having a conversation. What can I help you with today?",
  "That's an interesting question! Let me think about it... Based on my knowledge, I would say that the answer depends on several factors. Would you like me to elaborate on any specific aspect?",
  "I understand what you're looking for. Here's my response: The key insight here is that good design is about solving problems in elegant ways. Let me explain further...",
  "Great question! In TypeScript, we can use generics to create reusable components that are type-safe. Here's an example of how that works in practice...",
];

function ChatView() {
  const { state, addMessage, updateStream, setLoading } = useChat();
  const { locale, setLocale, t } = useI18n();

  const handleSend = useCallback(
    async (message: string) => {
      // Add user message
      addMessage({
        role: "user",
        content: message,
        status: "sent",
      });

      // Simulate AI response
      setLoading(true);
      const assistantId = addMessage({
        role: "assistant",
        content: "",
        status: "streaming",
      });

      const response = DEMO_RESPONSES[Math.floor(Math.random() * DEMO_RESPONSES.length)];

      await simulateStreamingResponse(
        response,
        (chunk) =>
          updateStream(
            assistantId,
            (state.messages.find((m) => m.id === assistantId)?.content ?? "") + chunk,
            false,
          ),
        () => updateStream(assistantId, response, true),
      );

      setLoading(false);
    },
    [addMessage, updateStream, setLoading, state.messages],
  );

  return (
    <div className="ai-demo">
      <header className="ai-demo-header">
        <h1 className="ai-demo-title">AI Chat Demo</h1>
        <div className="ai-demo-locale-switch">
          <button
            className={`locale-btn ${locale === "en" ? "active" : ""}`}
            onClick={() => setLocale("en")}
          >
            EN
          </button>
          <button
            className={`locale-btn ${locale === "zh" ? "active" : ""}`}
            onClick={() => setLocale("zh")}
          >
            中文
          </button>
        </div>
      </header>

      <div className="ai-demo-chat">
        {state.messages.length === 0 && (
          <div className="ai-demo-empty">
            <AIAvatar role="assistant" size="lg" status="online" />
            <p>Start a conversation with me!</p>
          </div>
        )}

        {state.messages.map((message: TextMessage) => (
          <div key={message.id} className="ai-demo-message-row">
            {message.role === "user" ? (
              <>
                <div className="ai-demo-spacer" />
                <ChatBubble
                  message={message}
                  onCopy={() => console.log("Copy:", message.content)}
                />
                <AIAvatar role="user" size="sm" />
              </>
            ) : (
              <>
                <AIAvatar
                  role="assistant"
                  size="sm"
                  status={message.status === "streaming" ? "thinking" : "online"}
                />
                <ChatBubble
                  message={message}
                  onCopy={() => console.log("Copy:", message.content)}
                />
                <div className="ai-demo-spacer" />
              </>
            )}
          </div>
        ))}

        {state.isLoading && (
          <div className="ai-demo-message-row">
            <AIAvatar role="assistant" size="sm" status="thinking" />
            <ThinkingIndicator />
            <div className="ai-demo-spacer" />
          </div>
        )}
      </div>

      <div className="ai-demo-input">
        <MessageInput
          onSend={handleSend}
          isLoading={state.isLoading}
          placeholder={t("chat.placeholder")}
        />
      </div>
    </div>
  );
}

export function AIDemo() {
  return (
    <I18nProvider initialLocale="en">
      <ChatProvider>
        <ChatView />
      </ChatProvider>
    </I18nProvider>
  );
}
