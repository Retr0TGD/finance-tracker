"use client";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
import { useDeleteAccount } from "@/features/accounts/api/use-delete-account";
import { useConfirm } from "@/hooks/use-confirm";

type Props = {
    id: string;
};

export const Actions = ({ id }: Props) => {

    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to delete this account"
    );

    const deleteMutation = useDeleteAccount(id);
    const { onOpen } = useOpenAccount();

    const handleDelete = async () => {
        const ok = await confirm();

        if (ok) {
            deleteMutation.mutate();
        }
    };

    return (
        <>
            <ConfirmDialog />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="size-8 p-0" variant="ghost">
                        <MoreHorizontal className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onOpen(id)} disabled={deleteMutation.isPending}>
                        <Edit className="size-4 mr-2" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDelete} disabled={deleteMutation.isPending}>
                        <Trash className="size-4 mr-2" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}