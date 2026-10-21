'use client'
import {useState} from 'react'
import {useDB,wrongIds,Q} from '@/lib/store'
import Quiz from '@/components/Quiz'
export default function P(){const [db,up]=useDB();const [run,setRun]=useState<Q[]|null>(null)
if(!db)return <p>Memuat…</p>
if(run)return <Quiz qs={run} mode="latihan" up={up} onExit={()=>setRun(null)}/>
const w=wrongIds(db)
return <div><h1>Review Jawaban Salah</h1><button className="btn mb-3" disabled={!w.length} onClick={()=>setRun(w)}>Latihan Ulang Semua Jawaban Salah</button>
{!w.length&&<p className="card">Tidak ada soal yang perlu dipelajari.</p>}
<div className="space-y-2">{w.map(q=>{const h=db.att.filter(a=>a.qid==q.id);const l=h[h.length-1];return <div key={q.id} className="card text-sm"><p className="font-medium">{q.q}</p><p>Jawaban terakhir: {l.pick<0?'(kosong)':q.opts[l.pick]}</p><p>Benar: {q.opts[q.ans]}</p><p className="text-slate-600">{q.exp}</p><p>Percobaan: {h.length}</p>
<button className="btn2 mt-2" onClick={()=>up(d=>({...d,mastered:[...d.mastered,q.id]}))}>Tandai Sudah Dikuasai</button></div>})}</div></div>}
