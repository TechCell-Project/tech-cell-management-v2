import { Button } from '@/components/ui';
import { ChevronsUpDown, MoveLeft, MoveRight } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { memo, useCallback, useMemo } from 'react';
import { DropdownDisplay, DropdownDisplayItemProps } from '../display';
import { useSearchQueryParams } from '@/hooks';

type DataTablePaginationProps = {
  page: number;
  limit: number;
  hasNextPage: boolean;
};

const DataTablePagination = memo(({ page, limit, hasNextPage }: DataTablePaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { createQueryString } = useSearchQueryParams();

  const changePage = useCallback(
    (param: string, page: number) => {
      router.replace(pathname + '?' + createQueryString(param, `${page}`));
    },
    [createQueryString, pathname, router],
  );

  const limitsRecord: DropdownDisplayItemProps[] = useMemo(() => {
    return [
      {
        content: '5',
        key: '5',
        onClick: () => changePage('limit', 5),
      },
      {
        content: '10',
        key: '10',
        onClick: () => changePage('limit', 10),
      },
      {
        content: '20',
        key: '20',
        onClick: () => changePage('limit', 20),
      },
      {
        content: '30',
        key: '30',
        onClick: () => changePage('limit', 30),
      },
      {
        content: '40',
        key: '40',
        onClick: () => changePage('limit', 40),
      },
    ];
  }, [changePage]);

  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="flex items-center gap-2 mr-6">
        <p className="text-[13px]">Bản ghi:</p>
        <DropdownDisplay
          trigger={
            <Button variant="outline" className="h-9 px-3 flex items-center gap-4">
              <span className="text-[13px]">{limit}</span>
              <span className="sr-only">Open menu</span>
              <ChevronsUpDown className="h-3 w-3" />
            </Button>
          }
          label="Bản ghi"
          items={limitsRecord}
        />
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => changePage('page', page - 1)}
        disabled={+page <= 1}
        className="flex items-center gap-2 text-[12px]"
      >
        <MoveLeft className="w-[10px]" />
        Trang trước
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => changePage('page', page + 1)}
        disabled={!hasNextPage}
        className="flex items-center gap-2 text-[12px]"
      >
        Trang kế
        <MoveRight className="w-[10px]" />
      </Button>
    </div>
  );
});

DataTablePagination.displayName = 'DataTablePagination';

export default DataTablePagination;
