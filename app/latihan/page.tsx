'use client'
import {useState} from 'react'
import {useDB,topics,shuffle,Q} from '@/lib/store'
import Quiz from '@/components/Quiz'
export default function P(){const [db,up]=useDB();const [t,setT]=useState('');const [m,setM]=useState<'belajar'|'latihan'>('belajar');const [run,setRun]=useState<Q[]|null>(null)
if(!db)return <p>Memuat…</p>
if(run)return <Quiz qs={run} mode={m} up={up} onExit={()=>setRun(null)}/>
const pool=db.qs.filter(q=>!t||q.topic==t)
return <div><h1>Latihan per Topik</h1><div className="card space-y-3 max-w-md"><select className="inp" aria-label="Topik" value={t} onChange={e=>setT(e.target.value)}><option value="">Semua topik</option>{topics(db).map(x=><option key={x}>{x}</option>)}</select>
<select className="inp" aria-label="Mode" value={m} onChange={e=>setM(e.target.value as 'belajar'|'latihan')}><option value="belajar">Mode Belajar (pembahasan langsung)</option><option value="latihan">Mode Latihan (pembahasan di akhir)</option></select>
<button className="btn" disabled={!pool.length} onClick={()=>setRun(shuffle(pool).slice(0,db.set.n))}>Mulai ({Math.min(pool.length,db.set.n)} soal)</button></div></div>}
