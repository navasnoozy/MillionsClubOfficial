import { Delete, ManageAccounts, NoAccounts } from "@mui/icons-material";
import { ButtonGroup } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import AppButton from "../../../components/AppButton";
import useDeleteUser from "../hooks/useDeleteUser";
import type { User } from "../interface/user";
import ConfirmDialog from "../../../components/ConfirmDialog";

interface Props {
  user: Pick<User, "id" | "name">;
  status: User["status"];
}

type ActionType = "block" | "delete" | null;

const UserActions = ({ user, status }: Props) => {
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
        {/* Edit Button - Untouched */}
        <AppButton sx={{ minWidth: "auto", color: "gray" }} size="small">
          <ManageAccounts />
        </AppButton>

        {/* Block Button */}
        <AppButton onClick={() => setActiveAction("block")} sx={{ minWidth: "auto", color: status === "blocked" ? "red" : "gray" }} size="small">
          <NoAccounts />
        </AppButton>

        {/* Delete Button */}
        <AppButton onClick={() => setActiveAction("delete")} loading={isPending} sx={{ minWidth: "auto", color: "gray" }} size="small">
          <Delete />
        </AppButton>
      </ButtonGroup>

      <ConfirmDialog open={!!activeAction} title={dialogConfig.title} content={dialogConfig.content} onConfirm={handleConfirm} onClose={handleClose} />
    </>
  );
};

export default UserActions;
