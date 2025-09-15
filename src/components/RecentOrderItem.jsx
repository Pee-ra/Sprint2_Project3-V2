import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';

export function RecentOrderItem({ order, getStatusColor }) {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
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
  );
}