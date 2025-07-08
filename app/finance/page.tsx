import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { isMatch, format } from "date-fns"
import ExpensesPerCategory from "./components/expenses-per-category"
import { authOptions } from "../_lib/auth"
import { getDashboard } from "../_data/get-dashboard"
import Header from "../_components/header"
import TimeSelect from "./components/time-select"
import SummaryCards from "./components/summary-cards"
import TransactionsPieChart from "./components/transactions-pie-chart"
import LastTransactions from "./components/last-transactions"
import AddTransactionButton from "../_components/add-transaction-button"

interface HomeProps {
  searchParams: {
    month: string
  }
}

const Home = async ({ searchParams: { month } }: HomeProps) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    // Redireciona para a página inicial se não estiver logado
    redirect("/")
  }

  // Garante que o mês tenha dois dígitos
  const monthIsInvalid = !month || !isMatch(month, "MM")
  if (monthIsInvalid) {
    // Formata o mês atual para MM
    redirect(`/finance?month=${format(new Date(), "MM")}`)
  }

  const dashboard = await getDashboard(month)

  return (
    <div className="flex h-full flex-col">
      <Header />
      <main className="flex-1 space-y-6 overflow-y-auto p-4 md:p-6">
        {/* Cabeçalho do Dashboard */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex w-full items-center gap-3 sm:w-auto">
            <TimeSelect />
            <AddTransactionButton />
          </div>
        </div>

        {/* Grade principal responsiva */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Coluna da Esquerda (ocupa 2/3 em telas grandes) */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <SummaryCards {...dashboard} />

            {/* Grade interna para gráficos (também responsiva) */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
              <div className="xl:col-span-2">
                {/* Correção aqui */}
                <TransactionsPieChart {...dashboard} month={month} />
              </div>
              <div className="xl:col-span-3">
                <ExpensesPerCategory
                  expensesPerCategory={dashboard.totalExpensePerCategory}
                />
              </div>
            </div>
          </div>

          {/* Coluna da Direita (ocupa 1/3 em telas grandes) */}
          <div className="lg:col-span-1">
            <LastTransactions lastTransactions={dashboard.lastTransactions} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
