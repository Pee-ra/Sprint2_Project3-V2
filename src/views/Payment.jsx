import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Payment = () => {
  return (
    <div className="flex">
      <div className="flex flex-col flex-wrap border-gray-50 border-4 rounded-2xl p-10">
        <div>
          <div>
            <Link to="/home" className="text-xs flex items-center mb-4 gap-2">
              <AiOutlineArrowLeft />
              กลับหน้าแรก
            </Link>
          </div>
          <div className="p-4 text-2xl flex flex-col gap-6">
            <h1 className="font-bold text-3xl"><i class="ri-bit-coin-line"></i> ชำระเงิน</h1>
            <p className="text-sm">ชำระเงินเพื่อยืนยันการสั่งซื้อของคุณ</p>
          </div>
        </div>
        <div className="flex flex-row flex-wrap">
          <div className="flex flex-col rounded-2xl bg-gray-50 font-sans p-6 gap-3 m-3 h-min w-100">
            <h1>เลือกวิธีชำระเงิน</h1>
            <p>เลือกวิธีที่คุณต้องการชำระเงินสำหรับบริการซักรีด</p>
            <Button>PromptPay</Button>
          </div>
          <div className="flex flex-col rounded-2xl bg-gray-50 font-sans p-6 gap-3 m-3 w-100">
            <h1>สรุปคำสั่งซื้อ</h1>
            <p>หมายเลขออเดอร์:</p>
            <p>รายการเสื้อผ้า:</p>
            <p>ที่อยู่รับผ้า:</p>
            <p>ราคาบริการ:</p>
            <h1>ยอดรวม:</h1>
            <Button>ชำระเงินตอนนี้</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;