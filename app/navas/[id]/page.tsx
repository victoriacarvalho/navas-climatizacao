import ServiceItem from "@/app/_components/service-item"
import SidebarSheet from "@/app/_components/sidebar-sheet"
import { Button } from "@/app/_components/ui/button"
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"
import { db } from "@/app/_lib/prisma"
import {
  ChevronLeftIcon,
  MapPinIcon,
  MenuIcon,
  SmartphoneIcon,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface NavasPageProps {
  params: {
    id: string
  }
}

const NavasPage = async ({ params }: NavasPageProps) => {
  const navas = await db.navas.findUnique({
    where: {
      id: params.id,
    },
    include: {
      NavasService: true,
    },
  })

  if (!navas) {
    return notFound()
  }

  return (
    <div>
      {/* Imagem*/}
      <div className="relative h-[250px] w-full">
        <Image
          src={navas?.imageUrl}
          fill
          className="object-cover"
          alt={navas.name}
        />
        <Button
          size="icon"
          variant="secondary"
          className="absolute left-4 top-4"
          asChild
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="absolute right-4 top-4"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarSheet />
        </Sheet>
      </div>
      {/* Título*/}
      <div className="border-b border-solid p-5">
        <h1 className="mb-3 text-xl font-bold">{navas?.name}</h1>
        <div className="mb-2 flex items-center gap-2">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">São Gonçalo e região</p>
        </div>
      </div>
      {/* Descrição */}
      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="text-xs font-bold uppercase text-gray-400">Sobre nós</h2>
        <p className="text-justify text-sm">{navas?.description}</p>
      </div>
      {/* Serviços */}
      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="mb-3 text-xs font-bold uppercase text-gray-400">
          Serviços
        </h2>
        <div className="space-y-3 overflow-auto">
          {navas.NavasService.map((service) => (
            <ServiceItem key={service.id} service={service} />
          ))}
        </div>
      </div>
      {/* Contato */}
      <div className="space-y-3 p-5">
        <div className="flex justify-between">
          {/* Esquerda */}
          <div className="flex items-center gap-2">
            <SmartphoneIcon />
            <p className="text-sm"> {navas.phones}</p>
          </div>
          {/* Direita */}
          <Button variant="outline">
            <Link href="https://wa.me/5531998125487">Whatsapp</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NavasPage
