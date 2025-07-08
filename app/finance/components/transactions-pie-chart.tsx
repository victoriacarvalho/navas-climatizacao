"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"

interface TransactionsPieChartProps {
  totalDeposit: number
  totalExpense: number
  balance: number
}

const TransactionsPieChart = ({
  totalDeposit,
  totalExpense,
  balance,
}: TransactionsPieChartProps) => {
  const chartData = [
    { name: "Ganhos", value: totalDeposit },
    { name: "Despesas", value: totalExpense },
    { name: "Saldo", value: balance },
  ]

  // Cores para Ganhos, Despesas e Saldo
  const COLORS = ["#00C49F", "#FF8042", "#0088FE"]

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle className="font-bold">Resumo Financeiro</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 items-center justify-center pb-6">
        {chartData.some((item) => item.value > 0) ? (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  percent,
                  name,
                }) => {
                  const radius = innerRadius + (outerRadius - innerRadius) * 1.2
                  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180))
                  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180))

                  return (
                    <text
                      x={x}
                      y={y}
                      fill="currentColor"
                      textAnchor={x > cx ? "start" : "end"}
                      dominantBaseline="central"
                      className="text-xs"
                    >
                      {`${name} (${(percent * 100).toFixed(0)}%)`}
                    </text>
                  )
                }}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke={COLORS[index % COLORS.length]}
                    className="focus:outline-none"
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) =>
                  Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(value as number)
                }
                cursor={{ fill: "hsl(var(--muted))" }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Nenhuma movimentação para exibir.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default TransactionsPieChart
