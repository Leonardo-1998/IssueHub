# IssueHub - IT Helpdesk System

## Deskripsi Singkat

IssueHub adalah sistem IT helpdesk modern yang terdiri dari dua bagian utama: backend (REST API dengan Express.js & MongoDB) dan frontend (React.js, Vite, Bootstrap). Sistem ini membantu perusahaan mengelola, memonitor, dan menyelesaikan tiket masalah IT secara efisien.

---

## Struktur Project

- **issuehub-be/** : Backend REST API (Node.js, Express, MongoDB)
- **issuehub-fe/** : Frontend aplikasi (React.js, Vite, Bootstrap)
- **Testing/** : Folder untuk pengujian
- **Settings.jsx** : Komponen pengaturan (frontend)
- **GambarHactiv8.png, IssueHub.pptx, Rejected1.jpg, Rejected2.jpg** : Asset & dokumentasi

---

## Fitur Utama

- Manajemen tiket IT (buat, update, delete, assign, tracking)
- Autentikasi & otorisasi user (Admin, User, IT Support)
- Dashboard monitoring
- Chat & notifikasi real-time (Socket.io)
- Validasi form & feedback visual
- Responsive design (desktop, tablet, mobile)

---

## Teknologi yang Digunakan

### Backend

- Node.js, Express.js
- MongoDB
- Socket.io
- Cloudinary (upload gambar)
- JWT (autentikasi)
- Zod (validasi)

### Frontend

- React.js
- Vite
- Bootstrap 5
- Font Awesome

---

## Cara Menjalankan

### Backend

1. Masuk ke folder `issuehub-be`
2. Install dependencies: `npm install`
3. Copy `.env.example` menjadi `.env` dan sesuaikan konfigurasi
4. Jalankan server: `npm run dev`

### Frontend

1. Masuk ke folder `issuehub-fe`
2. Install dependencies: `npm install`
3. Jalankan development server: `npm run dev`
4. Buka browser di `http://localhost:5173`

---

## Konfigurasi Environment

- Lihat file `.env.example` pada masing-masing folder untuk konfigurasi variabel environment

---

## Dokumentasi API

- Endpoint utama tersedia di `/api/` (lihat kode pada folder `issuehub-be/src/routes/`)
- Contoh endpoint: `/api/auth`, `/api/tickets`, `/api/chats`, dll.

---

## Kontribusi

1. Fork & clone repository
2. Buat branch baru untuk fitur/bugfix
3. Pull request ke main branch

---

## Lisensi

Proyek ini untuk keperluan pembelajaran di Hacktiv8.

---

## Kontak

- Tim pengembang: Leonardo, Zian Carlos & Team Hacktiv8
- Email: leonardo.agst98@gmail.com
# IssueHub
