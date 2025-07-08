"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { Button } from "./ui/button"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import SignInDialog from "./sing-in-dialog"
import { LogInIcon, LogOutIcon } from "lucide-react"

const Navbar = () => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data } = useSession()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const handleLogoutClick = () => signOut()

  return (
    <nav className="flex items-center justify-between border-b border-solid px-8 py-4">
      {/* ESQUERDA */}
      <div className="flex items-center gap-10">
        <Link href="/">
          <Image
            src="/logo.png"
            width={170}
            height={38}
            alt="Navas Climatização"
          />
        </Link>
        <div className="hidden gap-10 sm:flex">
          <Link
            href="/"
            className={
              pathname === "/"
                ? "font-bold text-primary"
                : "text-muted-foreground"
            }
          >
            Dashboard
          </Link>
          <Link
            href="/bookings"
            className={
              pathname === "/bookings"
                ? "font-bold text-primary"
                : "text-muted-foreground"
            }
          >
            Agendamentos
          </Link>
          <Link
            href="/finance"
            className={
              pathname === "/finance"
                ? "font-bold text-primary"
                : "text-muted-foreground"
            }
          >
            Financeiro
          </Link>
        </div>
      </div>

      {/* BOTÃO HAMBURGER PARA TELAS PEQUENAS */}
      <button
        className="p-2 text-muted-foreground sm:hidden"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? "✕" : "☰"}
      </button>

      {/* MENU LATERAL EM TELAS PEQUENAS */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } absolute right-8 top-16 z-10 rounded-md bg-card p-4 shadow-md sm:hidden`}
      >
        <Link
          href="/"
          className={
            pathname === "/"
              ? "block py-2 font-bold text-primary"
              : "block py-2 text-muted-foreground"
          }
          onClick={() => setIsMenuOpen(false)}
        >
          Dashboard
        </Link>
        <Link
          href="/bookings"
          className={
            pathname === "/bookings"
              ? "block py-2 font-bold text-primary"
              : "block py-2 text-muted-foreground"
          }
          onClick={() => setIsMenuOpen(false)}
        >
          Agendamentos
        </Link>
        <Link
          href="/finance"
          className={
            pathname === "/finance"
              ? "block py-2 font-bold text-primary"
              : "block py-2 text-muted-foreground"
          }
          onClick={() => setIsMenuOpen(false)}
        >
          Financeiro
        </Link>
      </div>

      {/* DIREITA */}
      <div className="hidden items-center gap-3 sm:flex">
        {data?.user ? (
          <>
            <Avatar>
              <AvatarImage src={data.user.image ?? ""} />
            </Avatar>
            <span className="font-bold">{data.user.name}</span>
            <Button variant="ghost" size="icon" onClick={handleLogoutClick}>
              <LogOutIcon />
            </Button>
          </>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <LogInIcon className="mr-2" />
                Login
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[90%]">
              <SignInDialog />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </nav>
  )
}

export default Navbar
