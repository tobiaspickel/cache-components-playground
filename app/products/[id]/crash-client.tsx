"use client"

export const CrashClient = () => {
  const a = { hello: "world" }
  const b = global.structuredClone(a)

  return <div>
    {b.hello}
  </div>
}
