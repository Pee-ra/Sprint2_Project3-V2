import React from 'react';
import { Button } from './button.jsx';
import { ImageWithFallback } from "./ImageWithFallback.jsx";
import { dashboardServiceCards } from '../../data/services.js';


import { Link } from "react-router-dom";

const ServiceCard = ({ user, onNavigateToBooking, onNavigateToTracking }) => {
  return (
    <div className="space-y-6">
        {/* <h2 className="text-2xl font-semibold text-gray-900 flex justify-center"><i class="ri-service-line mr-2"></i>บริการของเรา</h2> */}
        <div className="flex items-center justify-center gap-2 my-8">
          <div className="h-0.5 w-12 bg-gray-300 rounded"></div>
          <h2 className="flex items-center gap-2 text-2xl sm:text-3xl font-semibold text-gray-800">
            <i className="ri-service-line"></i>
            บริการของเรา
          </h2>
          <div className="h-0.5 w-12 bg-gray-300 rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dashboardServiceCards.map((service, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all group"
            >
              <div className="aspect-video rounded-lg overflow-hidden mb-4 group-hover:scale-105 transition-transform">
                <ImageWithFallback
                  src={
                    service.image ||
                    "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=400&h=250&fit=crop"
                  }
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
              <Link to= "/booking">
                <Button className="w-full bg-teal-500 font-semibold" onClick={onNavigateToBooking}>
                  {index === 0
                    ? "เลือกแพ็กเกจ"
                    : index === 1
                    ? "จองบริการ"
                    : "เลือกรายการ"}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
  )
}

export default ServiceCard