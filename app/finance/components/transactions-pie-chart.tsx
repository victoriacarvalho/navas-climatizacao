// app/_components/transactions-pie-chart.tsx
"use client"

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"
import { TRANSACTION_CATEGORY_OPTIONS } from "@/app/_constants/transactions"
import { TotalExpensePerCategory } from "@/app/_data/get-dashboard/types"

interface TransactionsPieChartProps {
  totalExpensePerCategory: TotalExpensePerCategory[]
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

const TransactionsPieChart = ({
  totalExpensePerCategory,
}: TransactionsPieChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={totalExpensePerCategory}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) =>
            `${TRANSACTION_CATEGORY_OPTIONS[name as keyof typeof TRANSACTION_CATEGORY_OPTIONS]}: ${(percent * 100).toFixed(0)}%`
          }
          outerRadius={80}
          fill="#8884d8"
          dataKey="total"
          nameKey="category"
        >
          {totalExpensePerCategory.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name) => [
            Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(value as number),
            TRANSACTION_CATEGORY_OPTIONS[
              name as keyof typeof TRANSACTION_CATEGORY_OPTIONS
            ],
          ]}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default TransactionsPieChart
