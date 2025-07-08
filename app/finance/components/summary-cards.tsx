"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card"
import { ArrowUpCircle, ArrowDownCircle, DollarSign } from "lucide-react"

interface SummaryCardsProps {
  totalDeposit: number
  totalExpense: number
  balance: number
}

const SummaryCards = ({
  totalDeposit,
  totalExpense,
  balance,
}: SummaryCardsProps) => {
  // Função para formatar os valores em Reais (BRL)
  const formatCurrency = (value: number) => {
    return Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {/* Card de Depósitos */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Depósitos</CardTitle>
          <ArrowUpCircle className="h-5 w-5 text-green-500" />
        </CardHeader>
        <CardContent>
          <p className="break-words text-2xl font-bold">
            {formatCurrency(totalDeposit)}
          </p>
        </CardContent>
      </Card>

      {/* Card de Despesas */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Despesas</CardTitle>
          <ArrowDownCircle className="h-5 w-5 text-red-500" />
        </CardHeader>
        <CardContent>
          <p className="break-words text-2xl font-bold">
            {formatCurrency(totalExpense)}
          </p>
        </CardContent>
      </Card>

      {/* Card de Saldo */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Saldo</CardTitle>
          <DollarSign className="h-5 w-5 text-blue-500" />
        </CardHeader>
        <CardContent>
          <p className="break-words text-2xl font-bold">
            {formatCurrency(balance)}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default SummaryCards
