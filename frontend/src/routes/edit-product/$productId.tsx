import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/edit-product/$productId')({
    component: RouteComponent,
});

function RouteComponent() {
    const { productId } = Route.useParams();

    const {
        data: product,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['products', productId],
        queryFn: async () => {
            const response = await fetch(
                `http://localhost:3000/api/v1/products/${productId}`,
            );

            if (!response.ok) {
                throw new Error('Failed to fetch product');
            }

            const result = await response.json();

            return result.data;
        },
    });

    if (isLoading) {
        return <div>Loading product...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div>
            Hello `/edit-product/{productId}`!
            {Object.entries(product).map(([key, value]) => (
                <div key={key}>
                    <strong>{key}:</strong> {String(value)}
                </div>
            ))}
        </div>
    );
}
