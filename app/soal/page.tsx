'use client'
import {useState} from 'react'
import {useDB,topics,Q} from '@/lib/store'
export default function P(){const [db,up]=useDB();const [s,setS]=useState('');const [t,setT]=useState('');const [msg,setMsg]=useState('')
if(!db)return <p>Memuat…</p>
const imp=async(file?:File)=>{if(!file)return;try{const a=JSON.parse(await file.text());if(!Array.isArray(a)||a.some((x:Q)=>!x.id||!x.q||!Array.isArray(x.opts)||typeof x.ans!='number'))throw 0
const ids=new Set(db.qs.map(q=>q.id));const n=a.filter((x:Q)=>!ids.has(x.id));setMsg('');if(confirm(`Impor ${n.length} soal baru (${a.length-n.length} ID duplikat dilewati)?`))up(d=>({...d,qs:[...d.qs,...n.map((x:Q)=>({level:'Sedang',topic:'Umum',exp:'',...x}))]}))}catch{setMsg('File tidak valid. Format: array JSON berisi {id,topic,level,q,opts[],ans,exp}.')}}
const exp=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(db.qs,null,1)],{type:'application/json'}));a.download='bank-soal.json';a.click()}
return <div><h1>Bank Soal ({db.qs.length})</h1><div className="flex flex-wrap gap-2 mb-3"><input className="inp max-w-xs" aria-label="Cari soal" placeholder="Cari soal…" value={s} onChange={e=>setS(e.target.value)}/>
<select className="inp max-w-xs" aria-label="Filter topik" value={t} onChange={e=>setT(e.target.value)}><option value="">Semua topik</option>{topics(db).map(x=><option key={x}>{x}</option>)}</select>
<label className="btn2 cursor-pointer">Impor JSON<input type="file" accept=".json" hidden onChange={e=>imp(e.target.files?.[0])}/></label><button className="btn2" onClick={exp}>Ekspor JSON</button></div>
{msg&&<p className="text-red-700 text-sm mb-2" role="alert">{msg}</p>}
<div className="space-y-2">{db.qs.filter(q=>(!t||q.topic==t)&&q.q.toLowerCase().includes(s.toLowerCase())).map(q=><div key={q.id} className="card text-sm"><span className="text-xs text-slate-500">{q.topic} · {q.level}</span><p>{q.q}</p><button className="btn2 mt-2" onClick={()=>confirm('Hapus soal?')&&up(d=>({...d,qs:d.qs.filter(x=>x.id!=q.id)}))}>Hapus</button></div>)}</div></div>}
