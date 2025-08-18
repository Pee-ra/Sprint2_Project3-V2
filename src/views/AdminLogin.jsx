import { TbLockPassword } from "react-icons/tb";
import { InputWithLabel } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";

const AdminLogin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 flex-1/3 min-w-auto">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        <div className="flex justify-center items-center">
          <img
            className="w-30 h-auto flex justify-center items-center "
            src="../src/assets/logotextv2.png"
            alt="logo"
          />
        </div>

        <h1 className="text-xl font-semibold mb-4 flex justify-center">
          Admin
        </h1>
        <form>
          <InputWithLabel
            label="อีเมล"
            placeholder="you@example.com"
            type="email"
            icon={<HiOutlineMail />}
          />
          <br />
          <InputWithLabel
            label="รหัสผ่าน"
            type="password"
            icon={<TbLockPassword />}
          />
          <div className=" flex py-2">
            <Button className="w-full">เข้าสู่ระบบ</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
