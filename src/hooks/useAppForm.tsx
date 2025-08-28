import { useForm /* , UseFormProps, UseFormReturn */ } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// import { ZodSchema, TypeOf } from 'zod';

// type UseZodFormProps<TSchema extends ZodSchema> = Omit<
//   UseFormProps<TypeOf<TSchema>>,
//   "resolver"
// > & {
//   schema: TSchema
// }

export function useAppForm(schema: any, props: Parameters<typeof useForm>[0]) {
    return useForm({
        ...props,
        resolver: zodResolver(schema),
    });
}
