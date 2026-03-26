<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, but it invokes Vite through `vp dev` and `vp build`.

## Vite+ Workflow

`vp` is a global binary that handles the full development lifecycle. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

### Start

- create - Create a new project from a template
- migrate - Migrate an existing project to Vite+
- config - Configure hooks and agent integration
- staged - Run linters on staged files
- install (`i`) - Install dependencies
- env - Manage Node.js versions

### Develop

- dev - Run the development server
- check - Run format, lint, and TypeScript type checks
- lint - Lint code
- fmt - Format code
- test - Run tests

### Execute

- run - Run monorepo tasks
- exec - Execute a command from local `node_modules/.bin`
- dlx - Execute a package binary without installing it as a dependency
- cache - Manage the task cache

### Build

- build - Build for production
- pack - Build libraries
- preview - Preview production build

### Manage Dependencies

Vite+ automatically detects and wraps the underlying package manager such as pnpm, npm, or Yarn through the `packageManager` field in `package.json` or package manager-specific lockfiles.

- add - Add packages to dependencies
- remove (`rm`, `un`, `uninstall`) - Remove packages from dependencies
- update (`up`) - Update packages to latest versions
- dedupe - Deduplicate dependencies
- outdated - Check for outdated packages
- list (`ls`) - List installed packages
- why (`explain`) - Show why a package is installed
- info (`view`, `show`) - View package information from the registry
- link (`ln`) / unlink - Manage local package links
- pm - Forward a command to the package manager

### Maintain

- upgrade - Update `vp` itself to the latest version

These commands map to their corresponding tools. For example, `vp dev --port 3000` runs Vite's dev server and works the same as Vite. `vp test` runs JavaScript tests through the bundled Vitest. The version of all tools can be checked using `vp --version`. This is useful when researching documentation, features, and bugs.

## Common Pitfalls

