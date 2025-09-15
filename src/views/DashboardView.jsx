import { Button } from "../components/ui/button.jsx";
import { ImageWithFallback } from "../components/ui/ImageWithFallback.jsx";
import { companyFeatures } from "../data/services.js";
import { Link } from "react-router-dom";
import ServiceCard from "../components/ui/ServiceCard.jsx";
import Lottie from "lottie-react";
import fish from "../components/lottie/fish.json";
import { useAuth } from "../context/AuthContext";

export function DashboardView({ onNavigateToBooking, onNavigateToTracking }) {
  const { user } = useAuth();
  return (
    <div className="space-y-8 justify-center">
      {/* Welcome Hero */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-2xl p-8">
        <Lottie
          animationData={fish}
          className="absolute top-0 right-0 rotate-90"
          style={{ width: "237px", height: "200px" }}
        />

        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-foreground mb-4 ">
            ยินดีต้อนรับกลับมา, คุณ{user?.fullName} 👋
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            เป็นพาร์ทเนอร์บริการซักรีดที่คุณไว้วางใจ -
            ทำให้การดูแลเสื้อผ้าง่ายขึ้น
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/booking">
              <Button size="lg" className="h-12 px-6">
                จองบริการใหม่
              </Button>
            </Link>
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
      <ServiceCard />

      {/* Features Section */}
      <div className="bg-gradient-to-br from-muted/50 to-muted/30 rounded-2xl p-8">
        <h3 className="text-2xl font-semibold mb-6 text-center text-gray-900">
          ทำไมต้องเลือก "Whale Wash"?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {companyFeatures.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-3"
            >
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground">{feature.icon}</span>
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
