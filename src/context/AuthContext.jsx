// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [booting, setBooting] = useState(true);   // ✅ กำลังเช็ค session ตอนบูต
  const [loading, setLoading] = useState(false);  // ✅ ใช้ตอนกด login/logout
  const [error, setError] = useState(null);

  // ✅ เรียก verify ตอนเปิดแอปเพื่อ “กู้สถานะผู้ใช้”
  useEffect(() => {
    (async () => {
      try {
        setBooting(true);
        const { data } = await axios.get(`${API_URL}/verify`, {
          withCredentials: true, // สำคัญมาก ถ้าใช้ httpOnly cookie
          headers: { "Cache-Control": "no-cache" },
        });
        // backend ส่ง { userId } กลับมา → ไปดึงโปรไฟล์เต็มก็ได้ หรือใช้เท่าที่มี
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setBooting(false);
      }
    })();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.post(
        `${API_URL}/login`,
        { email, password },
        { withCredentials: true }
      );
      // server set httpOnly cookie แล้ว ส่ง user กลับมาด้วย
      // setUser({ ...res.data.user, role: "customer" });
      setUser(res.data.user);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "เข้าสู่ระบบไม่สำเร็จ");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const adminLogin = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.post(
        `${API_URL}/admin/login`,
        { email, password },
        { withCredentials: true }
      );
      // server set httpOnly cookie แล้ว ส่ง user กลับมาด้วย
      // setUser({ ...res.data.user, role: "admin" });
      setUser(res.data.user);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "เข้าสู่ระบบไม่สำเร็จ");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // (ออปชัน) fallback ถ้าไม่ได้ใช้ verify: persist localStorage
  const saveUserToStorage = (u) => localStorage.setItem("user", JSON.stringify(u));
  const loadUserFromStorage = () => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  };

  return (
    <AuthContext.Provider value={{ user, booting, loading, error, login, logout, adminLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
