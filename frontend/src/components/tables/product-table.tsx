import { useEffect, useState } from 'react';

import {
    useTable,
    type PaginationState,
    type SortingState,
} from '@tanstack/react-table';

import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { getProducts } from '@/lib/api';
import { productColumns, productFeatures } from './product-columns';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function ProductsTable() {
    // Table state managed by React
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const [sorting, setSorting] = useState<SortingState>([]);

    // Search state
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    // Debounce search requests
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    // Fetch products from backend
    const productsQuery = useQuery({
        queryKey: [
            'products',
            pagination.pageIndex,
            pagination.pageSize,
            debouncedSearch,
            sorting,
        ],

        queryFn: () =>
            getProducts({
                page: pagination.pageIndex + 1,
                limit: pagination.pageSize,
                search: debouncedSearch,
                sortBy: sorting[0]?.id,
                sortOrder: sorting[0]
                    ? sorting[0].desc
                        ? 'desc'
                        : 'asc'
                    : undefined,
            }),

        placeholderData: keepPreviousData,
    });

    const products = productsQuery.data?.data ?? [];

    const total = productsQuery.data?.pagination.total ?? 0;

    // Configure TanStack Table v9
    const table = useTable(
        {
            features: productFeatures,
            columns: productColumns,
            data: products,

            rowCount: total,

            // Server handles all data operations
            manualPagination: true,
            manualSorting: true,

            state: {
                pagination,
                sorting,
            },

            onPaginationChange: setPagination,

            onSortingChange: (updater) => {
                setSorting((old) => {
                    const next =
                        typeof updater === 'function' ? updater(old) : updater;

                    return next;
                });

                // Start from first page when sorting changes
                setPagination((old) => ({
                    ...old,
                    pageIndex: 0,
                }));
            },
        },
        (state) => ({
            pagination: state.pagination,
            sorting: state.sorting,
        }),
    );

    const isInitialLoading = productsQuery.isPending && !productsQuery.data;

    return (
        <div className="space-y-4">
            {/* Search */}
            <div className="flex items-center justify-between gap-4">
                <Input
                    placeholder="Search products..."
                    value={search}
                    onChange={(event) => {
                        setSearch(event.target.value);

                        setPagination((old) => ({
                            ...old,
                            pageIndex: 0,
                        }));
                    }}
                    className="max-w-sm"
                />

                <div className="text-sm text-muted-foreground">
                    {total} products
                </div>
            </div>

            {/* Table */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : (
                                            <button
                                                type="button"
                                                className="flex items-center gap-2 font-medium"
                                                onClick={
                                                    header.column.getCanSort()
                                                        ? header.column.getToggleSortingHandler()
                                                        : undefined
                                                }
                                            >
                                                <table.FlexRender
                                                    header={header}
                                                />

                                                {{
                                                    asc: ' ↑',
                                                    desc: ' ↓',
                                                }[
                                                    header.column.getIsSorted() as string
                                                ] ?? null}
                                            </button>
                                        )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {isInitialLoading ? (
                            <TableRow>
                                <TableCell
                                    colSpan={productColumns.length}
                                    className="h-24 text-center"
                                >
                                    Loading products...
                                </TableCell>
                            </TableRow>
                        ) : productsQuery.isError ? (
                            <TableRow>
                                <TableCell
                                    colSpan={productColumns.length}
                                    className="h-24 text-center text-destructive"
                                >
                                    {productsQuery.error.message}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="ml-3"
                                        onClick={() => productsQuery.refetch()}
                                    >
                                        Retry
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getAllCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            <table.FlexRender cell={cell} />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={productColumns.length}
                                    className="h-24 text-center"
                                >
                                    No products found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                    Page {pagination.pageIndex + 1} of {table.getPageCount()}
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={
                            !table.getCanNextPage() ||
                            productsQuery.isPlaceholderData
                        }
                    >
                        Next
                    </Button>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm">Rows per page:</span>

                    <select
                        className="h-9 rounded-md border bg-background px-2 text-sm"
                        value={pagination.pageSize}
                        onChange={(event) => {
                            table.setPageSize(Number(event.target.value));
                        }}
                    >
                        {[5, 10, 20, 50].map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
