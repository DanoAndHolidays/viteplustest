import { useReducer, useCallback, createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { ChatState, ChatAction, TextMessage } from "../types/ai";

const initialState: ChatState = {
  messages: [],
  isLoading: false,
  error: null,
};

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
        error: null,
      };

    case "UPDATE_MESSAGE":
      return {
        ...state,
        messages: state.messages.map((msg) =>
          msg.id === action.payload.id ? { ...msg, ...action.payload.updates } : msg,
        ),
      };

    case "UPDATE_STREAM":
      return {
        ...state,
        messages: state.messages.map((msg) =>
          msg.id === action.payload.id
            ? {
                ...msg,
                content: action.payload.text,
                status: action.payload.done ? "sent" : "streaming",
              }
            : msg,
        ),
      };

    case "DELETE_MESSAGE":
      return {
        ...state,
        messages: state.messages.filter((msg) => msg.id !== action.payload),
      };

    case "CLEAR_MESSAGES":
      return {
        ...state,
        messages: [],
        error: null,
      };

    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
}

interface ChatContextValue {
  state: ChatState;
  addMessage: (message: Omit<TextMessage, "id" | "createdAt">) => string;
  updateMessage: (id: string, updates: Partial<TextMessage>) => void;
  updateStream: (id: string, text: string, done: boolean) => void;
  deleteMessage: (id: string) => void;
  clearMessages: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

interface ChatProviderProps {
  children: ReactNode;
  initialMessages?: TextMessage[];
}

export function ChatProvider({ children, initialMessages = [] }: ChatProviderProps) {
  const [state, dispatch] = useReducer(chatReducer, {
    ...initialState,
    messages: initialMessages,
  });

  const addMessage = useCallback((message: Omit<TextMessage, "id" | "createdAt">): string => {
    const id = generateId();
    const newMessage: TextMessage = {
      ...message,
      id,
      createdAt: new Date(),
    };
    dispatch({ type: "ADD_MESSAGE", payload: newMessage });
    return id;
  }, []);

  const updateMessage = useCallback((id: string, updates: Partial<TextMessage>) => {
    dispatch({ type: "UPDATE_MESSAGE", payload: { id, updates } });
  }, []);

  const updateStream = useCallback((id: string, text: string, done: boolean) => {
    dispatch({ type: "UPDATE_STREAM", payload: { id, text, done } });
  }, []);

  const deleteMessage = useCallback((id: string) => {
    dispatch({ type: "DELETE_MESSAGE", payload: id });
  }, []);

  const clearMessages = useCallback(() => {
    dispatch({ type: "CLEAR_MESSAGES" });
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    dispatch({ type: "SET_LOADING", payload: loading });
  }, []);

  const setError = useCallback((error: Error | null) => {
    dispatch({ type: "SET_ERROR", payload: error });
  }, []);

  return (
    <ChatContext.Provider
      value={{
        state,
        addMessage,
        updateMessage,
        updateStream,
        deleteMessage,
        clearMessages,
        setLoading,
        setError,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat(): ChatContextValue {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}

// Simulated streaming response for demo
export async function simulateStreamingResponse(
  text: string,
  onChunk: (chunk: string) => void,
  onDone: () => void,
  delay = 30,
): Promise<void> {
  const words = text.split(" ");

  for (let i = 0; i < words.length; i++) {
    await new Promise<void>((resolve) => setTimeout(resolve, delay));
    onChunk(words[i] + (i < words.length - 1 ? " " : ""));
  }

  onDone();
}
