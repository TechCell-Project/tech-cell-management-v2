import { Button } from '@/components/ui';
import { MoveLeft, MoveRight } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { memo, useCallback } from 'react';

type DataTablePaginationProps = {
  page: number;
  limit: number;
  hasNextPage: boolean;
};

const DataTablePagination = memo(({ page, limit, hasNextPage }: DataTablePaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const changePage = useCallback(
    (page: number) => {
      router.replace(pathname + '?' + createQueryString('page', `${page}`));
    },
    [createQueryString, pathname, router],
  );

  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => changePage(page - 1)}
        disabled={+page <= 1}
        className='flex items-center gap-2 text-[12px]'
      >
        <MoveLeft className='w-[15px]' />
        Trang trước
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => changePage(page + 1)}
        disabled={!hasNextPage}
        className='flex items-center gap-2 text-[12px]'
      >
        Trang kế
        <MoveRight className='w-[15px]'/>
      </Button>
    </div>
  );
});

DataTablePagination.displayName = 'DataTablePagination';

export default DataTablePagination;
