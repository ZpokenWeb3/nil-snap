import { Link } from 'gatsby';
import {
  ArrowLeftRight,
  Info,
  LayoutDashboard,
  SlidersHorizontal,
} from 'lucide-react';
import React from 'react';

import { cn } from '../lib/utils';

const mainLinks = [
  {
    label: 'Dashboard',
    href: '/',
    icon: <LayoutDashboard className="zise-6" />,
  },
  {
    label: 'Transactions history',
    href: '/transactions',
    icon: <ArrowLeftRight className="zise-6" />,
  },
];

const downLinks = [
  {
    label: 'Settings',
    href: '/settings',
    icon: <SlidersHorizontal className="zise-6" />,
  },
  {
    label: 'Support',
    href: '/support',
    icon: <Info className="zise-6" />,
  },
];
export const Sidebar = () => {
  const isActive = (href: string) => {
    if (location.pathname === '/' && href === '/') return true;
    return href !== '/' && location.pathname.includes(href);
  };

  return (
    <aside className="basis-[266px] bg-card flex flex-col justify-between py-5 px-3 border-[0.8px] border-border-secondary rounded-sm">
      <div className="flex flex-col">
        {mainLinks.map((i) => (
          <Link
            to={i.href}
            key={i.href}
            className={cn(
              'h-[60px] text-base font-semibold text-muted-foreground',
              isActive(i.href) &&
                'text-foreground font-bold p-[2px] rounded-[30px] bg-gradient-to-r from-[#2E2D32] to-[#8C8998]',
            )}
          >
            <div
              className={cn(
                'flex items-center gap-[10px] bg-card h-full px-[18px]',
                isActive(i.href) && 'bg-icon-background rounded-[30px]',
              )}
            >
              <div>{i.icon}</div>
              <p>{i.label}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex flex-col pt-4 border-t-[0.7px] border-border-secondary">
        {downLinks.map((i) => (
          <Link
            to={i.href}
            key={i.href}
            className={cn(
              'h-[60px] text-base font-semibold text-muted-foreground',
            )}
          >
            <div
              className={cn(
                'flex items-center gap-[10px] bg-card  h-full px-[18px]',
              )}
            >
              <div>{i.icon}</div>
              <p>{i.label}</p>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
};
