import { Settings } from 'lucide-react';
import { Badge } from '../components/ui/badge';

export default function LogoSection({ isAdmin }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
        isAdmin ? 'bg-gradient-to-br from-orange-500 to-red-600' : 'bg-primary'
      }`}>
        {isAdmin ? (
          <Settings className="h-4 w-4 text-white" />
        ) : (
          <span className="text-primary-foreground font-bold text-sm">CE</span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-bold text-foreground">CleanEase</h1>
        {isAdmin && (
          <Badge variant="secondary" className="text-xs px-2 py-0 bg-orange-100 text-orange-700">
            Admin
          </Badge>
        )}
      </div>
    </div>
  );
}