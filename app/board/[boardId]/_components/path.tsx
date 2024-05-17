import { getSvgPathFromStroke } from "@/lib/utils";
import getStroke from "perfect-freehand";
import React from "react";

interface PathProps {
    x: number;
    y: number;
    points: number[][];
    fill: string;
    onPointerDown?: (e: React.PointerEvent) => void;
    stroke?: string;
}

export const Path = ({
    x,
    y,
    points,
    fill,
    onPointerDown,
    stroke,
}: PathProps) => {
    
    const strokePoints = getStroke(points, {
        size: 16,
        thinning: 0.5,
        smoothing: 0.5,
        streamline: 0.5,
    });

    
    const d = getSvgPathFromStroke(strokePoints);

    return (
        <path
            className="drop-shadow-md"
            onPointerDown={onPointerDown}
            d={d}
            style={{
                transform: `translate(${x}px, ${y}px)`,
            }}
            fill={fill}
            stroke={stroke}
            strokeWidth={1}
        />
    );
};
