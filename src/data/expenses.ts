import { Expense } from "../types/expenses";

export const EXPENSES: Expense[] = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: "2021-12-19",
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.29,
    date: "2022-01-05",
  },
  {
    id: "e3",
    description: "Some bananas",
    amount: 5.99,
    date: "2021-12-01",
  },
  {
    id: "e4",
    description: "A book",
    amount: 14.99,
    date: "2022-02-19",
  },
  {
    id: "e5",
    description: "Another book",
    amount: 18.59,
    date: "2022-02-18",
  },
  {
    id: "e6",
    description: "A pair of trousers",
    amount: 89.29,
    date: "2022-01-05",
  },
  {
    id: "e7",
    description: "Some bananas",
    amount: 5.99,
    date: "2021-12-01",
  },
  {
    id: "e8",
    description: "A book",
    amount: 14.99,
    date: "2022-02-19",
  },
  {
    id: "e9",
    description: "Another book",
    amount: 18.59,
    date: "2025-03-07",
  },
  {
    id: "e10",
    description: "Another book 2",
    amount: 18.59,
    date: "2025-03-10",
  },
];

export const ExpensesMapper = EXPENSES.reduce((acc, curr) => {
  acc[curr.id] = curr;
  return acc;
}, {} as { [key: Expense["id"]]: Expense });
