import { use, useState } from "react";
import { Button } from "../components/ui/button.jsx";
import { Card } from "../components/ui/card.jsx";
import { Input } from "../components/ui/input.jsx";
import { Badge } from "../components/ui/badge.jsx";
import axios from "axios";
import { set } from "date-fns/set";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export function Profile() {
  const {user} = useAuth();
  // console.log(user);
  // console.log(user._id);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    tel: user?.tel || "",
    roomNumber: user?.roomNumber || "",

  });

  useEffect(() => {
    setFormData({
      fullName: user?.fullName || "",
      email: user?.email || "",
      tel: user?.tel || "",
      roomNumber: user?.roomNumber || "",
    });
  }, [user]);


  const [orderHistory, setOrderHistory] = useState([
    {
      id: "ORD-001",
      date: "2024-01-15",
      service: "แพ็กเกจกลาง",
      amount: 499,
      status: "เสร็จสิ้น"
    },
    {
      id: "ORD-002",
      date: "2024-01-10",
      service: "คิดตามชิ้น",
      amount: 280,
      status: "เสร็จสิ้น"
    },
    {
      id: "ORD-003",
      date: "2025-01-05",
      service: "แพ็กเกจกลาง",
      amount: 499,
      status: "เสร็จสิ้น"
    }
  ]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

//   const handlePreferenceChange = (preference, value) => {
//     setFormData(prev => ({
//       ...prev,
//       preferences: {
//         ...prev.preferences,
//         [preference]: value
//       }
//     }));
//   };
// Here you would typically send the data to your backend
//     setIsEditing(false);
    
//     alert("บันทึกข้อมูลเรียบร้อยแล้ว!");
  const handleSave = async () => {
    try {
      const saveUserData = {
        fullName: formData.fullName,
        email: formData.email,
        tel: formData.tel,
        roomNumber: formData.roomNumber,
      };
      console.log(saveUserData);
      const response = await axios.put(`import.meta.env.VITE_API_URL||"http://localhost:5001"/users/${user._id}`, saveUserData);
      { withCredentials: true } // ส่ง access token ไปด้วย ยืนยันคนยิง ได้ใช้ไหม?
      if (response.status === 200) {
        alert("บันทึกข้อมูลเรียบร้อยแล้ว!");
      }
    } catch (error) {
      console.error("Error saving user data:", error);
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      fullName: user?.fullName || "",
      email: user?.email || "",
      tel: user?.tel || "",
      roomNumber: user?.roomNumber || "",
    });
    setIsEditing(false);
  };

  const cancelSubscription = () => {
    if (window.confirm("คุณแน่ใจหรือไม่ที่จะยกเลิกแพ็กเกจ?")) {
      setSubscription(prev => ({ ...prev, status: "cancelled" }));
      alert("ยกเลิกแพ็กเกจเรียบร้อยแล้ว");
    }
  };

  const totalSpent = orderHistory.reduce((sum, order) => sum + order.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold mb-2">โปรไฟล์ของฉัน</h2>
          <p className="text-muted-foreground">
            จัดการข้อมูลส่วนตัวและการตั้งค่าบัญชี
          </p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            แก้ไขข้อมูล
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel}>
              ยกเลิก
            </Button>
            <Button onClick={handleSave}>
              บันทึก
            </Button>
          </div>
        )}
      </div>

      {/* Profile Statistics */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {orderHistory.length}
            </div>
            <div className="text-sm text-muted-foreground">คำสั่งซื้อทั้งหมด</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              ฿{totalSpent.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">ยอดใช้จ่ายรวม</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {subscription.itemsUsed}/{subscription.itemsTotal}
            </div>
            <div className="text-sm text-muted-foreground">ใช้ไปแล้ว (ชิ้น)</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              VIP
            </div>
            <div className="text-sm text-muted-foreground">สถานะสมาชิก</div>
          </div>
        </Card>
      </div> */}

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        {/* Personal Information */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">ข้อมูลส่วนตัว</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">ชื่อ-นามสกุล</label>
              {isEditing ? (
                <Input
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  placeholder="กรุณากรอกชื่อ-นามสกุล"
                />
              ) : (
                <p className="text-sm p-2 bg-muted rounded">{formData.fullName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">อีเมล</label>
              {isEditing ? (
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="กรุณากรอกอีเมล"
                />
              ) : (
                <p className="text-sm p-2 bg-muted rounded">{formData.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">เบอร์โทรศัพท์</label>
              {isEditing ? (
                <Input
                  value={formData.tel}
                  onChange={(e) => handleInputChange("tel", e.target.value)}
                  placeholder="กรุณากรอกเบอร์โทรศัพท์"
                />
              ) : (
                <p className="text-sm p-2 bg-muted rounded">{formData.tel}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">หมายเลขห้อง</label>
              {isEditing ? (
                <Input
                  value={formData.roomNumber}
                  onChange={(e) => handleInputChange("roomNumber", e.target.value)}
                  placeholder="กรุณากรอกหมายเลขห้อง"
                />
              ) : (
                <p className="text-sm p-2 bg-muted rounded">{formData.roomNumber}</p>
              )}
            </div>

          </div>
        </Card>

      </div>

      {/* Current Subscription */}
      {/* <Card className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold">แพ็กเกจปัจจุบัน</h3>
          {subscription.status === "active" && (
            <Badge className="bg-green-100 text-green-800">ใช้งานอยู่</Badge>
          )}
          {subscription.status === "cancelled" && (
            <Badge className="bg-red-100 text-red-800">ยกเลิกแล้ว</Badge>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">แพ็กเกจ</p>
              <p className="font-medium">{subscription.type}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">ราคา</p>
              <p className="font-medium">฿{subscription.price}/เดือน</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">วันที่เริ่มต้น</p>
              <p className="font-medium">{subscription.startDate}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">ใช้ไปแล้ว</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{
                      width: `${(subscription.itemsUsed / subscription.itemsTotal) * 100}%`
                    }}
                  />
                </div>
                <span className="text-sm font-medium">
                  {subscription.itemsUsed}/{subscription.itemsTotal}
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">หมดอายุ</p>
              <p className="font-medium">{subscription.nextBilling}</p>
            </div>
            {subscription.status === "active" && (
              <Button
                variant="destructive"
                size="sm"
                onClick={cancelSubscription}
              >
                ยกเลิกแพ็กเกจ
              </Button>
            )}
          </div>
        </div>
      </Card> */}

      {/* Order History */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">ประวัติการสั่งซื้อล่าสุด</h3>
        <div className="space-y-3">
          {orderHistory.slice(0, 5).map((order) => (
            <div key={order.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="font-medium">{order.id}</p>
                <p className="text-sm text-muted-foreground">
                  {order.date} - {order.service}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">฿{order.amount}</p>
                <Badge className="bg-green-100 text-green-800 text-xs">
                  {order.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Button variant="outline">ดูประวัติทั้งหมด</Button>
        </div>
      </Card>
    </div>
  );
}