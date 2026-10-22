import * as SQLite from 'expo-sqlite';
import { FoodItem } from '../models/FoodItem';

let db: SQLite.SQLiteDatabase | null = null;

async function getDb(): Promise<SQLite.SQLiteDatabase> {
    if (!db) {
        db = await SQLite.openDatabaseAsync('bestbybuddy.db');
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS food_items (
                id TEXT PRIMARY KEY NOT NULL, 
                name TEXT NOT NULL,
                quantity INTEGER NOT NULL,
                location TEXT NOT NULL,
                purchase_date TEXT NOT NULL,
                expiration_date TEXT NOT NULL
            ); 
        `);
    }
    return db; 
}

export async function getAllItems(): Promise<FoodItem[]> {
    const database = await getDb();
    return database.getAllAsync<FoodItem>(`
        SELECT id, name, quantity, location,
            purchase_date AS purchaseDate, 
            expiration_date AS expirationDate
        FROM food_items
        ORDER BY expiration_date ASC
    `);
}

export async function addItem(item: Omit<FoodItem, 'id'>): Promise<FoodItem> {
    const database = await getDb();
    const id = Date.now().toString() + Math.random().toString(36).slice(2, 8);
    await database.runAsync(
        `INSERT INTO food_items (id, name, quantity, location, purchase_date, expiration_date)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [id, item.name, item.quantity, item.location, item.purchaseDate, item.expirationDate]
    );
    return { id, ...item };
}

export async function deleteItem(id: string): Promise<void> {
    const database = await getDb();
    await database.runAsync('DELETE FROM food_items WHERE id = ?', [id]);
}