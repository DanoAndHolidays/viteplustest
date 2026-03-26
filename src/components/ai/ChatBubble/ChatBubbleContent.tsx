import type { ChatBubbleContentProps } from "./types";

export function ChatBubbleContent({ children, className = "" }: ChatBubbleContentProps) {
  return <div className={`chat-bubble-content ${className}`}>{children}</div>;
}
