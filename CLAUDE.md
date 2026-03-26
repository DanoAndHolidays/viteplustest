# CLAUDE.md

此文件为 Claude Code (claude.ai/code) 在本仓库中工作时提供指导。

## 项目概述

这是一个 Vite Plus 项目 - 建立在 Vite、Rolldown、Vitest、tsdown、Oxlint 和 Oxfmt 之上的统一工具链。它与普通 Vite 不同。

## 开发命令

- `vp dev` - 启动开发服务器
- `vp build` - 构建生产版本
- `vp preview` - 预览生产版本
- `vp check` - 运行格式检查、代码检查和 TypeScript 类型检查
- `vp test` - 运行测试
- `vp lint` - 代码检查
- `vp fmt` - 代码格式化

## 重要约定

- **始终使用 `vp` 而不是直接使用包管理器。** 不要使用 pnpm、npm 或 yarn，Vite+ 会自动处理包管理。
- **从 `vite-plus` 导入**，而不是 `vite` 或 `vitest`。例如：`import { defineConfig } from 'vite-plus'` 或 `import { expect, test, vi } from 'vite-plus/test'`。
- **不要直接安装** Vitest、Oxlint、Oxfmt 或 tsdown - 它们已内置于 Vite+ 中。
- **Vite+ 内置命令**（如 `vp dev`、`vp build`、`vp test` 等）始终运行 Vite+ 内置工具。如果存在同名自定义脚本，请使用 `vp run <script>`。

## 项目架构

这是一个 React 19 + TypeScript 5.9 应用，源代码位于 `src/` 目录：

- `main.tsx` - 应用入口
- `App.tsx` - 根组件
- `Counter.tsx` - 示例组件
- `style.css` - 全局样式
- `assets/` - 静态资源（hero.png、vite.svg、typescript.svg）
- `types/ai.ts` - AI 组件库类型定义
- `i18n/` - 国际化（en/zh）
- `hooks/` - 自定义 Hooks（useChat, useStreamingText, useTypewriter）
- `components/ai/` - AI 组件库（ChatBubble, ThinkingIndicator, AIAvatar, MessageInput）

## AI 组件库

本项目正在开发一个 **AI Agent UI 组件库**，专注于对话式 AI 交互界面。

详细设计文档参见 [AGENTS.md](./AGENTS.md#ai-agent-ui-组件库)。

### 技术栈

- React Compound Components 模式
- Context + useReducer 状态管理
- 纯 CSS 变量 + Dark Mode
- 完整 TypeScript 类型

### 组件列表

| 组件              | 说明                   | 状态 |
| ----------------- | ---------------------- | ---- |
| ChatBubble        | 消息气泡，支持流式输出 | ✅   |
| ThinkingIndicator | AI 思考动画            | ✅   |
| AIAvatar          | 头像组件               | ✅   |
| MessageInput      | 输入框                 | ✅   |
