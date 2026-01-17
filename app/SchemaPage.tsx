"use client";

import { useEffect, useState } from "react";
import { DataProvider } from "./components/renderer/DataProvider";
import RenderNode from "./components/renderer/Render";
import type { UISchema } from "./components/renderer/types";
import { theme } from "./theme";


export default function SchemaPage() {
  const [preset, setPreset] = useState("dashboard");
  const [schema, setSchema] = useState<UISchema | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function load(p: string) {
    setError(null);
    setSchema(null);
    const res = await fetch(`/api/ui?preset=${encodeURIComponent(p)}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to load UI schema");
    setSchema(await res.json());
  }

  useEffect(() => {
    load(preset);
  }, [preset]);

  return (
  <DataProvider>
    <div
      style={{
        minHeight: "100vh",
        background: `radial-gradient(1200px 600px at 20% 0%, rgba(96,165,250,.25), transparent 60%),
                     radial-gradient(1000px 500px at 80% 20%, rgba(168,85,247,.18), transparent 60%),
                     ${theme.bg}`,
        color: theme.text,
        padding: "38px 18px",
      }}
    >
      <main style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Top Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            marginBottom: 18,
          }}
        >
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.2 }}>
              Runtime Dashboard
            </div>
            <div style={{ fontSize: 13, color: theme.mutText, marginTop: 4 }}>
              UI is rendered from JSON schema • preset: <span style={{ color: theme.text }}>{preset}</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <label style={{ fontSize: 13, color: theme.mutText }}>
              View
              <select
                value={preset}
                onChange={(e) => setPreset(e.target.value)}
                style={{
                  marginLeft: 10,
                  padding: "10px 12px",
                  borderRadius: 12,
                  border: `1px solid ${theme.border}`,
                  background: "rgba(15,23,42,.8)",
                  color: theme.text,
                  outline: "none",
                }}
              >
                <option value="dashboard">Dashboard</option>
                <option value="table">Table</option>
                <option value="chart">Chart</option>
              </select>
            </label>

            <button
              onClick={() => load(preset)}
              style={{
                padding: "10px 14px",
                borderRadius: 12,
                border: `1px solid ${theme.border}`,
                background: "rgba(96,165,250,.15)",
                color: theme.text,
                cursor: "pointer",
              }}
            >
              Reload
            </button>
          </div>
        </div>

        {/* Body */}
        {error ? (
          <div style={{ padding: 16, border: `1px solid ${theme.border}`, borderRadius: 14 }}>
            Error: {error}
          </div>
        ) : !schema ? (
          <div style={{ padding: 16, color: theme.mutText }}>Loading…</div>
        ) : (
          <RenderNode node={schema} />
        )}
      </main>
    </div>
  </DataProvider>
);
}
