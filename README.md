# Learncheck! Formative Assesment With AI 
(Capstone A25-CS158 Team)

## Deskripsi Singkat Proyek

**LearnCheck** adalah aplikasi web interaktif yang secara otomatis menghasilkan kuis dari konten tutorial menggunakan kecerdasan buatan (AI). Aplikasi ini memanfaatkan Large Language Models (LLM) seperti Google Gemini dan Groq untuk menganalisis materi pembelajaran dan membuat pertanyaan kuis yang relevan dan berkualitas.

### Fitur Utama:

- 🤖 **Generasi Kuis Otomatis** menggunakan AI (Gemini/Groq)
- 📚 **Integrasi dengan Dicoding API** untuk mengambil konten tutorial
- ⚡ **Frontend Modern** dibangun dengan React + Vite
- 🚀 **RESTful API** menggunakan Express.js
- 🎨 **UI/UX Responsif** dengan Tailwind CSS

---

## Petunjuk Setup Environment

### Prasyarat

Pastikan sistem Anda telah terinstal:

- **Node.js** versi 16.x atau lebih tinggi
- **npm** atau **yarn** package manager
- **Git** untuk cloning repository

### 1. Clone Repository

```bash
git clone <repository-url>
cd Learncheck-master
```

### 2. Setup Backend (API)

#### a. Masuk ke direktori API

```bash
cd api
```

#### b. Install Dependencies

```bash
npm install
```

#### c. Konfigurasi Environment Variables

Buat file `.env` di direktori `api/` dengan konfigurasi berikut:

```env
# API Keys untuk AI Services
GEMINI_API_KEY=your_gemini_api_key_here
GROQ_API_KEY=your_groq_api_key_here

# Server Configuration
PORT=3000

# Dicoding API Mock
DICODING_API=https://learncheck-dicoding-mock-666748076441.europe-west1.run.app
```

**Cara mendapatkan API Keys:**

- **Gemini API Key**: Daftar di [Google AI Studio](https://makersuite.google.com/app/apikey)
- **Groq API Key**: Daftar di [Groq Console](https://console.groq.com/)

### 3. Setup Frontend (Web)

#### a. Masuk ke direktori web

```bash
cd ../web
```

#### b. Install Dependencies

```bash
npm install
```

#### c. Konfigurasi Environment Variables (Opsional)

Jika ingin menggunakan backend production atau konfigurasi khusus, buat file `.env` di direktori `web/`:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_USER_PREFERENCES_BASE_URL=https://learncheck-dicoding-mock-666748076441.europe-west1.run.app/api
```

**Catatan**: Jika tidak membuat file `.env`, aplikasi akan menggunakan konfigurasi default yang sudah tertanam di kode.

---

## Cara Menjalankan Aplikasi

### Mode Development

#### 1. Menjalankan Backend (API)

Buka terminal pertama dan jalankan:

```bash
cd api
npm run dev
```

**Output yang diharapkan:**

```
[dotenv@17.2.3] injecting env (4) from .env
Server running on port 3000
```

API akan berjalan di: `http://localhost:3000`

**Testing API:**

```bash
# Cek status API
curl http://localhost:3000

# Generate quiz (contoh tutorialId: 105)
curl http://localhost:3000/api/quiz/105
```

#### 2. Menjalankan Frontend (Web)

Buka terminal kedua dan jalankan:

```bash
cd web
npm run dev
```

**Output yang diharapkan:**

```
VITE v7.2.2  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

Aplikasi web akan berjalan di: `http://localhost:5173`

### Mode Production

#### Build Backend

```bash
cd api
npm start
```

#### Build Frontend

```bash
cd web
npm run build
npm run preview
```

---

## Struktur Proyek

```
Learncheck-master/
├── api/                          # Backend Express.js
│   ├── src/
│   │   ├── app.js               # Entry point server
│   │   ├── controller/          # Request handlers
│   │   ├── routes/              # API routes
│   │   ├── services/            # Business logic & external APIs
│   │   │   ├── quizService.js   # Layanan generasi kuis
│   │   │   ├── geminiService.js # Integrasi Gemini AI
│   │   │   ├── groqService.js   # Integrasi Groq
│   │   │   ├── llmService.js    # LLM orchestrator
│   │   │   └── dicodingService.js # Dicoding API client
│   │   ├── prompts/             # AI prompts
│   │   └── utils/               # Helper functions
│   ├── package.json
│   └── .env                     # Environment variables
│
└── web/                          # Frontend React + Vite
    ├── src/
    │   ├── main.jsx             # Entry point React
    │   ├── App.jsx              # Root component
    │   ├── components/          # Reusable components
    │   ├── pages/               # Page components
    │   ├── hooks/               # Custom React hooks
    │   ├── api/                 # API client functions
    │   └── styles/              # CSS styles
    ├── package.json
    └── index.html
```

---

## API Endpoints

### `GET /`

- **Deskripsi**: Health check endpoint
- **Response**: `"API is running..."`

### `GET /api/quiz/:tutorialId`

- **Deskripsi**: Generate kuis dari tutorial ID
- **Parameter**:
  - `tutorialId` (string): ID tutorial dari Dicoding
- **Response**:

```json
{
  "status": "success",
  "tutorialId": "105",
  "questions": [
    {
      "question": "Apa itu JavaScript?",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": 0
    }
  ]
}
```

---

## Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **AI Libraries**:
  - `@google/generative-ai` (Gemini)
  - `groq-sdk` (Groq)
- **HTTP Client**: Axios
- **Environment**: dotenv

### Frontend

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **HTTP Client**: Axios

---

## Troubleshooting

### Port sudah digunakan

Jika port 3000 atau 5173 sudah digunakan, ubah di:

- Backend: Ubah `PORT` di `.env`
- Frontend: Edit `vite.config.js`

### API Key tidak valid

Pastikan API key Gemini/Groq sudah benar dan masih aktif.

### CORS Error

Pastikan backend sudah running sebelum mengakses frontend.

---

## Lisensi

ISC License

---

## Kontribusi

Kontribusi selalu diterima! Silakan buat pull request atau laporkan issue.

---

## Kontak & Dukungan

Untuk pertanyaan atau bantuan, silakan buka issue di repository ini.
