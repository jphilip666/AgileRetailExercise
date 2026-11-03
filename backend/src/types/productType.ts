export type CreateProductInput = {
    name: string;
    description?: string | null;
    price: number;
    stock: number;
    isActive: boolean;
};

export type UpdateProductInput = {
    name: string;
    description?: string | null;
    price: number;
    stock: number;
    isActive: boolean;
};
