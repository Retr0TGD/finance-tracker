"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { Loader2, Plus } from "lucide-react";
import { columns } from "./columns";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteAccounts } from "@/features/accounts/api/use-bulk-delete-accounts";

const TransactionsPage = ()=> {
    const newTransaction = useNewTransaction();
    const deleteAccounts = useBulkDeleteAccounts();
    const accountsQuery = useGetAccounts();

    const accounts = accountsQuery.data || [];
    const isDisabled = accountsQuery.isLoading || deleteAccounts.isPending;

    if(accountsQuery.isLoading) {
        return (
            <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
                <Card className="border-none drop-shadow-sm">
                <CardHeader>
                    <Skeleton className="h-8 w-48" />
                </CardHeader>
                <CardHeader>
                    <div className="h-[500px] w-full flex items-center justify-center">
                        <Loader2 className="size-6 text-slate-300 animate-spin" />
                    </div>
                </CardHeader>
                </Card>
            </div>
        );
    }

    return(
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Transaction History
                    </CardTitle>
                    <Button onClick={newTransaction.onOpen} size="sm">
                        <Plus className="size-4 mr-2"/>
                        Add New
                    </Button>
                </CardHeader>
                <CardContent>
                <DataTable filterKey="name" columns={columns} data={accounts} onDelete={(row) => {
                    const ids = row.map((r) => r.original.id);
                    deleteAccounts.mutate({ ids });
                }} disabled={isDisabled} />
                </CardContent>
            </Card>
        </div>
    );
};

export default TransactionsPage;