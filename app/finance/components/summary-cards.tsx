// app/_components/summary-cards.tsx

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card"

interface SummaryCardsProps {
  totalDeposit: number
  totalExpense: number
  balance: number
  month: string
}

const SummaryCards = ({
  totalDeposit,
  totalExpense,
  balance,
  month,
}: SummaryCardsProps) => {
  return (
    <div className="grid grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Depósitos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(totalDeposit)}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Despesas</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(totalExpense)}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Saldo</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(balance)}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default SummaryCards
