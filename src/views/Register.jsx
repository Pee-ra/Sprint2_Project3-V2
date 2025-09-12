import { AiOutlineArrowLeft } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { TbCheckbox, TbLockPassword } from "react-icons/tb";
import { Link } from "react-router-dom";
import { Input, InputWithLabel } from "../components/ui/input";
import {
  RiCheckboxCircleLine,
  RiHomeSmile2Line,
  RiPhoneLine,
} from "react-icons/ri";
import { Checkbox } from "../components/ui/checkbox";
import { Button } from "../components/ui/button";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";

export const Register = () => {
  // const navigate = useNavigate();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const handleLogin = (e) => {
  //   e.preventDefault();
  // };
  const navigate = useNavigate();
  const [formData, setFormData] = useState({fullName: "", tel: "",email: "", password: "",confirmPassword: "", roomNumber: "" });
  const [errors, setErrors] = useState({});
 
  const [isSubmitting, setIsSubmitting] = useState(false);




  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

// vaklidation
const validate = () => {
    const next = {};
    if (!formData.fullName.trim()) next.fullName = "กรอกชื่อ-นามสกุล";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) next.email = "อีเมลไม่ถูกต้อง";
    if (formData.password.length < 6) next.password = "รหัสผ่านอย่างน้อย 6 ตัว";
    if (!/^[0-9]{9,12}$/.test(formData.tel)) next.tel = "เบอร์ควรเป็นตัวเลข 9-12 หลัก";
    if (!formData.roomNumber.trim()) next.roomNumber = "กรอกหมายเลขห้อง";

    setErrors(next);
    alert(JSON.stringify(next));
    return Object.keys(next).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!validate()) return;
    if (formData.password !== formData.confirmPassword) {
      setErrors("Passwords do not match.");
      return;}
    if (!validate()) return; // ถ้าไม่ผ่าน validation หยุดเลย
    try {
        setIsSubmitting(true);
        const res =  await axios.post(import.meta.env.VITE_API_URL||'http://localhost:5001/register', formData);
        alert('สมัครสมาชิกสําเร็จ');
        navigate('/login');
    } catch (error) {
      console.error(error);
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
        <div className=" items-center justify-center p-6 flex-1/2">
          <Link to="/" className="text-xs  flex items-center mb-4 gap-2">
            <AiOutlineArrowLeft />
            กลับหน้าแรก
          </Link>
          <p className=" text-2xl font-bold py-4">
            เข้าร่วมกับ Whale wash วันนี้
          </p>
          <img
            className="bg-gray-100 p-4 rounded-md  w-120 h-80"
            src="https://i.pinimg.com/736x/28/e8/a5/28e8a54892e680544e816d6a996119c4.jpg"
            alt="washing machine"
          />
          <div className="py-2">
            <p className="py-2 font-semibold text-xl">สิ่งที่คุณจะได้รับ</p>
            <div className="flex items-center gap-2">
              <RiCheckboxCircleLine />
              <p className="py-2 ">
                รับ-ส่งพรี <br />
                บริการถึงบ้านที่สะดวกสบาย
              </p>
            </div>
            <div className="flex items-center gap-2">
              <RiCheckboxCircleLine />
              <p className="py-2">
                ราคายีดหยุ่น <br />
                แพ็คเกจรายเดือนหรือจ่ายตามการไช้
              </p>
            </div>
            <div className="flex items-center gap-2">
              <RiCheckboxCircleLine />
              <p>
                การดูแลระดับมิออาชีพ <br />
                ผู้เชี่ยวชาญด้ารการทำความสะอาดและขจัดคราบ
              </p>
            </div>
          </div>
        </div>
        {/* Right Form */}
        <div className="min-h-screen flex items-center justify-center p-6 flex-1/3 min-w-auto">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
            <div className="mb-4 flex justify-center">
              <img
                className="w-30 h-auto flex justify-center items-center "
                src="/Logotextv2.png"
                alt="logo"
              />
            </div>
            <h1 className="text-xl font-semibold mb-2 flex justify-center">
              สมัครสมาชิก
            </h1>
            <form onSubmit={handleSubmit}>
              <InputWithLabel
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                label="ชื่อ-นามสกุล"
                placeholder="สวัสดี ชาวโลก"
                type="text"
                icon={<HiOutlineMail />}
              />
              <br />
              <InputWithLabel
                name="email"
                value={formData.email}
                onChange={handleChange}
                label="อีเมล"
                placeholder="example@email.com"
                type="email"
                icon={<HiOutlineMail />}
              />
              <InputWithLabel
                name="tel"
                value={formData.tel}
                onChange={handleChange}
                label="เบอร์โทรศัพท์"
                type="text"
                icon={<RiPhoneLine />}
              />
              <InputWithLabel
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleChange}
                label="เลขที่ห้อง/ที่อยู่"
                placeholder="A-00"
                type="text"
                icon={<RiHomeSmile2Line />}
              />
              <InputWithLabel
                name="password"
                value={formData.password}
                onChange={handleChange}
                label="รหัสผ่าน"
                type="password"
                icon={<TbLockPassword />}
              />
              <InputWithLabel
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                label="ยืนยันรหัสผ่าน"
                type="password"
                icon={<TbLockPassword />}
              />
              <div className="flex gap-2 py-2">
                <Checkbox />
                <p className=" text-xs">
                  {" "}
                  ฉันยอมรับ ข้อกำหนดการใช้บริการ และ นโยบายความเป็นส่วนตัว
                </p>
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full">สมัครสมาชิก</Button>
              <p className="py-2 text-xs flex justify-center gap-2">
                มีบัญชีอยู่แล้ว?{" "}
                <span className="text-emerald-500"> <Link to="/Login">เข้าสู่ระบบ</Link></span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


