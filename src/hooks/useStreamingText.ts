import { useState, useCallback, useRef } from "react";

interface StreamingTextState {
  text: string;
  isStreaming: boolean;
  chunks: string[];
}

interface UseStreamingTextOptions {
  onComplete?: (fullText: string) => void;
}

export function useStreamingText(options: UseStreamingTextOptions = {}) {
  const [state, setState] = useState<StreamingTextState>({
    text: "",
    isStreaming: false,
    chunks: [],
  });

  const chunksRef = useRef<string[]>([]);
  const onCompleteRef = useRef(options.onComplete);

  // Keep callback ref updated
  onCompleteRef.current = options.onComplete;

  const startStreaming = useCallback(() => {
    chunksRef.current = [];
    setState({
      text: "",
      isStreaming: true,
      chunks: [],
    });
  }, []);

  const appendChunk = useCallback((chunk: string) => {
    if (!chunk) return;

    chunksRef.current.push(chunk);
    const fullText = chunksRef.current.join("");

    setState((prev) => ({
      ...prev,
      text: fullText,
      isStreaming: true,
      chunks: [...chunksRef.current],
    }));
  }, []);

  const finish = useCallback(() => {
    const fullText = chunksRef.current.join("");
    setState({
      text: fullText,
      isStreaming: false,
      chunks: chunksRef.current,
    });
    onCompleteRef.current?.(fullText);
  }, []);

  const reset = useCallback(() => {
    chunksRef.current = [];
    setState({
      text: "",
      isStreaming: false,
      chunks: [],
    });
  }, []);

  const setText = useCallback((text: string) => {
    chunksRef.current = [text];
    setState({
      text,
      isStreaming: false,
      chunks: [text],
    });
  }, []);

  return {
    text: state.text,
    isStreaming: state.isStreaming,
    chunks: state.chunks,
    startStreaming,
    appendChunk,
    finish,
    reset,
    setText,
  };
}
