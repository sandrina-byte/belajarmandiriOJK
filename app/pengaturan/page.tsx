'use client'
import {useDB,seed} from '@/lib/store'
export default function P(){const [db,up]=useDB();if(!db)return <p>Memuat…</p>
const bk=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(db)],{type:'application/json'}));a.download='cadangan-ojk.json';a.click()}
const rs=async(f?:File)=>{if(!f)return;try{const d=JSON.parse(await f.text());if(d.v!==1||!Array.isArray(d.qs))throw 0;if(confirm('Ganti semua data dengan cadangan ini?'))up(()=>({...seed,...d}))}catch{alert('File cadangan tidak valid.')}}
return <div><h1>Pengaturan</h1><div className="card space-y-3 max-w-md"><label className="text-sm">Jumlah soal default<input className="inp" type="number" min={1} value={db.set.n} onChange={e=>up(d=>({...d,set:{...d.set,n:+e.target.value||1}}))}/></label>
<label className="text-sm">Durasi tryout default (menit)<input className="inp" type="number" min={1} value={db.set.mins} onChange={e=>up(d=>({...d,set:{...d.set,mins:+e.target.value||1}}))}/></label>
<button className="btn" onClick={bk}>Ekspor Cadangan</button><label className="btn2 cursor-pointer">Pulihkan Cadangan<input type="file" accept=".json" hidden onChange={e=>rs(e.target.files?.[0])}/></label>
<button className="btn2" onClick={()=>confirm('Reset riwayat dan progres? Materi, soal, dan kartu tidak dihapus.')&&up(d=>({...d,att:[],sess:[],mastered:[]}))}>Reset Progres</button>
<p className="text-xs text-slate-500">Data tersimpan di browser ini saja, tidak tersinkron antarperangkat, dan hilang jika data browser dihapus. Lakukan cadangan berkala.</p></div></div>}
