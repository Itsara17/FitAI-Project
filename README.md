# 🤖 FitAI - Premium AI Fitness Coach
โปรเจคแอปพลิเคชันเทรนเนอร์ส่วนตัวที่ขับเคลื่อนด้วย AI (Google Gemini) ออกแบบมาเพื่อสร้างตารางออกกำลังกายและโภชนาการที่ปรับแต่งตามบุคคล ภายใต้ดีไซน์แบบ Premium Minimalist (Onyx & Teal)

## ✨ จุดเด่นของระบบ (Features)
- 🧠 **AI-Powered:** ใช้ Google Gemini ในการวิเคราะห์ข้อมูลและโต้ตอบแบบ Real-time
- 🛡️ **Safety First:** Prompt Engineering บังคับให้ AI แนะนำจุดโฟกัสและวิธีป้องกันการบาดเจ็บเสมอ
- 💾 **Context Memory:** ระบบบันทึกประวัติการแชทเพื่อให้ AI สนทนาได้อย่างต่อเนื่อง
- 🎨 **Premium UI:** ออกแบบหน้าจอแชทด้วย React และ Tailwind CSS

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)
- **Frontend:** React.js, Vite
- **Backend:** Python, FastAPI
- **Database:** SQLite (พร้อมระบบเข้ารหัส JWT & Bcrypt)
- **AI Integration:** Google Generative AI (Gemini 1.5 Flash)

## 🚀 วิธีติดตั้งและรันโปรเจคในเครื่อง (How to Run)

ก่อนเริ่มต้น กรุณาตรวจสอบให้แน่ใจว่าเครื่องของคุณมีการติดตั้ง **Python (3.8+)** และ **Node.js (v18+)** เรียบร้อยแล้ว

### 🔑 1. เตรียม Gemini API Key
โปรเจคนี้ขับเคลื่อนด้วย Google Gemini คุณต้องมี API Key ก่อน:
1. ไปที่ [Google AI Studio](https://aistudio.google.com/app/apikey)
2. สร้าง API Key ใหม่และก๊อปปี้เก็บไว้

### ⚙️ 2. ตั้งค่าระบบหลังบ้าน (Backend - FastAPI)
เปิด Terminal ใหม่ขึ้นมา แล้วทำตามขั้นตอนต่อไปนี้:
1. เข้าไปที่โฟลเดอร์ backend:
   cd backend
2. สร้างและเปิดใช้งาน Virtual Environment:
   - สำหรับ Windows:
     python -m venv venv
     venv\Scripts\activate
   - สำหรับ Mac/Linux:
     python3 -m venv venv
     source venv/bin/activate
3. ติดตั้ง Library ที่จำเป็นทั้งหมด:
   pip install -r requirements.txt
   *(หรือใช้คำสั่ง: pip install fastapi uvicorn google-generativeai pydantic bcrypt pyjwt)*
4. นำ Gemini API Key ของคุณ ไปใส่ในไฟล์ main.py
5. รันเซิร์ฟเวอร์หลังบ้าน:
   uvicorn main:app --reload

### 🎨 3. ตั้งค่าระบบหน้าบ้าน (Frontend - React/Vite)
เปิดหน้าต่าง Terminal ใหม่ขึ้นมาอีก 1 อัน แล้วทำตามนี้:
1. เข้าไปที่โฟลเดอร์ frontend:
   cd frontend
2. ติดตั้งแพ็กเกจทั้งหมด:
   npm install
3. รันระบบหน้าบ้าน:
   npm run dev
4. เปิดเว็บเบราว์เซอร์แล้วเข้าไปที่: http://localhost:5173