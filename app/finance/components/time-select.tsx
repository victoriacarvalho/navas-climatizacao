// app/_components/time-select.tsx
"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select"
import { useRouter, useSearchParams } from "next/navigation"

const TimeSelect = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const month = searchParams.get("month") || ""

  const handleMonthChange = (value: string) => {
    router.push(`?month=${value}`)
  }

  return (
    <Select value={month} onValueChange={handleMonthChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Selecione o mês" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="01">Janeiro</SelectItem>
        <SelectItem value="02">Fevereiro</SelectItem>
        <SelectItem value="03">Março</SelectItem>
        <SelectItem value="04">Abril</SelectItem>
        <SelectItem value="05">Maio</SelectItem>
        <SelectItem value="06">Junho</SelectItem>
        <SelectItem value="07">Julho</SelectItem>
        <SelectItem value="08">Agosto</SelectItem>
        <SelectItem value="09">Setembro</SelectItem>
        <SelectItem value="10">Outubro</SelectItem>
        <SelectItem value="11">Novembro</SelectItem>
        <SelectItem value="12">Dezembro</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default TimeSelect
