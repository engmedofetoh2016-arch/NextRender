// app/api/data/orders/route.ts
import { NextResponse } from "next/server";

const ALL = [
  { id: "o_1001", customer: "Mona", status: "paid", total: 120 },
  { id: "o_1002", customer: "Ali", status: "refunded", total: 80 },
  { id: "o_1003", customer: "Sara", status: "paid", total: 230 },
  { id: "o_1004", customer: "Youssef", status: "pending", total: 50 },
];

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = (url.searchParams.get("q") ?? "").toLowerCase();
  const status = (url.searchParams.get("status") ?? "").toLowerCase();

  const items = ALL.filter((o) => {
    const okQ = !q || o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q);
    const okS = !status || o.status.toLowerCase().includes(status);
    return okQ && okS;
  });

  return NextResponse.json({ items });
}
