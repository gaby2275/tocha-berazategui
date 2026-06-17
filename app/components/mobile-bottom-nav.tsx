'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingCart, CreditCard, Settings } from 'lucide-react';

const items = [
  { href: '/', label: 'Inicio', icon: Home },
  { href: '/cart', label: 'Carrito', icon: ShoppingCart },
  { href: '/checkout', label: 'Checkout', icon: CreditCard },
  { href: '/admin', label: 'Admin', icon: Settings },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="mobile-safe fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-slate-950/85 backdrop-blur-xl md:hidden">
      <div className="mx-auto grid max-w-xl grid-cols-4 gap-1 px-3 pt-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === '/' ? pathname === item.href : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center rounded-2xl px-2 py-3 text-[11px] font-medium transition-colors ${
                isActive
                  ? 'bg-sky-400/15 text-sky-300'
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
              }`}
            >
              <Icon className="mb-1 h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

// Made with Bob
