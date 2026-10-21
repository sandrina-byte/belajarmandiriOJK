'use client'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {Home,BookOpen,Database,Dumbbell,Timer,XCircle,Layers,BarChart3,Settings} from 'lucide-react'
const N=[['/','Dasbor',Home],['/materi','Materi dan Rangkuman',BookOpen],['/soal','Bank Soal',Database],['/latihan','Latihan per Topik',Dumbbell],['/tryout','Simulasi Tryout',Timer],['/review','Review Jawaban Salah',XCircle],['/flashcards','Flashcards',Layers],['/statistik','Statistik dan Progres',BarChart3],['/pengaturan','Pengaturan',Settings]] as const
export default function Shell({children}:{children:React.ReactNode}){const p=usePathname()
return <div className="md:flex min-h-screen"><nav aria-label="Menu utama" className="md:w-64 md:min-h-screen bg-white border-r p-3 flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
<b className="hidden md:block text-navy text-lg px-3 py-3">OJK Study Hub</b>
{N.map(([h,l,I])=><Link key={h} href={h} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm whitespace-nowrap ${p===h?'bg-navy text-white':'text-slate-600 hover:bg-sky'}`}><I size={16}/>{l}</Link>)}</nav>
<main className="flex-1 p-4 md:p-8 max-w-5xl">{children}</main></div>}
