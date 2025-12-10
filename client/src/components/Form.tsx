//src/components/Form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactNode } from "react";
import { useForm, FormProvider } from "react-hook-form";
import type { SubmitHandler, UseFormProps, FieldValues } from "react-hook-form";
import { ZodType } from "zod";

interface FormProps<T extends FieldValues> extends Omit<UseFormProps<T>, "resolver"> {
  children: ReactNode;
  onSubmit: SubmitHandler<T>;
  schema: ZodType<T, any, any>;
  className?: string;
}

export const Form = <T extends FieldValues>({ children, onSubmit, schema, className, ...props }: FormProps<T>) => {
  const methods = useForm<T>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    ...props,
  });

  return (
    <FormProvider {...methods} >
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={className}
        noValidate 
      >
        {children}
      </form>
    </FormProvider>
  );
};
