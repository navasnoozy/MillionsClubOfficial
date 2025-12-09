import { Delete, ManageAccounts, NoAccounts } from "@mui/icons-material";
import { ButtonGroup } from "@mui/material";
import { toast } from "react-toastify";
import AppButton from "../../components/AppButton";
import type { User } from "../user-management/interface/user";
import useDeleteUser from "../hooks/useDeleteUser";

interface Props {
  id: User["id"];
  status: User["status"];
}

const UserActions = ({ id, status }: Props) => {
  const { mutateAsync: deleteUser, isPending } = useDeleteUser();

  const handleDeleteClick = () => {
    toast.promise(deleteUser({ id }), {
      pending: "Deleting user...",
      success: "User deleted successfully",
      error: "Failed to delete user",
    });
  };

  return (
    <ButtonGroup size="small" variant="text" aria-label="Small button group">
      <AppButton sx={{ minWidth: "auto", color: "gray" }} size="small">
        <ManageAccounts />
      </AppButton>
      <AppButton color="error" sx={{ minWidth: "auto", color: status === "blocked" ? "red" : "gray" }} size="small">
        <NoAccounts />
      </AppButton>

      <AppButton value={id} onClick={handleDeleteClick} loading={isPending} sx={{ minWidth: "auto", color: "gray" }} size="small">
        <Delete />
      </AppButton>
    </ButtonGroup>
  );
};

export default UserActions;
