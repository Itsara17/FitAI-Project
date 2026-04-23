import google.generativeai as genai
from fastapi import Header
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import requests
import time
from datetime import datetime
import sqlite3
import bcrypt
import jwt
from datetime import timedelta
genai.configure(api_key="AIzaSyAp3ElrMaxrd0ivUJ6Z2LLaKJ3MSs9DiNA") # คีย์ใหม่ที่คุณเพิ่งเปลี่ยน
model = genai.GenerativeModel('gemini-2.5-flash')

# โมเดลสำหรับรับข้อมูลตอนสมัครสมาชิก
class UserRegister(BaseModel):
    first_name: str
    last_name: str
    email: str
    password: str
app = FastAPI(title="FitAI Data Platform (SQLite)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------
# 🗄️ โซนฐานข้อมูล (SQLite Configuration)
# ---------------------------------------------
DB_NAME = "fitai_dataset.db"

# ฟังก์ชันสร้างตารางเก็บข้อมูล (ทำงานอัตโนมัติตอนเปิดเซิร์ฟเวอร์)
# รหัสลับสำหรับเซ็นชื่อรับรองบัตรผ่าน (ห้ามให้ใครรู้เด็ดขาด!)
SECRET_KEY = "fitai_super_secret_key_2026"

def init_db():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    # 1. สร้างตาราง users
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT,
            last_name TEXT,
            email TEXT UNIQUE,
            password_hash TEXT
        )
    ''')

    # 2. สร้างตาราง chat_history (เอาโค้ดเดิมของคุณมามัดรวมไว้ที่นี่)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS chat_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT,
            age INTEGER,
            gender TEXT,
            weight_kg REAL,
            goal TEXT,
            injuries TEXT,
            user_prompt TEXT,
            ai_message TEXT
        )
    ''')

    conn.commit()
    conn.close()

# อย่าลืมเรียกใช้ฟังก์ชันตอนเริ่มโปรแกรม
init_db()
print("🟢 เตรียมไฟล์ฐานข้อมูล SQLite สำเร็จ!")

# ---------------------------------------------
# 🧑‍💻 โครงสร้างข้อมูล (Data Models)
# ---------------------------------------------
class UserProfile(BaseModel):
    name: str = "สมาชิก"
    age: int = 21
    gender: str = "male"
    weight_kg: float = 65.0
    height_cm: float = 170.0
    activity_level: float = 1.2
    goal: str = "ออกกำลังกาย"
    injuries: str = "ไม่มี"

class Message(BaseModel):
    role: str
    text: str = ""

class ChatRequest(BaseModel):
    profile: UserProfile
    history: List[Message]
    new_message: str

# ---------------------------------------------
# 🚀 โซนประมวลผลและ AI
# ---------------------------------------------
@app.post("/chat/")
def chat_with_ai(req: ChatRequest, authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="กรุณาล็อกอินก่อนใช้งานครับ")

    try:
        p = req.profile
        global model
        
        # สร้างคำสั่งที่สั่งให้ AI เป็นโค้ชพรีเมียม เข้าใจง่าย และเน้นความปลอดภัย
        prompt = f"""
        คุณคือ "FitAI" เทรนเนอร์ฟิตเนสส่วนตัวระดับพรีเมียม
        ข้อมูลลูกค้า: ชื่อ {p.name}, อายุ {p.age} ปี, เป้าหมาย: {p.goal}
        ประวัติบาดเจ็บ: {p.injuries}
        คำถามจากลูกค้า: {req.new_message}

        กฎการตอบของคุณ (ต้องทำตามอย่างเคร่งครัด):
        1. ความเรียบง่าย: ใช้ภาษาที่เป็นกันเอง เหมือนเพื่อนหรือพี่น้องคุยกัน อธิบายศัพท์เทคนิคให้คนธรรมดาเข้าใจได้ทันที (เช่น แทนที่จะพูดว่า Hypertrophy ให้บอกว่า "การสร้างขนาดกล้ามเนื้อ")
        2. ความปลอดภัยมาข้อ 1: ทุกครั้งที่แนะนำท่าออกกำลังกาย คุณ **ต้อง** ระบุ 2 ข้อนี้เสมอ:
           - 🎯 จุดโฟกัส: ต้องเกร็งตรงไหน กล้ามเนื้อส่วนไหนต้องรู้สึก
           - ⚠️ ข้อควรระวัง (Form): ท่าทางที่คนมักทำผิด และวิธีจัดระเบียบร่างกายเพื่อป้องกันการบาดเจ็บ
        3. สไตล์การตอบ: ตอบให้กระชับ จัดหน้าตาให้อ่านง่ายเป็นข้อๆ (Bullet points) สไตล์ น้อยแต่มาก (Minimalist)
        """
        
        # เรียก AI
        response = model.generate_content(prompt)
        
        return {"text": response.text}
    except Exception as e:
        print(f"Error AI: {e}")
        return {"ai_message": "ระบบ AI ขัดข้องชั่วคราว ลองใหม่อีกครั้งครับ"}



    # โมเดลสำหรับรับข้อมูลตอนสมัครสมาชิก (เอาไว้ตรงนี้ก่อนก็ได้ครับ จะได้ไม่งง)
