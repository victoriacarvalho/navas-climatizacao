import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card"
import { Progress } from "@/app/_components/ui/progress"
import { ScrollArea } from "@/app/_components/ui/scroll-area"
import { TRANSACTION_CATEGORY_LABELS } from "@/app/_constants/transactions"
import { TotalExpensePerCategory } from "@/app/_data/get-dashboard/types"

interface ExpensesPerCategoryProps {
  expensesPerCategory: TotalExpensePerCategory[]
}

const ExpensesPerCategory = ({
  expensesPerCategory,
}: ExpensesPerCategoryProps) => {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle className="font-bold">Gastos por Categoria</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="space-y-6 pr-4">
            {expensesPerCategory.length > 0 ? (
              expensesPerCategory.map((category) => (
                <div key={category.category} className="space-y-2">
                  <div className="flex w-full justify-between">
                    <p className="text-sm font-medium">
                      {TRANSACTION_CATEGORY_LABELS[category.category]}
                    </p>
                    <p className="text-sm font-bold">
                      {category.percentageOfTotal}%
                    </p>
                  </div>
                  <Progress value={category.percentageOfTotal} />
                </div>
              ))
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-muted-foreground">
                  Nenhuma despesa registrada neste mês.
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export default ExpensesPerCategory
