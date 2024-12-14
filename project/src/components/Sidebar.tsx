import React from 'react';
import { Users, ClipboardList, Calendar, Bell, Settings, User } from 'lucide-react';
import { Link } from './Link';

export function Sidebar() {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold text-blue-600 flex items-center gap-2">
          <Users className="h-6 w-6" />
          InternHub
        </h1>
      </div>
      
      <nav className="flex-1 px-4">
        <div className="space-y-1">
          <Link href="/interns" active icon={<Users className="h-5 w-5" />}>
            Interns
          </Link>
          <Link href="/tasks" icon={<ClipboardList className="h-5 w-5" />}>
            Tasks
          </Link>
          <Link href="/schedule" icon={<Calendar className="h-5 w-5" />}>
            Schedule
          </Link>
          <Link href="/notifications" icon={<Bell className="h-5 w-5" />}>
            Notifications
          </Link>
          <Link href="/settings" icon={<Settings className="h-5 w-5" />}>
            Settings
          </Link>
        </div>
      </nav>

      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
            <User className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}