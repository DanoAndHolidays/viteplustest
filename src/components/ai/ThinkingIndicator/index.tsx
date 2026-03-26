import { useI18n } from "../../../i18n";
import "./ThinkingIndicator.css";

interface ThinkingIndicatorProps {
  className?: string;
  label?: string;
}

export function ThinkingIndicator({ className = "", label }: ThinkingIndicatorProps) {
  const { t } = useI18n();

  return (
    <div
      className={`thinking-indicator ${className}`}
      role="status"
      aria-label={label ?? t("chat.thinking")}
    >
      <div className="thinking-dots">
        <span className="thinking-dot" />
        <span className="thinking-dot" />
        <span className="thinking-dot" />
      </div>
      {(label ?? t("chat.thinking")) && (
        <span className="thinking-label">{label ?? t("chat.thinking")}</span>
      )}
    </div>
  );
}
