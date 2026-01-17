// components/ui/FilterBar.tsx
"use client";
import React from "react";
import type { FilterBarNode } from "../renderer/types";
import { useData } from "../renderer/DataProvider";
import { theme } from "@/app/theme";


export default function FilterBar({ node }: { node: FilterBarNode }) {
  const { filters, setFilter } = useData();
  const current = filters[node.target] ?? {};

  return (
    <div style={{ display: "flex", gap: 12, alignItems: "end", flexWrap: "wrap" }}>
      {node.fields.map((f) => (
        <label key={f.key} style={{ display: "grid", gap: 6 }}>
          <span style={{ fontSize: 12, opacity: 0.7 }}>{f.label}</span>
          <input
            value={current[f.key] ?? ""}
            onChange={(e) => setFilter(node.target, f.key, e.target.value)}
            placeholder={f.type === "text" ? "..." : ""}
            style={{ padding: "10px 12px", border: `1px solid ${theme.border}`,
             borderRadius: 12,  background: "rgba(2,6,23,.35)",  color: theme.text, outline: "none",}}

          />
        </label>
      ))}
      <div style={{ fontSize: 12, opacity: 0.7 }}>Filters apply live on next fetch.</div>
    </div>
  );
}
