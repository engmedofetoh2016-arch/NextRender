import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const preset = url.searchParams.get("preset") ?? "dashboard";

  const schemas: Record<string, any> = {
    table: {
      type: "container",
      title: "Orders (Table only)",
      children: [
        {
          type: "table",
          title: "Orders",
          data: "orders",
          columns: [
            { key: "id", label: "ID" },
            { key: "customer", label: "Customer" },
            { key: "status", label: "Status" },
            { key: "total", label: "Total" },
          ],
        },
      ],
    },

    chart: {
      type: "container",
      title: "Revenue (Chart only)",
      children: [
        {
          type: "chart",
          title: "Revenue",
          data: "revenue",
          chartType: "line",
          xKey: "day",
          yKey: "amount",
        },
      ],
    },

    dashboard: {
      type: "container",
      title: "Dashboard",
      children: [
        {
          type: "filterBar",
          target: "orders",
          fields: [
            { key: "q", label: "Search", type: "text" },
            { key: "status", label: "Status", type: "text" },
          ],
        },
        {
          type: "table",
          title: "Orders",
          data: "orders",
          columns: [
            { key: "id", label: "ID" },
            { key: "customer", label: "Customer" },
            { key: "status", label: "Status" },
            { key: "total", label: "Total" },
          ],
        },
        {
          type: "chart",
          title: "Revenue",
          data: "revenue",
          chartType: "line",
          xKey: "day",
          yKey: "amount",
        },
      ],
    },
  };

  return NextResponse.json(schemas[preset] ?? schemas.dashboard);
}
