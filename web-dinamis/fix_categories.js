const mysql = require('mysql2/promise');

async function fix() {
  const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_uas'
  });

  await db.query("UPDATE categories SET image_url = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop' WHERE id = 1");
  await db.query("UPDATE categories SET image_url = 'https://images.unsplash.com/photo-1529139574466-a303027330d5?q=80&w=500&auto=format&fit=crop' WHERE id = 2");
  await db.query("UPDATE categories SET image_url = 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=500&auto=format&fit=crop' WHERE id = 3");
  await db.query("UPDATE categories SET image_url = 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=500&auto=format&fit=crop' WHERE id = 4");

  console.log('All category images updated!');
  process.exit(0);
}

fix();
