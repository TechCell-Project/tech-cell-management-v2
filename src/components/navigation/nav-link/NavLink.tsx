'use client';

import Link from 'next/link';
import { NavLinkProps } from '@/constants/routes';
import { usePathname } from 'next/navigation';
import { memo } from 'react';

export const NavLink = memo(({ icon, title, href }: NavLinkProps) => {
  const pathname = usePathname();

  return (
    <li>
      <Link
        href={href as string}
        className={`${
          pathname === href && 'bg-gray-100 dark:bg-gray-700'
        } flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group text-sm font-bold`}
      >
        {icon}
        <span className="ms-3">{title}</span>
      </Link>
    </li>
  );
});

NavLink.displayName = 'NavLink';
