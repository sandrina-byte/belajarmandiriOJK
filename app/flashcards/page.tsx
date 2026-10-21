'use client'
import {useState} from 'react'
import {useDB,uid} from '@/lib/store'
export default function P(){const [db,up]=useDB();const [i,setI]=useState(0);const [flip,setFlip]=useState(false);const [f,setF]=useState({front:'',back:''})
if(!db)return <p>Memuat…</p>
const c=db.fs[i%Math.max(1,db.fs.length)];const go=(d:number)=>{setFlip(false);setI((i+d+db.fs.length)%db.fs.length)}
return <div><h1>Flashcards</h1>{c?<><button aria-label="Balik kartu" onClick={()=>setFlip(!flip)} className="card w-full min-h-40 text-lg text-center">{flip?c.back:c.front}</button>
<div className="flex flex-wrap gap-2 mt-3"><button className="btn2" onClick={()=>go(-1)}>Sebelumnya</button><button className="btn2" onClick={()=>go(1)}>Berikutnya</button><button className="btn" onClick={()=>up(d=>({...d,fs:d.fs.map(x=>x.id==c.id?{...x,known:!x.known}:x)}))}>{c.known?'Sudah Hafal':'Belum Hafal'}</button><button className="btn2" onClick={()=>confirm('Hapus kartu?')&&up(d=>({...d,fs:d.fs.filter(x=>x.id!=c.id)}))}>Hapus</button></div></>:<p>Belum ada kartu.</p>}
<div className="card mt-6 space-y-2 max-w-md"><b>Tambah kartu</b><input className="inp" placeholder="Pertanyaan" value={f.front} onChange={e=>setF({...f,front:e.target.value})}/><input className="inp" placeholder="Jawaban" value={f.back} onChange={e=>setF({...f,back:e.target.value})}/><button className="btn" disabled={!f.front||!f.back} onClick={()=>{up(d=>({...d,fs:[...d.fs,{id:uid(),topic:'Umum',...f}]}));setF({front:'',back:''})}}>Simpan</button></div></div>}
