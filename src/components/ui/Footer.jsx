import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const service = [
    { id: 1, name: "บริการตามน้ำหนัก" },
    { id: 2, name: "บริการตามชิ้น" },
    { id: 4, name: "บริการด่วนพิเศษ" },
  ];
  const contact = [
    { id: 1, name: "📞 02-xxx-xxxx" },
    { id: 2, name: "📧 info@whalewash.com" },
    { id: 3, name: "📍 กรุงเทพมหานคร" },
  ];
  const openTime = [{ id: 1, name: "จันทร์ - อาทิตย์: 8:00 - 18:00" }];
  return (
    <div>
      <footer className="w-full text-gray-100 bg-[#28728f] ">
        {/* คอนเทนเนอร์ที่ถูก “จัดกลาง” ด้วย mx-auto */}
        <div
          className="mx-auto w-full max-w-6xl px-4 py-6
                      grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8
                      place-items-center md:place-items-start
                      text-center md:text-left"
        >
          {/* brand */}
          <div className="flex flex-col justify-center items-center">
            <img
              src="src\assets\Logotextv2.png"
              alt="logo"
              className="aspect-square w-25"
            />
            <p className="mt-2 text-sm text-gray-200">
              บริการซักรีดครบครันที่คุณไว้วางใจ
            </p>
          </div>

          {/* service */}
          <div>
            <h3 className="font-semibold mb-3">บริการ</h3>
            <ul className="space-y-1">
              {service.map((ser) => (
                <li key={ser.id} className="text-sm text-gray-200">
                  {ser.name}
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div>
            <h3 className="font-semibold mb-3">ติดต่อ</h3>
            <ul className="space-y-1">
              {contact.map((con) => (
                <li key={con.id} className="text-sm text-gray-200">
                  {con.name}
                </li>
              ))}
            </ul>
          </div>

          {/* openTime */}
          <div>
            <h3 className="font-semibold mb-3">เวลาเปิดทำการ</h3>
            <ul className="space-y-1">
              {openTime.map((time) => (
                <li key={time.id} className="text-sm text-gray-200">
                  {time.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* แถบล่างสุด */}
        <div className="border-t border-white/10 py-4 text-center text-sm text-gray-200">
          © {new Date().getFullYear()} WhaleWash. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
