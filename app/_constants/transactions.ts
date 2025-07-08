import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client"

export const TRANSACTION_CATEGORY_LABELS: Record<TransactionCategory, string> =
  {
    SERVICE_PAYMENT: "Pagamento de Serviço",
    PARTS_PURCHASE: "Compra de Peças",
    TOOLS: "Ferramentas",
    FUEL: "Combustível",
    VEHICLE_MAINTENANCE: "Manutenção de Veículo",
    SALARIES: "Salários",
    TAXES: "Impostos",
    OTHER: "Outros",
  }

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
}[] = (Object.keys(TRANSACTION_CATEGORY_LABELS) as TransactionCategory[]).map(
  (category) => ({
    value: category,
    label: TRANSACTION_CATEGORY_LABELS[category],
  }),
)

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
