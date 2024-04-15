'use client';

import {
  Breadcrumb as BreadcrumbRoot,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react';
import { LINKS_ROUTE, LinksRouteType } from './link';
import { Home } from 'lucide-react';

const Breadcrumb = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/');

  const generateBreadcrumb = useMemo(() => {
    const breadcrumbs: LinksRouteType[] = [];

    for (const breadcrumb of LINKS_ROUTE) {
      if (pathname.startsWith(breadcrumb.href)) {
        breadcrumbs.push(breadcrumb);
      }
    }
    return { paths: breadcrumbs, length: breadcrumbs.length };
  }, [pathname]);

  return (
    <div className="mb-5">
      <h3 className="mb-3 font-bold text-2xl flex items-center gap-3">
        {LINKS_ROUTE.find((route) => route.href === pathname)?.name}
        {pathSegments[pathSegments.length - 1] === 'create' && 'Thêm mới'}
        {pathSegments[pathSegments.length - 1].startsWith('update') && 'Cập nhật'}
      </h3>

      <BreadcrumbRoot>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Home size={15} />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          {generateBreadcrumb.paths.map((path, index) => (
            <React.Fragment key={path.href}>
              {path.href !== pathname ? (
                <BreadcrumbItem
                  className={`${path.disabled && 'cursor-not-allowed pointer-events-none'}`}
                >
                  <BreadcrumbLink>
                    <Link href={path.href}>{path.name}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              ) : (
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold">{path.name}</BreadcrumbPage>
                </BreadcrumbItem>
              )}
              {index < generateBreadcrumb.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </BreadcrumbRoot>
    </div>
  );
};

export default Breadcrumb;
