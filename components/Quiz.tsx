'use client'
import {useEffect,useState} from 'react'
import {Q,DB} from '@/lib/store'
export const RK='ojk-run-tryout'
export default function Quiz({qs,mode,mins=0,up,onExit}:{qs:Q[];mode:'belajar'|'latihan'|'tryout';mins?:number;up:(f:(d:DB)=>DB)=>void;onExit:()=>void}){
const [s0]=useState(()=>{try{return mode=='tryout'?JSON.parse(localStorage.getItem(RK)||'null'):null}catch{return null}})
const [ans,setAns]=useState<(number|null)[]>(s0?.ans||qs.map(()=>null))
const [end]=useState<number>(s0?.end||Date.now()+mins*60000)
const [start]=useState(Date.now())
const [i,setI]=useState(0),[done,setDone]=useState(false),[chk,setChk]=useState(false),[flag,setFlag]=useState<number[]>([]),[now,setNow]=useState(Date.now())
useEffect(()=>{if(mode=='tryout')localStorage.setItem(RK,JSON.stringify({ans,end,ids:qs.map(q=>q.id)}))},[ans])
const finish=()=>{if(done)return;setDone(true);localStorage.removeItem(RK);const t=Date.now()
const at=qs.map((q,k)=>({qid:q.id,topic:q.topic,pick:ans[k]??-1,ok:ans[k]===q.ans,t,mode}))
up(d=>({...d,att:[...d.att,...at],sess:[...d.sess,{t,mode,total:qs.length,score:at.filter(a=>a.ok).length,secs:Math.round((t-start)/1000)}]}))}
useEffect(()=>{if(mode!='tryout'||done)return;const h=setInterval(()=>{setNow(Date.now());if(Date.now()>=end)finish()},1000);return()=>clearInterval(h)})
const sc=qs.filter((q,k)=>ans[k]===q.ans).length
if(done)return <div className="space-y-3"><div className="card"><h1>Hasil: {sc}/{qs.length} ({Math.round(100*sc/qs.length)}%)</h1><button className="btn" onClick={onExit}>Selesai</button></div>
{qs.map((q,k)=><div key={q.id} className="card"><p className="font-medium">{k+1}. {q.q}</p><p className={ans[k]===q.ans?'text-green-700':'text-red-700'}>Jawaban Anda: {ans[k]==null?'(kosong)':q.opts[ans[k]!]}</p><p>Kunci: {q.opts[q.ans]}</p><p className="text-sm text-slate-600 mt-1">{q.exp}</p></div>)}</div>
const q=qs[i];const rev=mode=='belajar'&&chk;const left=Math.max(0,Math.round((end-now)/1000))
return <div className="space-y-3"><div className="flex justify-between text-sm"><span>Soal {i+1} dari {qs.length}</span>{mode=='tryout'&&<span className="font-mono">{Math.floor(left/60)}:{String(left%60).padStart(2,'0')}</span>}</div>
<div className="card"><p className="font-medium mb-3">{q.q}</p><div className="space-y-2">{q.opts.map((o,k)=><button key={k} disabled={rev} onClick={()=>setAns(a=>a.map((x,j)=>j==i?k:x))} className={`w-full text-left border rounded-xl px-3 py-2 text-sm ${ans[i]==k?'border-navy bg-sky':''} ${rev&&k==q.ans?'bg-green-100 border-green-600':''} ${rev&&ans[i]==k&&k!=q.ans?'bg-red-100 border-red-600':''}`}>{'ABCDE'[k]}. {o}</button>)}</div>
{rev&&<p className="mt-3 text-sm">{ans[i]==q.ans?'Benar.':'Salah.'} {q.exp}</p>}</div>
<div className="flex flex-wrap gap-2">{mode!='belajar'&&<button className="btn2" disabled={i==0} onClick={()=>setI(i-1)}>Sebelumnya</button>}
{mode=='belajar'&&!chk&&<button className="btn" disabled={ans[i]==null} onClick={()=>setChk(true)}>Periksa Jawaban</button>}
{(mode!='belajar'||chk)&&i<qs.length-1&&<button className="btn" onClick={()=>{setI(i+1);setChk(false)}}>Berikutnya</button>}
{(mode!='belajar'||chk)&&i==qs.length-1&&<button className="btn" onClick={()=>{if(mode=='belajar'||confirm(`Kumpulkan jawaban? ${ans.filter(a=>a==null).length} soal belum dijawab.`))finish()}}>Selesai dan Kumpulkan</button>}
{mode=='tryout'&&<button className="btn2" onClick={()=>setFlag(f=>f.includes(i)?f.filter(x=>x!=i):[...f,i])}>{flag.includes(i)?'Hapus tanda':'Tandai ragu-ragu'}</button>}</div>
{mode!='belajar'&&<div className="flex flex-wrap gap-1">{qs.map((_,k)=><button key={k} aria-label={`Soal ${k+1}`} onClick={()=>setI(k)} className={`w-8 h-8 rounded text-xs border ${k==i?'ring-2 ring-navy':''} ${flag.includes(k)?'bg-amber-200':ans[k]!=null?'bg-sky':'bg-white'}`}>{k+1}</button>)}</div>}</div>}
