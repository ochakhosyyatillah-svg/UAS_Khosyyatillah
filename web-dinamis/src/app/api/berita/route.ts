import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

interface ProductRow {
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
  price: number;
  created_at: string;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const limit = Math.min(Number(searchParams.get("limit")) || 10, 50);
    const offset = Math.max(Number(searchParams.get("offset")) || 0, 0);

    const rows = await query<ProductRow>(
      `SELECT id, name, description, image_url, price, created_at
       FROM products
       WHERE is_active = 1
       ORDER BY created_at DESC
       LIMIT ${limit} OFFSET ${offset}`
    );

    const countResult = await query<{ total: number }>(
      "SELECT COUNT(*) AS total FROM products WHERE is_active = 1"
    );

    return NextResponse.json({
      status: "ok",
      data: rows,
      total: countResult[0]?.total || 0,
    });

  } catch (error) {
    console.error("API /berita error:", error);

    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}