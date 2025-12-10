import { Delete, ManageAccounts, NoAccounts, DeleteForever } from "@mui/icons-material";
import { ButtonGroup } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import AppButton from "../../../components/AppButton";
import useDeleteUser from "../hooks/useDeleteUser";
import type { User } from "../interface/user";
import ConfirmDialog from "../../../components/ConfirmDialog";
import UserFormDialog from "./UserFormContent";
import useUpdateUser from "../hooks/useUpdateuser";

interface Props {
  user: User;
}

type ActionType = "block" | "delete" | "edit" | null;

const UserActions = ({ user }: Props) => {
  const [activeAction, setActiveAction] = useState<ActionType>(null);

  const { mutateAsync: deleteUser, isPending } = useDeleteUser();
  const { mutateAsync: updateUser, isPending: blocking } = useUpdateUser();

  const handleConfirm = async () => {
    if (activeAction === "delete") {
      await toast.promise(deleteUser({ id: user.id }), {
        pending: "Deleting user...",
        success: "User deleted successfully",
        error: "Failed to delete user",
      });
    } else if (activeAction === "block") {
      const isBlocked = user.status === "blocked";
      const newStatus = isBlocked ? "active" : "blocked";

      await toast.promise(
        updateUser({
          id: user.id,
          data: { status: newStatus },
        }),
        {
          pending: isBlocked ? "Unblocking user..." : "Blocking user...",
          success: isBlocked ? "User unblocked successfully" : "User blocked successfully",
          error: isBlocked ? "Failed to unblock user" : "Failed to block user",
        }
      );
    }
    handleClose();
  };

  const handleClose = () => {
    setActiveAction(null);
  };

  // Helper to determine current block state for UI text
  const isBlocked = user.status === "blocked";

  const dialogConfig = {
    title: activeAction === "delete" ? "Delete User" : isBlocked ? "Unblock User" : "Block User",
    content: activeAction === "delete" ? `Are you sure you want to delete ${user.name}? This action cannot be undone.` : `Are you sure you want to ${isBlocked ? "unblock" : "block"} ${user.name}?`,
    confirmText: activeAction === "delete" ? "Delete" : isBlocked ? "Unblock" : "Block",
  };

  return (
    <>
      <ButtonGroup size="small" variant="text" aria-label="User actions">
        <AppButton onClick={() => setActiveAction("edit")} sx={{ minWidth: "auto", color: "gray" }} size="small">
          <ManageAccounts />
        </AppButton>

        <AppButton
          onClick={() => setActiveAction("block")}
          loading={blocking}
          sx={{ minWidth: "auto", color: isBlocked ? "red" : "gray" }}
          size="small"
          title={isBlocked ? "Unblock User" : "Block User"}
        >
          <NoAccounts />
        </AppButton>

        <AppButton onClick={() => setActiveAction("delete")} loading={isPending} disabled={user.isDeleted} sx={{ minWidth: "auto", color: "gray" }} size="small">
          {user.isDeleted ? <DeleteForever /> : <Delete />}
        </AppButton>
      </ButtonGroup>

      <ConfirmDialog open={activeAction === "delete" || activeAction === "block"} title={dialogConfig.title} content={dialogConfig.content} onConfirm={handleConfirm} onClose={handleClose} />
      <UserFormDialog open={activeAction === "edit"} onClose={handleClose} user={user} />
    </>
  );
};

export default UserActions;
