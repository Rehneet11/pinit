"use client"

import Image from "next/image";
import Link from "next/link";
import { Overlay } from "./overlay";
import { useAuth } from "@clerk/nextjs";
import {formatDistanceToNow } from "date-fns"
import { Footer } from "./footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Actions } from "@/components/actions";
import { MoreHorizontal } from "lucide-react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface BoardCardProps{
   id:string;
   title:string;
   authorName:string;
   authorId:string;
   createdAt:number;
   imageUrl:string;
   orgId:string;
   isFavourite:boolean;

}
export const BoardCard=({id,
    title,
    authorName,
    authorId,
    createdAt,
    imageUrl,
    orgId,
    isFavourite}:BoardCardProps)=>{
        const {userId}=useAuth();
        const authorLabel=userId===authorId?"You":authorName;

        const {mutate:onFavoutite,
            pending:pendingFavourite,
        }=useApiMutation(api.board.favourite);

        const {
            mutate:onUnfavourite,
            pending:pendingUnfavourite
        }=useApiMutation(api.board.unfavourite);

        const toggleFavourite=()=>{
            if(isFavourite){
                onUnfavourite({id})
                .catch(()=>{toast.error("Failed to Unfavourite")})
            }
            else{
                onFavoutite({id,orgId})
                .catch(()=>{toast.error("Failed to Favourite")})
            }
        }
        const createdAtLabel=formatDistanceToNow(createdAt,{
            addSuffix:true
        })

    return(
        <Link href={`/board/${id}`}>
            <div className="group aspect-[110/140] border rounded-lg flex flex-col  justify-between overflow-hidden">
                <div className="relative flex-1 bg-amber-100">
                    <Image src={imageUrl} alt={title} fill className="object-fit"/>
                    <Overlay/>
                    <Actions id={id} title={title} side="right">
                        <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none"><MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity"/></button>
                    </Actions>
                </div>
                <Footer isFavourite={isFavourite}
                title={title}
                authorLabel={authorLabel}
                createdAtLabel={createdAtLabel}
                onClick={toggleFavourite}
                disabled={pendingFavourite || pendingUnfavourite}
                />
            </div>
        </Link>
    )
};
BoardCard.Skeleton = function BoardCardSkeleton(){
    return(
        <div className="group aspect-[110/140] rounded-lg overflow-hidden">
            <Skeleton className="h-full w-full "/>
        </div>
    )
}