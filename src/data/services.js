export const monthlyPackages = [
  {
    name: "แพ็กเกจเล็ก",
    price: 299,
    items: "15 ชิ้น/เดือน",
    description: "เหมาะสำหรับคนเดียว",
    features: [
      "รับ-ส่งฟรี",
      "บริการซักและพับ",
      "ใช้เวลา 24-48 ชั่วโมง",
      "กำจัดคราบพื้นฐาน",
    ],
  },
  {
    name: "แพ็กเกจกลาง",
    price: 499,
    items: "25 ชิ้น/เดือน",
    description: "เหมาะสำหรับคู่รัก",
    features: [
      "รับ-ส่งฟรี",
      "บริการซักและพับ",
      "ใช้เวลา 24-48 ชั่วโมง",
      "กำจัดคราบขั้นสูง",
      "ใส่ปรับผ้านุ่ม",
    ],
    popular: true,
  },
  {
    name: "แพ็กเกจใหญ่",
    price: 799,
    items: "40 ชิ้น/เดือน",
    description: "เหมาะสำหรับครอบครัว",
    features: [
      "รับ-ส่งฟรี",
      "บริการซักและพับ",
      "ใช้เวลา 24-48 ชั่วโมง",
      "กำจัดคราบพรีเมียม",
      "ใส่ปรับผ้านุ่ม",
      "บริการด่วนพิเศษ",
    ],
  },
];

export const perKgRates = [
  { kg: 5, price: 200 },
  { kg: 8, price: 300 },
  { kg: 12, price: 400 },
];

export const perPieceItems = [
    { name: "เสื้อสูท", price: 80, category: "เสื้อผ้าพิเศษ" },
    { name: "สูทชุด", price: 120, category: "เสื้อผ้าพิเศษ" },
    { name: "ผ้าปูที่นอน", price: 40, category: "ผ้าบ้าน" },
    { name: "ปลอกหมอน", price: 15, category: "ผ้าบ้าน" },
    { name: "ผ้าม่าน", price: 60, category: "ผ้าบ้าน" },
    { name: "ผ้าห่ม", price: 200, category: "ผ้าบ้าน" },
    { name: "เสื้อยืด", price: 20, category: "เสื้อผ้าทั่วไป" },
    { name: "กางเกงยีนส์", price: 35, category: "เสื้อผ้าทั่วไป" },
    { name: "กางเกงขายาว", price: 30, category: "เสื้อผ้าทั่วไป" },
    { name: "ชุดเดรส", price: 45, category: "เสื้อผ้าพิเศษ" },
];

