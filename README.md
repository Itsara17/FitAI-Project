# 🏋️‍♂️ FitAI - Premium Fitness Chatbot Platform

FitAI เป็นแอปพลิเคชันแชทบอทอัจฉริยะที่ออกแบบมาเพื่อเป็นผู้ช่วยส่วนตัวด้านสุขภาพและการออกกำลังกาย โปรเจคนี้ถูกพัฒนาขึ้นโดยเน้นสถาปัตยกรรมระบบที่สามารถต่อยอดและขยายขนาดได้ในอนาคต (Scalable Architecture) โดยไม่ได้เป็นเพียงแค่แชทบอทโต้ตอบทั่วไป แต่ยังมีระบบ Data Ingestion สำหรับเก็บรวบรวมข้อมูลผู้ใช้งานเพื่อต่อยอดสู่การวิเคราะห์ทาง Data Science

## ✨ ฟีเจอร์หลัก (Key Features)
- **AI-Powered Personal Trainer:** ขับเคลื่อนด้วย Google Gemini AI ที่ถูกปรับแต่ง (Prompt Engineering) ให้เชี่ยวชาญด้านโภชนาการและการจัดตารางเวทเทรนนิ่ง
- **Context-Aware Conversation:** ระบบจดจำบริบทการสนทนา ช่วยให้ผู้ใช้สามารถพูดคุยต่อเนื่องได้อย่างเป็นธรรมชาติ
- **Graceful Error Handling:** มีระบบ Auto-Retry และการจัดการข้อผิดพลาด (Error 503) เพื่อให้แอปพลิเคชันทำงานได้ไหลลื่นแม้ในช่วงที่ API ทำงานหนัก
- **Data Ingestion Pipeline:** บันทึกประวัติการแชทและข้อมูลผู้ใช้ (Demographics) ลงในฐานข้อมูล SQLite โดยอัตโนมัติ เพื่อเตรียมพร้อมสำหรับการทำ Dataset
- **Modern UI/UX:** หน้าต่างแชทรูปแบบ Dark Mode สวยงาม พร้อมรองรับการแสดงผลข้อความแบบ Markdown (React-Markdown)

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)
* **Frontend:** React.js, Vite, CSS (ออกแบบสไตล์ Dark Theme)
* **Backend:** Python, FastAPI (ออกแบบระบบ API ให้พร้อมสำหรับการขยายสเกล)
* **Database:** SQLite (พร้อมสำหรับการอัปเกรดเป็น MongoDB/PostgreSQL ในอนาคต)
* **AI Integration:** Google Gemini API (gemini-2.5-flash)

## 🚀 วิธีการติดตั้งและทดลองใช้งาน (Local Setup)

### 1. การรันฝั่ง Backend (API & Database)
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate   # สำหรับ Windows
pip install fastapi uvicorn requests
uvicorn main:app --reload