class UserRegister(BaseModel):
    first_name: str
    last_name: str
    email: str
    password: str

@app.post("/register")
def register_user(user: UserRegister):
    conn = sqlite3.connect(DB_NAME) # ใช้ DB_NAME ตามที่คุณตั้งไว้
    cursor = conn.cursor()

    # นำรหัสผ่านที่ลูกค้ากรอกมา "สับ" ให้เป็นตัวอักษรมั่วๆ (Hashing)
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), salt)

    try:
        # บันทึกข้อมูลลงฐานข้อมูล
        cursor.execute('''
            INSERT INTO users (first_name, last_name, email, password_hash)
            VALUES (?, ?, ?, ?)
        ''', (user.first_name, user.last_name, user.email, hashed_password.decode('utf-8')))
        conn.commit()
        return {"message": "🎉 สมัครสมาชิกสำเร็จ ยินดีต้อนรับครับ!"}
        
    except sqlite3.IntegrityError:
        # ดักจับ Error ในกรณีที่ลูกค้าใช้อีเมลซ้ำกับในระบบ
        raise HTTPException(status_code=400, detail="อีเมลนี้มีในระบบแล้วครับ กรุณาใช้เมลอื่น")
    finally:
        conn.close()
    # โมเดลสำหรับรับข้อมูลตอนล็อกอิน
class UserLogin(BaseModel):
    email: str
    password: str

@app.post("/login")
def login_user(user: UserLogin):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    # 1. ค้นหาอีเมลในฐานข้อมูล
    cursor.execute("SELECT id, password_hash, first_name FROM users WHERE email=?", (user.email,))
    db_user = cursor.fetchone()
    conn.close()

    # ถ้าไม่เจออีเมลในระบบ
    if not db_user:
        raise HTTPException(status_code=400, detail="ไม่พบอีเมลนี้ในระบบครับ")

    user_id, hashed_password, first_name = db_user

    # 2. ตรวจสอบรหัสผ่านว่าตรงไหม
    if not bcrypt.checkpw(user.password.encode('utf-8'), hashed_password.encode('utf-8')):
        raise HTTPException(status_code=400, detail="รหัสผ่านไม่ถูกต้องครับ")

    # 3. ถ้ารหัสถูกเป๊ะ สร้างบัตรผ่าน (JWT Token) ที่มีอายุ 1 วัน
    expire_time = datetime.utcnow() + timedelta(days=1)
    token_data = {"sub": str(user_id), "name": first_name, "exp": expire_time}
    token = jwt.encode(token_data, SECRET_KEY, algorithm="HS256")

    return {
        "access_token": token, 
        "message": f"✅ ล็อกอินสำเร็จ ยินดีต้อนรับกลับมาครับคุณ {first_name}!"
    }