"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { format, parse } from "date-fns"
import { ptBR } from "date-fns/locale"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card"

interface TransactionsPieChartProps {
  totalDeposit: number
  totalExpense: number
  balance: number
  month: string
}

const TransactionsPieChart = ({
  totalDeposit,
  totalExpense,
  balance,
  month,
}: TransactionsPieChartProps) => {
  // Os dados do gráfico agora incluem apenas Ganhos e Despesas para uma visão mais clara
  const chartData = React.useMemo(
    () =>
      [
        { name: "Ganhos", value: totalDeposit },
        { name: "Despesas", value: totalExpense },
      ].filter((item) => item.value > 0), // Filtra valores zerados
    [totalDeposit, totalExpense],
  )

  // Cores para Ganhos e Despesas
  const COLORS = ["#00C49F", "#FF8042"]

  const monthName = React.useMemo(() => {
    try {
      const date = parse(month, "MM", new Date())
      return format(date, "MMMM", { locale: ptBR })
    } catch (error) {
      return "Mês inválido"
    }
  }, [month])

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle className="font-bold">Resumo Financeiro</CardTitle>
        <CardDescription className="capitalize">{monthName}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center justify-center pb-6">
        {chartData.length > 0 ? (
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
                  // Correção: Verifica se midAngle está definido
                  if (midAngle === undefined || percent === 0) {
                    return null
                  }
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
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Saldo do mês:
          <span
            className={balance >= 0 ? "text-green-500" : "text-destructive"}
          >
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(balance)}
          </span>
          {balance > 0 && <TrendingUp className="h-4 w-4 text-green-500" />}
        </div>
        <div className="capitalize leading-none text-muted-foreground">
          Mostrando o resumo financeiro de {monthName}
        </div>
      </CardFooter>
    </Card>
  )
}

export default TransactionsPieChart
