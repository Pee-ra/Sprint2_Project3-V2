import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import { AiOutlineArrowLeft } from "react-icons/ai";
import axios from "axios";

const Payment = () => {
  const { orderId } = useParams(); // สมมติ URL = /payment/:orderId
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(
           `http://localhost:5001/api/v1/orders/${orderId}`,
          { withCredentials: true }
        );
        setOrder(res.data.order); // หรือ res.data แล้วแต่รูปแบบ response
      } catch (err) {
        console.error("Error fetching order", err);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

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
            <h1 className="font-bold text-3xl"><i className="ri-bit-coin-line"></i> ชำระเงิน</h1>
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
            <p>หมายเลขออเดอร์: {order?.orderNumber}</p>

            <p>รายการเสื้อผ้า:{" "}{order?.serviceType === "per-kg"
            ? `${order?.weightDetails?.kg} กิโลกรัม`
            : order?.itemDetails?.map(i => `${i.name} x ${i.quantity}`).join(", ")}
            </p>

            <p>ที่อยู่รับผ้า: {order?.customerInfo?.roomNumber}</p>

            <p>ราคาบริการ: {order?.totalPrice} บาท</p>
            <h1>ยอดรวม: {order?.totalPrice} บาท</h1>

            <Link to = "/dashboard"><Button>ชำระเงินตอนนี้</Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;