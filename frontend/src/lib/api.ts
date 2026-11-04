import type { CreateProductData, UpdateProductData } from '@myapp/schemas';
import {
    type CreateProductResponse,
    type UpdateProductResponse,
    type PaginationProductsParams,
    type PaginationProductsResponse,
} from '@/types/product';

const API_URL = 'http://localhost:3000/api/v1';

export async function getProducts(
    params: PaginationProductsParams,
): Promise<PaginationProductsResponse> {
    const searchParams = new URLSearchParams();

    searchParams.set('page', String(params.page));
    searchParams.set('limit', String(params.limit));
    searchParams.set('search', params.search);

    if (params.sortBy) {
        searchParams.set('sortBy', params.sortBy);
    }

    if (params.sortOrder) {
        searchParams.set('sortOrder', params.sortOrder);
    }

    const response = await fetch(
        `${API_URL}/products/pagination?${searchParams.toString()}`,
    );

    if (!response.ok) {
        throw new Error('Unable to retrieve products');
    }

    return response.json() as Promise<PaginationProductsResponse>;
}

export async function createProduct(
    data: CreateProductData,
): Promise<CreateProductResponse> {
    const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to create product');
    }

    return response.json();
}

export async function updateProduct(
    id: number,
    data: UpdateProductData,
): Promise<UpdateProductResponse> {
    const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to update product');
    }

    return response.json();
}
