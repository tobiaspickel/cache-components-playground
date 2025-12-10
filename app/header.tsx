import { cookies } from "next/headers"
import { ReactNode } from "react"

export const Header = ({ children }: { children: ReactNode }) => {
  return (
    <header>
      Hello there from the header
      {children}
    </header>
  )
}

export const LoginButton = async () => {

  const cookieStore = await cookies()
  const isLoggedIn = cookieStore.get("sid")

  if (isLoggedIn?.value) {
    return (
      <form action={async () => {
        "use server"
        const cookieStore = await cookies()
        cookieStore.delete("sid")
      }
      }>
        <button>logout</button>
      </form>
    )
  }
  return (

    <form action={async () => {
      "use server"
      const cookieStore = await cookies()
      cookieStore.set("sid", 'kuchen')
    }
    }>
      <button>login</button>
    </form>

  )
}
