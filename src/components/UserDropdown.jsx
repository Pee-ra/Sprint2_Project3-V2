import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ChevronDown, LogOut, Settings, User } from 'lucide-react';

export default function UserDropdown({ user, isAdmin, onLogout, handleNavClick }) {
  const getInitials = (name) => name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 h-auto p-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-foreground">{user?.name || 'ผู้ใช้'}</p>
            <p className="text-xs text-muted-foreground">
              {isAdmin ? 'ผู้ดูแลระบบ' : `ห้อง ${user?.roomNumber || 'ไม่ระบุ'}`}
            </p>
          </div>
          <Avatar className="h-8 w-8">
            <AvatarFallback className={`font-semibold ${
              isAdmin
                ? 'bg-gradient-to-br from-orange-500 to-red-600 text-white'
                : 'bg-primary text-primary-foreground'
            }`}>
              {getInitials(user?.name || 'ผู้ใช้')}
            </AvatarFallback>
          </Avatar>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>บัญชีของฉัน</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2" onClick={() => handleNavClick('profile')}>
          <User className="h-4 w-4" />
          <span>โปรไฟล์</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          <span>การตั้งค่า</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center gap-2 text-destructive focus:text-destructive"
          onClick={onLogout}
        >
          <LogOut className="h-4 w-4" />
          <span>ออกจากระบบ</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}