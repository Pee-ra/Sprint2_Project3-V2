import { AiOutlineArrowLeft } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { TbLockPassword } from "react-icons/tb";
import { InputWithLabel } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const Login = ({ onLogin}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const next = {};
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) next.email = "อีเมลไม่ถูกต้อง";
    if (formData.password.length < 6) next.password = "รหัสผ่านอย่างน้อย 6 ตัว";
     setErrors(next);
    return Object.keys(next).length === 0;
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setIsSubmitting(true);
      const res = await axios.post('http://localhost:5001/login', formData);
      onLogin(res.data.user);
      // console.log(res.data.user);
      navigate('/dashboard');
      alert('เข้าสู่ระบบสําเร็จ');
    } catch (error) {
      // console.error(error);
      setErrors(error.response.data.message);
      alert(error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="bg-gray-50 font-sans min-h-screen flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-5xl flex shadow-lg rounded-xl overflow-hidden items-center justify-center p-6">
        {/* left content */}
        <div className="items-center justify-center p-6 flex-1/2">
          <button
            type="button"
            onClick={() => navigate('/landing')}
            className="text-xs flex items-center mb-4 gap-2"
          >
            <AiOutlineArrowLeft />
            กลับหน้าแรก
          </button>

          <p className="text-2xl font-bold py-4">Whale wash ยินดีต้อนรับ</p>
          <p className="text-sm py-2">
            เข้าสู่ระบบเพื่อจัดการบริการซักรีดของคุณอย่างง่ายดาย
          </p>
          <img
            className="bg-gray-100 p-4 rounded-md w-120 h-80"
            src="https://i.pinimg.com/736x/b3/12/7d/b3127d1ccb49bb2a2967e1274ec6b1a4.jpg"
            alt="washing machine"
          />
          <div className="flex gap-4 py-2">
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
            <div className="flex justify-center items-center">
              <img
                className="w-30 h-auto flex justify-center items-center"
                src="../src/assets/logotextv2.png"
                alt="logo"
              />
            </div>

            <h1 className="text-xl font-semibold mb-2 flex justify-center">
              เข้าสู่ระบบ
            </h1>

            <form onSubmit={handleSubmit}>
              <InputWithLabel
                label="อีเมล"
                placeholder="you@example.com"
                type="email"
                name="email"
                icon={<HiOutlineMail />}
                value={formData.email}
                onChange={handleChange}
              />
              <br />
              <InputWithLabel
                label="รหัสผ่าน"
                type="password"
                name="password"
                icon={<TbLockPassword />}
                value={formData.password}
                onChange={handleChange}
              />

              <div className="flex justify-between py-3">
                <div className="flex gap-1">
                  <Checkbox />
                  <p className="text-xs">จดจำการเข้าสู่ระบบ</p>
                </div>
                <p className="text-xs">ลืมรหัสผ่าน?</p>
              </div>

              <div className="flex">
                <Button className="w-full" type="submit" disabled={isSubmitting}>เข้าสู่ระบบ</Button>
              </div>

              <p className="text-xs py-2 flex justify-center">
                ยังไม่มีบัญชี?
                <button
                  type="button"
                  
                  className="text-emerald-500 mx-2 underline"
                >
                  <Link to="/register">สมัครสมาชิก</Link>
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
