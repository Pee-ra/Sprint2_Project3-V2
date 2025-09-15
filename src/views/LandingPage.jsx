import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { AvatarCircles } from "@/components/magicui/avatar-circles";
import PackageMonth from "../components/ui/PackageMonth";
import PackageWeight from "../components/ui/PackageWeight";
import Footer from "../components/ui/Footer";
import { Link, useNavigate } from "react-router-dom";
import ServiceCard from "../components/ui/ServiceCard";
import { SparklesText } from "../components/magicui/sparkles-text";

export const LandingPage = ({ onLogin, onRegister, onAdminLogin }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-teal-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="h-16 flex items-center justify-between">
            {/* Logo */}
            <Link to="/login" className="flex items-center gap-2">
              <img
                src="/Logotextv2.png"
                alt="WhaleWash logo"
                className="h-10 w-auto object-contain"
              />
            </Link>

            {/* Desktop menu */}
            <ul className="hidden md:flex items-center gap-3">
              <li>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded hover:bg-teal-50"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <Button className="bg-teal-500 hover:bg-teal-600">
                    Get started
                  </Button>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/login"
                  className="px-4 py-2 rounded hover:bg-teal-50"
                >
                  Admin
                </Link>
              </li>
            </ul>

            {/* Mobile hamburger */}
            <button
              className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-teal-50"
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <i className={`ri-${mobileOpen ? "close" : "menu"}-line text-2xl`} />
            </button>
          </div>

          {/* Mobile menu panel */}
          {mobileOpen && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col gap-2">
                <Link
                  to="/login"
                  className="w-full px-4 py-2 rounded hover:bg-teal-50"
                  onClick={() => setMobileOpen(false)}
                >
                  Login
                </Link>
                <Link to="/register" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full bg-teal-500 hover:bg-teal-600">
                    Get started
                  </Button>
                </Link>
                <Link
                  to="/admin/login"
                  className="w-full px-4 py-2 rounded hover:bg-teal-50"
                  onClick={() => setMobileOpen(false)}
                >
                  Admin
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="flex flex-col gap-6">
            <SparklesText className="text-3xl sm:text-4xl md:text-5xl font-bold text-teal-500 leading-tight">
              บริการซักรีดมืออาชีพ
              <br />
              <span className="text-slate-900">ใช้งานง่ายดาย</span>
            </SparklesText>

            <p className="text-base sm:text-lg leading-relaxed text-slate-700">
              ตั้งแต่เสื้อยืดตัวโปรดไปจนถึงผ้านวมผืนใหญ่ เราซัก อบ และพับทุกชิ้น
              ด้วยความใส่ใจ สะอาด หอม สดชื่น พร้อมส่งคืนถึงมือคุณอย่างรวดเร็ว
              เพียงแค่กดสั่งผ่านเว็บไซต์หรือแอปฯ ไม่ต้องหิ้วผ้า ไม่ต้องรอคิว
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/register">
                <Button className="w-full sm:w-auto bg-teal-500 hover:bg-teal-600">
                  เริ่มสั่งซื้อครั้งแรก →
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="w-full sm:w-auto hover:bg-teal-50">
                  เข้าสู่ระบบ
                </Button>
              </Link>
            </div>

            <p className="text-sm text-slate-500">ลูกค้าพึงพอใจมากกว่า 10,000 ราย</p>
          </div>

          <div className="md:ml-6">
            <img
              src="https://www.ananda.co.th/blog/thegenc/wp-content/uploads/2021/12/5-6.jpg"
              alt="ลูกค้าที่ใช้บริการซักรีด"
              className="w-full rounded-2xl object-cover aspect-[4/3] md:aspect-[5/4]"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold">ทำไมต้องเลือก WhaleWash ?</h2>
          <p className="text-slate-600">
            เราทำให้การซักรีดเป็นเรื่องง่ายด้วยบริการพรีเมียมและความมุ่งมั่นในความเป็นเลิศ
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: "ri-thumb-up-line",
              title: "รับ-ส่งฟรี",
              desc: "ไม่ต้องแบกลงลิฟต์ บริการถึงประตูห้องคุณโดยไม่เสียค่าใช้จ่ายเพิ่ม",
            },
            {
              icon: "ri-speed-up-line",
              title: "ทำงานเร็ว",
              desc: "รับประกันส่งภายใน 24-48 ชม.",
            },
            {
              icon: "ri-task-line",
              title: "ซักแยก",
              desc: "เสื้อผ้าคุณซักแยกเฉพาะ ไม่รวมกับของคนอื่น",
            },
            {
              icon: "ri-user-follow-line",
              title: "ติดตามเรียลไทม์",
              desc: "รู้ทุกขั้นตอน ตั้งแต่รับผ้าจนส่งคืนผ่านระบบติดตาม",
            },
          ].map((c, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center rounded-xl border border-slate-200 p-6 bg-teal-50/40 shadow-sm"
            >
              <i className={`${c.icon} text-3xl mb-2`} aria-hidden="true" />
              <h3 className="text-lg font-bold">{c.title}</h3>
              <p className="text-slate-600 text-sm">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING / PACKAGES */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center space-y-3 mb-8">
          <h2 className="text-xl sm:text-2xl font-bold">ราคาชัดเจน โปร่งใส</h2>
          <p className="text-slate-600">
            เลือกแพ็กเกจที่เหมาะสมกับความต้องการของคุณ ทุกแพ็กเกจรวมบริการรับ-ส่งฟรี
          </p>
        </div>

        <div className="cursor-pointer" onClick={onLogin}>
          {/* <PackageMonth /> */}
          <Link to="/login">
            <ServiceCard />
          </Link>
        </div>

        {/* เผื่ออนาคต */}
        <div className="mt-8">
          {/* <PackageWeight /> */}
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="bg-[#023f51] text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
          <h2 className="text-xl sm:text-2xl font-bold mb-6">ได้รับความไว้วางใจจากผู้ใช้บริการ</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <h3 className="text-2xl font-bold">10,000+</h3>
              <p className="text-white/80">ลูกค้าพึงพอใจ</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">50,000+</h3>
              <p className="text-white/80">ออร์เดอร์สำเร็จ</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold flex items-center justify-center gap-1">
                <i className="ri-star-line" /> 4.9
              </h3>
              <p className="text-white/80">คะแนนเฉลี่ย</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">10/10</h3>
              <p className="text-white/80">สุขอนามัย</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};