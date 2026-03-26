import { createContext, useContext } from "react";
import type { ChatBubbleVariant } from "./types";

interface ChatBubbleContextValue {
  variant: ChatBubbleVariant;
  isStreaming: boolean;
}

export const ChatBubbleContext = createContext<ChatBubbleContextValue | null>(null);

export function useChatBubbleContext(): ChatBubbleContextValue {
  const context = useContext(ChatBubbleContext);
  if (!context) {
    throw new Error("ChatBubble compound components must be used within a ChatBubble");
  }
  return context;
}
