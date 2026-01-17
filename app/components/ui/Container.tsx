"use client";
import React from "react";
import type { ContainerNode, UISchema } from "../renderer/types";
import { theme } from "@/app/theme";

export default function Container({
  node,
  renderChild,
}: {
  node: ContainerNode;
  renderChild: (child: UISchema, i: number) => React.ReactNode;
}) {
  return (
    <section
      style={{
        background: "rgba(15,23,42,.72)",
        border: `1px solid ${theme.border}`,
        borderRadius: theme.radius,
        boxShadow: theme.shadow,
        padding: 18,
      }}
    >
      {node.title ? (
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12 }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, letterSpacing: -0.2 }}>{node.title}</h2>
          <span style={{ fontSize: 12, color: theme.mutText }}>Runtime schema</span>
        </div>
      ) : null}

      <div style={{ display: "grid", gap: 14 }}>
        {node.children.map(renderChild)}
      </div>
    </section>
  );
}
