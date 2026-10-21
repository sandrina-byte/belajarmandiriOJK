'use client'
import {useState} from 'react'
import {useDB,uid} from '@/lib/store'
export default function P(){const [db,up]=useDB();const [s,setS]=useState('');const [f,setF]=useState({topic:'',title:'',body:''})
if(!db)return <p>Memuat…</p>
return <div><h1>Materi dan Rangkuman</h1><input className="inp mb-3" aria-label="Cari materi" placeholder="Cari materi…" value={s} onChange={e=>setS(e.target.value)}/>
<div className="card mb-4 space-y-2"><b>Tambah materi</b><input className="inp" placeholder="Topik" value={f.topic} onChange={e=>setF({...f,topic:e.target.value})}/><input className="inp" placeholder="Judul" value={f.title} onChange={e=>setF({...f,title:e.target.value})}/><textarea className="inp h-28" placeholder="Isi materi" value={f.body} onChange={e=>setF({...f,body:e.target.value})}/>
<button className="btn" disabled={!f.title||!f.topic} onClick={()=>{up(d=>({...d,ms:[...d.ms,{id:uid(),...f}]}));setF({topic:'',title:'',body:''})}}>Simpan</button></div>
<div className="space-y-3">{db.ms.filter(m=>(m.title+m.body+m.topic).toLowerCase().includes(s.toLowerCase())).map(m=><div key={m.id} className="card"><div className="text-xs text-slate-500">{m.topic}</div><b>{m.title}</b><p className="whitespace-pre-wrap text-sm my-2">{m.body}</p>
<button className="btn2" onClick={()=>up(d=>({...d,ms:d.ms.map(x=>x.id==m.id?{...x,done:!x.done}:x)}))}>{m.done?'Sudah dipelajari':'Tandai dipelajari'}</button> <button className="btn2" onClick={()=>confirm('Hapus materi?')&&up(d=>({...d,ms:d.ms.filter(x=>x.id!=m.id)}))}>Hapus</button></div>)}</div></div>}
