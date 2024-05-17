"use client";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { useMutation, useSelf } from "@/liveblocks.config";
import { Camera,Color } from "@/types/canvas";
import { memo } from "react";
import { ColorPicker } from "./color-picker";
import { useDeleteLayers } from "@/hooks/use-delete-layer";
import { Hint } from "@/components/hints";
import { Button } from "@/components/ui/button";
import { BringToFront, SendToBack, Trash2 } from "lucide-react";


interface SelectionToolsProps{
    camera:Camera;
    setLastUsedColor:(color:Color)=>void;
}

export const SelectionTools=memo(({camera,setLastUsedColor}:SelectionToolsProps)=>{
    const selection = useSelf((me) => me.presence.selection);

    const moveToBack=useMutation((
        {storage}
    )=>{
        const livelayerIds = storage.get("layerIds");
        const indices:number[]=[];
        const arr = livelayerIds.toImmutable();
        for(let i=0;i<arr.length;i++){
            if(selection.includes(arr[i])){
                indices.push(i);
            }
        }
        for(let i =0;i<indices.length;i++){
            livelayerIds.move(indices[i],i)
        }
    },[selection])

    const moveToFront=useMutation((
        {storage}
    )=>{
        const livelayerIds = storage.get("layerIds");
        const indices:number[]=[];
        const arr = livelayerIds.toImmutable();
        for(let i=0;i<arr.length;i++){
            if(selection.includes(arr[i])){
                indices.push(i);
            }
        }
        for(let i=indices.length-1;i>=0;i--){
            livelayerIds.move(indices[i],arr.length-1-(indices.length-1-i))
        }
    },[selection])

    const setFill = useMutation((
        {storage},fill:Color,
    )=>{
        const liveLayers = storage.get("layers");
        setLastUsedColor(fill);
        selection.forEach((id)=>{
            liveLayers.get(id)?.set("fill",fill)
        })
    },[selection,setLastUsedColor])

    const deleteLayers=useDeleteLayers();

    const selectionBounds=useSelectionBounds();
    if(!selectionBounds){
        return null;
    }
    const x=selectionBounds.width/2 + selectionBounds.x + camera.x;
    const y=selectionBounds.y + camera.y;
    
    return(
        <div className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none"
        style={{
           transform:`translate(
            calc(${x}px - 50%),
            calc(${y-16}px - 100%)
            )` 
        }}>
            <ColorPicker onChange={setFill}/>
            <div className="flex flex-col gap-y-0.5 justify-center">
                <Hint label="Bring to Front">
                    <Button variant="board"
                    size="icon"
                    onClick={moveToFront}>
                        <BringToFront/>
                    </Button>
                </Hint>
                <Hint label="Send to Back" side="bottom">
                    <Button variant="board"
                    size="icon"
                    onClick={moveToBack}>
                        <SendToBack/>
                    </Button>
                </Hint>
            </div>
            <div className="flex items-center pl-2 ml-2 bordel-l border-neutral-200">
                <Hint label="Delete">
                    <Button variant="board" size="icon" onClick={deleteLayers}>
                        <Trash2/>
                    </Button>
                </Hint>

            </div>
        </div>
    )
})
SelectionTools.displayName="SelectionTools"