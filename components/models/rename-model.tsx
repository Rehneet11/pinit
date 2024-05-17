"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogClose,
    DialogFooter,
    DialogTitle,
} from "@/components/ui/dialog";
import { useRenameModel } from "@/store/use-rename-model";
import { FormEventHandler, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

export const RenameModel=()=>{
    const {mutate,pending} = useApiMutation(api.board.update)
    const{
        isOpen,
        onClose,
        initialValues,
    }=useRenameModel();

    const [title,setTitle]=useState(initialValues.title)

    useEffect(()=>{
        setTitle(initialValues.title)
    },[initialValues.title]);

    const onSubmit:FormEventHandler<HTMLFormElement>=(e)=>{
        e.preventDefault();
        mutate({
            id:initialValues.id,
            title,
        })
        .then(()=>{
            toast.success("Rename Successful");
            onClose();
        })
        .catch(()=>{
            toast.error("Rename Failed");
        })
    }

    return(
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit Board Title
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Enter a New Title
                </DialogDescription>
                <form onSubmit={onSubmit} className="space-y-4">
                    <Input
                    disabled={pending}
                    required
                    maxLength={60}
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    placeholder="Board Title"/>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button typeof="button" variant="outline">
                            Cancel
                            </Button>
                        </DialogClose>
                        <Button disabled={pending} type="submit">
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}