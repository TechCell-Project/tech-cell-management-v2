import { Skeleton, TableHead, TableRow } from '@/components/ui';
import { Table } from '@tanstack/react-table';

type DataTableLoadingProps<TData> = {
  table: Table<TData>;
  rowCountLoading: number;
};

const DataTableLoading = <TData,>({ table, rowCountLoading }: DataTableLoadingProps<TData>) => {
  return table.getHeaderGroups().map((headerGroup) =>
    Array.from({ length: rowCountLoading }, (_) => (
      <TableRow key={headerGroup.id}>
        {headerGroup.headers.map((header) => {
          return (
            <TableHead key={header.id} className="py-2">
              <Skeleton className="h-7 w-full" />
            </TableHead>
          );
        })}
      </TableRow>
    )),
  );
};

export default DataTableLoading;
