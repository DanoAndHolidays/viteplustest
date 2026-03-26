import type { TextMessage, MessageRole } from "../../../types/ai";

export type ChatBubbleVariant = Extract<MessageRole, "user" | "assistant" | "system">;

export interface ChatBubbleProps {
  message: TextMessage;
  variant?: ChatBubbleVariant;
  showTimestamp?: boolean;
  onRetry?: () => void;
  onCopy?: () => void;
  children?: React.ReactNode;
}

export interface ChatBubbleContentProps {
  children: React.ReactNode;
  isStreaming?: boolean;
  className?: string;
}

export interface ChatBubbleTimestampProps {
  date: Date;
  className?: string;
}

export interface ChatBubbleActionsProps {
  children: React.ReactNode;
  className?: string;
}

export interface ChatBubbleAvatarProps {
  role: MessageRole;
  className?: string;
}
