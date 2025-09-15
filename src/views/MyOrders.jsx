import { useState } from "react";
import { Button } from "../components/ui/button.jsx";
import { Card } from "../components/ui/card.jsx";
import { Badge } from "../components/ui/badge.jsx";
import { Input } from "../components/ui/input.jsx";
import { myOrdershistory } from "../data/services.js";
import Lottie from "lottie-react";
import wash from "../components/lottie/wash.json";


export function MyOrders() {
  const [orders, setOrders] = useState(myOrdershistory);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ทั้งหมด");
  const [selectedOrder, setSelectedOrder] = useState(null);

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

  const getStatusIcon = (status) => {
    switch (status) {
      case "รอรับผ้า":
        return "📦";
      case "กำลังดำเนินการ":
        return "🔄";
      case "เสร็จสิ้น":
        return "✅";
      case "ยกเลิก":
        return "❌";
      default:
        return "📋";
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "ทั้งหมด" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === "รอรับผ้า").length,
    inProgress: orders.filter(o => o.status === "กำลังดำเนินการ").length,
    completed: orders.filter(o => o.status === "เสร็จสิ้น").length,
    totalSpent: orders
      .filter(o => o.status === "เสร็จสิ้น")
      .reduce((sum, o) => sum + o.amount, 0)
  };

  const cancelOrder = (orderId) => {
    if (window.confirm("คุณแน่ใจหรือไม่ที่จะยกเลิกคำสั่งซื้อนี้?")) {
      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: "ยกเลิก" } : order
      ));
    }
  };

  const reorder = (order) => {
    const newOrder = {
      ...order,
      id: `ORD-2024-${String(orders.length + 1).padStart(3, '0')}`,
      status: "รอรับผ้า",
      orderDate: new Date().toISOString().split('T')[0],
      pickupDate: "",
      deliveryDate: ""
    };
    setOrders([newOrder, ...orders]);
    alert("สั่งซื้อซ้ำเรียบร้อยแล้ว!");
  };

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">ประวัติการสั่งซื้อ</h2> 
        <p className="text-muted-foreground">
          ติดตามและจัดการคำสั่งซื้อของคุณ
        </p>
        <Lottie animationData={wash} className=" absolute -top-12 left-60" style={{width: "160px", height: "160px"}}/>
      </div>

      {/* Stats Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {stats.total}
            </div>
            <div className="text-sm text-muted-foreground">คำสั่งซื้อทั้งหมด</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600 mb-1">
              {stats.pending}
            </div>
            <div className="text-sm text-muted-foreground">รอรับผ้า</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {stats.inProgress}
            </div>
            <div className="text-sm text-muted-foreground">กำลังดำเนินการ</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {stats.completed}
            </div>
            <div className="text-sm text-muted-foreground">เสร็จสิ้น</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              ฿{stats.totalSpent.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">ยอดใช้จ่ายรวม</div>
          </div>
        </Card>
      </div> */}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="ค้นหาด้วยรหัสคำสั่งซื้อหรือประเภทบริการ..."
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
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getStatusIcon(order.status)}</span>
                  <div>
                    <h3 className="font-semibold">{order.id}</h3>
                    <p className="text-sm text-muted-foreground">
                      สั่งเมื่อ: {order.orderDate}
                    </p>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">บริการ</p>
                    <p className="font-medium">{order.service}</p>
                    <p className="text-sm text-muted-foreground">
                      ยอดเงิน: ฿{order.amount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">กำหนดการ</p>
                    <p className="text-sm">รับผ้า: {order.pickupDate || "ยังไม่กำหนด"}</p>
                    <p className="text-sm">ส่งคืน: {order.deliveryDate || "ยังไม่กำหนด"}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">รายการ</p>
                  <p className="text-sm">{order.items.join(", ")}</p>
                </div>

                {order.specialInstructions && (
                  <div>
                    <p className="text-sm text-muted-foreground">คำแนะนำพิเศษ</p>
                    <p className="text-sm">{order.specialInstructions}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2 lg:min-w-[180px]">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => setSelectedOrder(order)}
                >
                  ดูรายละเอียด
                </Button>

                {order.status === "รอรับผ้า" && (
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full"
                    onClick={() => cancelOrder(order.id)}
                  >
                    ยกเลิกคำสั่งซื้อ
                  </Button>
                )}

                {order.status === "เสร็จสิ้น" && (
                  <Button
                    variant="default"
                    size="sm"
                    className="w-full"
                    onClick={() => reorder(order)}
                  >
                    สั่งซื้อซ้ำ
                  </Button>
                )}

                {(order.status === "กำลังดำเนินการ" || order.status === "รอรับผ้า") && (
                  <Button variant="outline" size="sm" className="w-full">
                    ติดตามสถานะ
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">📦</div>
          <h3 className="text-lg font-semibold mb-2">ไม่พบคำสั่งซื้อ</h3>
          <p className="text-muted-foreground mb-4">
            ลองเปลี่ยนเงื่อนไขการค้นหาหรือตัวกรอง
          </p>
          <Button>จองบริการใหม่</Button>
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold">รายละเอียดคำสั่งซื้อ</h3>
                <Button
                  variant="outline"
                  onClick={() => setSelectedOrder(null)}
                >
                  ปิด
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{getStatusIcon(selectedOrder.status)}</span>
                  <div>
                    <h4 className="font-semibold text-lg">{selectedOrder.id}</h4>
                    <Badge className={getStatusColor(selectedOrder.status)}>
                      {selectedOrder.status}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium mb-2">ข้อมูลคำสั่งซื้อ</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">บริการ:</span>
                        <span>{selectedOrder.service}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">ยอดเงิน:</span>
                        <span>฿{selectedOrder.amount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">วันที่สั่ง:</span>
                        <span>{selectedOrder.orderDate}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium mb-2">กำหนดการ</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">วันรับผ้า:</span>
                        <span>{selectedOrder.pickupDate || "ยังไม่กำหนด"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">วันส่งคืน:</span>
                        <span>{selectedOrder.deliveryDate || "ยังไม่กำหนด"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium mb-2">รายการเสื้อผ้า</h5>
                  <ul className="space-y-1 text-sm">
                    {selectedOrder.items.map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedOrder.specialInstructions && (
                  <div>
                    <h5 className="font-medium mb-2">คำแนะนำพิเศษ</h5>
                    <p className="text-sm bg-muted p-3 rounded-lg">
                      {selectedOrder.specialInstructions}
                    </p>
                  </div>
                )}

                {selectedOrder.status === "กำลังดำเนินการ" && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-2 text-blue-900">สถานะปัจจุบัน</h5>
                    <p className="text-sm text-blue-800">
                      เสื้อผ้าของคุณอยู่ในขั้นตอนการซัก คาดว่าจะเสร็จสิ้นตามกำหนดเวลา
                    </p>
                  </div>
                )}

                {selectedOrder.status === "เสร็จสิ้น" && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-2 text-green-900">เสร็จสิ้นแล้ว!</h5>
                    <p className="text-sm text-green-800">
                      เสื้อผ้าของคุณได้รับการซักและส่งคืนเรียบร้อยแล้ว
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}