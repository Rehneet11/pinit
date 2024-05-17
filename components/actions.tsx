"use client"

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import {DropdownMenu,DropdownMenuTrigger,DropdownMenuContent,DropdownMenuItem,DropdownMenuSeparator} from "@/components/ui/dropdown-menu"
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { ConfirmModel } from "./confirm-model";
import { Button } from "./ui/button";
import { useRenameModel } from "@/store/use-rename-model";

interface ActionsProps{
    children:React.ReactNode;
    side?:DropdownMenuContentProps["side"];
    sideOffset?:DropdownMenuContentProps["sideOffset"];
    id:string;
    title:string;
}
export const Actions=({children,
    side,
    sideOffset,
    id,
    title
}:ActionsProps)=>{
    const onCopyLink=()=>{
        navigator.clipboard.writeText(
            `${window.location.origin}/board/${id}`
        )
        .then(()=>{
            toast.success("Copied to Clipboard!")
        })
        .catch(()=>{
            toast.error("Failed To Copy Link")
        })
    }

    const {mutate,pending} = useApiMutation(api.board.remove);
    const onDelete=()=>{
        mutate({id})
        .then(()=>{
            toast.success("Deleted")
        })
        .catch(()=>{
            toast.error("Failed To Delete Board")
        })
    }

    const{onOpen}=useRenameModel();

    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent side={side}
            sideOffset={sideOffset}
            className="w-60"
            onClick={(e)=>e.stopPropagation()}>
                <DropdownMenuItem 
                onClick={onCopyLink}
                className="p-3 cursor-pointer"
                >
                    <Link2 className="h-4 w-4 mr-2"/>
                    Copy Board Link
                </DropdownMenuItem>
                <DropdownMenuItem 
                onClick={()=>onOpen(id,title)}
                className="p-3 cursor-pointer"
                >
                    <Pencil className="h-4 w-4 mr-2"/>
                    Rename Board
                </DropdownMenuItem>
                <ConfirmModel
                header="Delete Board?"
                description="THIS BOARD WILL FOREVER BE DELETED AND CANNOT BE RESTORED EVER AGAIN"
                disabled={pending}
                onConfirm={onDelete}>
                    <Button variant="ghost" 
                    className="text-sm p-3 cursor-pointer w-full justify-start font-normal">
                    <Trash2 className="h-4 w-4 mr-2"/>
                        Delete this Board
                    </Button>
                </ConfirmModel>
                
            </DropdownMenuContent>
        </DropdownMenu>
    )
}