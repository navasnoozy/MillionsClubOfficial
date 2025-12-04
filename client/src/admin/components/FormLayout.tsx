// src/components/FormPage.tsx
import React from "react";
import { FormProvider, type UseFormReturn, type FieldValues } from "react-hook-form";
import { Grid } from "@mui/material";
import CardContainer from "../../components/CardContainer";
import AppButton from "../../components/AppButton";

type Props<T extends FieldValues> = {
  heading: string;
  methods: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  left: React.ReactNode;
  right?: React.ReactNode;
  submitLabel?: string;
  isLoading?: boolean;
  showAlerts?: boolean;
  alerts?: React.ReactNode;
};

const FormLayout = <T extends FieldValues>({ heading, methods, onSubmit, left, right, submitLabel = "Submit", isLoading = false, showAlerts = false, alerts }: Props<T>) => {
  return (
    <CardContainer heading={heading}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>{left}</Grid>

            <Grid size={{ xs: 12, md: 6 }}>{right}</Grid>

            <Grid size={12}>
              <AppButton isLoading={isLoading} disabled={isLoading}>
                {submitLabel}
              </AppButton>
            </Grid>
          </Grid>

          {showAlerts ? alerts ?? null : null}
        </form>
      </FormProvider>
    </CardContainer>
  );
};

export default FormLayout;
