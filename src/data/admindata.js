// Dashboard Statistics
export const dashboardStats = [
  {
    title: 'รายได้เดือนนี้',
    value: '฿125,450',
    change: '+12.5%',
    trend: 'up',
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    title: 'คำสั่งซื้อเดือนนี้',
    value: '342',
    change: '+8.2%',
    trend: 'up',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    title: 'ลูกค้าใหม่',
    value: '156',
    change: '+15.3%',
    trend: 'up',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  {
    title: 'ความพึงพอใจ',
    value: '96%',
    change: '+2.1%',
    trend: 'up',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100'
  }
];

// Recent Orders Data
export const recentOrdersData = [
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

// Today's Summary Data
export const todaySummary = {
  newOrders: 23,
  pickedUp: 18,
  washing: 12,
  delivered: 34,
  revenue: 4680
};

// Service Performance Data
export const servicePerformance = [
  { name: 'แพ็กเกจรายเดือน', value: 75 },
  { name: 'คิดตามน้ำหนัก', value: 60 },
  { name: 'คิดตามชิ้น', value: 45 }
];

// Orders Data
export const ordersData = [
  {
    id: "ORD-001",
    customerName: "สมชาย ใจดี",
    service: "แพ็กเกจกลาง",
    status: "กำลังดำเนินการ",
    pickupDate: "2024-01-15",
    deliveryDate: "2024-01-17",
    amount: 499,
    items: ["เสื้อเชิ้ต 3 ตัว", "กางเกง 2 ตัว"],
    phone: "081-234-5678",
    address: "123/45 หมู่บ้านสวนดอก กรุงเทพฯ 10250"
  },
  {
    id: "ORD-002",
    customerName: "สมศรี รักษ์ดี",
    service: "คิดตามชิ้น",
    status: "รอรับผ้า",
    pickupDate: "2024-01-16",
    deliveryDate: "2024-01-18",
    amount: 280,
    items: ["ชุดเดรส 2 ตัว", "เสื้อยืด 4 ตัว"],
    phone: "089-876-5432",
    address: "567/89 ซอยลาดพร้าว กรุงเทพฯ 10310"
  },
  {
    id: "ORD-003",
    customerName: "สมหมาย ขยันดี",
    service: "แพ็กเกจใหญ่",
    status: "เสร็จสิ้น",
    pickupDate: "2024-01-10",
    deliveryDate: "2024-01-12",
    amount: 799,
    items: ["เสื้อผ้าครอบครัว 35 ชิ้น"],
    phone: "092-111-2233",
    address: "789/123 ถนนสุขุมวิท กรุงเทพฯ 10110"
  }
];

// Customers Data
export const customersData = [
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
];

// Status Configurations
export const orderStatusConfig = {
  colors: {
    "รอรับผ้า": "bg-yellow-100 text-yellow-800",
    "กำลังดำเนินการ": "bg-blue-100 text-blue-800", 
    "เสร็จสิ้น": "bg-green-100 text-green-800",
    "ยกเลิก": "bg-red-100 text-red-800"
  },
  options: [
    { value: "รอรับผ้า", label: "รอรับผ้า" },
    { value: "กำลังดำเนินการ", label: "กำลังดำเนินการ" },
    { value: "เสร็จสิ้น", label: "เสร็จสิ้น" },
    { value: "ยกเลิก", label: "ยกเลิก" }
  ]
};

export const customerStatusConfig = {
  colors: {
    "new": "bg-blue-100 text-blue-800",
    "active": "bg-green-100 text-green-800",
    "vip": "bg-purple-100 text-purple-800",
    "inactive": "bg-gray-100 text-gray-800"
  },
  labels: {
    "new": "ลูกค้าใหม่", 
    "active": "ลูกค้าปกติ",
    "vip": "ลูกค้า VIP",
    "inactive": "ไม่ใช้งาน"
  },
  options: [
    { value: "new", label: "ลูกค้าใหม่" },
    { value: "active", label: "ลูกค้าปกติ" },
    { value: "vip", label: "ลูกค้า VIP" },
    { value: "inactive", label: "ไม่ใช้งาน" }
  ]
};

export const recentOrderStatusConfig = {
  colors: {
    'รับผ้าแล้ว': 'bg-blue-100 text-blue-700',
    'กำลังซัก': 'bg-yellow-100 text-yellow-700',
    'จัดส่งแล้ว': 'bg-green-100 text-green-700'
  }
};

// Helper Functions
export const getOrderStatusColor = (status) => {
  return orderStatusConfig.colors[status] || "bg-gray-100 text-gray-800";
};

export const getCustomerStatusColor = (status) => {
  return customerStatusConfig.colors[status] || "bg-gray-100 text-gray-800";
};

export const getCustomerStatusLabel = (status) => {
  return customerStatusConfig.labels[status] || status;
};

export const getRecentOrderStatusColor = (status) => {
  return recentOrderStatusConfig.colors[status] || 'bg-gray-100 text-gray-700';
};

// Statistics Calculators
export const calculateCustomerStats = (customers) => ({
  total: customers.length,
  new: customers.filter(c => c.status === "new").length,
  active: customers.filter(c => c.status === "active").length,
  vip: customers.filter(c => c.status === "vip").length,
  totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0)
});

export const calculateOrderStats = (orders) => ({
  total: orders.length,
  pending: orders.filter(o => o.status === "รอรับผ้า").length,
  processing: orders.filter(o => o.status === "กำลังดำเนินการ").length,
  completed: orders.filter(o => o.status === "เสร็จสิ้น").length
});

// Filter Functions
export const filterCustomers = (customers, searchTerm, statusFilter) => {
  return customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm);
    const matchesStatus = statusFilter === "ทั้งหมด" || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
};

export const filterOrders = (orders, searchTerm, statusFilter) => {
  return orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "ทั้งหมด" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
};