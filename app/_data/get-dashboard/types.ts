import { TransactionCategory } from "@prisma/client"

export interface TotalExpensePerCategory {
  category: TransactionCategory
  total: number
  percentageOfTotal: number
}
