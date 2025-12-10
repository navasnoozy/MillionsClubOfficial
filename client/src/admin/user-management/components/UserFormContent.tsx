//src/admin/components/UserFormContent.tsx

import { createUserSchema, updateUserSchema, type CreateUserInput, type UpdateUserInput } from "@millionsclub/shared-libs/client";
import { Dialog, DialogContent, DialogTitle, Stack } from "@mui/material";
import { toast } from "react-toastify";
import useCreateUser from "../hooks/useCreateUser";
import useUpdateUser from "../hooks/useUpdateuser";

import type { User } from "../interface/user";
import { Form } from "../../../components/Form";
import FormInputField from "../../../components/FormInputField";
import FormDropdown from "../../../components/FormDropdown";
import AppButton from "../../../components/AppButton";
import { useMemo, useState } from "react";
import AlertNotify from "../../../components/Alert";

const ROLE_OPTIONS = [
  { label: "Admin", value: "admin" },
  { label: "Moderator", value: "moderator" },
  { label: "Customer", value: "customer" },
];

interface Props {
  open: boolean;
  onClose: () => void;
  user?: User;
}

const UserFormDialog = ({ open, onClose, user }: Props) => {
  const [errors, setErrors] = useState<{ message: string; field: string }[] | null>(null);
  const { mutateAsync: createUser, isPending: creating } = useCreateUser();
  const { mutateAsync: updateUser, isPending: updating } = useUpdateUser();

  const isEditMode = !!user;

  // 1. Prepare the initial data
  // useMemo prevents recalculation on every render, though strictly optional for simple objects
  const defaultValues = useMemo(() => {
    if (isEditMode && user) {
      return {
        name: user.name,
        // If your schema expects these to be present, ensure they aren't null/undefined
        email: user.email,
        role: user.role,
      };
    }
    return undefined;
  }, [isEditMode, user]);

  const formSchema = isEditMode ? updateUserSchema : createUserSchema;

  const handleSubmit = async (data: CreateUserInput | UpdateUserInput) => {
    if (isEditMode && user?.id) {
      await toast.promise(
        updateUser(
          {
            id: user.id,
            data: data,
          },
          {
            onError: (error) => {
              setErrors(error.response?.data.errors || null);
            },
          }
        ),
        {
          pending: "Updating user...",
          success: "User updated successfully",
          error: "Failed to update user",
        }
      );
    } else {
      await toast.promise(createUser(data as CreateUserInput), {
        pending: "Creating user...",
        success: "User created successfully",
        error: "Failed to create user",
      });
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={(_e, reason) => {
        if (reason === "backdropClick") return;
        onClose();
      }}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>{isEditMode ? "Edit User" : "Add New User"}</DialogTitle>
      <DialogContent>
        {open && (
          <Form onSubmit={handleSubmit} schema={formSchema} defaultValues={defaultValues}>
            <Stack spacing={3} sx={{ mt: 1 }}>
              <FormInputField type="text" name="name" label="Name" />
              <FormInputField type="email" name="email" label="Email" disabled={isEditMode} />

              {!isEditMode && (
                <>
                  <FormInputField type="password" name="password" label="Password" />
                  <FormInputField type="password" name="confirmPassword" label="Confirm Password" />
                </>
              )}

              <FormDropdown name="role" options={ROLE_OPTIONS} label="Select Role" />
              <AlertNotify success={false} messages={errors} />
            </Stack>
            <Stack direction="row" justifyContent="flex-end" gap={2} mt={2}>
              <AppButton onClick={onClose} color="inherit" disabled={creating || updating}>
                Cancel
              </AppButton>
              <AppButton loading={creating || updating} variant="contained" type="submit">
                {isEditMode ? "Update" : "Create"}
              </AppButton>
            </Stack>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserFormDialog;
