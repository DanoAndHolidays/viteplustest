// AI Chat Types

export type MessageRole = "user" | "assistant" | "system";

export type MessageStatus = "sending" | "sent" | "error" | "streaming";

export interface BaseMessage {
  id: string;
  role: MessageRole;
  createdAt: Date;
  status?: MessageStatus;
}

export interface TextMessage extends BaseMessage {
  content: string;
}

export interface Attachment {
  id: string;
  type: "image" | "file" | "code";
  url?: string;
  content?: string;
  language?: string;
  name?: string;
}

export interface MultimodalMessage extends BaseMessage {
  content: string;
  attachments?: Attachment[];
}

export type Message<TContent = string> = {
  id: string;
  role: MessageRole;
  content: TContent;
  createdAt: Date;
  status?: MessageStatus;
};

export interface ChatState {
  messages: TextMessage[];
  isLoading: boolean;
  error: Error | null;
}

export interface ChatConfig {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
}

export type StreamState = { status: "idle" } | { status: "streaming"; text: string; done: boolean };

export interface StreamingMessage extends TextMessage {
  streamState: StreamState;
}

// Action types for useChat reducer
export type ChatAction =
  | { type: "ADD_MESSAGE"; payload: TextMessage }
  | { type: "UPDATE_MESSAGE"; payload: { id: string; updates: Partial<TextMessage> } }
  | { type: "UPDATE_STREAM"; payload: { id: string; text: string; done: boolean } }
  | { type: "DELETE_MESSAGE"; payload: string }
  | { type: "CLEAR_MESSAGES" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: Error | null };
