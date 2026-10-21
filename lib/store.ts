'use client'
import {useEffect,useState} from 'react'
export type Q={id:string;topic:string;level:string;q:string;opts:string[];ans:number;exp:string;sample?:boolean}
export type M={id:string;topic:string;title:string;body:string;done?:boolean}
export type F={id:string;topic:string;front:string;back:string;known?:boolean}
export type Att={qid:string;topic:string;pick:number;ok:boolean;t:number;mode:string}
export type Sess={t:number;mode:string;total:number;score:number;secs:number}
export type DB={v:1;qs:Q[];ms:M[];fs:F[];att:Att[];sess:Sess[];mastered:string[];set:{n:number;mins:number}}
const K='ojk-study-hub'
export const seed:DB={v:1,set:{n:10,mins:30},att:[],sess:[],mastered:[],
qs:[{id:'c1',topic:'Pengenalan OJK',level:'Mudah',q:'[CONTOH] OJK adalah singkatan dari...',opts:['Otoritas Jasa Keuangan','Organisasi Jasa Keuangan','Otoritas Jaminan Kredit','Operator Jasa Kapital'],ans:0,exp:'Contoh soal; ganti dengan soal Anda sendiri.',sample:true},
{id:'c2',topic:'Literasi Keuangan',level:'Sedang',q:'[CONTOH] Manakah yang termasuk produk simpanan?',opts:['Deposito','Saham','Obligasi','Reksa dana'],ans:0,exp:'Contoh saja, bukan materi resmi.',sample:true}],
ms:[{id:'m1',topic:'Pengenalan OJK',title:'[CONTOH] Materi contoh',body:'Ini materi contoh, bukan materi resmi OJK. Hapus dan ganti dengan rangkuman Anda.'}],
fs:[{id:'f1',topic:'Pengenalan OJK',front:'[CONTOH] Kepanjangan OJK?',back:'Otoritas Jasa Keuangan'}]}
export const uid=()=>Math.random().toString(36).slice(2,9)
export function load():DB{try{const r=localStorage.getItem(K);if(!r)return seed;const d=JSON.parse(r);return d.v===1?{...seed,...d}:seed}catch{return seed}}
export function useDB(){const [db,s]=useState<DB|null>(null);useEffect(()=>s(load()),[])
const up=(f:(d:DB)=>DB)=>{const n=f(load());localStorage.setItem(K,JSON.stringify(n));s(n)};return [db,up] as const}
export const topics=(d:DB)=>Array.from(new Set(d.qs.map(q=>q.topic)))
export const shuffle=<T,>(a:T[])=>[...a].sort(()=>Math.random()-.5)
export const acc=(a:Att[])=>a.length?Math.round(100*a.filter(x=>x.ok).length/a.length):0
export function wrongIds(d:DB){const l=new Map<string,Att>();d.att.forEach(a=>l.set(a.qid,a));return d.qs.filter(q=>l.get(q.id)?.ok===false&&!d.mastered.includes(q.id))}
