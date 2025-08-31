import { Button } from './ui/button';
import { Card } from './ui/card';
import { getCustomerStatusLabel } from '..//data/admindata';

export function CustomerModal({ customer, onClose }) {
  if (!customer) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-semibold">ประวัติลูกค้า</h3>
            <Button variant="outline" onClick={onClose}>
              ปิด
            </Button>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">ข้อมูลส่วนตัว</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">ชื่อ:</span>
                  <p>{customer.name}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">อีเมล:</span>
                  <p>{customer.email}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">เบอร์โทร:</span>
                  <p>{customer.phone}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">สถานะ:</span>
                  <p>{getCustomerStatusLabel(customer.status)}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">สถิติการใช้งาน</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">จำนวนคำสั่งซื้อ:</span>
                  <p>{customer.totalOrders} ครั้ง</p>
                </div>
                <div>
                  <span className="text-muted-foreground">ยอดใช้จ่ายรวม:</span>
                  <p>฿{customer.totalSpent.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">วันที่สมัครสมาชิก:</span>
                  <p>{customer.joinDate}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">สั่งซื้อล่าสุด:</span>
                  <p>{customer.lastOrder}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">ที่อยู่</h4>
              <p className="text-sm">{customer.address}</p>
            </div>

            <div>
              <h4 className="font-medium mb-2">แพ็กเกจปัจจุบัน</h4>
              <p className="text-sm">{customer.subscription}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}