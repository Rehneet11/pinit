"use client";

import { useStorage } from "@/liveblocks.config";
import { LayerType } from "@/types/canvas";
import { memo } from "react";
import { Rectangle } from "./rectangle";
import { Ellipse } from "./ellipse";
import { Text } from "./board-text";
import { Note } from "./note";
import { Path } from "./path";
import { ColorToCSS } from "@/lib/utils";
interface LayerPreviewProps{
    id:string;
    onLayerPointerDown:(e:React.PointerEvent,layerId:string)=>void;
    selectionColor?:string
}
export const LayerPreview=memo(({id,
    onLayerPointerDown,
    selectionColor
}:LayerPreviewProps)=>{
    const layer=useStorage((root)=>root.layers.get(id));
    
    if(!layer){
        return null
    }
    switch(layer.type){
        case LayerType.Path:
            return(
                <Path
                key={id}
                points={layer.points}
                onPointerDown={(e)=>onLayerPointerDown(e,id)}
                stroke={selectionColor}
                x={layer.x}
                y={layer.y}
                fill={layer.fill ? ColorToCSS(layer.fill):"#000"}/>
            )
        case LayerType.Note:
            return(
               <Note 
               id={id}
               layer={layer}
               onPointerDown={onLayerPointerDown}
               selectionColor={selectionColor}/> 
            )
        case LayerType.Text:
            return(
               <Text 
               id={id}
               layer={layer}
               onPointerDown={onLayerPointerDown}
               selectionColor={selectionColor}/> 
            )
        case LayerType.Ellipse:
            return(
                <Ellipse id={id}
                layer={layer}
                onPointerDown={onLayerPointerDown}
                selectionColor={selectionColor}/>   
            )
        case LayerType.Rectangle:
            return(
                    <Rectangle id={id}
                    layer={layer}
                    onPointerDown={onLayerPointerDown}
                    selectionColor={selectionColor}/>    
            )
        default:
            console.warn("Unknown Layer Type");
            return null
    }
    return(
        <div>
            
        </div>
    )
});
LayerPreview.displayName="LayerPreview"