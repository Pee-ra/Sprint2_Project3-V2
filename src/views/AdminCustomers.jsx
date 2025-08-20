import { useState } from "react";
import { Button } from "../components/ui/button.jsx";
import { Card } from "../components/ui/card.jsx";
import { Input } from "../components/ui/input.jsx";
import { Badge } from "../components/ui/badge.jsx";

export function AdminCustomers() {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "สมชาย ใจดี",
      email: "somchai@email.com",
      phone: "081-234-5678",
      address: "123/45 หมู่บ้านสวนดอก กรุงเทพฯ 10250",
      joinDate: "2024-01-10",
      totalOrders: 12,
      totalSpent: 5988,
      lastOrder: "2024-01-15",
      status: "active",
      subscription: "แพ็กเกจกลาง"
    },
    {
      id: 2,
      name: "สมศรี รักษ์ดี",
      email: "somsri@email.com",
      phone: "089-876-5432",
      address: "567/89 ซอยลาดพร้าว กรุงเทพฯ 10310",
      joinDate: "2024-01-05",
      totalOrders: 8,
      totalSpent: 2240,
      lastOrder: "2024-01-16",
      status: "active",
      subscription: "ไม่มี"
    },
    {
      id: 3,
      name: "สมหมาย ขยันดี",
      email: "sommai@email.com",
      phone: "092-111-2233",
      address: "789/123 ถนนสุขุมวิท กรุงเทพฯ 10110",
      joinDate: "2023-12-20",
      totalOrders: 25,
      totalSpent: 19975,
      lastOrder: "2024-01-12",
      status: "vip",
      subscription: "แพ็กเกจใหญ่"
    },
    {
      id: 4,
      name: "สมปอง สนุกดี",
      email: "sompong@email.com",
      phone: "088-555-7777",
      address: "456/78 ถนนวิทยุ กรุงเทพฯ 10330",
      joinDate: "2024-01-01",
      totalOrders: 3,
      totalSpent: 897,
      lastOrder: "2024-01-08",
      status: "new",
      subscription: "แพ็กเกจเล็ก"
    },
    {
      id: 5,
      name: "สมหญิง รื่นดี",
      email: "somying@email.com",
      phone: "087-999-1111",
      address: "321/654 ถนนเพชรบุรี กรุงเทพฯ 10400",
      joinDate: "2023-11-15",
      totalOrders: 0,
      totalSpent: 0,
      lastOrder: "ไม่เคย",
      status: "inactive",
      subscription: "ไม่มี"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ทั้งหมด");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "active":
        return "bg-green-100 text-green-800";
      case "vip":
        return "bg-purple-100 text-purple-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "new":
        return "ลูกค้าใหม่";
      case "active":
        return "ลูกค้าปกติ";
      case "vip":
        return "ลูกค้า VIP";
      case "inactive":
        return "ไม่ใช้งาน";
      default:
        return status;
    }
  };

  const updateCustomerStatus = (customerId, newStatus) => {
    setCustomers(customers.map(customer =>
      customer.id === customerId ? { ...customer, status: newStatus } : customer
    ));
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm);
    const matchesStatus = statusFilter === "ทั้งหมด" || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: customers.length,
    new: customers.filter(c => c.status === "new").length,
    active: customers.filter(c => c.status === "active").length,
    vip: customers.filter(c => c.status === "vip").length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">จัดการลูกค้า</h2>
        <p className="text-muted-foreground">
          ดูและจัดการข้อมูลลูกค้าทั้งหมดในระบบ
        </p>
      </div>

      {/* Filters */}
      {/* <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="ค้นหาด้วยชื่อ อีเมล หรือเบอร์โทร..."
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
            <option value="new">ลูกค้าใหม่</option>
            <option value="active">ลูกค้าปกติ</option>
            <option value="vip">ลูกค้า VIP</option>
            <option value="inactive">ไม่ใช้งาน</option>
          </select>
        </div>
      </div> */}

      {/* Stats Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {stats.total}
            </div>
            <div className="text-sm text-muted-foreground">ลูกค้าทั้งหมด</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {stats.new}
            </div>
            <div className="text-sm text-muted-foreground">ลูกค้าใหม่</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {stats.active}
            </div>
            <div className="text-sm text-muted-foreground">ลูกค้าปกติ</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {stats.vip}
            </div>
            <div className="text-sm text-muted-foreground">ลูกค้า VIP</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              ฿{stats.totalRevenue.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">รายได้รวม</div>
          </div>
        </Card>
      </div> */}

      {/* Customers List */}
      <div className="space-y-4">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id} className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold">{customer.name}</h3>
                  <Badge className={getStatusColor(customer.status)}>
                    {getStatusLabel(customer.status)}
                  </Badge>
                  {customer.subscription !== "ไม่มี" && (
                    <Badge variant="outline">
                      {customer.subscription}
                    </Badge>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">ข้อมูลติดต่อ</p>
                    <p className="text-sm">{customer.email}</p>
                    <p className="text-sm">{customer.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">สถิติการใช้งาน</p>
                    <p className="text-sm">คำสั่งซื้อ: {customer.totalOrders} ครั้ง</p>
                    <p className="text-sm">ใช้จ่าย: ฿{customer.totalSpent.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">วันที่</p>
                    <p className="text-sm">สมัครสมาชิก: {customer.joinDate}</p>
                    <p className="text-sm">สั่งซื้อล่าสุด: {customer.lastOrder}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">ที่อยู่</p>
                  <p className="text-sm">{customer.address}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 lg:min-w-[200px]">
                <select
                  value={customer.status}
                  onChange={(e) => updateCustomerStatus(customer.id, e.target.value)}
                  className="px-3 py-2 border border-border rounded-lg bg-input-background text-sm"
                >
                  <option value="new">ลูกค้าใหม่</option>
                  <option value="active">ลูกค้าปกติ</option>
                  <option value="vip">ลูกค้า VIP</option>
                  <option value="inactive">ไม่ใช้งาน</option>
                </select>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => setSelectedCustomer(customer)}
                >
                  ดูประวัติ
                </Button>
                
                <Button variant="outline" size="sm" className="w-full">
                  ติดต่อลูกค้า
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">👥</div>
          <h3 className="text-lg font-semibold mb-2">ไม่พบลูกค้า</h3>
          <p className="text-muted-foreground">
            ลองเปลี่ยนเงื่อนไขการค้นหาหรือตัวกรอง
          </p>
        </div>
      )}

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold">ประวัติลูกค้า</h3>
                <Button 
                  variant="outline"
                  onClick={() => setSelectedCustomer(null)}
                >
                  ปิด
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">ข้อมูลส่วนตัว</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">ชื่อ:</span>
                      <p>{selectedCustomer.name}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">อีเมล:</span>
                      <p>{selectedCustomer.email}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">เบอร์โทร:</span>
                      <p>{selectedCustomer.phone}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">สถานะ:</span>
                      <p>{getStatusLabel(selectedCustomer.status)}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">สถิติการใช้งาน</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">จำนวนคำสั่งซื้อ:</span>
                      <p>{selectedCustomer.totalOrders} ครั้ง</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">ยอดใช้จ่ายรวม:</span>
                      <p>฿{selectedCustomer.totalSpent.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">วันที่สมัครสมาชิก:</span>
                      <p>{selectedCustomer.joinDate}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">สั่งซื้อล่าสุด:</span>
                      <p>{selectedCustomer.lastOrder}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">ที่อยู่</h4>
                  <p className="text-sm">{selectedCustomer.address}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">แพ็กเกจปัจจุบัน</h4>
                  <p className="text-sm">{selectedCustomer.subscription}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}