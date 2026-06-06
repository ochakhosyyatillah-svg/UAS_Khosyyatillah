"use server";

import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduk(formData: FormData) {
  const name = formData.get("name") as string;
  const category_id = Number(formData.get("category_id"));
  const description = (formData.get("description") as string) || null;
  const material = (formData.get("material") as string) || null;
  const price = Number(formData.get("price")) || 0;
  const sale_price = formData.get("sale_price") ? Number(formData.get("sale_price")) : null;
  const stock = Number(formData.get("stock")) || 0;
  const size = (formData.get("size") as string) || null;
  const color = (formData.get("color") as string) || null;
  const image_url = (formData.get("image_url") as string) || null;
  const is_featured = formData.get("is_featured") === "on" ? 1 : 0;
  const is_active = formData.get("is_active") === "on" ? 1 : 0;

  await query(
    `INSERT INTO products (category_id, name, description, material, price, sale_price, stock, size, color, image_url, is_featured, is_active)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [category_id, name, description, material, price, sale_price, stock, size, color, image_url, is_featured, is_active]
  );

  revalidatePath("/admin/produk");
  revalidatePath("/berita");
  revalidatePath("/");
  redirect("/admin/produk");
}

export async function updateProduk(id: number, formData: FormData) {
  const name = formData.get("name") as string;
  const category_id = Number(formData.get("category_id"));
  const description = (formData.get("description") as string) || null;
  const material = (formData.get("material") as string) || null;
  const price = Number(formData.get("price")) || 0;
  const sale_price = formData.get("sale_price") ? Number(formData.get("sale_price")) : null;
  const stock = Number(formData.get("stock")) || 0;
  const size = (formData.get("size") as string) || null;
  const color = (formData.get("color") as string) || null;
  const image_url = (formData.get("image_url") as string) || null;
  const is_featured = formData.get("is_featured") === "on" ? 1 : 0;
  const is_active = formData.get("is_active") === "on" ? 1 : 0;

  await query(
    `UPDATE products SET category_id = ?, name = ?, description = ?, material = ?, price = ?, sale_price = ?,
     stock = ?, size = ?, color = ?, image_url = ?, is_featured = ?, is_active = ? WHERE id = ?`,
    [category_id, name, description, material, price, sale_price, stock, size, color, image_url, is_featured, is_active, id]
  );

  revalidatePath("/admin/produk");
  revalidatePath("/berita");
  revalidatePath("/");
  redirect("/admin/produk");
}

export async function deleteProduk(id: number) {
  await query("DELETE FROM products WHERE id = ?", [id]);
  revalidatePath("/admin/produk");
  revalidatePath("/berita");
  revalidatePath("/");
}

export async function toggleActiveProduk(id: number, currentStatus: number) {
  await query("UPDATE products SET is_active = ? WHERE id = ?", [currentStatus === 1 ? 0 : 1, id]);
  revalidatePath("/admin/produk");
  revalidatePath("/berita");
  revalidatePath("/");
}
