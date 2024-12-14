import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  active?: boolean;
}

export function Link({ href, children, icon, active }: LinkProps) {
  const location = useLocation();
  const isActive = active || location.pathname === href;

  return (
    <RouterLink
      to={href}
      className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
        isActive
          ? 'bg-blue-50 text-blue-600'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {icon}
      {children}
    </RouterLink>
  );
}