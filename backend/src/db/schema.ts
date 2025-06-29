import { pgTable, serial, varchar, text, jsonb, integer } from 'drizzle-orm/pg-core';

// Users table
export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 256 }).notNull().unique(),
    passwordHash: text('password_hash').notNull(),
});

// Batches table
export const batches = pgTable('batches', {
    id: serial('id').primaryKey(),
    batchName: varchar('batch_name', { length: 255 }).notNull(),
    userId: integer('user_id').references(() => users.id).notNull(),
});

// Recipes table
export const recipes = pgTable('recipes', {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    ingredients: jsonb('ingredients').notNull(),
    steps: jsonb('steps').notNull(),
    batchId: integer('batch_id').references(() => batches.id).notNull(),
});