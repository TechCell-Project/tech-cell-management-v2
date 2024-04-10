import { getSearchParams } from '@/utilities/func.util';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { FieldValues } from 'react-hook-form';

export const useSearchTable = <T extends FieldValues>(searchType: new ({ ...props }: T) => T) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const pageParam = searchParams.get('page');
  const limitParam = searchParams.get('limit');
  const filtersParam = searchParams.get('filters');
  const sortsParam = searchParams.get('sorts');

  // const getParams = useMemo(() => {
  //   return getSearchParams(
  //     new searchType(Number(pageParam), Number(limitParam), filtersParam, sortsParam),
  //   );
  // }, []);

  // useEffect(() => {
  //   if (!pageParam && !limitParam) {
  //     router.push(pathname + '?' + getParams());
  //   }
  // }, [page, limit, router, pathname]);

  return {};
};
