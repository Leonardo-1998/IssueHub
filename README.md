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

# IssueHub - IT Helpdesk System

IssueHub adalah sistem IT helpdesk modern untuk manajemen tiket, monitoring, dan kolaborasi tim IT. Terdiri dari backend (Node.js, Express, MongoDB) dan frontend (React.js, Vite, Bootstrap).

---

## Struktur Project

- **issuehub-be/** : Backend REST API (Node.js, Express, MongoDB)
- **issuehub-fe/** : Frontend aplikasi (React.js, Vite, Bootstrap)
- **Testing/** : Folder pengujian
- **Settings.jsx** : Komponen pengaturan profil user
- **GambarHactiv8.png, IssueHub.pptx, Rejected1.jpg, Rejected2.jpg** : Asset & dokumentasi

---

## Fitur Utama

- Manajemen tiket IT (buat, update, delete, assign, tracking status)
- Dashboard monitoring (statistik, chart, insight performa helpdesk)
- Chat & notifikasi real-time (Socket.io, AI Assistant)
- Autentikasi & otorisasi user (Admin, User, IT Support)
- Validasi form & feedback visual
- Upload lampiran/gambar pada tiket
- Responsive design (desktop, tablet, mobile)

---

## Teknologi

### Backend

- Node.js, Express.js, MongoDB
- Socket.io (real-time chat)
- Cloudinary (upload gambar)
- JWT (autentikasi)
- Zod (validasi)

### Frontend

- React.js, Vite
- Bootstrap 5, Font Awesome
- Tanstack React Query, React Hook Form, Zod
- Chart.js (visualisasi data)

---

## Cara Menjalankan

### Backend

1. Masuk ke folder `issuehub-be`
2. Install dependencies: `npm install`
3. Copy `.env.example` menjadi `.env` dan sesuaikan konfigurasi (MongoDB, JWT, Cloudinary, dsb)
4. Jalankan server: `npm run dev` (default: http://localhost:3000)

### Frontend

1. Masuk ke folder `issuehub-fe`
2. Install dependencies: `npm install`
3. Jalankan development server: `npm run dev`
4. Buka browser di `http://localhost:5173`

---

## Konfigurasi Environment

Lihat file `.env.example` pada masing-masing folder untuk variabel yang dibutuhkan (DB, JWT, Cloudinary, dsb).

---

## Dokumentasi API (Backend)

Semua endpoint diawali `/api/`.

Contoh endpoint utama:

- **Auth:** `POST /api/auth/login`
- **User:** `GET /api/users`, `PATCH /api/users/:userId`, `GET /api/users/my`
- **Role:** `GET /api/roles`, `POST /api/roles`
- **Ticket:** `GET /api/tickets`, `POST /api/tickets`, `PATCH /api/tickets/:ticketId`, `GET /api/tickets/my`, `GET /api/tickets/ongoing/my`
- **Chat:** `GET /api/chats/:ticketId`, `POST /api/chats/ai/ask`
- **Dashboard:** `GET /api/dashboard`, `GET /api/dashboard/top-issues`, `GET /api/dashboard/top-root-causes`, `GET /api/dashboard/ticket-status-stats`

Detail parameter dan response dapat dilihat di kode pada folder `issuehub-be/src/routes/`.

---

## Fitur Frontend

- **Login & Auth:** Halaman login modern, validasi, feedback error
- **Dashboard:** Statistik tiket, chart performa, insight harian/bulanan
- **Manajemen Tiket:**
  - Submit tiket baru (dengan lampiran gambar)
  - Lihat, update, tracking status tiket
  - Review & approval tiket (admin)
  - Ongoing tickets (tiket yang sedang dikerjakan)
- **Manajemen User, Role, Pipeline, Issue Type, Root Cause** (khusus admin)
- **Chat & AI Assistant:** Chat real-time per tiket, tanya AI untuk solusi
- **Pengaturan Profil:** Update data & password user

---

## Hak Akses User

- **Admin:** Semua fitur, approval/reject tiket, manajemen user/role/pipeline
- **IT Support:** Kerjakan tiket, update status, chat
- **User/Submitter:** Submit tiket, tracking, chat

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
