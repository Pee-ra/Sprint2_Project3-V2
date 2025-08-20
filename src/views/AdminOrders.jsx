import { useState } from "react";
import { Button } from "../components/ui/button.jsx";
import { Card } from "../components/ui/card.jsx";
import { Badge } from "../components/ui/badge.jsx";
import { Input } from "../components/ui/input.jsx";
import { Select } from "../components/ui/select.jsx";

export function AdminOrders() {
  const [orders, setOrders] = useState([
    {
      id: "ORD-001",
      customerName: "สมชาย ใจดี",
      service: "แพ็กเกจกลาง",
      status: "กำลังดำเนินการ",
      pickupDate: "2024-01-15",
      deliveryDate: "2024-01-17",
      amount: 499,
      items: ["เสื้อเชิ้ต 3 ตัว", "กางเกง 2 ตัว"],
      phone: "081-234-5678",
      address: "123/45 หมู่บ้านสวนดอก กรุงเทพฯ 10250"
    },
    {
      id: "ORD-002",
      customerName: "สมศรี รักษ์ดี",
      service: "คิดตามชิ้น",
      status: "รอรับผ้า",
      pickupDate: "2024-01-16",
      deliveryDate: "2024-01-18",
      amount: 280,
      items: ["ชุดเดรส 2 ตัว", "เสื้อยืด 4 ตัว"],
      phone: "089-876-5432",
      address: "567/89 ซอยลาดพร้าว กรุงเทพฯ 10310"
    },
    {
      id: "ORD-003",
      customerName: "สมหมาย ขยันดี",
      service: "แพ็กเกจใหญ่",
      status: "เสร็จสิ้น",
      pickupDate: "2024-01-10",
      deliveryDate: "2024-01-12",
      amount: 799,
      items: ["เสื้อผ้าครอบครัว 35 ชิ้น"],
      phone: "092-111-2233",
      address: "789/123 ถนนสุขุมวิท กรุงเทพฯ 10110"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ทั้งหมด");

  const getStatusColor = (status) => {
    switch (status) {
      case "รอรับผ้า":
        return "bg-yellow-100 text-yellow-800";
      case "กำลังดำเนินการ":
        return "bg-blue-100 text-blue-800";
      case "เสร็จสิ้น":
        return "bg-green-100 text-green-800";
      case "ยกเลิก":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "ทั้งหมด" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">จัดการคำสั่งซื้อ</h2>
        <p className="text-muted-foreground">
          ดูและจัดการคำสั่งซื้อทั้งหมดในระบบ
        </p>
      </div>

      {/* Filters */}
      {/* <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="ค้นหาด้วยชื่อลูกค้าหรือรหัสคำสั่งซื้อ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="w-full sm:w-48">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-input-background"
          >
            <option value="ทั้งหมด">ทุกสถานะ</option>
            <option value="รอรับผ้า">รอรับผ้า</option>
            <option value="กำลังดำเนินการ">กำลังดำเนินการ</option>
            <option value="เสร็จสิ้น">เสร็จสิ้น</option>
            <option value="ยกเลิก">ยกเลิก</option>
          </select>
        </div>
      </div> */}

      {/* Stats Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {orders.length}
            </div>
            <div className="text-sm text-muted-foreground">คำสั่งซื้อทั้งหมด</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600 mb-1">
              {orders.filter(o => o.status === "รอรับผ้า").length}
            </div>
            <div className="text-sm text-muted-foreground">รอรับผ้า</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {orders.filter(o => o.status === "กำลังดำเนินการ").length}
            </div>
            <div className="text-sm text-muted-foreground">กำลังดำเนินการ</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {orders.filter(o => o.status === "เสร็จสิ้น").length}
            </div>
            <div className="text-sm text-muted-foreground">เสร็จสิ้น</div>
          </div>
        </Card>
      </div> */}

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold">{order.id}</h3>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">ลูกค้า</p>
                    <p className="font-medium">{order.customerName}</p>
                    <p className="text-sm text-muted-foreground">{order.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">บริการ</p>
                    <p className="font-medium">{order.service}</p>
                    <p className="text-sm text-muted-foreground">
                      ฿{order.amount.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">รายการ</p>
                  <p className="text-sm">{order.items.join(", ")}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">วันรับผ้า</p>
                    <p className="text-sm">{order.pickupDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">วันส่งคืน</p>
                    <p className="text-sm">{order.deliveryDate}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">ที่อยู่</p>
                  <p className="text-sm">{order.address}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 lg:min-w-[200px]">
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                  className="px-3 py-2 border border-border rounded-lg bg-input-background text-sm"
                >
                  <option value="รอรับผ้า">รอรับผ้า</option>
                  <option value="กำลังดำเนินการ">กำลังดำเนินการ</option>
                  <option value="เสร็จสิ้น">เสร็จสิ้น</option>
                  <option value="ยกเลิก">ยกเลิก</option>
                </select>
                
                <Button variant="outline" size="sm" className="w-full">
                  ดูรายละเอียด
                </Button>
                
                <Button variant="outline" size="sm" className="w-full">
                  ติดต่อลูกค้า
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">📋</div>
          <h3 className="text-lg font-semibold mb-2">ไม่พบคำสั่งซื้อ</h3>
          <p className="text-muted-foreground">
            ลองเปลี่ยนเงื่อนไขการค้นหาหรือตัวกรอง
          </p>
        </div>
      )}
    </div>
  );
}