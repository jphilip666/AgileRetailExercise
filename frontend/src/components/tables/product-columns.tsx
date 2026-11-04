import type { ColumnDef } from '@tanstack/react-table';
import type { PaginationProduct } from '@/types/product';
import {
    rowPaginationFeature,
    rowSortingFeature,
    tableFeatures,
} from '@tanstack/react-table';

export const productFeatures = tableFeatures({
    rowPaginationFeature,
    rowSortingFeature,
});

export const productColumns: ColumnDef<
    typeof productFeatures,
    PaginationProduct
>[] = [
    {
        id: 'rowNumber',
        header: '#',
        cell: ({ row, table }) => {
            // Get current pagination state from the table instance
            const { pageSize, pageIndex } = table.atoms.pagination.get();

            // Calculate the absolute row number across pages (1-indexed)
            return pageIndex * pageSize + row.index + 1;
        },
        enableSorting: false,
    },
    {
        accessorKey: 'name',
        header: 'Product Name',
        enableSorting: true,
    },
    {
        accessorKey: 'price',
        header: 'Price',
        cell: (info) => `£${Number(info.getValue()).toFixed(2)}`,
        enableSorting: true,
    },
    {
        accessorKey: 'stock',
        header: 'Stock',
        enableSorting: true,
    },
];
