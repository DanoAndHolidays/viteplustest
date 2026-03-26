export const zh = {
  chat: {
    placeholder: "输入消息...",
    thinking: "思考中",
    retry: "重试",
    send: "发送",
    cancel: "取消",
    copy: "复制",
    copied: "已复制!",
    error: "发送消息失败",
    loading: "加载中...",
  },
  time: {
    justNow: "刚刚",
    minutesAgo: "{count} 分钟前",
    minutesAgo_plural: "{count} 分钟前",
    hoursAgo: "{count} 小时前",
    hoursAgo_plural: "{count} 小时前",
    yesterday: "昨天",
  },
  aria: {
    thinking: "AI 正在思考",
    sendMessage: "发送消息",
    userAvatar: "用户头像",
    aiAvatar: "AI 助手头像",
    close: "关闭",
  },
} as const;

export type TranslationKeys = typeof zh;
