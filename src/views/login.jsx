import { AiOutlineArrowLeft } from "react-icons/ai";
import { Input } from "../components/ui/input";
const Login = () => {
  return (
    <div className="bg-gray-100 font-sans min-h-screen flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-6xl flex shadow-lg rounded-xl overflow-hidden">
        {/* left content */}
        <div>
          <a
            href="/"
            className="text-sm hover:underline flex items-center mb-4 gap-2"
          >
            <AiOutlineArrowLeft />
            กลับหน้าแรก
          </a>
          <p>ยินดีต้อนรับกลับมา</p>
          <p>เข้าสู่ระบบเพื่อจัดการบริการซักรีดของคุณอย่างง่ายดาย</p>
          <img
            className="bg-gray-100 p-4"
            src="https://i.pinimg.com/736x/67/b9/a8/67b9a866956cb1b5e514351577b160c1.jpg"
            alt=""
          />
          <div className=" flex gap-4">
            <div>
              <p>ติดตามคำสั่งซื้อ</p>
              <p>ติดตามความคืบหน้าแบบเรียลไทม์</p>
            </div>
            <div>
              <p>จองง่าย</p>
              <p>นัดหมายรับผ้าด้วยการคลิ๊กเพียงไม่กี่ครั้ง</p>
            </div>
          </div>
        </div>
        {/* Light Form */}
        <div>
          <h1>ยินดีต้อนรับกลับมา</h1>
          <p>เข้าสู่ระบบบัญชีของคุณ</p>
          <form>
            <Input />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
