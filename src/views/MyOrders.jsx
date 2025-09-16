import { useState, useEffect  } from "react";
import { Button } from "../components/ui/button.jsx";
import { Card } from "../components/ui/card.jsx";
import { Badge } from "../components/ui/badge.jsx";
import { Input } from "../components/ui/input.jsx";
import Lottie from "lottie-react";
import wash from "../components/lottie/wash.json";
import axios from "axios";
import { Link } from "react-router-dom";

export function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ทั้งหมด");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancelingId, setCancelingId] = useState(null);

  const API = import.meta.env.VITE_API_URL || "http://localhost:5001";

  // ---------- helpers (เพิ่ม) ----------
  const normStatus = (s) => (s ? String(s).trim().toLowerCase() : "");
  const toThaiStatus = (s) =>
    ({ pending: "รอรับผ้า", completed: "เสร็จสิ้น", canceled: "ยกเลิก" }[normStatus(s)] || "ไม่ทราบสถานะ");
  const getStatusColor = (s) =>
    ({ pending: "bg-yellow-100 text-yellow-800", completed: "bg-green-100 text-green-800", canceled: "bg-red-100 text-red-800" }[normStatus(s)] || "bg-gray-100 text-gray-800");
  const getStatusIcon = (s) =>
    ({ pending: "📦", completed: "✅", canceled: "❌" }[normStatus(s)] || "📋");
  // ------------------------------------

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${API}/api/v1/orders/me`,
          { withCredentials: true }
        );
        // เติมค่าเริ่มต้นให้ order ที่ยังไม่มี status
        const list = (res.data.orders || []).map(o => ({ ...o, status: o.status || "pending" }));
        setOrders(list);
      } catch (err) {
        console.error(err);
        setError("ไม่สามารถโหลดคำสั่งซื้อได้");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const cancelOrder = async (orderId) => {
    const ok = window.confirm("คุณแน่ใจหรือไม่ที่จะยกเลิกคำสั่งซื้อนี้?");
    if (!ok) return;

    try {
      setCancelingId(orderId);
      await axios.delete(`${import.meta.env.VITE_API_URL || "http://localhost:5001"}/api/v1/orders/me/${orderId}`, {
        withCredentials: true,
      });

      setOrders(prev =>
        prev.map(order =>
          order._id === orderId
            ? { ...order, status: "canceled" }
            : order
        )
      );
    } catch (err) {
      console.error("Cancel order error:", err);
      alert("ยกเลิกคำสั่งซื้อไม่สำเร็จ กรุณาลองใหม่");
    } finally {
      setCancelingId(null);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.serviceType?.toLowerCase().includes(searchTerm.toLowerCase());

    const s = normStatus(order.status || "pending");
    const matchesStatus =
      statusFilter === "ทั้งหมด" || s === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: orders.length,
    pending: orders.filter(o => normStatus(o.status || "pending") === "pending").length,
    completed: orders.filter(o => normStatus(o.status) === "completed").length,
    totalSpent: orders
      .filter(o => normStatus(o.status) === "completed")
      .reduce((sum, o) => sum + (o.totalPrice || 0), 0)
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
            {/* คงค่า 'ทั้งหมด' ไว้ตามเดิม */}
            <option value="ทั้งหมด">ทุกสถานะ</option>
            <option value="pending">รอรับผ้า</option>
            <option value="completed">เสร็จสิ้น</option>
            <option value="canceled">ยกเลิก</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const s = normStatus(order.status || "pending");
          return (
            <Card key={order._id} className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getStatusIcon(s)}</span>
                    <div>
                      <h3 className="font-semibold">{order.orderNumber}</h3>
                      <p className="text-sm text-muted-foreground">
                        สั่งเมื่อ: {new Date(order.createdAt).toLocaleDateString("th-TH")}
                      </p>
                    </div>
                    <Badge className={getStatusColor(s)}>
                      {toThaiStatus(s)}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">บริการ</p>
                      <p className="font-medium">{order.serviceType}</p>
                      <p className="text-sm text-muted-foreground">
                        ยอดเงิน: ฿{order.totalPrice?.toLocaleString()}
                      </p>
                    </div>
                    <div> 
                      <p className="text-sm">
                        รับผ้า:{" "}
                        {order.pickupDetails?.date
                          ? new Date(order.pickupDetails.date).toLocaleDateString("th-TH")
                          : "ยังไม่กำหนด"}{" "}
                        ({order.pickupDetails?.time || "ยังไม่กำหนด"})
                      </p>

                      <p className="text-sm">
                        ส่งคืน:{" "}
                        {order.pickupDetails?.date
                          ? new Date(
                              new Date(order.pickupDetails.date).setDate(
                                new Date(order.pickupDetails.date).getDate() + 2
                              )
                            ).toLocaleDateString("th-TH")
                          : "ยังไม่กำหนด"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">รายการ</p>
                    <p className="text-sm">
                      {order.itemDetails?.map(i => `${i.name} x${i.quantity}`).join(", ")}
                    </p>
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

                  {!order.isDeleted && s === "pending" && (
                    <Button
                      variant="destructive"
                      size="sm"
                      className="w-full"
                      onClick={() => cancelOrder(order._id)}
                      disabled={cancelingId === order._id}
                    >
                      {cancelingId === order._id ? "กำลังยกเลิก..." : "ยกเลิกคำสั่งซื้อ"}
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
          );
        })}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">📦</div>
          <h3 className="text-lg font-semibold mb-2">ไม่พบคำสั่งซื้อ</h3>
          <p className="text-muted-foreground mb-4">
            ลองเปลี่ยนเงื่อนไขการค้นหาหรือตัวกรอง
          </p>
          <Button asChild>
            <Link to="/booking">จองบริการใหม่</Link>
          </Button>
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
                    <h4 className="font-semibold text-lg">{selectedOrder.orderNumber}</h4>
                    <Badge className={getStatusColor(selectedOrder.status)}>
                      {toThaiStatus(selectedOrder.status)}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium mb-2">ข้อมูลคำสั่งซื้อ</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">บริการ:</span>
                        <span>{selectedOrder.serviceType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">ยอดเงิน:</span>
                        <span>฿{(selectedOrder.totalPrice || 0).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">วันที่สั่ง:</span>
                        <span>{new Date(selectedOrder.createdAt).toLocaleDateString("th-TH")}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium mb-2">กำหนดการ</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">วันรับผ้า:</span>
                        <span>
                          {selectedOrder.pickupDetails?.date
                            ? new Date(selectedOrder.pickupDetails.date).toLocaleDateString("th-TH")
                            : "ยังไม่กำหนด"}{" "}
                          ({selectedOrder.pickupDetails?.time || "ยังไม่กำหนด"})
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">วันส่งคืน:</span>
                        <span>
                          {selectedOrder.pickupDetails?.date
                            ? new Date(
                                new Date(selectedOrder.pickupDetails.date).setDate(
                                  new Date(selectedOrder.pickupDetails.date).getDate() + 2
                                )
                              ).toLocaleDateString("th-TH")
                            : "ยังไม่กำหนด"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium mb-2">รายการเสื้อผ้า</h5>
                  <ul className="space-y-1 text-sm">
                    {(selectedOrder.itemDetails || []).map((it, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        {it.name} x{it.quantity}
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
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

export default MyOrders