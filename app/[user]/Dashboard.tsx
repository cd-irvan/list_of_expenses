"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CashRegister } from "@/components/CashRegister";
import { ExpenseForm } from "@/components/ExpenseForm";
import { ExpenseList } from "@/components/ExpenseList";
import { IrvanCharacter } from "@/components/IrvanCharacter";
import { IsobelCharacter } from "@/components/IsobelCharacter";
import type { Expense, UserName } from "@/lib/types";

export function Dashboard({ user }: { user: UserName }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/expenses", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load expenses");
      const data = (await res.json()) as { expenses: Expense[] };
      setExpenses(data.expenses);
      setLoadError(null);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const total = useMemo(
    () => expenses.reduce((sum, e) => sum + e.amount, 0),
    [expenses]
  );

  const mine = useMemo(
    () => expenses.filter((e) => e.user === user).reduce((s, e) => s + e.amount, 0),
    [expenses, user]
  );

  const share = total / 2;

  const Character = user === "Irvan" ? IrvanCharacter : IsobelCharacter;

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-5 px-4 py-6">
      <header className="flex items-center justify-between">
        <Link href="/" className="ink-btn text-sm" aria-label="Back">
          ← Switch
        </Link>
        <div className="flex items-center gap-2">
          <Character className="h-10 w-auto text-ink" />
          <div className="text-right">
            <div className="text-xs uppercase tracking-wider text-ink/60">Logged in</div>
            <div className="text-base font-semibold leading-none">{user}</div>
          </div>
        </div>
      </header>

      <section>
        <CashRegister
          total={total}
          shareLabel={`${user}'s share`}
          shareValue={share}
        />
        <div className="mt-2 flex items-center justify-between text-xs text-ink/60">
          <span>You&apos;ve added <span className="font-mono">${mine.toFixed(2)}</span></span>
          <span>{expenses.length} {expenses.length === 1 ? "entry" : "entries"}</span>
        </div>
      </section>

      <ExpenseForm user={user} onAdded={setExpenses} />

      <section>
        <h2 className="mb-2 text-base font-semibold">Recent entries</h2>
        {loading ? (
          <div className="ink-card p-6 text-center text-sm text-ink/60">Loading…</div>
        ) : loadError ? (
          <div className="ink-card p-6 text-center text-sm text-red-700">{loadError}</div>
        ) : (
          <ExpenseList
            expenses={expenses}
            currentUser={user}
            onDeleted={setExpenses}
          />
        )}
      </section>

      <footer className="mt-2 pb-4 text-center text-[10px] uppercase tracking-[0.25em] text-ink/50">
        — Register closes when you leave —
      </footer>
    </main>
  );
}
