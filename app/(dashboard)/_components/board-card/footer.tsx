import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";

interface FooterProps{
    title:string;
    authorLabel:string;
    createdAtLabel:string;
    isFavourite:boolean;
    onClick:()=> void;
    disabled:boolean;
}
export const Footer=({
    title,
    authorLabel,
    createdAtLabel,
    isFavourite,
    onClick,
    disabled
}:FooterProps)=>{
    const handleClick=(
        event:React.MouseEvent<HTMLButtonElement,MouseEvent>)=>{
            event.stopPropagation();
            event.preventDefault();
            onClick();
        }
    
    return(
        <div className="relative bg-white p-3">
            <p className="text-[13px] truncate max-w-[calc(100%-20px)]">
                {title}
            </p>
            <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate">
                {authorLabel},{createdAtLabel}
            </p>
            
        </div>
    )
}