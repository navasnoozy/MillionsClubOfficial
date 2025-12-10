import { createUserSchema, type CreateUserInput } from "@millionsclub/shared-libs/client";
import { Dialog, DialogContent, DialogTitle, Stack } from "@mui/material";

import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import useCreateUser from "../hooks/useCreateUser";
import useUpdateUser from "../hooks/useUpdateuser";

import type { User } from "../interface/user";
import { Form } from "../../../components/Form";
import FormInputField from "../../../components/FormInputField";
import FormDropdown from "../../../components/FormDropdown";
import AppButton from "../../../components/AppButton";

const ROLE_OPTIONS = [
  { label: "Admin", value: "admin" },
  { label: "Moderator", value: "moderator" },
  { label: "Customer", value: "customer" },
];

interface Props {
  open: boolean;
  isEditMode: boolean;
  onClose: () => void;
  user?: User;
}

const UserFormContent = ({ open, onClose, isEditMode, user }: Props) => {
  const { reset } = useFormContext();

  const { mutateAsync: createUser, isPending: creating } = useCreateUser();
  const { mutateAsync: updateUser, isPending: updating } = useUpdateUser();

  const handleSubmit = (data: CreateUserInput) => {
    const promise = isEditMode ? updateUser({ id: user?.id!, ...data }) : createUser(data);

    toast.promise(promise, {
      pending: isEditMode ? "Updating user..." : "Creating user...",
      success: isEditMode ? "User updated successfully" : "User created successfully",
      error: isEditMode ? "Failed to update user" : "Failed to create user",
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditMode ? "Edit User" : "Add New User"}</DialogTitle>
      <DialogContent>
        <Form onSubmit={handleSubmit} schema={createUserSchema}>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <FormInputField type="text" name="name" label="Name" />
            <FormInputField type="email" name="email" label="Email" disabled={isEditMode} />
            <FormInputField type="password" name="password" label="Password" />
            <FormInputField type="password" name="confirmPassword" label="Confirm Password" />
            <FormDropdown name="role" options={ROLE_OPTIONS} label="Select Role" />
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
      </DialogContent>
    </Dialog>
  );
};