- **Using the package manager directly:** Do not use pnpm, npm, or Yarn directly. Vite+ can handle all package manager operations.
- **Always use Vite commands to run tools:** Don't attempt to run `vp vitest` or `vp oxlint`. They do not exist. Use `vp test` and `vp lint` instead.
- **Running scripts:** Vite+ built-in commands (`vp dev`, `vp build`, `vp test`, etc.) always run the Vite+ built-in tool, not any `package.json` script of the same name. To run a custom script that shares a name with a built-in command, use `vp run <script>`. For example, if you have a custom `dev` script that runs multiple services concurrently, run it with `vp run dev`, not `vp dev` (which always starts Vite's dev server).
- **Do not install Vitest, Oxlint, Oxfmt, or tsdown directly:** Vite+ wraps these tools. They must not be installed directly. You cannot upgrade these tools by installing their latest versions. Always use Vite+ commands.
- **Use Vite+ wrappers for one-off binaries:** Use `vp dlx` instead of package-manager-specific `dlx`/`npx` commands.
- **Import JavaScript modules from `vite-plus`:** Instead of importing from `vite` or `vitest`, all modules should be imported from the project's `vite-plus` dependency. For example, `import { defineConfig } from 'vite-plus';` or `import { expect, test, vi } from 'vite-plus/test';`. You must not install `vitest` to import test utilities.
- **Type-Aware Linting:** There is no need to install `oxlint-tsgolint`, `vp lint --type-aware` works out of the box.

## Known Issues

- **pre-commit hook fails on vite.config.ts:** The Vite+ staged hook (`vp staged`) has a bug where it fails when processing `vite.config.ts` with error "Failed to load configuration file. Unknown file extension .ts". **Workaround:** Temporarily rename `.vite-hooks/pre-commit` to bypass the hook, commit, then rename it back.
  ```bash
  mv .vite-hooks/pre-commit /tmp/pre-commit.bak
  git commit -m "message"
  mv /tmp/pre-commit.bak .vite-hooks/pre-commit
  ```

## CI Integration

For GitHub Actions, consider using [`voidzero-dev/setup-vp`](https://github.com/voidzero-dev/setup-vp) to replace separate `actions/setup-node`, package-manager setup, cache, and install steps with a single action.

```yaml
- uses: voidzero-dev/setup-vp@v1
  with:
    cache: true
- run: vp check
- run: vp test
```

## Review Checklist for Agents

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to validate changes.
<!--VITE PLUS END-->

<!--AI COMPONENTS START-->

# AI Agent UI 组件库

本项目正在开发一个 **AI Agent UI 组件库**，专注于对话式 AI 交互界面。

---

## 1. 技术栈

- **React 19 + TypeScript 5.9** - 完整类型支持
- **Compound Components** - 组合组件模式
- **Context + useReducer** - 状态管理
- **Pure CSS + CSS Variables** - 样式和暗色模式

---

## 2. 目录结构

```
src/
├── types/ai.ts              # 全局类型定义
├── i18n/                    # 国际化 (en/zh)
│   ├── index.tsx            # I18nProvider, useI18n hook
│   ├── en.ts
│   └── zh.ts
├── hooks/                   # 自定义 Hooks
│   ├── useChat.tsx          # Chat 状态管理 (核心)
│   ├── useStreamingText.ts  # 流式文本处理
│   └── useTypewriter.ts     # 打字机动画
└── components/ai/           # AI 组件
    ├── ChatBubble/          # 消息气泡 (复合组件)
    ├── ThinkingIndicator/   # 思考动画
    ├── AIAvatar/            # 头像
    ├── MessageInput/        # 输入框
    └── AIDemo.tsx           # 完整 Demo
```

---

## 3. 类型设计 (types/ai.ts)

### 核心类型

```typescript
// 消息角色
type MessageRole = "user" | "assistant" | "system";

// 消息状态
type MessageStatus = "sending" | "sent" | "error" | "streaming";

// 基础消息
interface BaseMessage {
  id: string;
  role: MessageRole;
  createdAt: Date;
  status?: MessageStatus;
}

// 文本消息
interface TextMessage extends BaseMessage {
  content: string;
}
```

### 设计原则

1. **Discriminated Unions** - 使用 `status` 字段区分不同状态
2. **Extends Pattern** - `TextMessage extends BaseMessage`
3. **Action Discriminated Unions** - Reducer Action 类型安全

---

## 4. 状态管理 (useChat.tsx)

### Context + Reducer 模式

```typescript
// State
interface ChatState {
  messages: TextMessage[];
  isLoading: boolean;
  error: Error | null;
}

// Actions - Discriminated Union
type ChatAction =
  | { type: "ADD_MESSAGE"; payload: TextMessage }
  | { type: "UPDATE_STREAM"; payload: { id: string; text: string; done: boolean } }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: Error | null };
```

### Provider 接口

```typescript
interface ChatContextValue {
  state: ChatState;
  addMessage: (message: Omit<TextMessage, "id" | "createdAt">) => string;
  updateStream: (id: string, text: string, done: boolean) => void;
  clearMessages: () => void;
  setLoading: (loading: boolean) => void;
}
```

### 设计原则

1. **Immutable Updates** - Reducer 返回新对象，不直接修改 state
2. **ID Generation** - Provider 内部生成 ID，对外屏蔽实现细节

---

## 5. Compound Components 模式

### ChatBubble 结构

```tsx
// 1. Context 定义共享状态
interface ChatBubbleContextValue {
  variant: "user" | "assistant" | "system";
  isStreaming: boolean;
}

// 2. Root Component - 提供 Context
function ChatBubble({ message, children }) {
  return (
    <ChatBubbleContext.Provider value={{ variant, isStreaming }}>
      <div className={`chat-bubble chat-bubble-${variant}`}>{children}</div>
    </ChatBubbleContext.Provider>
  );
}

// 3. Compound Components - 消费 Context
ChatBubble.Content = ChatBubbleContent;
ChatBubble.Timestamp = ChatBubbleTimestamp;
ChatBubble.Actions = ChatBubbleActions;

// 4. 使用方式
<ChatBubble message={msg}>
  <ChatBubble.Content>{msg.content}</ChatBubble.Content>
  <ChatBubble.Timestamp date={msg.createdAt} />
</ChatBubble>;
```

---

## 6. 国际化 (i18n)

### Provider 模式

```typescript
interface I18nContextValue {
  locale: 'en' | 'zh';
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

function I18nProvider({ children, initialLocale = 'en' }) {
  const [locale, setLocale] = useState(initialLocale);
  const t = useCallback((key) => {
    return getNestedValue(translations[locale], key);
  }, [locale]);
  return <I18nContext.Provider value={{ locale, setLocale, t }}>{children}</I18nContext.Provider>;
}
```

### 翻译文件结构

```typescript
// en.ts
export const en = {
  chat: {
    placeholder: "Type a message...",
    thinking: "Thinking",
  },
} as const;
```

### 设计原则

1. **as const** - 断言为只读对象，保证类型安全
2. **Dot Notation** - 层级通过点号访问，如 `t('chat.placeholder')`

---

## 7. 流式文本处理

### useStreamingText Hook

```typescript
interface UseStreamingTextReturn {
  text: string; // 完整文本
  isStreaming: boolean; // 是否正在流式传输
  chunks: string[]; // 收到的所有 chunk
  appendChunk: (chunk: string) => void;
  finish: () => void;
  reset: () => void;
}
```

### 模拟流式响应

```typescript
async function simulateStreamingResponse(
  text: string,
  onChunk: (chunk: string) => void,
  onDone: () => void,
  delay = 30,
) {
  const words = text.split(" ");
  for (const word of words) {
    await new Promise((r) => setTimeout(r, delay));
    onChunk(word + " ");
  }
  onDone();
}
```

---

## 8. CSS 架构

### CSS 变量主题

```css
/* 亮色模式 */
:root {
  --chat-user-bg: #3b82f6;
  --chat-assistant-bg: #f3f4f6;
}

/* 暗色模式 */
@media (prefers-color-scheme: dark) {
  :root {
    --chat-user-bg: #2563eb;
    --chat-assistant-bg: #374151;
  }
}
```

---

## 9. 组件清单

| 组件              | 文件                               | 模式     | 状态    |
| ----------------- | ---------------------------------- | -------- | ------- |
| ChatBubble        | `components/ai/ChatBubble/`        | Compound | ✅ 完成 |
| ThinkingIndicator | `components/ai/ThinkingIndicator/` | Simple   | ✅ 完成 |
| AIAvatar          | `components/ai/AIAvatar/`          | Simple   | ✅ 完成 |
| MessageInput      | `components/ai/MessageInput/`      | Simple   | ✅ 完成 |

---

## 10. 扩展方向

### 待实现组件

- [ ] **CodeBlock** - 代码块渲染 + 语法高亮
- [ ] **MarkdownRenderer** - Markdown 解析
- [ ] **AttachmentPreview** - 文件/图片预览
- [ ] **StreamingText** - 单独的流式文本组件
- [ ] **PromptTemplate** - Prompt 编辑器

### 技术扩展

- [ ] 集成真正的 AI API (OpenAI / Claude)
- [ ] 消息持久化 (localStorage)
- [ ] 深色模式手动切换
- [ ] 组件单元测试

<!--AI COMPONENTS END-->
