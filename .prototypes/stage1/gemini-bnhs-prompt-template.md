# 📋 TEMPLATE PROMPT GEMINI: GENERATE BNHS (Blueprint and Handover Specification)

Gunakan prompt di bawah ini saat kamu meminta Gemini merancang fitur baru atau tahapan stage berikutnya agar Gemini menghasilkan dokumen **BNHS** yang rapi, presisi, dan sesuai dengan standar yang dipahami oleh Antigravity.

---

```markdown
Halo Gemini! Saya ingin kita merancang prototipe fitur untuk project **ItqanMath** yang dibangun di atas arsitektur **reza-ui** (Next.js 16 App Router, React 19, Tailwind CSS v4, TypeScript Strict, Doktrin rscoclsddsddryzaapfpsmbip).

Berikut adalah konteks arsitektur dan aturan main di repository kami (dari folder `.ai/`):
[Lampirkan/Tempel isi berkas .ai/ARCHITECTURE.md, .ai/DECISIONS.md, dan .ai/WORKFLOW.md di sini jika diperlukan]

### KEBUTUHAN FITUR YANG INGIN DIRANCANG:
[Jelaskan fitur yang kamu inginkan, misal: Fitur Pengurangan, Mode Pilihan Ganda, dsb.]

---

### ATURAN WAJIB UNTUK GEMINI DALAM MENYUSUN SPESIFIKASI:
1. **Bahasa Penamaan Kode (Strict English Naming):**
   - SELURUH nama tipe data (`type`), variabel, fungsi, konstanta, dan properti WAJIB menggunakan Bahasa Inggris formal.
   - DILARANG KERAS mencampur Bahasa Indonesia pada identifier kode (contoh: DILARANG `TotalSoalOption`, `totalSoal`, `kombinasiDigit`; WAJIB `TotalQuestionsOption`, `totalQuestions`, `digitCombination`). Komentar/deskripsi teks tetap boleh Bahasa Indonesia.
2. **Kepatuhan Tipe Data:**
   - 100% menggunakan `type` (DILARANG menggunakan `interface`).
3. **Pemisahan Server vs Client Leaf:**
   - Pisahkan mana yang harus murni Server Component (layout shell, header info, static content) dan mana daun interaktif yang butuh `'use client'` (form, timer, modals).
4. **Data-Driven & SSOT:**
   - Pisahkan kamus teks/lokalisasi (EN/ID), preset, dan konfigurasi agar siap diekstrak ke layer data (`src/data/`), bukan di-hardcode di tengah JSX.
5. **Kedaulatan Root PageSection & 1-Viewport Fit:**
   - Seluruh halaman latihan wajib dirancang presisi untuk viewport mobile 360x680 tanpa scroll bar vertikal (No-Scroll). Wadah daftar atau modal harus memiliki `min-h-0` dan `overflow-y-auto` internal.

---

### OUTPUT YANG DIHARAPKAN DARI GEMINI:
Tolong berikan 2 output:
1. **Dokumen BNHS (`blueprint-n-handover-specification.md`)** dengan struktur baku:
   - 🏛️ Metadata & Target Doktrin
   - 🤝 Peran & Pembagian Kerja (Product Owner, Antigravity, Gemini)
   - 🎯 Ringkasan Eksekutif Fitur
   - 🔄 End-to-End User Flow & State Machine Diagram
   - ⚙️ Spesifikasi Teknis & Aturan Bisnis (Tipe Data Bahasa Inggris murni, logika matematika, sanitasi input)
   - 🏗️ Panduan Bridging ke `reza-ui` (Server vs Client Leaf, Data-Driven, 1-Viewport Fit)
   - 🪜 Baby-Step Implementation Roadmap (Micro-Steps untuk dieksekusi bertahap oleh Antigravity, lengkap dengan checklist verifikasi mandiri).
2. **Kode Prototipe Fungsional (Single-File .tsx)** sebagai bukti konsep interaktif yang siap dibedah oleh Antigravity.
```
