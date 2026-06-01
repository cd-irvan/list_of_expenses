export type UserName = "Irvan" | "Isobel";

export const USERS: UserName[] = ["Irvan", "Isobel"];

export type CategoryId =
  | "restaurant"
  | "grocery"
  | "visits"
  | "train"
  | "misc";

export interface Category {
  id: CategoryId;
  label: string;
}

export const CATEGORIES: Category[] = [
  { id: "restaurant", label: "Restaurant" },
  { id: "grocery", label: "Grocery" },
  { id: "visits", label: "Visits" },
  { id: "train", label: "Train" },
  { id: "misc", label: "Misc." },
];

export interface Expense {
  id: string;
  user: UserName;
  description: string;
  amount: number;
  category: CategoryId;
  createdAt: string; // ISO
}
