import { formatTime, useI18n } from "../../../i18n";
import type { ChatBubbleTimestampProps } from "./types";

export function ChatBubbleTimestamp({ date, className = "" }: ChatBubbleTimestampProps) {
  const { t } = useI18n();

  return (
    <span className={`chat-bubble-timestamp ${className}`}>
      {formatTime(date, t as (key: string) => string)}
    </span>
  );
}
