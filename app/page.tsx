import Header from "./_components/header"
import Image from "next/image"
import { db } from "./_lib/prisma"
import NavasItem from "./_components/NavasItem"
import ServicesItem from "./_components/services-item"
import BookingItem from "./_components/booking-item"
import Search from "./_components/search"
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"
import { ptBR } from "date-fns/locale/pt-BR"
import { format } from "date-fns"

const Home = async () => {
  const session = await getServerSession(authOptions)
  const empresa = await db.navas.findMany({})
  const services = await db.navasService.findMany({
    orderBy: {
      name: "desc",
    },
  })

  const confirmedBookings = session?.user
    ? await db.booking.findMany({
        where: {
          userId: (session.user as any).id,
          date: {
            gte: new Date(),
          },
        },
        include: {
          NavasService: {
            include: {
              Navas: true,
            },
          },
        },
        orderBy: {
          date: "asc",
        },
      })
    : []

  return (
    <div>
      {/*HEADER*/}

      <Header />

      {/*TEXTO*/}

      <div className="p-5">
        <h2 className="text-xl font-bold">
          {" "}
          Olá, {session?.user ? session.user.name : "bem vindo"}!
        </h2>
        <p>
          <span className="capitalize">
            {format(new Date(), "EEEE, dd", { locale: ptBR })}
          </span>
          <span>&nbsp;de&nbsp;</span>
          <span className="capitalize">
            {format(new Date(), "MMMM", { locale: ptBR })}
          </span>
        </p>

        {/*BUSCA*/}
        <div className="mt-6">
          <Search />
        </div>
        {/*BANNER*/}

        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="Banner"
            fill
            className="rounded-xl object-fill"
            src="/banner.png"
          />
        </div>

        <h2 className="mb-3 mt-6 p-2 text-xs font-bold uppercase text-gray-400">
          Agendamentos
        </h2>
        {/*AGENDAMENTOS*/}
        <div className="[&:: -webkit-scrollbar]:hidden flex gap-3 overflow-x-auto">
          {confirmedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>

        {/*EMPRESA*/}
        <h2 className="mb-3 mt-6 p-2 text-xs font-bold uppercase text-gray-400">
          Empresa
        </h2>
        <div className="[&:: -webkit-scrollbar]:hidden flex gap-4 overflow-auto">
          {empresa.map((navas) => (
            <NavasItem key={navas.id} navas={navas} />
          ))}
        </div>
        <h2 className="mb-3 mt-6 p-2 text-xs font-bold uppercase text-gray-400">
          Serviços
        </h2>
        <div className="[&:: -webkit-scrollbar]:hidden flex gap-4 overflow-auto">
          {services.map((navasService) => (
            <ServicesItem key={navasService.id} navasService={navasService} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
