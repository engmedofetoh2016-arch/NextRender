import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // IMPORTANT: avoid caching

export async function GET(req: Request) {
  const url = new URL(req.url);
  const preset = url.searchParams.get("preset") ?? "dashboard";

  const schemas: Record<string, any> = {
    table: {
      type: "container",
      title: `PRESET: ${preset}`,
      children: [
        { type: "table", title: "Orders", data: "orders", columns: [
          { key: "id", label: "ID" },
          { key: "customer", label: "Customer" },
          { key: "status", label: "Status" },
          { key: "total", label: "Total" },
        ]},
      ],
    },

    chart: {
      type: "container",
      title: `PRESET: ${preset}`,
      children: [
        { type: "chart", title: "Revenue", data: "revenue", chartType: "line", xKey: "day", yKey: "amount" },
      ],
    },

    dashboard: {
  type: "container",
  title: `PRESET: dashboard`,
  children: [
    {
      type: "filterBar",
      target: "orders",
      fields: [
        { key: "q", label: "Search", type: "text" },
        { key: "status", label: "Status", type: "text" }
      ]
    },
    {
      type: "table",
      title: "Orders",
      data: "orders",
      columns: [
        { key: "id", label: "ID" },
        { key: "customer", label: "Customer" },
        { key: "status", label: "Status" },
        { key: "total", label: "Total" }
      ]
    },
    {
      type: "chart",
      title: "Revenue",
      data: "revenue",
      chartType: "line",
      xKey: "day",
      yKey: "amount"
    }
  ]
}

  };

  return NextResponse.json(schemas[preset] ?? schemas.dashboard);
}
