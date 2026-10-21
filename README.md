# OJK Study Hub
Jalankan lokal: `npm install && npm run dev` (buka http://localhost:3000).
Deploy: push ke GitHub, lalu di vercel.com pilih "Add New Project" dan impor repo (preset Next.js, tanpa env).
Format impor soal (JSON): `[{"id":"s1","topic":"Perbankan","level":"Sedang","q":"...","opts":["A","B","C","D"],"ans":0,"exp":"..."}]` (ans = indeks 0-4).
Data tersimpan di LocalStorage (tidak tersinkron antarperangkat). Semua data contoh berlabel [CONTOH] dan bukan materi resmi OJK.
