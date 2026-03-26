export const en = {
  chat: {
    placeholder: "Type a message...",
    thinking: "Thinking",
    retry: "Retry",
    send: "Send",
    cancel: "Cancel",
    copy: "Copy",
    copied: "Copied!",
    error: "Failed to send message",
    loading: "Loading...",
  },
  time: {
    justNow: "Just now",
    minutesAgo: "{count} minute ago",
    minutesAgo_plural: "{count} minutes ago",
    hoursAgo: "{count} hour ago",
    hoursAgo_plural: "{count} hours ago",
    yesterday: "Yesterday",
  },
  aria: {
    thinking: "AI is thinking",
    sendMessage: "Send message",
    userAvatar: "User avatar",
    aiAvatar: "AI assistant avatar",
    close: "Close",
  },
} as const;

export type TranslationKeys = typeof en;
