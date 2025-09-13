import React from 'react'
import { Button } from '../components/ui/button'
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { AvatarCircles } from "@/components/magicui/avatar-circles";
import PackageMonth from '../components/ui/PackageMonth';
import PackageWeight from '../components/ui/PackageWeight';
import Footer from '../components/ui/Footer';
import { Link, useNavigate } from 'react-router-dom';
import ServiceCard from '../components/ui/ServiceCard';



export const LandingPage = ({ onLogin, onRegister, onAdminLogin }) => {
  return (
    <div>
        <nav className='my-6 mt-0 pb-6 mb-30 border-b-2 border-[#91d4dd] flex items-center justify-end px-6'>
            <Link to="/login">
            <img src="/Logotextv2.png" alt=""  className="h-20 absolute top-0 left-4 object-contain"/>
            </Link>
            <ul className='flex justify-end gap-6 mt-4'>
                <Link to="/login">
                <li className='border-3 p-1.5 px-6 rounded-sm hover:bg-[#91d4dd66] cursor-pointer' >
                    <span>Login</span>
                </li>
                </Link>
                <Link to="/register">
                <li className='border-3 p-1.5 px-6 rounded-sm bg-teal-500 hover:bg-[#91d4dd] cursor-pointer text-white font-semibold' >
                    <span>Get started</span>
                </li>
                </Link>
                <Link to="/admin/login">
                <li className='mr-6 border-3 p-1.5 px-6 rounded-sm hover:bg-[#91d4dd66] cursor-pointer' >
                    <span>Admin</span>
                </li>
                </Link>
            </ul>
        </nav>

      <div className="flex justify-center">
        <div className="flex flex-col gap-8 ">
          <SparklesText className="text-5xl font-bold text-teal-500">
            บริการซักรีดมืออาชีพ
            <br />
            <span className="text-black"> ใช้งานง่ายดาย</span>
          </SparklesText>
          <p className="text-lg tracking-wide">
            ตั้งแต่เสื้อยืดตัวโปรดไปจนถึงผ้านวมผืนใหญ่ เราซัก อบ และพับทุกชิ้น
            <br />
            ด้วยความใส่ใจ สะอาด หอม สดชื่น พร้อมส่งคืนถึงมือคุณอย่างรวดเร็ว
            <br />
            เพียงแค่กดสั่งผ่านเว็บไซต์หรือแอปฯ ไม่ต้องหิ้วผ้า ไม่ต้องรอคิว
          </p>
          <div className="flex gap-6">
            <Link to="/register">
              <Button className="bg-teal-500 hover:bg-[#91d4dd]">
                เริ่มสั่งซื้อครั้งแรก →
              </Button>
            </Link>
            <Link to="/login">
              <Button className="hover:bg-[#91d4dd]">เข้าสู่ระบบ</Button>
            </Link>
          </div>
          <p>ลูกค้าพึงพอใจมากกว่า 10,000 ราย</p>
        </div>
        <div className="w-md ml-6">
          <img
            src="https://www.ananda.co.th/blog/thegenc/wp-content/uploads/2021/12/5-6.jpg"
            alt="women-washing"
            className="rounded-2xl"
          />
        </div>
      </div>

        <div className='mt-30 '>
            <div>  
                {/* หัวข้อ1 */}
                <div className='flex flex-col gap-8 text-center'>
                    <h2 className='text-2xl font-bold'>ทำไมต้องเลือก WhaleWash ?</h2>
                    <p className='mb-10'>เราทำให้การซักรัดเป็นเรื่องง่ายด้วยบริการพรีเมียมและความมุ่งมั่นในความเป็นเลิศ</p>
                </div>
            </div>

                {/* 4card */}
            <div className="mx-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
                <div className="flex flex-col items-center text-center rounded-xl border border-slate-200 p-6 bg-[#91d4dd66] shadow-sm h-full">
                    <i className="ri-thumb-up-line text-3xl mb-2" aria-hidden="true" />
                    <h3 className="text-xl font-bold">รับ-ส่งฟรี</h3>
                    <p className="text-slate-600">ไม่ต้องแบกลงลิฟต์ บริการถึงประตูห้องคุณโดยไม่เสียค่าใช้จ่ายเพิ่ม</p>
                </div>

                <div className="flex flex-col items-center text-center rounded-xl border border-slate-200 p-6 bg-[#91d4dd66] shadow-sm h-full">
                    <i className="ri-speed-up-line text-3xl mb-2" aria-hidden="true" />
                    <h3 className="text-xl font-bold">ทำงานเร็ว</h3>
                    <p className="text-slate-600">รับประกันส่งภายใน 24-48 ชม.</p>
                </div>

                <div className="flex flex-col items-center text-center rounded-xl border border-slate-200 p-6 bg-[#91d4dd66] shadow-sm h-full">
                    <i className="ri-task-line text-3xl mb-2" aria-hidden="true" />
                    <h3 className="text-xl font-bold">ซักแยก</h3>
                    <p className="text-slate-600">เสื้อผ้าคุณซักแยกเฉพาะ ไม่รวมกับของคนอื่น</p>
                </div>

                <div className="flex flex-col items-center text-center rounded-xl border border-slate-200 p-6 bg-[#91d4dd66] shadow-sm h-full">
                    <i className="ri-user-follow-line text-3xl mb-2" aria-hidden="true" />
                    <h3 className="text-xl font-bold">ติดตามเรียลไทม์</h3>
                    <p className="text-slate-600">รู้ทุกขั้นตอน ตั้งแต่รับผ้าจนส่งคืนผ่านระบบติดตาม</p>
                </div>
            </div>
        </div>

        {/* ราคาชัดเจน */}
        <div className='my-30'>
            {/*หัวข้อ2  */}
            <div className='flex flex-col gap-8 text-center mb-10'>
                <h2 className='text-2xl font-bold'>ราคาชัดเจน โปร่งใส</h2>
                <p>เลือกแพ็กเกจทีเหมาะสมกับความต้องการของคุณ ทุกแพ็กเกจรวมบริการรับ-ส่งฟรี</p>
            </div>
            {/* ทำproduct card รานเดือน */}
            <div className='m-8 my-16 cursor-pointer' onClick={onLogin}>
                {/* <PackageMonth /> */}
                <Link to="/login"><ServiceCard /></Link>
            </div>

            <div className='m-8'>
                {/* <PackageWeight /> */}
            </div>
        </div>

        <div className='p-8 my-30 bg-[#023f51] text-white flex-col justify-items-center'>
            <h2 className='text-2xl font-bold m-8'>ได้รับความไว้วางใจจากผู้ใช้บริการ</h2>
            <div className='flex justify-center gap-20'>
                <div>
                    <h3 className='text-xl font-bold'>10,000+</h3>
                    <p>ลูกค้าพึงพอใจ</p>
                </div>
                <div>
                    <h3 className='text-xl font-bold'>50,000+</h3>
                    <p>ออร์เดอร์สำเร็จ</p>
                </div>
                <div>
                    <h3 className='text-xl font-bold flex'><i className="ri-star-line"></i>4.9</h3>
                    <p>คะแนนเฉลี่ย</p>
                </div>
                <div>
                    <h3 className='text-xl font-bold flex ' >10/10</h3>
                    <p>สุขอนามัย</p>
                </div>
            </div>
        </div>

        <Footer />
    </div>
  )
}