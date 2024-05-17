"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const EmptyBoards = () => {
    const {organization} = useOrganization();
    const {mutate,pending} = useApiMutation(api.board.create);
    const router=useRouter();
    const onClick=()=>{
        if(!organization) return;
        mutate({
            orgId:organization.id,
            title:"Untitled"
        })
        .then((id)=>{
            toast.success("Board Created")
            router.push(`/board/${id}`)
        })
        .catch(()=>{
          toast.error("Failed to create Board")  
        })
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <Image src="./NoBoards.svg" alt="Empty Search" height={200} width={200} />
            <h2 className="text-3xl font-semibold mt-6 ">
                Create your First Board!
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
                Create a Board for your Organization
            </p>
            <div className="mt-6">
                <Button disabled={pending} onClick={onClick} size="lg">
                    Create board
                </Button>
            </div>
        </div>
    );
};
