import { Request, Response } from 'express';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as dotenv from 'dotenv';
import * as schema from '../db/schema';

dotenv.config();
const queryClient = postgres(process.env.DATABASE_URL!);
const db = drizzle(queryClient, { schema });

// REGISTER
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password required.' });
    return;
  }

  try {
    // Check if email exists
    const existingUser = await db.select().from(users).where(eq(users.email, email));
    if (existingUser.length > 0) {
      res.status(400).json({ error: 'Email already registered.' });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const [newUser] = await db.insert(users).values({ email, passwordHash: hashedPassword }).returning();

    // Create JWT token
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET!, { expiresIn: '2h' });

    res.status(201).json({ message: 'User registered successfully.', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed.' });
  }
};

// LOGIN
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password required.' });
    return;
  }

  try {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    if (!user) {
      res.status(400).json({ error: 'Invalid email or password.' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      res.status(400).json({ error: 'Invalid email or password.' });
      return;
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '2h' });

    res.json({ message: 'Login successful.', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed.' });
  }
};
