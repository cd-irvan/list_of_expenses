import { Redis } from "@upstash/redis";
import fs from "fs/promises";
import path from "path";
import type { Expense } from "./types";

const KEY = "expenses:v1";
const LOCAL_PATH = path.join(process.cwd(), ".data", "expenses.json");

function getEnv() {
  const url =
    process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return { url, token };
}

function hasRedis() {
  const { url, token } = getEnv();
  return Boolean(url && token);
}

let redis: Redis | null = null;
function getRedis(): Redis {
  if (!redis) {
    const { url, token } = getEnv();
    redis = new Redis({ url: url!, token: token! });
  }
  return redis;
}

async function readLocal(): Promise<Expense[]> {
  try {
    const raw = await fs.readFile(LOCAL_PATH, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeLocal(expenses: Expense[]): Promise<void> {
  await fs.mkdir(path.dirname(LOCAL_PATH), { recursive: true });
  await fs.writeFile(LOCAL_PATH, JSON.stringify(expenses, null, 2));
}

export async function getExpenses(): Promise<Expense[]> {
  if (hasRedis()) {
    const data = await getRedis().get<Expense[]>(KEY);
    return data ?? [];
  }
  return readLocal();
}

async function setExpenses(expenses: Expense[]): Promise<void> {
  if (hasRedis()) {
    await getRedis().set(KEY, expenses);
    return;
  }
  await writeLocal(expenses);
}

export async function addExpense(expense: Expense): Promise<Expense[]> {
  const list = await getExpenses();
  list.unshift(expense);
  await setExpenses(list);
  return list;
}

export async function deleteExpenseByOwner(
  id: string,
  user: string
): Promise<Expense[]> {
  const list = await getExpenses();
  const filtered = list.filter((e) => !(e.id === id && e.user === user));
  await setExpenses(filtered);
  return filtered;
}
