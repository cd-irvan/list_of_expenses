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
  emoji: string;
}

export const CATEGORIES: Category[] = [
  { id: "restaurant", label: "Restaurant", emoji: "🍽️" },
  { id: "grocery", label: "Grocery", emoji: "🛒" },
  { id: "visits", label: "Visits", emoji: "👋" },
  { id: "train", label: "Train", emoji: "🚆" },
  { id: "misc", label: "Misc.", emoji: "🧾" },
];

export interface Expense {
  id: string;
  user: UserName;
  description: string;
  amount: number;
  category: CategoryId;
  createdAt: string; // ISO
}
