import { useState } from "react";
import { Modal } from "./Modal";

export function ModalExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCompoundOpen, setIsCompoundOpen] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Modal 组件示例</h2>

      <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
        <button onClick={() => setIsOpen(true)}>打开基础 Modal</button>
        <button onClick={() => setIsCompoundOpen(true)}>打开复合组件 Modal</button>
      </div>

      {/* 基础 Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="确认操作"
        size="md"
        footer={
          <>
            <button onClick={() => setIsOpen(false)}>取消</button>
            <button
              onClick={() => {
                alert("确认成功！");
                setIsOpen(false);
              }}
              style={{ background: "var(--accent)", color: "#fff" }}
            >
              确认
            </button>
          </>
        }
      >
        <p>这是一个基于 frontend-patterns 创建的 Modal 组件。</p>
        <p>特性包括：</p>
        <ul>
          <li>ESC 键关闭</li>
          <li>点击遮罩关闭</li>
          <li>焦点管理</li>
          <li>Body scroll 锁定</li>
          <li>多种尺寸选择</li>
        </ul>
      </Modal>

      {/* 复合组件 Modal */}
      <Modal
        isOpen={isCompoundOpen}
        onClose={() => setIsCompoundOpen(false)}
        title="复合组件模式"
        size="lg"
      >
        <p>
          这个 Modal 展示了复合组件模式（Compound Components Pattern）。 虽然头部和底部通过 props
          传入，但内部结构支持解构使用。
        </p>
        <p>复合组件模式的优点是更灵活，可以自定义头部和底部的布局，而不必受限于单一的 API 设计。</p>
      </Modal>
    </div>
  );
}
