'use client'
import {useDB,acc,topics} from '@/lib/store'
export default function P(){const [db]=useDB();if(!db)return <p>Memuat…</p>
if(db.sess.length<2)return <div><h1>Statistik dan Progres</h1><p className="card">Grafik akan tersedia setelah Anda menyelesaikan minimal 2 sesi. Akurasi saat ini: {acc(db.att)}% dari {db.att.length} soal.</p></div>
return <div><h1>Statistik dan Progres</h1><div className="card mb-4"><b>Nilai per sesi (%)</b><div className="flex items-end gap-1 h-32 mt-2">{db.sess.slice(-20).map((s,k)=><div key={k} title={`${s.mode}: ${s.score}/${s.total}`} className="flex-1 bg-navy rounded-t" style={{height:Math.round(100*s.score/s.total)+'%'}}/>)}</div></div>
<div className="card"><b>Performa per topik</b>{topics(db).map(t=>{const a=db.att.filter(x=>x.topic==t);return <p key={t} className="text-sm mt-1">{t}: {a.length?acc(a)+'% ('+a.length+' percobaan)':'belum dikerjakan'}</p>})}<p className="text-sm mt-3">Durasi belajar: {Math.round(db.sess.reduce((s,x)=>s+x.secs,0)/60)} menit · Dikuasai: {db.mastered.length} soal</p></div></div>}
