import type { Request, Response, NextFunction } from 'express';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';

import db from '../db';
import { users } from '../db/schemas/users';
import config from '../config/config';
import { generateToken } from '../utils/generateToken';

export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    let { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: 'Username and password are required' });
    }
    if (typeof username !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ error: 'Bad Request' });
    }

    username = username.trim().toLowerCase();
    if (username.length < 8 || username.length > 32) {
      return res
        .status(400)
        .json({ error: 'Username length should be between 8 and 32' });
    }
    if (password.length < 8 || password.length > 64) {
      return res
        .status(400)
        .json({ error: 'Password length should be between 8 and 64' });
    }

    if (!/^[a-zA-Z0-9._]+$/.test(username)) {
      return res.status(400).json({
        error: 'Username can only contain a-z, A-Z, numbers and (., _)',
      });
    }

    const user = (
      await db.select().from(users).where(eq(users.username, username)).limit(1)
    )[0];
    if (user) {
      return res.status(400).json({ error: 'Invalid Request' });
    }

    const hashPassword = await bcrypt.hash(password, config.saltRounds);
    const [newUser] = await db
      .insert(users)
      .values({ username, password: hashPassword })
      .returning();

    const loginTime = new Date().toISOString();
    const token = generateToken({
      userId: newUser?.id!,
      username: newUser?.username!,
      loginTime,
    });

    return res
      .status(201)
      .json({ message: 'Account Created Successfully', token });
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    let { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: 'Username and password are required' });
    }
    if (typeof username !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ error: 'Bad Request' });
    }

    username = username.trim().toLowerCase();
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1);
    if (!user) {
      return res.status(401).json({ error: 'Username or password is wrong' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Username or password is wrong' });
    }

    const loginTime = new Date().toISOString();
    const token = generateToken({
      userId: user.id,
      username,
      loginTime,
    });

    return res.status(200).json({ message: 'Logged In', token });
  } catch (err) {
    next(err);
  }
}
