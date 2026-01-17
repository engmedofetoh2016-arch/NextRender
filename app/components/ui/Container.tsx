// components/ui/Container.tsx
"use client";
import React from "react";
import type { ContainerNode, UISchema } from "../renderer/types";

export default function Container({
  node,
  renderChild,
}: {
  node: ContainerNode;
  renderChild: (child: UISchema, i: number) => React.ReactNode;
}) {
  return (
    <div style={{ padding: 16, border: "1px solid #ddd", borderRadius: 12, marginBottom: 12 }}>
      {node.title ? <h2 style={{ marginTop: 0 }}>{node.title}</h2> : null}
      <div style={{ display: "grid", gap: 12 }}>{node.children.map(renderChild)}</div>
    </div>
  );
}