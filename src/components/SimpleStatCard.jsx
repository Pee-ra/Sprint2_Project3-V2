import { Card } from './ui/card';

export function SimpleStatCard({ title, value, color = "text-primary" }) {
  return (
    <Card className="p-4">
      <div className="text-center">
        <div className={`text-2xl font-bold ${color} mb-1`}>
          {typeof value === 'number' && title.includes('฿') 
            ? `฿${value.toLocaleString()}` 
            : value}
        </div>
        <div className="text-sm text-muted-foreground">{title}</div>
      </div>
    </Card>
  );
}