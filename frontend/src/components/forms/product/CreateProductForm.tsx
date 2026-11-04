import { toast } from '@/components/ui/toast';
import { ProductForm } from './ProductForm';
import { type CreateProductData } from '@learn_03/schemas';

export function CreateProductForm() {
    const handleSubmit = async (data: CreateProductData) => {
        toast.add({
            title: 'New Product Created',
            data: data,
        });
    };

    return (
        <ProductForm
            defaultValues={{
                name: '',
                description: '',
                category: '',
                price: 0,
                stock: 0,
                sku: '',
            }}
            submitLabel="Create product"
            onSubmit={handleSubmit}
        />
    );
}
