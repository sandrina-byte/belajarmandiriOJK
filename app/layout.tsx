import './globals.css'
import Shell from '@/components/Shell'
export const metadata={title:'OJK Study Hub',description:'Belajar mandiri dan latihan soal OJK'}
export default function L({children}:{children:React.ReactNode}){return <html lang="id"><body><Shell>{children}</Shell></body></html>}
