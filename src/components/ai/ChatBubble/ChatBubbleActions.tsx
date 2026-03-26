import type { ChatBubbleActionsProps } from "./types";

export function ChatBubbleActions({ children, className = "" }: ChatBubbleActionsProps) {
  return <div className={`chat-bubble-actions ${className}`}>{children}</div>;
}
