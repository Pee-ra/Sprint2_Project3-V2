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
// import { useState } from "react";

export const Register = () => {
  // const navigate = useNavigate();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const handleLogin = (e) => {
  //   e.preventDefault();
  // };

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
                src="../src/assets/logotextv2.png"
                alt="logo"
              />
            </div>
            <h1 className="text-xl font-semibold mb-2 flex justify-center">
              สมัครสมาชิก
            </h1>
            <form>
              <InputWithLabel
                label="ชื่อ-นามสกุล"
                placeholder="สวัสดี ชาวโลก"
                type="text"
                icon={<HiOutlineMail />}
              />
              <br />
              <InputWithLabel
                label="อีเมล"
                placeholder="example@email.com"
                type="email"
                icon={<HiOutlineMail />}
              />
              <InputWithLabel
                label="เบอร์โทรศัพท์"
                type="text"
                icon={<RiPhoneLine />}
              />
              <InputWithLabel
                label="เลขที่ห้อง/ที่อยู่"
                placeholder="A-00"
                type=" text"
                icon={<RiHomeSmile2Line />}
              />
              <InputWithLabel
                label="รหัสผ่าน"
                type="password"
                icon={<TbLockPassword />}
              />
              <InputWithLabel
                label="ยืนยันรหัสผ่าน"
                type="password"
                icon={<TbLockPassword />}
              />
              <div className="flex gap-2 py-2">
                <Checkbox />
                <p className=" text-xs">
                  {" "}
                  ฉันยอมรับ ข้อกำหนดการใช้บริการ และ นโยบายตวามเป็นส่วนตัว
                </p>
              </div>
              <Button className="w-full">สมัครสมาชิก</Button>
              <p className="py-2 text-xs flex justify-center gap-2">
                มีบัญชีอยู่แล้ว?{" "}
                <span className="text-emerald-500"> <Link to="/">เข้าสู่ระบบ</Link></span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


