'use client'
import Link from 'next/link'
import {useDB,acc,topics,wrongIds} from '@/lib/store'
export default function P(){const [db]=useDB();if(!db)return <p>Memuat…</p>
const last=db.sess.filter(s=>s.mode=='tryout').slice(-1)[0]
return <div><h1>Dasbor</h1>{!db.att.length&&<p className="card mb-4">Belum ada aktivitas. Mulailah dengan latihan soal pertama Anda.</p>}
<div className="grid grid-cols-2 md:grid-cols-4 gap-3">{[['Soal dikerjakan',db.att.length],['Akurasi',acc(db.att)+'%'],['Materi dipelajari',db.ms.filter(m=>m.done).length+'/'+db.ms.length],['Perlu diulang',wrongIds(db).length]].map(([l,v])=><div key={l} className="card"><div className="text-2xl font-semibold text-navy">{v}</div><div className="text-sm text-slate-500">{l}</div></div>)}</div>
<div className="card mt-4"><b>Tryout terakhir:</b> {last?`${last.score}/${last.total}`:'belum ada'}<br/><b>Latihan terakhir:</b> {db.sess.slice(-1)[0]?new Date(db.sess.slice(-1)[0].t).toLocaleString('id-ID'):'belum ada'}</div>
<div className="card mt-4"><b>Progres per topik</b>{topics(db).map(t=>{const a=db.att.filter(x=>x.topic==t);return <div key={t} className="text-sm mt-2">{t}: {a.length?acc(a)+'%':'belum dikerjakan'}<div className="h-2 bg-sky rounded"><div className="h-2 bg-navy rounded" style={{width:acc(a)+'%'}}/></div></div>})}</div>
<div className="flex gap-2 mt-4"><Link className="btn" href="/latihan">Lanjutkan Belajar</Link><Link className="btn2" href="/tryout">Mulai Tryout</Link></div></div>}
