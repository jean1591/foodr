import Link from 'next/link'

export const Footer = () => {
  return (
    <div className="flex items-center justify-around gap-x-4 bg-blue-950 p-4 font-bold uppercase text-white">
      <Link href="/today">Today</Link>
      <Link href="/weekly">Weekly</Link>
    </div>
  )
}
