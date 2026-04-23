import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { jwtDecode } from "jwt-decode";

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const decoded = (token && typeof jwtDecode === 'function') ? jwtDecode(token) : null;
  const userName = decoded ? decoded.name : "สมาชิก";
  const [authMode, setAuthMode] = useState('login');
  const [authData, setAuthData] = useState({ first_name: '', last_name: '', email: '', password: '' });

  const handleAuthChange = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  const submitAuth = async (e) => {
    e.preventDefault();
    const url = authMode === 'login' ? 'http://127.0.0.1:8000/login' : 'http://127.0.0.1:8000/register';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authData)
      });
      const data = await response.json();

      if (!response.ok) {
        alert(data.detail || 'เกิดข้อผิดพลาด');
        return;
      }

      if (authMode === 'login') {
        setToken(data.access_token);
        localStorage.setItem('token', data.access_token);
      } else {
        alert('🎉 สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบครับ');
        setAuthMode('login'); 
      }
    } catch (error) {
      alert('❌ ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
    }
  };

  const logout = () => {
    setToken('');
    localStorage.removeItem('token');
    window.location.reload();
  };

  const [formData, setFormData] = useState({
    age: 21, gender: 'male', weight_kg: 70, height_cm: 175,
    activity_level: 1.2, goal: 'build_muscle', injuries: ''
  });
  
  const [isChatMode, setIsChatMode] = useState(false);
  const [messages, setMessages] = useState([]); 
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const chatEndRef = useRef(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const startChat = (e) => {
    e.preventDefault();
    setIsChatMode(true);
    sendMessage("สวัสดีครับ ช่วยจัดตารางออกกำลังกายและโภชนาการเบื้องต้นให้ผมหน่อยครับ");
  };

  const sendMessage = async (textToSend) => {
    if (!textToSend.trim()) return;

    const newUserMsg = { role: 'user', text: textToSend };
    const currentHistory = [...messages];
    setMessages((prev) => [...prev, newUserMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/chat/', {
        method: 'POST',
        headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
        body: JSON.stringify({
          profile: {
            name: userName, 
            age: Number(formData.age),
            gender: formData.gender,
            weight_kg: Number(formData.weight_kg),
            height_cm: Number(formData.height_cm),
            activity_level: Number(formData.activity_level),
            goal: formData.goal,
            injuries: formData.injuries || "ไม่มี"
          },
          history: currentHistory,
          new_message: textToSend
        })
      });
      
      const data = await response.json();
      const aiResponseText = data.ai_message || data.text || data.message || data.reply || "❌ ระบบหาข้อความไม่เจอ";
      
      setMessages((prev) => [...prev, { role: 'model', text: aiResponseText }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'model', text: "🚨 ระบบเชื่อมต่อขัดข้อง กรุณาลองใหม่ครับ" }]);
    } finally {
      setIsLoading(false);
    }
  };

  // ==========================================
  // 🎨 ธีม Premium Minimalist (Onyx & Teal)
  // ==========================================
  const theme = {
    bgApp: '#0B0D12',        // ดำลึกดูพรีเมียม
    bgCard: '#151821',       // เทาเข้มมีมิติ
    accent: '#0D9488',       // Teal (เขียวอมฟ้า) 
    accentHover: '#0F766E',
    textMain: '#F3F4F6',
    textMuted: '#9CA3AF',
    border: '#272B36'
  };

  // หน้า 0: ล็อกอิน
  if (!token) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: theme.bgApp, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: '"Inter", "Prompt", sans-serif' }}>
        <div style={{ backgroundColor: theme.bgCard, padding: '40px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', width: '100%', maxWidth: '400px', border: `1px solid ${theme.border}` }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: theme.textMain, textAlign: 'center', marginBottom: '8px' }}>
            FitAI <span style={{ color: theme.accent }}>Exclusive</span>
          </h1>
          <p style={{ color: theme.textMuted, textAlign: 'center', marginBottom: '32px', fontSize: '14px' }}>
            {authMode === 'login' ? 'เข้าสู่ระบบเพื่อรับคำแนะนำส่วนบุคคล' : 'เริ่มต้นสร้างเส้นทางสุขภาพของคุณ'}
          </p>

          <form onSubmit={submitAuth} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {authMode === 'register' && (
              <div style={{ display: 'flex', gap: '12px' }}>
                <input type="text" name="first_name" placeholder="ชื่อ" required onChange={handleAuthChange} style={{ flex: 1, padding: '14px', borderRadius: '12px', backgroundColor: '#1E2330', color: theme.textMain, border: 'none', outline: 'none' }} />
                <input type="text" name="last_name" placeholder="นามสกุล" required onChange={handleAuthChange} style={{ flex: 1, padding: '14px', borderRadius: '12px', backgroundColor: '#1E2330', color: theme.textMain, border: 'none', outline: 'none' }} />
              </div>
            )}
            <input type="email" name="email" placeholder="อีเมล" required onChange={handleAuthChange} style={{ width: '100%', padding: '14px', borderRadius: '12px', backgroundColor: '#1E2330', color: theme.textMain, border: 'none', outline: 'none', boxSizing: 'border-box' }} />
            <input type="password" name="password" placeholder="รหัสผ่าน" required onChange={handleAuthChange} style={{ width: '100%', padding: '14px', borderRadius: '12px', backgroundColor: '#1E2330', color: theme.textMain, border: 'none', outline: 'none', boxSizing: 'border-box' }} />

            <button type="submit" style={{ width: '100%', backgroundColor: theme.accent, color: 'white', fontWeight: '600', padding: '16px', borderRadius: '12px', border: 'none', cursor: 'pointer', marginTop: '8px', transition: '0.3s' }}>
              {authMode === 'login' ? 'เข้าสู่ระบบ' : 'ลงทะเบียน'}
            </button>
          </form>

          <p style={{ color: theme.textMuted, textAlign: 'center', marginTop: '24px', fontSize: '14px' }}>
            <button onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} style={{ color: theme.accent, background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500' }}>
              {authMode === 'login' ? 'สร้างบัญชีใหม่' : 'มีบัญชีอยู่แล้ว? เข้าสู่ระบบ'}
            </button>
          </p>
        </div>
      </div>
    );
  }

  // หน้า 1: ฟอร์มกรอกข้อมูล
  if (!isChatMode) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: theme.bgApp, color: theme.textMain, fontFamily: '"Inter", "Prompt", sans-serif', display: 'flex', flexDirection: 'column' }}>
        
        {/* 🔴 เพิ่ม Header & ปุ่ม Logout ในหน้าฟอร์ม */}
        <div style={{ padding: '20px 40px', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={logout} style={{ background: 'transparent', color: theme.textMuted, border: `1px solid ${theme.border}`, borderRadius: '8px', padding: '8px 16px', cursor: 'pointer', fontSize: '13px', fontWeight: '500', transition: '0.2s' }}
            onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = theme.textMuted}>
            ออกจากระบบ
          </button>
        </div>

        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 20px 60px 20px', width: '100%', boxSizing: 'border-box' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>Personal <span style={{color: theme.accent}}>Assessment</span></h1>
            <p style={{ color: theme.textMuted }}>ข้อมูลพื้นฐานเพื่อการออกแบบโปรแกรมที่แม่นยำ</p>
          </div>

          <form onSubmit={startChat} style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '40px', backgroundColor: theme.bgCard, borderRadius: '24px', border: `1px solid ${theme.border}`, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: 1 }}>
                  <label style={{color: theme.textMuted, fontSize: '13px', display: 'block', marginBottom: '8px'}}>อายุ (ปี)</label>
                  <input type="number" name="age" value={formData.age} onChange={handleChange} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', backgroundColor: '#1E2330', color: theme.textMain, boxSizing: 'border-box' }} required />
              </div>
              <div style={{ flex: 1 }}>
                  <label style={{color: theme.textMuted, fontSize: '13px', display: 'block', marginBottom: '8px'}}>เพศ</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', backgroundColor: '#1E2330', color: theme.textMain, boxSizing: 'border-box' }}>
                      <option value="male">ชาย</option>
                      <option value="female">หญิง</option>
                  </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: 1 }}>
                <label style={{color: theme.textMuted, fontSize: '13px', display: 'block', marginBottom: '8px'}}>น้ำหนัก (กก.)</label>
                <input type="number" name="weight_kg" value={formData.weight_kg} onChange={handleChange} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', backgroundColor: '#1E2330', color: theme.textMain, boxSizing: 'border-box' }} required />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{color: theme.textMuted, fontSize: '13px', display: 'block', marginBottom: '8px'}}>ส่วนสูง (ซม.)</label>
                <input type="number" name="height_cm" value={formData.height_cm} onChange={handleChange} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', backgroundColor: '#1E2330', color: theme.textMain, boxSizing: 'border-box' }} required />
              </div>
            </div>

            <div>
              <label style={{color: theme.textMuted, fontSize: '13px', display: 'block', marginBottom: '8px'}}>ระดับกิจกรรม</label>
              <select name="activity_level" value={formData.activity_level} onChange={handleChange} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', backgroundColor: '#1E2330', color: theme.textMain, boxSizing: 'border-box' }}>
                <option value="1.2">ไม่ออกกำลังกายเลย</option>
                <option value="1.375">ออกกำลังกายเบาๆ</option>
                <option value="1.55">ออกกำลังกายปานกลาง</option>
                <option value="1.725">ออกกำลังกายหนัก</option>
              </select>
            </div>

            <div>
              <label style={{color: theme.textMuted, fontSize: '13px', display: 'block', marginBottom: '8px'}}>เป้าหมายหลัก</label>
              <select name="goal" value={formData.goal} onChange={handleChange} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', backgroundColor: '#1E2330', color: theme.textMain, boxSizing: 'border-box' }}>
                <option value="lose_weight">ลดไขมัน (Fat Loss)</option>
                <option value="build_muscle">สร้างกล้ามเนื้อ (Muscle Building)</option>
                <option value="maintain">รักษาสุขภาพและความแข็งแรง</option>
              </select>
            </div>

            <div>
              <label style={{color: theme.accent, fontSize: '13px', display: 'block', marginBottom: '8px', fontWeight: '500'}}>ประวัติการบาดเจ็บ / ข้อจำกัด (ถ้ามี)</label>
              <input type="text" name="injuries" value={formData.injuries} onChange={handleChange} placeholder="เช่น ปวดหลังล่าง, เคยผ่าตัดเข่า" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: `1px solid ${theme.border}`, backgroundColor: '#1E2330', color: theme.textMain, boxSizing: 'border-box' }} />
            </div>

            <button type="submit" style={{ width: '100%', padding: '18px', backgroundColor: theme.accent, color: 'white', border: 'none', borderRadius: '16px', fontSize: '16px', cursor: 'pointer', fontWeight: '600', marginTop: '10px', boxShadow: `0 4px 14px ${theme.accent}40` }}>
              เริ่มจัดโปรแกรมส่วนตัว
            </button>
          </form>
        </div>
      </div>
    );
  }

  // หน้า 2: ห้องแชท 
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: theme.bgApp, color: theme.textMain, fontFamily: '"Inter", "Prompt", sans-serif' }}>
      
      {/* Header ของห้องแชท */}
      <div style={{ padding: '20px 40px', backgroundColor: theme.bgCard, borderBottom: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>FitAI <span style={{ color: theme.accent }}>Coach</span></h2>
          <span style={{ fontSize: '12px', color: theme.textMuted }}>Premium Session</span>
        </div>
        <button onClick={logout} style={{ background: 'transparent', color: theme.textMuted, border: `1px solid ${theme.border}`, borderRadius: '8px', padding: '8px 16px', cursor: 'pointer', fontSize: '13px', fontWeight: '500', transition: '0.2s' }}
          onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = theme.textMuted}>
          ออกจากระบบ
        </button>
      </div>

      {/* พื้นที่แสดงข้อความ */}
      <div style={{ flex: 1, padding: '30px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '75%' }}>
            
            <div style={{ fontSize: '12px', color: theme.textMuted, marginBottom: '6px', textAlign: msg.role === 'user' ? 'right' : 'left', fontWeight: '500' }}>
              {msg.role === 'user' ? 'You' : 'FitAI'}
            </div>
            
            <div style={{ 
              backgroundColor: msg.role === 'user' ? theme.accent : theme.bgCard, 
              color: theme.textMain, 
              padding: '18px 24px', 
              borderRadius: '20px', 
              borderBottomRightRadius: msg.role === 'user' ? '4px' : '20px',
              borderBottomLeftRadius: msg.role === 'model' ? '4px' : '20px',
              lineHeight: '1.7',
              fontSize: '15px',
              border: msg.role === 'model' ? `1px solid ${theme.border}` : 'none',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div style={{ alignSelf: 'flex-start', color: theme.accent, fontSize: '14px', padding: '10px 0', animation: 'pulse 1.5s infinite' }}>
            Coach is analyzing...
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* กล่องพิมพ์ข้อความ */}
      <div style={{ padding: '24px 30px', backgroundColor: theme.bgApp, borderTop: `1px solid ${theme.border}` }}>
        <form onSubmit={(e) => { e.preventDefault(); sendMessage(inputText); }} style={{ display: 'flex', gap: '12px', maxWidth: '900px', margin: '0 auto', backgroundColor: theme.bgCard, padding: '8px', borderRadius: '24px', border: `1px solid ${theme.border}` }}>
          <input 
            type="text" 
            value={inputText} 
            onChange={(e) => setInputText(e.target.value)} 
            placeholder="สอบถามท่าออกกำลังกาย หรือโภชนาการ..." 
            style={{ flex: 1, padding: '12px 20px', borderRadius: '16px', border: 'none', backgroundColor: 'transparent', color: theme.textMain, fontSize: '15px', outline: 'none' }} 
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading} style={{ padding: '12px 28px', backgroundColor: isLoading ? theme.border : theme.accent, color: 'white', border: 'none', borderRadius: '16px', cursor: isLoading ? 'default' : 'pointer', fontWeight: '600', transition: '0.3s' }}>
            ส่ง
          </button>
        </form>
      </div>

    </div>
  );
}

export default App;