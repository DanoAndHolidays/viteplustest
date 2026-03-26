import { useI18n } from "../../../i18n";
import type { MessageRole } from "../../../types/ai";
import "./AIAvatar.scss";

interface AIAvatarProps {
  role: MessageRole;
  size?: "sm" | "md" | "lg";
  status?: "online" | "offline" | "thinking";
  className?: string;
  fallback?: string;
}

const defaultAvatars: Record<MessageRole, string> = {
  user: "👤",
  assistant: "🤖",
  system: "⚙️",
};

export function AIAvatar({ role, size = "md", status, className = "", fallback }: AIAvatarProps) {
  const { t } = useI18n();

  const ariaLabel = role === "user" ? t("aria.userAvatar") : t("aria.aiAvatar");

  return (
    <div
      className={`ai-avatar ai-avatar-${size} ai-avatar-${role} ${className}`}
      role="img"
      aria-label={ariaLabel}
    >
      <span className="ai-avatar-icon">{fallback ?? defaultAvatars[role]}</span>
      {status && <span className={`ai-avatar-status ai-avatar-status-${status}`} />}
    </div>
  );
}
