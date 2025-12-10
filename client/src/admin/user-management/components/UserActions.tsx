import { Delete, ManageAccounts, NoAccounts } from "@mui/icons-material";
import { ButtonGroup } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import AppButton from "../../../components/AppButton";
import useDeleteUser from "../hooks/useDeleteUser";
import type { User } from "../interface/user";
import ConfirmDialog from "../../../components/ConfirmDialog";
import UserFormDialog from "./UserFormContent";

interface Props {
  user: User;
}

type ActionType = "block" | "delete" | "edit" | null;

const UserActions = ({ user }: Props) => {
  const [activeAction, setActiveAction] = useState<ActionType>(null);

  const { mutateAsync: deleteUser, isPending } = useDeleteUser();

  const handleConfirm = () => {
    if (activeAction === "delete") {
      toast.promise(deleteUser({ id: user.id }), {
        pending: "Deleting user...",
        success: "User deleted successfully",
        error: "Failed to delete user",
      });
    } else if (activeAction === "block") {
      // API action avoided as per specific user instruction.
      // logic for blocking would go here.
    }
    handleClose();
  };

  const handleClose = () => {
    setActiveAction(null);
  };

  const dialogConfig = {
    title: activeAction === "delete" ? "Delete User" : "Block User",
    content: activeAction === "delete" ? `Are you sure you want to delete ${user.name}? This action cannot be undone.` : `Are you sure you want to block ${user.name}?`,
    confirmText: activeAction === "delete" ? "Delete" : "Block",
  };

  return (
    <>
      <ButtonGroup size="small" variant="text" aria-label="User actions">
        <AppButton onClick={() => setActiveAction("edit")} sx={{ minWidth: "auto", color: "gray" }} size="small">
          <ManageAccounts />
        </AppButton>

        <AppButton onClick={() => setActiveAction("block")} sx={{ minWidth: "auto", color: user.status === "blocked" ? "red" : "gray" }} size="small">
          <NoAccounts />
        </AppButton>

        <AppButton onClick={() => setActiveAction("delete")} loading={isPending} sx={{ minWidth: "auto", color: "gray" }} size="small">
          <Delete />
        </AppButton>
      </ButtonGroup>

      <ConfirmDialog open={activeAction === "delete" || activeAction === "block"} title={dialogConfig.title} content={dialogConfig.content} onConfirm={handleConfirm} onClose={handleClose} />
      <UserFormDialog open={activeAction === "edit"} onClose={handleClose} user={user} />
    </>
  );
};

export default UserActions;
