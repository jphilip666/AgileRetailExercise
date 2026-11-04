import type { CreateProductData, UpdateProductData } from '@myapp/schemas';

/**
 * Product http requests
 */
export interface PaginationProduct {
    id: number;
    name: string;
    price: number;
    stock: number;
}

export interface PaginationProductsResponse {
    data: PaginationProduct[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface PaginationProductsParams {
    page: number;
    limit: number;
    search: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

/**
 * Form
 */
export interface CreateProductResponse {
    status: string;
    data: CreateProductData;
}

export interface UpdateProductResponse {
    status: string;
    data: UpdateProductData;
}
