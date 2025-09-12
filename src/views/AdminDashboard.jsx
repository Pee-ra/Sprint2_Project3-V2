import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { ImageWithFallback } from '../components/ui/ImageWithFallback';
import { 
  Package, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Star,
  Calendar,
  BarChart3
} from 'lucide-react';

export function AdminDashboard() {
  const stats = [
    {
      title: 'รายได้เดือนนี้',
      value: '฿125,450',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'คำสั่งซื้อเดือนนี้',
      value: '342',
      change: '+8.2%',
      trend: 'up',
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'ลูกค้าใหม่',
      value: '156',
      change: '+15.3%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'ความพึงพอใจ',
      value: '96%',
      change: '+2.1%',
      trend: 'up',
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    }
  ];

  const recentOrders = [
    {
      id: 'ORD-001',
      customer: 'คุณสมชาย ใจดี',
      room: 'A-301',
      service: 'แพ็กเกจกลาง',
      amount: '฿499',
      status: 'กำลังซัก',
      time: '2 ชั่วโมงที่แล้ว'
    },
    {
      id: 'ORD-002',
      customer: 'คุณสมหญิง ใจงาม',
      room: 'B-205',
      service: 'คิดตามชิ้น',
      amount: '฿380',
      status: 'รับผ้าแล้ว',
      time: '4 ชั่วโมงที่แล้ว'
    },
    {
      id: 'ORD-003',
      customer: 'คุณวิทยา เก่งมาก',
      room: 'C-102',
      service: 'แพ็กเกจใหญ่',
      amount: '฿799',
      status: 'จัดส่งแล้ว',
      time: '6 ชั่วโมงที่แล้ว'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'รับผ้าแล้ว':
        return 'bg-blue-100 text-blue-700';
      case 'กำลังซัก':
        return 'bg-yellow-100 text-yellow-700';
      case 'จัดส่งแล้ว':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">แดชบอร์ดแอดมิน</h1>
        <p className="text-muted-foreground mt-2">
          ภาพรวมการดำเนินงานและตัวชี้วัดสำคัญของ Whale Wash
        </p>
      </div>

      {/* Stats Grid */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <Badge variant="secondary" className={`text-xs ${stat.color} bg-transparent`}>
                      {stat.change}
                    </Badge>
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div> */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                คำสั่งซื้อล่าสุด
              </CardTitle>
              <CardDescription>
                คำสั่งซื้อที่เข้ามาใหม่ล่าสุด
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {order.customer.split(' ')[1]?.[0] || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900">{order.customer}</p>
                        <Badge variant="outline" className="text-xs">
                          {order.room}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{order.service}</span>
                        <span>•</span>
                        <span>{order.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{order.amount}</p>
                    <Badge className={`text-xs ${getStatusColor(order.status)}`}>
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                ดูคำสั่งซื้อทั้งหมด
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Summary */}
        <div className="space-y-6">
          {/* Today's Summary */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                สรุปวันนี้
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">คำสั่งซื้อใหม่</span>
                  <span className="font-semibold">23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">รับผ้าแล้ว</span>
                  <span className="font-semibold">18</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">กำลังซัก</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">จัดส่งแล้ว</span>
                  <span className="font-semibold">34</span>
                </div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-medium">รายได้วันนี้</span>
                  <span className="font-bold text-primary">฿4,680</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Performance */}
          {/* <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                ประสิทธิภาพบริการ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>แพ็กเกจรายเดือน</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>คิดตามน้ำหนัก</span>
                    <span>60%</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>คิดตามชิ้น</span>
                    <span>45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </div>
  );
}