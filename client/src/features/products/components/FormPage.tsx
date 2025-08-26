// src/components/FormPage.tsx
import React from 'react';
import { FormProvider, type UseFormReturn, type FieldValues } from 'react-hook-form';
import { Grid } from '@mui/material';
import CardContainer from '../../../components/CardContainer';
import SubmitButton from './SubmitButton';

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

const FormPage = <T extends FieldValues>({
  heading,
  methods,
  onSubmit,
  left,
  right,
  submitLabel = 'Submit',
  isLoading = false,
  showAlerts = false,
  alerts,
}: Props<T>) => {
  return (
    <CardContainer heading={heading}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>{left}</Grid>

            <Grid size={{ xs: 12, md: 6 }}>{right}</Grid>

            <Grid size={12}>
              <SubmitButton isLoading={isLoading} disabled={isLoading}>
                {submitLabel}
              </SubmitButton>
            </Grid>
          </Grid>

          {showAlerts ? alerts ?? null : null}
        </form>
      </FormProvider>
    </CardContainer>
  );
};

export default FormPage