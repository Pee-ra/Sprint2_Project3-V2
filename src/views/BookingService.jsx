import { useState } from "react";
import { Button } from "../components/ui/button.jsx";
import { Card } from "../components/ui/card.jsx";
import { Input } from "../components/ui/input.jsx";
import { Badge } from "../components/ui/badge.jsx";
import { ImageWithFallback } from "../components/ui/ImageWithFallback.jsx";
import { perKgRates } from "../data/services.js";
import { perPieceItems } from "../data/services.js";
import { ShinyButton } from "@/components/magicui/shiny-button";
import Footer from "../components/ui/Footer";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect } from "react";
import BottomSummaryButton from "../components/ui/BottomSummaryButton.jsx";
import QuantitySelector from "../components/ui/quantitySelecter.jsx";
import CustomMarquee from "../components/ui/colthset.jsx";
import axios from "axios";


export function BookingService({ onNavigateToPayment }) {
  const [selectedService, setSelectedService] = useState(null);
  const [serviceType, setServiceType] = useState("คิดตามน้ำหนัก");
  const [customItems, setCustomItems] = useState([]);
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    tel: user?.tel || "",
    roomNumber: user?.roomNumber || "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      fullName: user?.fullName || "",
      email: user?.email || "",
      tel: user?.tel || "",
      roomNumber: user?.roomNumber || "",
    });
  }, [user]);

  useEffect(() => {
    if (serviceType === "คิดตามชิ้น") {
      const total = customItems.reduce(
        (sum, item) => sum + item.price * (item.quantity || 0),
        0
      );
      setTotalPrice(total);
    } else if (serviceType === "คิดตามน้ำหนัก" && selectedService) {
      setTotalPrice(selectedService.price);
    } else {
      setTotalPrice(0);
    }
  }, [serviceType, customItems, selectedService]);

  const addCustomItem = (item) => {
    const existingItem = customItems.find((i) => i.name === item.name);
    if (existingItem) {
      setCustomItems(
        customItems.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCustomItems([...customItems, { ...item, quantity: 1 }]);
    }
    updateTotalPrice();
  };

  // const removeCustomItem = (itemName) => {
  //   setCustomItems(customItems.filter((i) => i.name !== itemName));
  //   updateTotalPrice();
  // };

  // const updateItemQuantity = (itemName, quantity) => {
  //   if (quantity <= 0) {
  //     removeCustomItem(itemName);
  //   } else {
  //     setCustomItems(
  //       customItems.map((i) => (i.name === itemName ? { ...i, quantity } : i))
  //     );
  //   }
  //   updateTotalPrice();
  // };

  const updateTotalPrice = () => {
    if (serviceType === "คิดตามน้ำหนัก" && selectedService) {
      setTotalPrice(selectedService.price);
    } else if (serviceType === "คิดตามชิ้น") {
      const total = customItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setTotalPrice(total);
    }
  };

  const selectService = (service) => {
    setSelectedService(service);
    if (serviceType === "คิดตามน้ำหนัก") {
      setTotalPrice(service.price);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validOrder = () => {
    if (!selectedService && serviceType !== "คิดตามชิ้น") {
      alert("กรุณาเลือกบริการ");
      return;
    }

    if (serviceType === "คิดตามชิ้น" && customItems.length === 0) {
      alert("กรุณาเลือกรายการเสื้อผ้า");
      return;
    }

    if (!pickupDate || !pickupTime) {
      alert("กรุณาเลือกวันและเวลารับผ้า");
      return;
    }
    // Navigate to payment with booking details
    onNavigateToPayment();
  };

  // if (!serviceSelected) return null; // ยังไม่เลือกบริการ → ไม่โชว์ป๊อปอัพ
  const submitOrder = async () => {
  try {
    // map ไทย -> code
    const mappedServiceType =
      serviceType === "คิดตามน้ำหนัก" ? "per-kg" : "per-piece";

    const payload = {
      serviceType: mappedServiceType, // ✅ ส่งเป็น per-kg หรือ per-piece
      weightDetails:
        mappedServiceType === "per-kg"
          ? {
              kg: selectedService.kg,
              price: selectedService.price,
            }
          : undefined,
      itemDetails:
        mappedServiceType === "per-piece"
          ? customItems.map((i) => ({
              name: i.name,
              quantity: i.quantity,
              price: i.price,
              subtotal: i.price * i.quantity,
            }))
          : [],
      pickupDetails: {
        date: pickupDate,
        time: pickupTime,
      },
      specialInstructions,
      customerInfo: formData,
      totalPrice,
    };

    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL || "http://localhost:5001"}/api/v1/orders`,
      payload,
      { withCredentials: true }
    );

    alert("จองสำเร็จ!");
    navigate(`/payment/${data.data._id}`);
  } catch (err) {
    console.error(err.response?.data || err.message);
    alert("เกิดข้อผิดพลาดในการจอง");
  }
};

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold ">จองบริการซักรีด</h2>
        <p className="text-lg text-muted-foreground">
          เลือกบริการที่เหมาะกับความต้องการของคุณ
        </p>
      </div>

      {/* Service Type Selection */}

      <div className="flex justify-center">
        <div className="inline-flex rounded-lg border border-border bg-muted p-1">
          <ShinyButton
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              serviceType === "คิดตามน้ำหนัก"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => {
              setServiceType("คิดตามน้ำหนัก");
              setSelectedService(null);
              setCustomItems([]);
              setTotalPrice(0);
            }}
          >
            <i className="ri-weight-line"></i> คิดตามน้ำหนัก
          </ShinyButton>
          <ShinyButton
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              serviceType === "คิดตามชิ้น"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground "
            }`}
            onClick={() => {
              setServiceType("คิดตามชิ้น");
              setSelectedService(null);
              setCustomItems([]);
              setTotalPrice(0);
            }}
          >
            <i className="ri-t-shirt-line"></i> คิดตามชิ้น
          </ShinyButton>
        </div>
      </div>

      {/* Per KG Rates ถ้ากดเลือกน้ำหนักจะเรนเดอร์อันนี้*/}
      {serviceType === "คิดตามน้ำหนัก" && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-center">
            เลือกน้ำหนักเสื้อผ้า
          </h3>

          <div className="max-w-2xl mx-auto ">
            <Card className="p-6 hover:shadow-md">
              <div className="space-y-4 flex gap-6">
                <div className=" rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src="src/assets/bucket.png"
                    alt="ตะกร้าซักผ้า"
                    className="object-cover h-50"
                  />
                </div>
                <div className="grid grid-cols-1 gap-3 w-full ">
                  {perKgRates.map((rate) => (
                    <button
                      key={rate.kg}
                      className={`p-4 border rounded-lg text-left transition-transform duration-300 hover:scale-103 ${
                        selectedService?.kg === rate.kg
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => selectService(rate)}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{rate.kg} กิโลกรัม</span>
                        <span className="font-semibold text-primary">
                          ฿{rate.price}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Per Piece Items */}
      {serviceType === "คิดตามชิ้น" && (
        <div className="space-y-6 mx-20">
          <h3 className="text-xl font-semibold text-center">
            เลือกรายการเสื้อผ้า
          </h3>
          <CustomMarquee/>

          {/* Selected Items shoe total on top */}
          {/* {customItems.length > 0 && (
            <div className="space-y-4">
        <Card className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
            {perPieceItems.map((item) => (
  <div
    key={item.name}
    className="p-3 border border-border rounded-lg text-left hover:border-primary/50 transition-colors-transform duration-300 hover:scale-103 hover:bg-primary-foreground"
  >
    <div className="flex justify-between items-center">
      <span>{item.name}</span>
      <div className="flex-col">
        <span className="font-semibold text-primary">
          ฿{item.price}
        </span>
        <QuantitySelector
          key={item.name}
          item={item}
          customItems={customItems}
          setCustomItems={setCustomItems}
        />
      </div>
    </div>
  </div>
))}

        </Card>
        </div>
          )} */}

          {/* Available Items */}

          <div className="space-y-4">
            <Card className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
                {perPieceItems.map((item) => (
                  <button
                    key={item.name}
                    className="p-3 border border-border rounded-lg text-left hover:border-primary/50 transition-colors-transform duration-300 hover:scale-103 hover:bg-primary-foreground"
                  >
                    <div className="flex justify-between items-center">
                      <span>{item.name}</span>
                      <div className="flex-col">
                        <span className="font-semibold text-primary">
                          ฿{item.price}
                        </span>
                        <QuantitySelector
                          key={item.name}
                          item={item} //ส่ง
                          customItems={customItems}
                          setCustomItems={setCustomItems}
                        />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Pickup Schedule */}
      {(selectedService || customItems.length > 0) && (
        <Card className="w-full px-4 sm:px-8 py-6 mx-auto max-w-2xl">
          <h3 className="text-lg font-semibold mb-4">กำหนดการรับผ้า</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                วันที่รับผ้า
              </label>
              <Input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                เวลารับผ้า
              </label>
              <select
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input-background"
              >
                <option value="">เลือกเวลา</option>
                <option value="08:10-12:00">08:10 - 12:00</option>
                <option value="12:10-15:00">12:10 - 15:00</option>
                <option value="15:10-18:00">15:10 - 18:00</option>
              </select>
            </div>
          </div>
        </Card>
      )}

      {/* Special Instructions */}
      {(selectedService || customItems.length > 0) && (
        <Card className="w-full px-4 sm:px-8 py-6 mx-auto max-w-2xl">
          <h3 className="text-lg font-semibold mb-4">ข้อมูลเพิ่มเติม</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                คำแนะนำพิเศษ (ถ้ามี)
              </label>
              <textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input-background"
                rows={3}
                placeholder="เช่น มีคราบยากๆ ที่ต้องดูแลพิเศษ หรือข้อกำหนดการซักอื่นๆ"
              />
            </div>

            <div className="bg-muted p-4 rounded-lg relative">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="absolute top-4 right-4 px-3 py-1.5 text-sm font-medium 
               rounded-md bg-chart-2 text-primary-foreground 
               hover:bg-primary/90"
                >
                  แก้ไขข้อมูล
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(false)}
                  className="absolute top-4 right-4 px-3 py-1.5 text-sm font-medium
                rounded-md  bg-emerald-500 text-primary-foreground transaparent
                hover:bg-primary/90"
                >
                  ยืนยันการแก้ไข
                </button>
              )}
              <h4 className="font-medium mb-2">ข้อมูลการจัดส่ง</h4>

              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>ชื่อ:</strong>{" "}
                  {isEditing ? (
                    <input
                      type="text"
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      value={formData.fullName}
                      className="border-3 border-teal-700 rounded-md ml-9.5  px-2 py-1"
                    />
                  ) : (
                    <span>{formData?.fullName}</span>
                  )}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>เบอร์โทร:</strong>
                  {isEditing ? (
                    <input
                      type="text"
                      onChange={(e) => handleInputChange("tel", e.target.value)}
                      value={formData.tel}
                      className="border-3 border-teal-700 rounded-md ml-2  px-2 py-1 "
                    />
                  ) : (
                    <span>{formData?.tel}</span>
                  )}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>ที่อยู่:</strong>
                  {isEditing ? (
                    <input
                      type="text"
                      onChange={(e) =>
                        handleInputChange("roomNumber", e.target.value)
                      }
                      value={formData.roomNumber}
                      className="border-3 border-teal-700 rounded-md ml-8.5  px-2 py-1"
                    />
                  ) : (
                    <span>{formData?.roomNumber}</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Summary and Submit */}
      {(selectedService || customItems.length > 0) && (
        <Card className="w-full px-4 sm:px-8 py-6 mx-auto max-w-2xl">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">สรุปการจอง</h3>

            <div className="space-y-2">
              {serviceType === "คิดตามน้ำหนัก" && selectedService && (
                <div className="flex justify-between">
                  <span>บริการซัก {selectedService.kg} กิโลกรัม</span>
                  <span>฿{selectedService.price}</span>
                </div>
              )}

              {serviceType === "คิดตามชิ้น" &&
                customItems.map((item) => (
                  <div key={item.name} className="flex justify-between">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>฿{item.price * item.quantity}</span>
                  </div>
                ))}
              <BottomSummaryButton
                totalPrice={totalPrice}
                onSubmit={submitOrder}
                show={selectedService || customItems.length > 0}
              />
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}