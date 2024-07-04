"use client";
import { useMountedState } from "react-use";
import { NewAccounSheet } from "@/features/accounts/components/new-account-sheet";

export const SheetProvider = () => {

    const isMounted = useMountedState();
    if(!isMounted) return null;

    return(
        <>
            <NewAccounSheet />
        </>
    );
};