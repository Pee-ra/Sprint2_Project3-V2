import React from "react";
import { ShineBorder } from "../magicui/shine-border";
import { Link } from "react-router-dom";

const PackageMonth = () => {
  const features = [
    "รับส่งผ้าฟรี ไม่มีขั้นต่ำ",
    "บริการซักทำความสะอาด",
    "น้ำยาทำความสะอาด และปรับผ้านุ่มอย่างดี",
    "บริการพับ และรีดผ้า ไม่มีค่าบริการเพิ่มเติม",
  ];

  return (
    <section className="relative mx-auto max-w-6xl p-4 md:p-6 border-2 border-dashed border-teal-400 rounded-xl bg-teal-50/20">
      {/* เส้นคั่นแนวตั้งแบบเส้นประ (แสดงตั้งแต่ md ขึ้นไป) */}
      <span className="hidden md:block absolute top-4 bottom-4" style={{ left: "33.333%" }}>
        <span className="block h-full border-l-2 border-dashed border-teal-300 pointer-events-none" />
      </span>
      <span className="hidden md:block absolute top-4 bottom-4" style={{ left: "66.666%" }}>
        <span className="block h-full border-l-2 border-dashed border-teal-300 pointer-events-none" />
      </span>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-sm border border-teal-100 p-6 flex flex-col h-full"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Package S</h3>
                <p className="text-sm text-slate-500 mt-1">จำนวนผ้า 40 ชิ้นต่อเดือน</p>
              </div>

              {/* ไอคอนวงกลมมุมขวา */}
              <div className="shrink-0 w-10 h-10 rounded-full bg-teal-50 ring-1 ring-teal-200 flex items-center justify-center">
                <span role="img" aria-label="laundry" className="text-teal-600">
                  🧺
                </span>
              </div>
            </div>

            <p className="mt-4 text-2xl font-bold text-slate-900">500 บาท/ต่อเดือน</p>

            <ul className="mt-4 space-y-3 text-slate-700">
              {features.map((t) => (
                <li key={t} className="flex items-start gap-3">
                  {/* เช็กไอคอน SVG (ไม่ต้องพึ่งไลบรารี) */}
                  <svg
                    className="mt-1 w-5 h-5 flex-none"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" className="text-teal-200" strokeWidth="2" />
                    <path
                      d="M7 12l3 3 7-7"
                      className="text-teal-600"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <button className="mt-6 inline-flex justify-center items-center rounded-lg bg-teal-600 text-white py-2.5 px-4 font-medium hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2">
              เลือกแพ็กเกจนี้
              <ShineBorder />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PackageMonth;
