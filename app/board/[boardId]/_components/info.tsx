"use client"

import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import { Id } from "@/convex/_generated/dataModel"
import { Poppins } from "next/font/google"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Hint } from "@/components/hints"
import { useRenameModel } from "@/store/use-rename-model"
import { Actions } from "@/components/actions"
import { MenuIcon } from "lucide-react"

interface InfoProps{
    boardId:string
}
const font =Poppins({
    subsets:["latin"],
    weight:["600"],
})

const TabSeperator=()=>{
    return(
        <div className="text-neutral-300 px-1.5">
            |
        </div>
    )
}
export const Info=({boardId}:InfoProps)=>{
    const {onOpen}=useRenameModel();
    const data=useQuery(api.board.get,{
        id:boardId as Id<"boards">
    })
    if(!data) return <InfoSkeleton/>
    return(
        <div className="absolute top-2 left-2 bh-white rounded-md px-1.5 h-12 flex items-center shadow-md">
            <Hint label="go to boards" side="bottom" sideOffset={10}>
            <Button asChild className="px-2" variant="board">
                <Link href="/">
                    <Image src="/logo.svg" alt="Pinit Logo" height={40} width={40}/>
                    <span className={cn(
                        "font-semibold text-xl ml-2",font.className,
                    )}>Pinit</span>
                </Link>
            </Button>
            </Hint>
            <TabSeperator/>
            <Hint label="Edit Title" side="bottom" sideOffset={10}>
            <Button variant="board" 
            className=" text-base font-normal px-2" 
            onClick={()=>onOpen(data._id,data.title)}>
                {data.title}
            </Button>
            </Hint>
            <TabSeperator/>
            <Actions 
            id={data._id}
            title={data.title}
            side="bottom"
            sideOffset={10}>
                <div>
                   <Hint label="Main menu" side="bottom" sideOffset={10}>
                    <Button size="icon" variant="board">
                        <MenuIcon/>
                    </Button>
                    </Hint> 
                </div>
            </Actions>
            
        </div>
    )
}
export const InfoSkeleton=()=>{
    return(
        <div className="absolute top-2 left-2 bh-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]"/>
        
    )
}