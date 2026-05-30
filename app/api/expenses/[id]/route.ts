import { NextRequest, NextResponse } from "next/server";
import { deleteExpenseByOwner } from "@/lib/store";
import { USERS, type UserName } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const url = new URL(req.url);
  const user = url.searchParams.get("user") as UserName | null;
  if (!user || !USERS.includes(user)) {
    return NextResponse.json({ error: "Invalid user" }, { status: 400 });
  }
  const expenses = await deleteExpenseByOwner(params.id, user);
  return NextResponse.json({ expenses });
}
