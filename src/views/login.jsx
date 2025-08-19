import { AiOutlineArrowLeft } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { TbCheckbox, TbLockPassword } from "react-icons/tb";
import { Input, InputWithLabel } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export const Login = ({ onLogin, onSwitchToRegister, onBackToLanding, isAdmin = false }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    email === "admini@gmail.com" && password === "12345"
      ? navigate("/home")
      : alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
  };

  return (
    <div className="bg-gray-50 font-sans min-h-screen flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-5xl flex shadow-lg rounded-xl overflow-hidden items-center justify-center p-6">
        {/* left content */}
        <div className=" items-center justify-center p-6 flex-1/2">
          <Link to="/" className="text-xs  flex items-center mb-4 gap-2">
            <AiOutlineArrowLeft />
            กลับหน้าแรก
          </Link>
          <p className=" text-2xl font-bold py-4">Whale wash ยินดีต้อนรับ</p>
          <p className="text-sm py-2">
            เข้าสู่ระบบเพื่อจัดการบริการซักรีดของคุณอย่างง่ายดาย
          </p>
          <img
            className="bg-gray-100 p-4 rounded-md w-120 h-80"
            src="https://i.pinimg.com/736x/b3/12/7d/b3127d1ccb49bb2a2967e1274ec6b1a4.jpg"
            alt="washing machine"
          />
          <div className=" flex gap-4 py-2">
            <div className="bg-gray-100 rounded-md wrap-break-word p-2">
              <p className="font-semibold text-base">ติดตามคำสั่งซื้อ</p>
              <p className="text-sm py-1">ติดตามความคืบหน้าแบบเรียลไทม์</p>
            </div>
            <div className="bg-gray-100 rounded-md wrap-break-word p-2">
              <p className="font-semibold">จองง่าย</p>
              <p className="text-sm py-1">
                นัดหมายรับผ้าด้วยการคลิ๊กเพียงไม่กี่ครั้ง
              </p>
            </div>
          </div>
        </div>
        {/* Right Form */}
        <div className="min-h-screen flex items-center justify-center p-6 flex-1/3 min-w-auto">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
            <div className= "flex justify-center items-center">
              <img
                className="w-30 h-auto flex justify-center items-center "
                src="../src/assets/logotextv2.png"
                alt="logo"
              />
            </div>

            <h1 className="text-xl font-semibold mb-2 flex justify-center">
              เข้าสู่ระบบ
            </h1>
            <form onSubmit={handleLogin}>
              <InputWithLabel
                label="อีเมล"
                placeholder="you@example.com"
                type="email"
                icon={<HiOutlineMail />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <InputWithLabel
                label="รหัสผ่าน"
                type="password"
                icon={<TbLockPassword />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className=" flex justify-between py-3">
                <div className="flex gap-1">
                  <Checkbox />
                  <p className="text-xs ">จดจำการเข้าสู่ระบบ</p>
                </div>
                <p className="text-xs  ">ลืมรหัสผ่าน?</p>
              </div>
              <div className=" flex">
                <Button className="w-full">เข้าสู่ระบบ</Button>
              </div>
              <p className="text-xs py-2 flex justify-center">
                ยังไม่มีบัญชี?
                <span className="text-emerald-500 mx-2">
                  <Link to="/register">สมัครสมาชิก</Link>
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


