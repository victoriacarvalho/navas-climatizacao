// app/_constants/transactions.ts
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client"

export const TRANSACTIONS_TYPE_OPTIONS: {
  value: TransactionType
  label: string
}[] = [
  { value: "DEPOSIT", label: "Depósito" },
  { value: "EXPENSE", label: "Despesa" },
]

export const TRANSACTION_CATEGORY_OPTIONS: {
  value: TransactionCategory
  label: string
}[] = [
  { value: "SERVICE_PAYMENT", label: "Pagamento de Serviço" },
  { value: "PARTS_PURCHASE", label: "Compra de Peças" },
  { value: "TOOLS", label: "Ferramentas" },
  { value: "FUEL", label: "Combustível" },
  { value: "VEHICLE_MAINTENANCE", label: "Manutenção de Veículo" },
  { value: "SALARIES", label: "Salários" },
  { value: "TAXES", label: "Impostos" },
  { value: "OTHER", label: "Outros" },
]

export const TRANSACTION_PAYMENT_METHOD_OPTIONS: {
  value: TransactionPaymentMethod
  label: string
}[] = [
  { value: "CREDIT_CARD", label: "Cartão de Crédito" },
  { value: "DEBIT_CARD", label: "Cartão de Débito" },
  { value: "BANK_TRANSFER", label: "Transferência Bancária" },
  { value: "BANK_SLIP", label: "Boleto" },
  { value: "CASH", label: "Dinheiro" },
  { value: "PIX", label: "Pix" },
  { value: "OTHER", label: "Outro" },
]
