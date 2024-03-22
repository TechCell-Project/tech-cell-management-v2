'use client';

import { NavLinkProps } from '@/constants/routes';

export const NavLinkAction = ({ title, icon, action, dialogComponent }: NavLinkProps) => {
  return (
    <li>
      {dialogComponent ?? <></>}
      {action && (
        <button
          type="button"
          className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
          onClick={action}
        >
          {icon}
          <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap text-sm font-bold">
            {title}
          </span>
        </button>
      )}
    </li>
  );
};
