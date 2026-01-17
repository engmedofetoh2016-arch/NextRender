"use client";

import React, { useEffect, useState } from "react";
import type { ChartNode } from "../renderer/types";
import { useData } from "../renderer/DataProvider";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function Chart({ node }: { node: ChartNode }) {
  const { fetchData } = useData();
  const [points, setPoints] = useState<any[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    fetchData(node.data)
      .then((data) => alive && setPoints(data.items ?? []))
      .catch((e) => alive && setErr(String(e)));
    return () => {
      alive = false;
    };
  }, [node.data, fetchData]);

  if (err) return <div>Chart error: {err}</div>;

  return (
    <div>
      {node.title ? <h3 style={{ margin: "8px 0" }}>{node.title}</h3> : null}

      <div style={{ width: "100%", height: 280, border: "1px solid #eee", borderRadius: 12, padding: 12 }}>
        <ResponsiveContainer width="100%" height="100%">
          {node.chartType === "bar" ? (
            <BarChart data={points}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={node.xKey} />
              <YAxis />
              <Tooltip />
              <Bar dataKey={node.yKey} />
            </BarChart>
          ) : (
            <LineChart data={points}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={node.xKey} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey={node.yKey} dot={false} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
