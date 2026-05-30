"use client";

import { useState } from "react";
import { CATEGORIES, type CategoryId, type Expense, type UserName } from "@/lib/types";

interface ExpenseFormProps {
  user: UserName;
  onAdded: (expenses: Expense[]) => void;
}

export function ExpenseForm({ user, onAdded }: ExpenseFormProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<CategoryId>("restaurant");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const trimmed = description.trim();
    const numeric = Number(amount);
    if (!trimmed) {
      setError("Add a short description.");
      return;
    }
    if (!Number.isFinite(numeric) || numeric <= 0) {
      setError("Amount must be greater than zero.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user,
          description: trimmed,
          amount: numeric,
          category,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to add expense.");
      }
      const data = (await res.json()) as { expenses: Expense[] };
      onAdded(data.expenses);
      setDescription("");
      setAmount("");
      setCategory("restaurant");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="ink-card space-y-3 p-4">
      <h2 className="text-base font-semibold">Add an expense</h2>

      <div>
        <label className="mb-1 block text-xs uppercase tracking-wider text-ink/60">
          Description
        </label>
        <input
          type="text"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. Sunday brunch"
          className="ink-input"
          autoComplete="off"
          maxLength={80}
        />
      </div>

      <div>
        <label className="mb-1 block text-xs uppercase tracking-wider text-ink/60">
          Amount ($)
        </label>
        <input
          type="number"
          inputMode="decimal"
          step="0.01"
          min="0"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className="ink-input"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs uppercase tracking-wider text-ink/60">
          Category
        </label>
        <div className="grid grid-cols-5 gap-2">
          {CATEGORIES.map((c) => {
            const active = c.id === category;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                aria-pressed={active}
                className={
                  "flex flex-col items-center justify-center gap-1 rounded-xl border-2 border-ink py-2 text-[10px] uppercase tracking-wider transition " +
                  (active
                    ? "bg-ink text-paper shadow-none translate-x-[2px] translate-y-[2px]"
                    : "bg-paper text-ink shadow-ink hover:-translate-y-[1px]")
                }
              >
                <span className="text-xl leading-none">{c.emoji}</span>
                <span>{c.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      <button type="submit" disabled={submitting} className="ink-btn-primary w-full disabled:opacity-60">
        {submitting ? "Adding…" : "Add to register"}
      </button>
    </form>
  );
}
