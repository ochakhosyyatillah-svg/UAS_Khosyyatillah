import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

interface ProductDetail {
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
  price: number;
  stock: number;
  material: string | null;
  color: string | null;
  category_name: string | null;
  created_at: string;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const id = Number(slug);
    if (Number.isNaN(id)) {
      return NextResponse.json(
        { status: "error", message: "Produk tidak ditemukan" },
        { status: 404 }
      );
    }

    const rows = await query<ProductDetail>(
      `SELECT p.id, p.name, p.description, p.image_url, p.price, p.stock, p.material, p.color, p.created_at,
              c.name AS category_name
         FROM products p
         LEFT JOIN categories c ON p.category_id = c.id
         WHERE p.id = ? AND p.is_active = 1 LIMIT 1`,
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { status: "error", message: "Produk tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({ status: "ok", data: rows[0] });
  } catch (error) {
    console.error("API /berita/[slug] error:", error);
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}
