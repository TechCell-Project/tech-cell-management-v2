import { ColumnDef } from '@tanstack/react-table';
import { Order } from '../../models';
import { formatWithCommas } from '@/utilities/func.util';
import { DropdownDisplay } from '@/components/common/display';
import { Button } from '@/components/ui';
import { MoreHorizontal } from 'lucide-react';
import { columnsAction } from './columns-action';

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'customer.address.customerName',
    header: 'Khách hàng',
  },
  { accessorKey: 'customer.email', header: 'Email' },
  {
    accessorKey: 'orderStatus',
    header: 'Tình trạng',
  },
  {
    id: 'payment',
    header: 'Thanh toán',
    accessorFn: (row) => row.payment.method,
  },
  {
    accessorKey: 'shipping.orderShipCode',
    header: 'Ship code',
  },
  {
    id: 'totalPrice',
    header: 'Tổng tiền',
    accessorFn: (row) => formatWithCommas(row.totalPrice),
  },
  {
    id: 'action',
    cell: ({ row }) => (
      <DropdownDisplay
        trigger={
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        }
        label="Thao tác"
        items={columnsAction(row.original)}
      />
    ),
  },
];
