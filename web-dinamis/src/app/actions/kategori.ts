"use server";

import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createKategori(formData: FormData) {
  const name = formData.get("name") as string;
  const description = (formData.get("description") as string) || null;
  const image_url = (formData.get("image_url") as string) || null;
  const is_active = formData.get("is_active") === "on" ? 1 : 0;

  await query(
    "INSERT INTO categories (name, description, image_url, is_active) VALUES (?, ?, ?, ?)",
    [name, description, image_url, is_active]
  );

  revalidatePath("/admin/kategori");
  revalidatePath("/");
  redirect("/admin/kategori");
}

export async function updateKategori(id: number, formData: FormData) {
  const name = formData.get("name") as string;
  const description = (formData.get("description") as string) || null;
  const image_url = (formData.get("image_url") as string) || null;
  const is_active = formData.get("is_active") === "on" ? 1 : 0;

  await query(
    "UPDATE categories SET name = ?, description = ?, image_url = ?, is_active = ? WHERE id = ?",
    [name, description, image_url, is_active, id]
  );

  revalidatePath("/admin/kategori");
  revalidatePath("/");
  redirect("/admin/kategori");
}

export async function deleteKategori(id: number) {
  await query("DELETE FROM categories WHERE id = ?", [id]);
  revalidatePath("/admin/kategori");
  revalidatePath("/");
}

export async function toggleActiveKategori(id: number, currentStatus: number) {
  await query("UPDATE categories SET is_active = ? WHERE id = ?", [currentStatus === 1 ? 0 : 1, id]);
  revalidatePath("/admin/kategori");
  revalidatePath("/");
}
