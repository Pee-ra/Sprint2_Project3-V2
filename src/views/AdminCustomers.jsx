import { useEffect, useState } from "react";
import { Button } from "../components/ui/button.jsx";
import { Card } from "../components/ui/card.jsx";
import { Badge } from "../components/ui/badge.jsx";

import { SearchAndFilter } from "../components/SearchAndFilter.jsx";
import { SimpleStatCard } from "../components/SimpleStatCard.jsx";
import { EmptyState } from "../components/EmptyState.jsx";
import { CustomerModal } from "../components/CustomerModal.jsx";
import { 
  customersData as initialCustomers,
  customerStatusConfig,
  getCustomerStatusColor,
  getCustomerStatusLabel,
  calculateCustomerStats,
  filterCustomers
} from "../data/admindata.js";
import axios from "axios";
// import { fi } from "date-fns/locale/fi";
// import { useAuth } from "../context/AuthContext";

export function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ทั้งหมด");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editingId, setEditingId] = useState(null);   // _id ของ user ที่กำลังแก้
  const [tempRole, setTempRole] = useState("customer"); // role ชั่วคราว
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_API_URL||'http://localhost:5001/adminPage/users', { withCredentials: true });
        const users = res.data.users;

        const mapUsers = users.map((user) => ({
          _id: user._id,
          name: user.fullName,
          email: user.email,
          tel: user.tel,
          roomNumber: user.roomNumber,
          role: user.role,
          createdOn: user.createdOn,
          status: user.status,
        }));
        setCustomers(mapUsers);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const startEdit = (customer) => {
  setEditingId(customer._id);
  setTempRole(customer.role || "customer");
};

const cancelEdit = () => {
  setEditingId(null);
};

const saveEdit = async () => {
  if (!editingId) return;
  setSaving(true);

  const userId = editingId;
  const prevRole = customers.find(c => c._id === userId)?.role;

  // optimistic: เปลี่ยนใน state ก่อน
  setCustomers(cs => cs.map(c => c._id === userId ? { ...c, role: tempRole } : c));

  try {
    await axios.put(
      `${import.meta.env.VITE_API_URL || "http://localhost:5001"}/adminPage/users/${userId}`,
      { role: tempRole },
      { withCredentials: true } // ถ้าใช้ cookie-auth
    );
    setEditingId(null);
  } catch (err) {
    // rollback ถ้าพลาด
    setCustomers(cs => cs.map(c => c._id === userId ? { ...c, role: prevRole } : c));
    alert(err.response?.data?.message || "อัปเดต role ไม่สำเร็จ");
  } finally {
    setSaving(false);
  }
};



  const updateCustomerStatus = (customerId, newStatus) => {
    setCustomers(customers.map(customer =>
      customer._id === customerId ? { ...customer, status: newStatus } : customer
    ));
  };

  const filteredCustomers = filterCustomers(customers, searchTerm, statusFilter);
  const stats = calculateCustomerStats(customers);


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
      <SearchAndFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        searchPlaceholder="ค้นหาด้วยชื่อ อีเมล หรือเบอร์โทร..."
        statusOptions={customerStatusConfig.options}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <SimpleStatCard 
          title="ลูกค้าทั้งหมด" 
          value={stats.total} 
          color="text-primary" 
        />
        <SimpleStatCard 
          title="ลูกค้าใหม่" 
          value={stats.new} 
          color="text-gray-300" 
        />
        <SimpleStatCard 
          title="ลูกค้าปกติ" 
          value={stats.active} 
          color="text-gray-300" 
        />
        <SimpleStatCard 
          title="ลูกค้า VIP" 
          value={stats.vip} 
          color="text-gray-300" 
        />
        <SimpleStatCard 
          title="รายได้รวม" 
          value={stats.totalRevenue} 
          color="text-orange-600" 
        />
      </div>

      {/* Customers List */}
      <div className="space-y-4">
        {filteredCustomers.map((customer) => (
          <Card key={customer._id} className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold">{customer.fullName}</h3>
                  {/* <Badge className={getCustomerStatusColor(customer.status)}>
                    {getCustomerStatusLabel(customer.status)}
                  </Badge> */}
                  {/* {customer.subscription !== "ไม่มี" && (
                    <Badge variant="outline">
                      {customer.subscription}
                    </Badge>
                  )} */}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">ข้อมูลติดต่อ</p>
                    <p className="text-sm">{customer.email}</p>
                    <p className="text-sm">{customer.tel}</p>
                  </div>
                  <div>
                    {/* <p className="text-sm text-muted-foreground">สถิติการใช้งาน</p>
                    <p className="text-sm">คำสั่งซื้อ: {customer.totalOrders} ครั้ง</p>
                    <p className="text-sm">ใช้จ่าย: ฿{customer.totalSpent.toLocaleString()}</p> */}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">วันที่สมัครสมาชิก:</p>
                    <p className="text-sm"> {customer.createdOn
                      ? new Date(customer.createdOn).toLocaleDateString("th-TH", { year:"numeric", month:"short", day:"numeric" })
                      : "-"}</p>
                    {/* <p className="text-sm">สั่งซื้อล่าสุด: {customer.lastOrder}</p> */}
                    
                    <p className="text-sm text-muted-foreground">สถานะปัจจุบัน</p>
                      {editingId === customer._id ? (
                        <div className="space-y-2">
                          <select
                            value={tempRole}
                            onChange={(e) => setTempRole(e.target.value)}
                            className="px-3 py-2 border border-border rounded-lg bg-input-background text-sm"
                          >
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                          </select>

                          <div className="flex gap-2">
                            <Button size="sm" onClick={saveEdit} disabled={saving}>
                              {saving ? "กำลังบันทึก..." : "บันทึก"}
                            </Button>
                            <Button size="sm" variant="outline" onClick={cancelEdit} disabled={saving}>
                              ยกเลิก
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm">{customer.role}</p>
                      )}

                  </div>
                  
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">ที่อยู่</p>
                  <p className="text-sm">{customer.roomNumber}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 lg:min-w-[200px]">
                <select
                  value={customer.status}
                  onChange={(e) => updateCustomerStatus(customer._id, e.target.value)}
                  className="px-3 py-2 border border-border rounded-lg bg-input-background text-sm"
                >
                  {customerStatusConfig.options.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => startEdit(customer)}
                >
                  {editingId === customer._id ? "กำลังแก้ไข..." : "แก้ไขสถานะ"}
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
        <EmptyState
          icon="👥"
          title="ไม่พบลูกค้า"
          description="ลองเปลี่ยนเงื่อนไขการค้นหาหรือตัวกรอง"
        />
      )}

      {/* Customer Detail Modal */}
      <CustomerModal 
        customer={selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
      />
    </div>
  );
}