import Link from "next/link";
import { IrvanCharacter } from "@/components/IrvanCharacter";
import { IsobelCharacter } from "@/components/IsobelCharacter";

export default function LandingPage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col px-5 py-10">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Our Expenses</h1>
        <p className="mt-2 text-sm text-ink/70">Who&apos;s spending?</p>
      </header>

      <div className="grid flex-1 grid-cols-2 gap-4">
        <Link
          href="/irvan"
          className="group ink-card flex flex-col items-center justify-end px-3 pb-5 pt-3 transition active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          <IrvanCharacter className="h-44 w-auto text-ink transition group-hover:rotate-[-2deg]" />
          <span className="mt-2 text-lg font-medium">Irvan</span>
        </Link>

        <Link
          href="/isobel"
          className="group ink-card flex flex-col items-center justify-end px-3 pb-5 pt-3 transition active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          <IsobelCharacter className="h-44 w-auto text-ink transition group-hover:rotate-[2deg]" />
          <span className="mt-2 text-lg font-medium">Isobel</span>
        </Link>
      </div>

      <footer className="mt-10 text-center text-xs text-ink/50">
        Tap to enter the register.
      </footer>
    </main>
  );
}
