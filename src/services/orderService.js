import api from "./api.js"; // axios instance ที่ตั้ง baseURL + withCredentials ไว้แล้ว

export async function fetchMyOrders() {
  const { data } = await api.get("/orders/my");
  return data.data; // คืนเฉพาะ array ของ orders
}
