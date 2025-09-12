import { TbLockPassword } from "react-icons/tb";
import { HiOutlineMail } from "react-icons/hi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputWithLabel } from "../components/ui/input";
import { Button } from "../components/ui/button";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

// แก้ไขตรงนี้: เพิ่ม { onLogin } เข้าไปในพารามิเตอร์ของฟังก์ชัน
const AdminLogin = () => {
  const { adminLogin, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAdminLogin = async(e) => {
    e.preventDefault();
    const ok = await adminLogin(email, password); // ✅ เรียกจาก context
    if (ok) {
      console.log("✅ Admin login success");
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 flex-1/3 min-w-auto">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        <div className="flex justify-center items-center">
          <img
            className="w-30 h-auto flex justify-center items-center"
            src="/Logotextv2.png"
            alt="logo"
          />
        </div>
        <h1 className="text-xl font-semibold mb-4 flex justify-center">
          Admin
        </h1>
        <form onSubmit={handleAdminLogin}>
          <InputWithLabel
            label="อีเมล"
            placeholder="you@example.com"
            type="email"
            icon={<HiOutlineMail />}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <InputWithLabel
            label="รหัสผ่าน"
            type="password"
            icon={<TbLockPassword />}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex py-2">
            <Button type="submit" className="w-full">เข้าสู่ระบบ</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;