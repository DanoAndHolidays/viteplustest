import { useState, useRef, useCallback, useEffect } from "react";
import type { KeyboardEvent, ChangeEvent } from "react";
import { useI18n } from "../../../i18n";
import "./MessageInput.css";

interface MessageInputProps {
  onSend: (message: string) => void;
  onCancel?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  placeholder?: string;
  maxLength?: number;
  className?: string;
}

export function MessageInput({
  onSend,
  onCancel,
  disabled = false,
  isLoading = false,
  placeholder,
  maxLength = 4000,
  className = "",
}: MessageInputProps) {
  const { t } = useI18n();
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      if (newValue.length <= maxLength) {
        setValue(newValue);
      }
    },
    [maxLength],
  );

  const handleSend = useCallback(() => {
    const trimmed = value.trim();
    if (trimmed && !disabled && !isLoading) {
      onSend(trimmed);
      setValue("");
      textareaRef.current?.focus();
    }
  }, [value, disabled, isLoading, onSend]);

  const handleCancel = useCallback(() => {
    setValue("");
    onCancel?.();
  }, [onCancel]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
      if (e.key === "Escape" && isLoading) {
        handleCancel();
      }
    },
    [handleSend, handleCancel, isLoading],
  );

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const newHeight = Math.min(Math.max(textarea.scrollHeight, 40), 200);
      textarea.style.height = `${newHeight}px`;
    }
  }, [value]);

  return (
    <div className={`message-input ${className}`}>
      <div className="message-input-container">
        <textarea
          ref={textareaRef}
          className="message-input-textarea"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder ?? t("chat.placeholder")}
          disabled={disabled || isLoading}
          rows={1}
          aria-label={t("chat.placeholder")}
        />

        <div className="message-input-actions">
          {isLoading && onCancel && (
            <button
              type="button"
              className="message-input-cancel-btn"
              onClick={handleCancel}
              aria-label={t("chat.cancel")}
            >
              {t("chat.cancel")}
            </button>
          )}

          <button
            type="button"
            className="message-input-send-btn"
            onClick={handleSend}
            disabled={!value.trim() || disabled || isLoading}
            aria-label={t("aria.sendMessage")}
          >
            <svg
              className="message-input-send-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>

      <div className="message-input-footer">
        <span className="message-input-hint">Enter to send, Shift+Enter for newline</span>
        <span
          className={`message-input-counter ${value.length > maxLength * 0.9 ? "warning" : ""}`}
        >
          {value.length}/{maxLength}
        </span>
      </div>
    </div>
  );
}
