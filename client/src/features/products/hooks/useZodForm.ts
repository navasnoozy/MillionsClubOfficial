import { zodResolver } from '@hookform/resolvers/zod';
import type { ZodTypeAny, TypeOf } from 'zod';
import { useForm, type UseFormReturn } from 'react-hook-form';

export const useZodForm = (schema: ZodTypeAny): UseFormReturn<TypeOf<typeof schema>> => {
  return useForm<TypeOf<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  });
};
