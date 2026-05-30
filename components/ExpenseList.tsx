"use client";

import { CATEGORIES, type Expense, type UserName } from "@/lib/types";

interface ExpenseListProps {
  expenses: Expense[];
  currentUser: UserName;
  onDeleted: (expenses: Expense[]) => void;
}

function emojiFor(categoryId: string) {
  return CATEGORIES.find((c) => c.id === categoryId)?.emoji ?? "🧾";
}

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString(undefined, {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function ExpenseList({ expenses, currentUser, onDeleted }: ExpenseListProps) {
  async function handleDelete(id: string) {
    const ok = window.confirm("Delete this entry?");
    if (!ok) return;
    const res = await fetch(
      `/api/expenses/${encodeURIComponent(id)}?user=${encodeURIComponent(currentUser)}`,
      { method: "DELETE" }
    );
    if (!res.ok) return;
    const data = (await res.json()) as { expenses: Expense[] };
    onDeleted(data.expenses);
  }

  if (expenses.length === 0) {
    return (
      <div className="ink-card p-6 text-center text-sm text-ink/60">
        No entries yet — the drawer is empty.
      </div>
    );
  }

  return (
    <ul className="ink-card divide-y-2 divide-ink overflow-hidden">
      {expenses.map((e) => {
        const own = e.user === currentUser;
        return (
          <li key={e.id} className="flex items-center gap-3 px-3 py-3">
            <span className="text-2xl leading-none">{emojiFor(e.category)}</span>
            <div className="min-w-0 flex-1">
              <div className="truncate font-medium">{e.description}</div>
              <div className="text-xs text-ink/60">
                {e.user} · {formatDate(e.createdAt)}
              </div>
            </div>
            <div className="font-mono tabular-nums">
              ${e.amount.toFixed(2)}
            </div>
            {own && (
              <button
                onClick={() => handleDelete(e.id)}
                aria-label="Delete entry"
                className="ml-1 rounded-md border-2 border-ink px-2 py-1 text-xs hover:bg-ink hover:text-paper transition"
              >
                ✕
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
