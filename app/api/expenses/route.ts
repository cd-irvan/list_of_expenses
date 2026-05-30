import { NextRequest, NextResponse } from "next/server";
import { addExpense, getExpenses } from "@/lib/store";
import { CATEGORIES, USERS, type CategoryId, type Expense, type UserName } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const expenses = await getExpenses();
  return NextResponse.json({ expenses });
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as Partial<Expense> | null;
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const user = body.user as UserName | undefined;
  const description = (body.description ?? "").toString().trim();
  const amount = Number(body.amount);
  const category = body.category as CategoryId | undefined;

  if (!user || !USERS.includes(user)) {
    return NextResponse.json({ error: "Invalid user" }, { status: 400 });
  }
  if (!description) {
    return NextResponse.json({ error: "Description required" }, { status: 400 });
  }
  if (!Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json({ error: "Amount must be > 0" }, { status: 400 });
  }
  if (!category || !CATEGORIES.some((c) => c.id === category)) {
    return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  }

  const expense: Expense = {
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    user,
    description,
    amount: Math.round(amount * 100) / 100,
    category,
    createdAt: new Date().toISOString(),
  };

  const expenses = await addExpense(expense);
  return NextResponse.json({ expense, expenses });
}
