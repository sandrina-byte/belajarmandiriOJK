'use client'
import {useState,useEffect} from 'react'
import {useDB,topics,shuffle,Q} from '@/lib/store'
import Quiz,{RK} from '@/components/Quiz'
export default function P(){const [db,up]=useDB();const [t,setT]=useState('');const [n,setN]=useState(0);const [mins,setMins]=useState(0);const [run,setRun]=useState<Q[]|null>(null)
useEffect(()=>{if(!db)return;setN(db.set.n);setMins(db.set.mins);try{const r=JSON.parse(localStorage.getItem(RK)||'null');if(r){const qs=r.ids.map((i:string)=>db.qs.find(q=>q.id==i)).filter(Boolean);if(qs.length){setMins(Math.max(1,Math.round((r.end-Date.now())/60000)));setRun(qs)}}}catch{}},[db?.v])
if(!db)return <p>Memuat…</p>
if(run)return <Quiz qs={run} mode="tryout" mins={mins} up={up} onExit={()=>setRun(null)}/>
const pool=db.qs.filter(q=>!t||q.topic==t)
return <div><h1>Simulasi Tryout</h1><div className="card space-y-3 max-w-md"><select className="inp" aria-label="Topik" value={t} onChange={e=>setT(e.target.value)}><option value="">Semua topik</option>{topics(db).map(x=><option key={x}>{x}</option>)}</select>
<label className="text-sm">Jumlah soal<input className="inp" type="number" min={1} value={n} onChange={e=>setN(+e.target.value)}/></label><label className="text-sm">Durasi (menit)<input className="inp" type="number" min={1} value={mins} onChange={e=>setMins(+e.target.value)}/></label>
<p className="text-xs text-slate-500">Format ini buatan Anda sendiri, bukan format resmi ujian OJK.</p><button className="btn" disabled={!pool.length||n<1||mins<1} onClick={()=>setRun(shuffle(pool).slice(0,n))}>Mulai Tryout</button></div></div>}
