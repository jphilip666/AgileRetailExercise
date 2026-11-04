import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from '@/components/ui/input-group';
import {
    createProductSchema,
    type CreateProductInput,
    type CreateProductData,
} from '@myapp/schemas';
import { zodResolver } from '@hookform/resolvers/zod';

type ProductFormProps = {
    defaultValues: CreateProductInput;
    submitLabel: string;
    onSubmit: (data: CreateProductData) => Promise<void>;
};

export function ProductForm({
    defaultValues,
    submitLabel,
    onSubmit,
}: ProductFormProps) {
    const form = useForm<CreateProductInput, unknown, CreateProductData>({
        resolver: zodResolver(createProductSchema),
        defaultValues: defaultValues,
    });

    return (
        <FieldGroup>
            <form id="product-form" onSubmit={form.handleSubmit(onSubmit)}>
                <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-rhf-demo-title">
                                Product Name
                            </FieldLabel>
                            <Input
                                {...field}
                                id="form-rhf-demo-title"
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter product name"
                                autoComplete="off"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Controller
                    name="description"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-rhf-demo-description">
                                Description
                            </FieldLabel>
                            <InputGroup>
                                <InputGroupTextarea
                                    {...field}
                                    value={field.value ?? ''}
                                    id="form-rhf-demo-description"
                                    placeholder="Enter product description"
                                    rows={6}
                                    className="min-h-24 resize-none"
                                    aria-invalid={fieldState.invalid}
                                />
                                <InputGroupAddon align="block-end">
                                    <InputGroupText className="tabular-nums">
                                        {(field.value ?? '').length}/100
                                        characters
                                    </InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                            <FieldDescription>
                                Enter product description. Please no more than
                                100 characters.
                            </FieldDescription>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Controller
                    name="price"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-rhf-demo-title">
                                Product Price
                            </FieldLabel>
                            <Input
                                {...field}
                                value={String(field.value)}
                                id="form-rhf-demo-title"
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter product price"
                                type="number"
                                autoComplete="off"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Controller
                    name="stock"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-rhf-demo-title">
                                Product Price
                            </FieldLabel>
                            <Input
                                {...field}
                                value={String(field.value)}
                                id="form-rhf-demo-title"
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter product price"
                                type="number"
                                autoComplete="off"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Field orientation="horizontal">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => form.reset()}
                    >
                        Reset
                    </Button>
                    <Button type="submit">{submitLabel}</Button>
                </Field>
            </form>
        </FieldGroup>
    );
}
