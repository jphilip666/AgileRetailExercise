import { toast } from '@/components/ui/toast';
import { ProductForm } from './ProductForm';
import { type UpdateProductData } from '@learn_03/schemas';

export function UpdateProductForm() {
    const handleSubmit = async (data: UpdateProductData) => {
        toast.add({
            title: 'Product Updated',
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
            submitLabel="Update product"
            onSubmit={handleSubmit}
        />
    );
}
