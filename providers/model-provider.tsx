"use client";
import { useEffect,useState } from "react";
import { RenameModel } from "@/components/models/rename-model";

export const ModelProvider=()=>{
    const [isMounted,setMounted]=useState(false);

    useEffect(()=>{
        setMounted(true)
    },[])
    
    return(
        <>
            <RenameModel/>
        </>
    )
}