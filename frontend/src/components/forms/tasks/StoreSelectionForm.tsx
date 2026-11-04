import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Field, FieldLabel, FieldError } from '@/components/ui/field';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { Button } from '@/components/ui/button';

import { storeSchema } from '@myapp/schemas';

export type StoreFormData = z.infer<typeof storeSchema>;

type Store = {
    id: string;
    name: string;
};

type StoreSelectionFormProps = {
    stores: Store[];
    onSubmit: (data: StoreFormData) => void;
    isLoading?: boolean;
};

export function StoreSelectionForm({
    stores,
    onSubmit,
    isLoading = false,
}: StoreSelectionFormProps) {
    const form = useForm<StoreFormData>({
        resolver: zodResolver(storeSchema),
        defaultValues: {
            storeId: '',
        },
    });

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex items-end gap-3">
                <div className="flex-1">
                    <Controller
                        name="storeId"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="storeId">
                                    Select Store
                                </FieldLabel>

                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    disabled={isLoading}
                                >
                                    <SelectTrigger
                                        id="storeId"
                                        className="w-full"
                                        aria-invalid={fieldState.invalid}
                                    >
                                        <SelectValue placeholder="Choose a store" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {stores.map((store) => (
                                            <SelectItem
                                                key={store.id}
                                                value={store.id}
                                            >
                                                {store.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </div>

                <Button type="submit" className="shrink-0" disabled={isLoading}>
                    {isLoading ? 'Fetching tasks...' : 'Fetch Tasks'}
                </Button>
            </div>
        </form>
    );
}
