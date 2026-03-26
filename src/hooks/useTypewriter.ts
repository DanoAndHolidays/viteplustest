import { useState, useEffect, useRef, useCallback } from "react";

interface UseTypewriterOptions {
  speed?: number; // ms per character
  startDelay?: number;
  enabled?: boolean;
  onComplete?: () => void;
}

export function useTypewriter(text: string, options: UseTypewriterOptions = {}) {
  const { speed = 30, startDelay = 0, enabled = true, onComplete } = options;

  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const indexRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onCompleteRef = useRef(onComplete);

  onCompleteRef.current = onComplete;

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const stop = useCallback(() => {
    clearTimer();
    setIsTyping(false);
    // Show full text when stopped
    setDisplayedText(text);
    indexRef.current = text.length;
  }, [clearTimer, text]);

  const restart = useCallback(() => {
    clearTimer();
    indexRef.current = 0;
    setDisplayedText("");
    setIsTyping(enabled);
  }, [clearTimer, enabled]);

  useEffect(() => {
    if (!enabled) {
      setDisplayedText(text);
      return;
    }

    restart();

    setTimeout(() => {
      setIsTyping(true);

      const typeNext = () => {
        if (indexRef.current < text.length) {
          indexRef.current++;
          setDisplayedText(text.slice(0, indexRef.current));
          timeoutRef.current = setTimeout(typeNext, speed);
        } else {
          setIsTyping(false);
          onCompleteRef.current?.();
        }
      };

      typeNext();
    }, startDelay);

    return clearTimer;
  }, [text, speed, startDelay, enabled, clearTimer, restart]);

  return {
    displayedText,
    isTyping,
    progress: text.length > 0 ? indexRef.current / text.length : 1,
    stop,
    restart,
  };
}
