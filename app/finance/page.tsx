import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { isMatch, format } from "date-fns"
import ExpensesPerCategory from "./components/expenses-per-category"
import { authOptions } from "../_lib/auth"
import { getDashboard } from "../_data/get-dashboard"
import Navbar from "../_components/navbar"
import TimeSelect from "./components/time-select"
import SummaryCards from "./components/summary-cards"
import TransactionsPieChart from "./components/transactions-pie-chart"
import LastTransactions from "./components/last-transactions"

interface HomeProps {
  searchParams: {
    month: string
  }
}

const Home = async ({ searchParams: { month } }: HomeProps) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/")
  }

  // Garantir que o mês tenha dois dígitos
  const monthIsInvalid = !month || !isMatch(month, "MM")
  if (monthIsInvalid) {
    redirect(`?month=${format(new Date(), "MM")}`) // Formata o mês atual para MM
  }

  const dashboard = await getDashboard(month)

  return (
    <>
      <Navbar />
      <div className="flex h-full flex-col space-y-6 overflow-hidden p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-3">
            <TimeSelect />
          </div>
        </div>
        <div className="grid h-full grid-cols-[2fr,1fr] gap-6 overflow-hidden">
          <div className="flex flex-col gap-6 overflow-hidden">
            <SummaryCards month={month} {...dashboard} />
            <div className="grid h-full grid-cols-3 grid-rows-1 gap-6 overflow-hidden">
              <TransactionsPieChart {...dashboard} />
              <ExpensesPerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>
          <LastTransactions lastTransactions={dashboard.lastTransactions} />
        </div>
      </div>
    </>
  )
}

export default Home
