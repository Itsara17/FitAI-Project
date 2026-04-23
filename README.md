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
- **AI Integration:** Google Generative AI (Gemini 2.5 Flash)

## 🚀 วิธีรันโปรเจคในเครื่อง (How to Run)
1. **Frontend:** เข้าโฟลเดอร์ `frontend` และรัน `npm run dev`
2. **Backend:** เข้าโฟลเดอร์ `backend` เปิด Virtual Environment และรัน `uvicorn main:app --reload`
3. **API Key:** ต้องใส่ Gemini API Key ในไฟล์ `main.py` ก่อนใช้งาน