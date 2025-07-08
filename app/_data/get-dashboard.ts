// app/_data/get-dashboard.ts
import { db } from "../_lib/prisma"
import { startOfMonth, endOfMonth, parse } from "date-fns"
import { TotalExpensePerCategory } from "./get-dashboard/types"
import { Transaction, TransactionType } from "@prisma/client"

export const getDashboard = async (month: string) => {
  const monthDate = parse(month, "MM", new Date())

  const transactions = await db.transaction.findMany({
    where: {
      date: {
        gte: startOfMonth(monthDate),
        lte: endOfMonth(monthDate),
      },
    },
    orderBy: {
      date: "desc",
    },
  })

  const totalDeposit = transactions
    .filter((t) => t.type === TransactionType.DEPOSIT)
    .reduce((acc, t) => acc + Number(t.amount), 0)

  const totalExpense = transactions
    .filter((t) => t.type === TransactionType.EXPENSE)
    .reduce((acc, t) => acc + Number(t.amount), 0)

  const balance = totalDeposit - totalExpense

  const totalExpensePerCategory: TotalExpensePerCategory[] = transactions
    .filter((t) => t.type === TransactionType.EXPENSE)
    .reduce(
      (acc, transaction) => {
        const category = acc.find((c) => c.category === transaction.category)
        if (category) {
          category.total += Number(transaction.amount)
        } else {
          acc.push({
            category: transaction.category,
            total: Number(transaction.amount),
          })
        }
        return acc
      },
      [] as Omit<TotalExpensePerCategory, "percentageOfTotal">[],
    )
    .map((category) => ({
      ...category,
      percentageOfTotal:
        totalExpense > 0
          ? Math.round((category.total / totalExpense) * 100)
          : 0,
    }))

  const lastTransactions: Transaction[] = transactions.slice(0, 5)

  return {
    totalDeposit,
    totalExpense,
    balance,
    totalExpensePerCategory,
    lastTransactions,
  }
}
