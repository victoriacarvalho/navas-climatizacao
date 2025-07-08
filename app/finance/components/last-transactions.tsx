import { Transaction } from "@prisma/client"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { TRANSACTION_CATEGORY_LABELS } from "@/app/_constants/transactions"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card"
import { ScrollArea } from "@/app/_components/ui/scroll-area" // Importação adicionada

interface LastTransactionsProps {
  lastTransactions: Transaction[]
}

const LastTransactions = ({ lastTransactions }: LastTransactionsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Últimas Transações</CardTitle>
      </CardHeader>
      <CardContent>
        {/* ScrollArea adicionada aqui */}
        <ScrollArea className="h-full pr-4">
          {" "}
          {/* Adicionada classe pr-4 para padding à direita */}
          <div className="space-y-4">
            {lastTransactions.map((transaction) => (
              <div key={transaction.id} className="flex justify-between">
                <div>
                  <p className="font-bold">{transaction.name}</p>
                  <p className="text-sm text-gray-400">
                    {
                      TRANSACTION_CATEGORY_LABELS[
                        transaction.category as keyof typeof TRANSACTION_CATEGORY_LABELS
                      ]
                    }
                  </p>
                </div>
                <div>
                  <p
                    className={`font-bold ${
                      transaction.type === "DEPOSIT"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(Number(transaction.amount))}
                  </p>
                  <p className="text-right text-sm text-gray-400">
                    {format(transaction.date, "dd/MM/yyyy", { locale: ptBR })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export default LastTransactions