export const dashboardServiceCards = [
  // {
  //   title: "แพ็กเกจรายเดือน",
  //   description: "สมัครแพ็กเกจรายเดือนที่คุ้มค่าสำหรับบริการประจำ",
  //   image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=250&fit=crop",
  //   alt: "เสื้อผ้าที่พับเรียบร้อย",
  //   pricing: [
  //     { label: "แพ็กเกจเล็ก", price: "฿299/เดือน" },
  //     { label: "แพ็กเกจกลาง", price: "฿499/เดือน" },
  //     { label: "แพ็กเกจใหญ่", price: "฿799/เดือน" },
  //   ]
  // },
  {
    title: "บริการคิดตามน้ำหนัก",
    description: "ราคายืดหยุ่นตามน้ำหนักของเสื้อผ้าที่ต้องการซัก",
    image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=400&h=250&fit=crop",
    alt: "ตะกร้าซักผ้า",
    pricing: [
      { label: "5 กิโลกรัม", price: "฿200" },
      { label: "8 กิโลกรัม", price: "฿300" },
      { label: "12 กิโลกรัม", price: "฿400" },
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

export const mockTrackingData = {
  "ORD-2024-001": {
    id: "ORD-2024-001",
    service: "แพ็กเกจกลาง",
    status: "เสร็จสิ้น",
    customerName: "สมชาย ใจดี",
    pickupDate: "2024-01-15",
    deliveryDate: "2024-01-17",
    timeline: [
      {
        status: "คำสั่งซื้อยืนยันแล้ว",
        date: "2024-01-14",
        time: "14:30",
        completed: true,
        description: "ได้รับคำสั่งซื้อและยืนยันรายละเอียดแล้ว"
      },
      {
        status: "กำลังไปรับผ้า",
        date: "2024-01-15",
        time: "09:15",
        completed: true,
        description: "ทีมงานออกไปรับผ้าจากที่อยู่ของคุณ"
      },
      {
        status: "ได้รับผ้าแล้ว",
        date: "2024-01-15",
        time: "10:30",
        completed: true,
        description: "ได้รับผ้าเรียบร้อยและนำส่งโรงซัก"
      },
      {
        status: "กำลังซัก",
        date: "2024-01-15",
        time: "11:00",
        completed: true,
        description: "เริ่มกระบวนการซักตามมาตรฐาน"
      },
      {
        status: "การซักเสร็จสิ้น",
        date: "2024-01-16",
        time: "16:45",
        completed: true,
        description: "ซักและพับเสร็จเรียบร้อยแล้ว"
      },
      {
        status: "กำลังจัดส่ง",
        date: "2024-01-17",
        time: "08:30",
        completed: true,
        description: "ออกจัดส่งผ้าที่ซักเสร็จแล้ว"
      },
      {
        status: "จัดส่งเรียบร้อย",
        date: "2024-01-17",
        time: "10:15",
        completed: true,
        description: "ส่งผ้าถึงที่อยู่เรียบร้อยแล้ว"
      }
    ]
  },
  "ORD-2024-002": {
    id: "ORD-2024-002",
    service: "คิดตามชิ้น",
    status: "กำลังซัก",
    customerName: "สมศรี รักษ์ดี",
    pickupDate: "2024-01-16",
    deliveryDate: "2024-01-18",
    timeline: [
      {
        status: "คำสั่งซื้อยืนยันแล้ว",
        date: "2024-01-15",
        time: "16:20",
        completed: true,
        description: "ได้รับคำสั่งซื้อและยืนยันรายละเอียดแล้ว"
      },
      {
        status: "กำลังไปรับผ้า",
        date: "2024-01-16",
        time: "09:00",
        completed: true,
        description: "ทีมงานออกไปรับผ้าจากที่อยู่ของคุณ"
      },
      {
        status: "ได้รับผ้าแล้ว",
        date: "2024-01-16",
        time: "11:45",
        completed: true,
        description: "ได้รับผ้าเรียบร้อยและนำส่งโรงซัก"
      },
      {
        status: "กำลังซัก",
        date: "2024-01-16",
        time: "14:30",
        completed: true,
        description: "เริ่มกระบวนการซักตามมาตรฐาน (กำลังดำเนินการ)"
      },
      {
        status: "การซักเสร็จสิ้น",
        date: "2024-01-17",
        time: "18:00",
        completed: false,
        description: "คาดว่าจะซักเสร็จในวันนี้"
      },
      {
        status: "กำลังจัดส่ง",
        date: "2024-01-18",
        time: "09:00",
        completed: false,
        description: "จะออกจัดส่งในวันถัดไป"
      },
      {
        status: "จัดส่งเรียบร้อย",
        date: "2024-01-18",
        time: "11:00",
        completed: false,
        description: "คาดว่าจะส่งถึงคุณภายในเวลานี้"
      }
    ]
  },
  "ORD-2024-003": {
    id: "ORD-2024-003",
    service: "บริการตามน้ำหนัก",
    status: "รอรับผ้า",
    customerName: "สมหมาย ขยันดี",
    pickupDate: "2024-01-22",
    deliveryDate: "2024-01-24",
    timeline: [
      {
        status: "คำสั่งซื้อยืนยันแล้ว",
        date: "2024-01-20",
        time: "13:45",
        completed: true,
        description: "ได้รับคำสั่งซื้อและยืนยันรายละเอียดแล้ว"
      },
      {
        status: "กำลังไปรับผ้า",
        date: "2024-01-22",
        time: "09:00",
        completed: false,
        description: "ทีมงานจะออกไปรับผ้าในวันนี้"
      },
      {
        status: "ได้รับผ้าแล้ว",
        date: "2024-01-22",
        time: "12:00",
        completed: false,
        description: "จะได้รับผ้าและนำส่งโรงซัก"
      },
      {
        status: "กำลังซัก",
        date: "2024-01-22",
        time: "14:00",
        completed: false,
        description: "จะเริ่มกระบวนการซัก"
      },
      {
        status: "การซักเสร็จสิ้น",
        date: "2024-01-23",
        time: "16:00",
        completed: false,
        description: "คาดว่าจะซักเสร็จในวันนี้"
      },
      {
        status: "กำลังจัดส่ง",
        date: "2024-01-24",
        time: "09:00",
        completed: false,
        description: "จะออกจัดส่งในวันถัดไป"
      },
      {
        status: "จัดส่งเรียบร้อย",
        date: "2024-01-24",
        time: "11:00",
        completed: false,  
        description: "คาดว่าจะส่งถึงคุณภายในเวลานี้"
      }
    ]
  }
};

export const statusMapping = {
  colors: {
    "รอรับผ้า": "bg-yellow-100 text-yellow-800",
    "กำลังซัก": "bg-blue-100 text-blue-800", 
    "เสร็จสิ้น": "bg-green-100 text-green-800",
    "ยกเลิก": "bg-red-100 text-red-800"
  },
  icons: {
    "รอรับผ้า": "📦",
    "กำลังซัก": "🔄",
    "เสร็จสิ้น": "✅", 
    "ยกเลิก": "❌"
  }
};

export const trackingSteps = {
  prepare: {
    title: "เตรียมผ้าให้พร้อม",
    color: "bg-blue-50",
    textColor: "text-blue-900",
    titleColor: "text-blue-900",
    items: [
      "จัดเก็บผ้าในถุงหรือตะกร้า",
      "แยกผ้าที่มีคราบพิเศษ", 
      "เตรียมรายการผ้าที่ต้องการการดูแลพิเศษ"
    ]
  },
  washing: {
    title: "กำลังดำเนินการ",
    color: "bg-yellow-50",
    textColor: "text-yellow-800",
    titleColor: "text-yellow-900",
    description: "ผ้าของคุณอยู่ในขั้นตอนการซัก คาดว่าจะเสร็จสิ้นตามกำหนดเวลา"
  },
  completed: {
    title: "เสร็จสิ้นแล้ว! 🎉",
    color: "bg-green-50",
    textColor: "text-green-800",
    titleColor: "text-green-900",
    description: "ขอบคุณที่ใช้บริการ CleanEase หากมีข้อสงสัยหรือต้องการบริการเพิ่มเติม สามารถติดต่อเราได้ตลอดเวลา"
  }
};

export const companyFeatures = [
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

export const sampleTrackingIds = Object.keys(mockTrackingData);

export const getStatusColor = (status) => {
  return statusMapping.colors[status] || "bg-gray-100 text-gray-800";
};

export const getStatusIcon = (status) => {
  return statusMapping.icons[status] || "📋";
};