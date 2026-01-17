"use client";

import React from "react";
import type { UISchema } from "./types";
import { registry } from "./registry";

export default function RenderNode({ node }: { node: UISchema }) {
  const Comp = (registry as any)[node.type];
  if (!Comp) return <div>Unknown node type: {(node as any).type}</div>;
  return <Comp node={node} renderChild={(child: UISchema, i: number) => <RenderNode key={i} node={child} />} />;
}