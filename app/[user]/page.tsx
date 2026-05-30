import { notFound } from "next/navigation";
import { USERS, type UserName } from "@/lib/types";
import { Dashboard } from "./Dashboard";

function normalizeUser(slug: string): UserName | null {
  const lower = slug.toLowerCase();
  const found = USERS.find((u) => u.toLowerCase() === lower);
  return found ?? null;
}

export function generateStaticParams() {
  return USERS.map((u) => ({ user: u.toLowerCase() }));
}

export default function UserPage({ params }: { params: { user: string } }) {
  const user = normalizeUser(params.user);
  if (!user) return notFound();
  return <Dashboard user={user} />;
}
