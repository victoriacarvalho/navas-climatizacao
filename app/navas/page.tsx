import Header from "../_components/header"
import Search from "../_components/search"
import ServiceItem from "../_components/service-item"
import { db } from "../_lib/prisma"

interface ServicesPageProps {
  searchParams: {
    search?: string
  }
}

const ServicesPage = async ({ searchParams }: ServicesPageProps) => {
  if (!searchParams.search) {
    return null
  }

  const services = await db.navasService.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: "insensitive",
      },
    },
    include: {
      Navas: true,
    },
  })

  return (
    <div>
      <Header />
      <div className="my-6 px-5">
        <Search />
      </div>
      <div className="px-5">
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Resultados para &quot;{searchParams.search}&quot;
        </h2>

        {services.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {services.map((service) => (
              <ServiceItem key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <p>Nenhum serviço encontrado para esta busca.</p>
        )}
      </div>
    </div>
  )
}

export default ServicesPage
