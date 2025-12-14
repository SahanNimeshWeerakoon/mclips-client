"use client"

import { useEffect, useState } from 'react';
import { Rnd } from 'react-rnd'

interface Props {
    videoHeight: number;
}

type CropDimensions = {
    width: number | string;
    height: number | string;
    x: number | string;
    y: number | string;
}

export default function CropBox({ videoHeight }: Props) {
    const [cropperDimensions, setCropperDimenssions] = useState<CropDimensions>({ width: 200, height: 200, x: 0, y: 0 });

    useEffect(() => {
        setCropperDimenssions(prev => ({...prev, height: videoHeight ?? 200, width: videoHeight ? videoHeight/2 : 100 }));
    }, [videoHeight]);

    return (
        <Rnd
            size={{ width: cropperDimensions.width, height: cropperDimensions.height }}
            position={{ x: cropperDimensions.x as number, y: cropperDimensions.y as number }}
            onDragStop={(_, d) => setCropperDimenssions(prev => ({...prev, x: d.x, y: d.y}))}
            onResizeStop={(_, __, ref, ___, position) => setCropperDimenssions(prev => ({...prev, width: ref.style.width, height: ref.style.height, ...position }))}
            enableResizing={{ top: true, right: true, bottom: true, left: true, topRight: true, bottomRight: true, bottomLeft: true, topLeft: true }}
        >
            <div className="relative w-full h-full border border-white shadow-[0_0_0_9999px_rgba(0,0,0,0.25)]">
                <span className="tl absolute w-3 h-3 bg-white"></span>
                <span className="tr absolute w-3 h-3 bg-white"></span>
                <span className="bl absolute w-3 h-3 bg-white"></span>
                <span className="br absolute w-3 h-3 bg-white"></span>
            </div>
        </Rnd>
    );
}