import { useState } from "react";
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

export function AdminCustomers() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ทั้งหมด");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const updateCustomerStatus = (customerId, newStatus) => {
    setCustomers(customers.map(customer =>
      customer.id === customerId ? { ...customer, status: newStatus } : customer
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
          color="text-blue-600" 
        />
        <SimpleStatCard 
          title="ลูกค้าปกติ" 
          value={stats.active} 
          color="text-green-600" 
        />
        <SimpleStatCard 
          title="ลูกค้า VIP" 
          value={stats.vip} 
          color="text-purple-600" 
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
          <Card key={customer.id} className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold">{customer.name}</h3>
                  <Badge className={getCustomerStatusColor(customer.status)}>
                    {getCustomerStatusLabel(customer.status)}
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