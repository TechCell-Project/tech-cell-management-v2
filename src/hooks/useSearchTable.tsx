import { SearchRequest } from '@/common/model';
import { getSearchParams } from '@/utilities/func.util';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';

export const useSearchTable = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const page = searchParams.get('page');
  const limit = searchParams.get('limit');
  const filters = searchParams.get('filters');
  const sorts = searchParams.get('sorts');

  const getParams = useMemo(() => {
    return getSearchParams(new SearchRequest(Number(page), Number(limit)));
  }, [page, limit]);

  useEffect(() => {
    if (!page && !limit) {
      router.replace(pathname + '?' + getParams);
    }
  }, [page, limit, router, pathname, getParams]);

  return { page, limit, filters, sorts };
};
