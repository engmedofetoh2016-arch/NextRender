// components/ui/Table.tsx
"use client";
import React, { useEffect, useState } from "react";
import type { TableNode } from "../renderer/types";
import { useData } from "../renderer/DataProvider";
import { theme } from "@/app/theme";


export default function Table({ node }: { node: TableNode }) {
  const { fetchData } = useData();
  const [rows, setRows] = useState<any[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    fetchData(node.data)
      .then((data) => alive && setRows(data.items ?? []))
      .catch((e) => alive && setErr(String(e)));
    return () => {
      alive = false;
    };
  }, [node.data, fetchData]);

  if (err) return <div>Table error: {err}</div>;

  return (
  <div
    style={{
      border: `1px solid ${theme.border}`,
      borderRadius: 14,
      overflow: "hidden",
      background: "rgba(2,6,23,.20)",
    }}
  >
    <div style={{ padding: "12px 14px", borderBottom: `1px solid ${theme.border}` }}>
      <div style={{ fontSize: 14, fontWeight: 700 }}>{node.title ?? "Table"}</div>
      <div style={{ fontSize: 12, color: theme.mutText, marginTop: 2 }}>
        Data source: <span style={{ color: theme.text }}>{node.data}</span>
      </div>
    </div>

    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          {node.columns.map((c) => (
            <th
              key={c.key}
              style={{
                textAlign: "left",
                padding: "10px 14px",
                fontSize: 12,
                color: theme.mutText,
                borderBottom: `1px solid ${theme.border}`,
                background: "rgba(15,23,42,.55)",
              }}
            >
              {c.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, idx) => (
          <tr
            key={idx}
            style={{
              background: idx % 2 ? "rgba(15,23,42,.25)" : "transparent",
            }}
            onMouseEnter={(e) => ((e.currentTarget.style.background = "rgba(96,165,250,.10)"))}
            onMouseLeave={(e) => ((e.currentTarget.style.background = idx % 2 ? "rgba(15,23,42,.25)" : "transparent"))}
          >
            {node.columns.map((c) => (
              <td
                key={c.key}
                style={{
                  padding: "10px 14px",
                  borderBottom: `1px solid rgba(148,163,184,0.10)`,
                  fontSize: 13,
                }}
              >
                {String(r[c.key] ?? "")}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

}