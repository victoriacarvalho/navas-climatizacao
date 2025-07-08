"use server"

import { auth } from "@clerk/nextjs/server"
import { db } from "../_lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../_lib/auth"
import { revalidatePath } from "next/cache"

interface CreateBookingParams {
  serviceId: string
  date: Date
  observacoes: string
}

export const createBooking = async (params: CreateBookingParams) => {
  const user = await getServerSession(authOptions)

  if (!user) {
    throw new Error("Usuário não autenticado.")
  }

  await db.booking.create({
    data: {
      serviceId: params.serviceId,
      date: params.date,
      description: params.observacoes,
      userId: (user.user as any).id,
    },
  })
  revalidatePath("/navas[id]")
  revalidatePath("/bookings")
}
