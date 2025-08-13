import { Button } from "../components/ui/button.jsx";
import { ImageWithFallback } from "../components/ui/ImageWithFallback.jsx";


const dashboardServiceCards = [
  {
    title: "แพ็กเกจรายเดือน",
    description: "สมัครแพ็กเกจรายเดือนที่คุ้มค่าสำหรับบริการประจำ",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=250&fit=crop",
    alt: "เสื้อผ้าที่พับเรียบร้อย",
    pricing: [
      { label: "แพ็กเกจเล็ก", price: "฿299/เดือน" },
      { label: "แพ็กเกจกลาง", price: "฿499/เดือน" },
      { label: "แพ็กเกจใหญ่", price: "฿799/เดือน" },
    ]
  },
  {
    title: "บริการคิดตามน้ำหนัก",
    description: "ราคายืดหยุ่นตามน้ำหนักของเสื้อผ้าที่ต้องการซัก",
    image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=400&h=250&fit=crop",
    alt: "ตะกร้าซักผ้า",
    pricing: [
      { label: "1 กิโลกรัม", price: "฿80" },
      { label: "2 กิโลกรัม", price: "฿150" },
      { label: "3 กิโลกรัม", price: "฿210" },
    ]
  },
  {
    title: "บริการคิดตามชิ้น",
    description: "ราคาแยกตามประเภทเสื้อผ้าแต่ละชิ้นพร้อมการดูแลพิเศษ",
    pricing: [
      { label: "เสื้อเชิ้ต", price: "฿25" },
      { label: "กางเกงยีนส์", price: "฿35" },
      { label: "สูท", price: "฿120" },
    ]
  }
];

const companyFeatures = [
  {
    icon: "✓",
    title: "รับ-ส่งฟรี",
    description: "บริการถึงบ้านที่สะดวกโดยไม่คิดค่าใช้จ่ายเพิ่มเติม"
  },
  {
    icon: "🌿",
    title: "เป็นมิตรกับสิ่งแวดล้อม",
    description: "ใช้ผลิตภัณฑ์ทำความสะอาดที่ปลอดภัยต่อสิ่งแวดล้อม"
  },
  {
    icon: "⚡",
    title: "ทำงานเร็ว",
    description: "รับประกันการส่งมอบภายใน 24-48 ชั่วโมง"
  },
  {
    icon: "⭐",
    title: "การดูแลระดับมืออาชีพ",
    description: "ผู้เชี่ยวชาญด้านการขจัดคราบและดูแลผ้า"
  }
];


export function DashboardView({ user, onNavigateToBooking, onNavigateToTracking }) {
  return (
    <div className="space-y-8">
      {/* Welcome Hero */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-2xl p-8">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            ยินดีต้อนรับกลับมา, คุณ{user?.name?.split(" ")[0]}!
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            เป็นพาร์ทเนอร์บริการซักรีดที่คุณไว้วางใจ -
            ทำให้การดูแลเสื้อผ้าง่ายขึ้น
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="h-12 px-6"
              onClick={onNavigateToBooking}
            >
              จองบริการใหม่
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-6"
              onClick={onNavigateToTracking}
            >
              ติดตามการรับผ้า
            </Button>
          </div>
        </div>
      </div>

      {/* Service Cards */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          บริการของเรา
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dashboardServiceCards.map((service, index) => (
            <div key={index} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all group">
              <div className="aspect-video rounded-lg overflow-hidden mb-4 group-hover:scale-105 transition-transform">
                <ImageWithFallback
                  src={service.image || "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=400&h=250&fit=crop"}
                  alt={service.alt || "เสื้อผ้าแบบทางการ"}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-4">
                {service.description}
              </p>
              <div className="space-y-2 mb-4">
                {service.pricing.map((price, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span>{price.label}:</span>
                    <span className="font-semibold">{price.price}</span>
                  </div>
                ))}
              </div>
              <Button
                className="w-full"
                onClick={onNavigateToBooking}
              >
                {index === 0 ? "เลือกแพ็กเกจ" : index === 1 ? "จองบริการ" : "เลือกรายการ"}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-br from-muted/50 to-muted/30 rounded-2xl p-8">
        <h3 className="text-2xl font-semibold mb-6 text-center text-gray-900">
          ทำไมต้องเลือก CleanEase?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {companyFeatures.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground">
                  {feature.icon}
                </span>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-gray-900">
                  {feature.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

