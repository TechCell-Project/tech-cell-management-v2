'use client';

import { NavLinkProps } from '@/constants/routes';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { memo, useState } from 'react';

export const NavLinkCollapse = memo(({ icon, title, childrenNav }: NavLinkProps) => {
  const [openCollapse, setOpenCollapse] = useState<boolean>(false);
  const pathname = usePathname();

  return (
    <li>
      <button
        type="button"
        className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        aria-controls="nav-collapse"
        data-collapse-toggle="nav-collapse"
        onClick={() => setOpenCollapse(!openCollapse)}
      >
        {icon}
        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap text-sm font-bold">
          {title}
        </span>
        <ChevronDown size={15} />
      </button>

      <ul id="nav-collapse" className={`${!openCollapse && !childrenNav?.map((e) => e.href).includes(pathname) && 'hidden'} py-2 space-y-2`}>
        {childrenNav?.map((children) => (
          <li key={children.title}>
            <Link
              href={children.href}
              className={`${
                pathname === children.href && 'bg-gray-100 dark:bg-gray-700'
              } flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-10 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 text-sm font-semibold`}
            >
              {children.title}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
});

NavLinkCollapse.displayName = 'NavLinkCollapse';
