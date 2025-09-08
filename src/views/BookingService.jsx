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
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect } from "react";
import { is } from "date-fns/locale/is";

export function BookingService({ onNavigateToPayment }) {
  const [selectedService, setSelectedService] = useState(null);
  const [serviceType, setServiceType] = useState("per-kg");
  const [customItems, setCustomItems] = useState([]);
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const {user} = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    tel: user?.tel || "",
    roomNumber: user?.roomNumber || "",
  });
  console.log(formData);

  useEffect(() => {
      setFormData({
        fullName: user?.fullName || "",
        email: user?.email || "",
        tel: user?.tel || "",
        roomNumber: user?.roomNumber || "",
      });
  }, [user]);
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

  const removeCustomItem = (itemName) => {
    setCustomItems(customItems.filter((i) => i.name !== itemName));
    updateTotalPrice();
  };

  const updateItemQuantity = (itemName, quantity) => {
    if (quantity <= 0) {
      removeCustomItem(itemName);
    } else {
      setCustomItems(
        customItems.map((i) => (i.name === itemName ? { ...i, quantity } : i))
      );
    }
    updateTotalPrice();
  };

  const updateTotalPrice = () => {
    if (serviceType === "per-kg" && selectedService) {
      setTotalPrice(selectedService.price);
    } else if (serviceType === "per-piece") {
      const total = customItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setTotalPrice(total);
    }
  };

  const selectService = (service) => {
    setSelectedService(service);
    if (serviceType === "per-kg") {
      setTotalPrice(service.price);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (!selectedService && serviceType !== "per-piece") {
      alert("กรุณาเลือกบริการ");
      return;
    }

    if (serviceType === "per-piece" && customItems.length === 0) {
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
              serviceType === "per-kg"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => {
              setServiceType("per-kg");
              setSelectedService(null);
              setCustomItems([]);
              setTotalPrice(0);
            }}
          >
            <i class="ri-weight-line"></i> คิดตามน้ำหนัก
          </ShinyButton>
          <ShinyButton
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              serviceType === "per-piece"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground "
            }`}
            onClick={() => {
              setServiceType("per-piece");
              setSelectedService(null);
              setCustomItems([]);
              setTotalPrice(0);
            }}
          >
            <i class="ri-t-shirt-line"></i> คิดตามชิ้น
          </ShinyButton>
        </div>
      </div>

      {/* Per KG Rates ถ้ากดเลือกน้ำหนักจะเรนเดอร์อันนี้*/}
      {serviceType === "per-kg" && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-center">
            เลือกน้ำหนักเสื้อผ้า
          </h3>

          <div className="max-w-2xl mx-auto ">
            <Card className="p-6">
              <div className="space-y-4">
                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=600&h=300&fit=crop"
                    alt="ตะกร้าซักผ้า"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {perKgRates.map((rate) => (
                    <button
                      key={rate.kg}
                      className={`p-4 border rounded-lg text-left transition-all ${
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
      {serviceType === "per-piece" && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-center">
            เลือกรายการเสื้อผ้า
          </h3>

          {/* Selected Items */}
          {customItems.length > 0 && (
            <Card className="p-6">
              <h4 className="font-medium mb-4">รายการที่เลือก</h4>
              <div className="space-y-3">
                {customItems.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-xl text-muted-foreground ml-2">
                        ฿{item.price}/ชิ้น
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="w-8 h-8 rounded border border-border flex items-center justify-center hover:bg-background"
                        onClick={() =>
                          updateItemQuantity(item.name, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        className="w-8 h-8 rounded border border-border flex items-center justify-center hover:bg-background"
                        onClick={() =>
                          updateItemQuantity(item.name, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                      <button
                        className="ml-2 text-destructive hover:text-destructive/80"
                        onClick={() => removeCustomItem(item.name)}
                      >
                        ลบ
                      </button>
                    </div>
                  </div>
                ))}
                <div className="pt-3 border-t border-border">
                  <div className="flex justify-between font-semibold">
                    <span>รวม:</span>
                    <span className="text-primary">฿{totalPrice}</span>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Available Items */}
          <div className="space-y-4 ">
            {["เสื้อผ้าพิเศษ", "ผ้าบ้าน"].map((category) => (
              <Card key={category} className="p-6  ">
                <h4 className="font-medium mb-4">{category}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {perPieceItems
                    .filter((item) => item.category === category)
                    .map((item) => (
                      <button
                        key={item.name}
                        className="p-3 border border-border rounded-lg text-left hover:border-primary/50 transition-colors"
                        onClick={() => addCustomItem(item)}
                      >
                        <div className="flex justify-between items-center">
                          <span>{item.name}</span>
                          <span className="font-semibold text-primary">
                            ฿{item.price}
                          </span>
                        </div>
                      </button>
                    ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Pickup Schedule */}
      {(selectedService || customItems.length > 0) && (
        <Card className="p-6">
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
                <option value="09:00-12:00">09:00 - 12:00</option>
                <option value="12:00-15:00">12:00 - 15:00</option>
                <option value="15:00-18:00">15:00 - 18:00</option>
                <option value="18:00-21:00">18:00 - 21:00</option>
              </select>
            </div>
          </div>
        </Card>
      )}

      {/* Special Instructions */}
      {(selectedService || customItems.length > 0) && (
        <Card className="p-6">
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
              {!isEditing ?(<button onClick={() => setIsEditing(true)} className="absolute top-4 right-4 px-3 py-1.5 text-sm font-medium 
               rounded-md bg-chart-2 text-primary-foreground 
               hover:bg-primary/90">แก้ไขข้อมูล</button>):(<button onClick={() => setIsEditing(false)} className="absolute top-4 right-4 px-3 py-1.5 text-sm font-medium
                rounded-md  bg-emerald-500 text-primary-foreground transaparent
                hover:bg-primary/90">ยืนยันการแก้ไข</button>)}
              <h4 className="font-medium mb-2">ข้อมูลการจัดส่ง</h4>

              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>ชื่อ:</strong>{" "}
                  {isEditing ? (
                    <input
                      type="text"
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
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
                      onChange={(e) => handleInputChange("roomNumber", e.target.value)}
                      value={formData.roomNumber}
                      className="border-3 border-teal-700 rounded-md ml-8.5  px-2 py-1"
                    />
                  ):(
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
        <Card className="p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">สรุปการจอง</h3>

            {/* <div className="space-y-2">
              {serviceType === "monthly" && selectedService && (
                <div className="flex justify-between">
                  <span>{selectedService.name}</span>
                  <span>฿{selectedService.price}</span>
                </div>
              )}
              
              {serviceType === "per-kg" && selectedService && (
                <div className="flex justify-between">
                  <span>บริการซัก {selectedService.kg} กิโลกรัม</span>
                  <span>฿{selectedService.price}</span>
                </div>
              )}
              
              {serviceType === "per-piece" && customItems.map((item) => (
                <div key={item.name} className="flex justify-between">
                  <span>{item.name} x {item.quantity}</span>
                  <span>฿{item.price * item.quantity}</span>
                </div>
              ))}
            </div> */}

            <div className="pt-4 border-t border-border">
              <div className="flex justify-between text-lg font-semibold">
                <span>รวมทั้งสิ้น:</span>
                <span className="text-primary">฿{totalPrice}</span>
              </div>
            </div>

            <Link to="/payment"><Button className="w-full" size="lg" onClick={handleSubmit}>
              ดำเนินการชำระเงิน
            </Button></Link>
          </div>
        </Card>
      )}
    </div>
  );
}
