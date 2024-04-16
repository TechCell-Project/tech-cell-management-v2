import { SearchRequest } from '@/common/model';
import { getSearchParams } from '@/utilities/func.util';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';

type UseSearchTable = {
  page: string | null;
  limit: string | null;
  filters: string | null;
  sorts: string | null;
};

/**
 * A custom hook designed to facilitate search functionality within a table component.
 * It retrieves and manages search parameters from the URL using the React Router library.
 *
 * @returns {UseSearchTable} - An object containing the search parameters extracted from the URL.
 * It includes properties for page number, limit, filters, and sorts.
 */
export const useSearchTable = (): UseSearchTable => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const page = searchParams.get('page');
  const limit = searchParams.get('limit');
  const filters = searchParams.get('filters');
  const sorts = searchParams.get('sorts');

  const getParams = useMemo(() => {
    return getSearchParams(
      new SearchRequest(Number(page), Number(limit) > 100 ? 100 : Number(limit)),
    );
  }, [page, limit]);

  useEffect(() => {
    if (!page && !limit) {
      router.replace(pathname + '?' + getParams);
    }
  }, [page, limit, router, pathname, getParams]);

  return { page, limit, filters, sorts };
};
