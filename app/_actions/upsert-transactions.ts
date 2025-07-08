// app/_actions/upsert-transaction.ts
"use server"

import { db } from "../_lib/prisma"
import { revalidatePath } from "next/cache"

interface UpsertTransactionParams {
  id?: string
  name: string
  amount: number
  type: "DEPOSIT" | "EXPENSE"
  category:
    | "SERVICE_PAYMENT"
    | "PARTS_PURCHASE"
    | "TOOLS"
    | "FUEL"
    | "VEHICLE_MAINTENANCE"
    | "SALARIES"
    | "TAXES"
    | "OTHER"
  paymentMethod:
    | "CREDIT_CARD"
    | "DEBIT_CARD"
    | "BANK_TRANSFER"
    | "BANK_SLIP"
    | "CASH"
    | "PIX"
    | "OTHER"
  date: Date
}

export const upsertTransaction = async (params: UpsertTransactionParams) => {
  const { id, ...data } = params

  if (id) {
    await db.transaction.update({
      where: { id },
      data,
    })
  } else {
    // Substitua pelo navasId real
    const navasId = "clxmq4f6r000008l5g1j2h3k4"

    await db.transaction.create({
      data: {
        ...data,
        navasId,
      },
    })
  }

  revalidatePath("/")
  revalidatePath("/transactions")
}
