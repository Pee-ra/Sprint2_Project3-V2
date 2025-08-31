import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

export function StatCard({ stat, IconComponent }) {
  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
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
              {stat.change && (
                <Badge variant="secondary" className={`text-xs ${stat.color} bg-transparent`}>
                  {stat.change}
                </Badge>
              )}
            </div>
          </div>
          {IconComponent && (
            <div className={`p-3 rounded-xl ${stat.bgColor}`}>
              <IconComponent className={`h-6 w-6 ${stat.color}`} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}