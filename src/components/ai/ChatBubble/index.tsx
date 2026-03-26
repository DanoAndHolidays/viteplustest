import { useState, useCallback } from "react";
import { ChatBubbleContext } from "./ChatBubbleContext";
import { ChatBubbleContent } from "./ChatBubbleContent";
import { ChatBubbleTimestamp } from "./ChatBubbleTimestamp";
import { ChatBubbleActions } from "./ChatBubbleActions";
import { useI18n } from "../../../i18n";
import type { ChatBubbleProps, ChatBubbleVariant } from "./types";
import "./ChatBubble.css";

function CopyButton({ onCopy }: { onCopy?: () => void }) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    onCopy?.();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [onCopy]);

  return (
    <button
      className="chat-bubble-copy-btn"
      onClick={handleCopy}
      aria-label={t("chat.copy")}
      title={t("chat.copy")}
    >
      {copied ? t("chat.copied") : t("chat.copy")}
    </button>
  );
}

export function ChatBubble({
  message,
  variant,
  showTimestamp = true,
  onRetry,
  onCopy,
  children,
}: ChatBubbleProps) {
  const { t } = useI18n();
  const resolvedVariant: ChatBubbleVariant = variant ?? message.role;
  const isStreaming = message.status === "streaming";

  const handleCopy = useCallback(() => {
    void navigator.clipboard.writeText(message.content);
    onCopy?.();
  }, [message.content, onCopy]);

  return (
    <ChatBubbleContext.Provider value={{ variant: resolvedVariant, isStreaming }}>
      <div
        className={`chat-bubble chat-bubble-${resolvedVariant} ${isStreaming ? "chat-bubble-streaming" : ""}`}
        data-message-id={message.id}
      >
        <div className="chat-bubble-main">
          {children ? (
            children
          ) : (
            <>
              <ChatBubbleContent isStreaming={isStreaming}>{message.content}</ChatBubbleContent>
              {showTimestamp && <ChatBubbleTimestamp date={message.createdAt} />}
            </>
          )}
        </div>

        {(onRetry || onCopy) && !isStreaming && (
          <ChatBubbleActions>
            {onCopy && <CopyButton onCopy={handleCopy} />}
            {onRetry && (
              <button
                className="chat-bubble-retry-btn"
                onClick={onRetry}
                aria-label={t("chat.retry")}
                title={t("chat.retry")}
              >
                {t("chat.retry")}
              </button>
            )}
          </ChatBubbleActions>
        )}
      </div>
    </ChatBubbleContext.Provider>
  );
}

// Compound components
ChatBubble.Content = ChatBubbleContent;
ChatBubble.Timestamp = ChatBubbleTimestamp;
ChatBubble.Actions = ChatBubbleActions;
