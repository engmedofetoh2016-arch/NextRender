// app/api/data/revenue/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const items = [
    { day: "Mon", amount: 1200 },
    { day: "Tue", amount: 900 },
    { day: "Wed", amount: 1600 },
    { day: "Thu", amount: 800 },
    { day: "Fri", amount: 1900 },
  ];
  return NextResponse.json({ items });
}
