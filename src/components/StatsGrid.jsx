import { StatCard } from './StatCard';
import { 
  DollarSign, 
  Package, 
  Users, 
  Star 
} from 'lucide-react';

export function StatsGrid({ stats }) {
  const iconMap = {
    'รายได้เดือนนี้': DollarSign,
    'คำสั่งซื้อเดือนนี้': Package,
    'ลูกค้าใหม่': Users,
    'ความพึงพอใจ': Star
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard 
          key={index} 
          stat={stat} 
          IconComponent={iconMap[stat.title]}
        />
      ))}
    </div>
  );
}