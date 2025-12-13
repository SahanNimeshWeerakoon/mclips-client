"use client"

import { ReactNode, useState } from 'react';
import { Rnd } from 'react-rnd'

interface Props {
    children: ReactNode
}

type CropDimensions = {
    width: number | string;
    height: number | string;
    x: number | string;
    y: number | string;
}

export default function CropBox({ children }: Props) {
    const [cropperDimensions, setCropperDimenssions] = useState<CropDimensions>({ width: 200, height: 200, x: 0, y: 0 });
    return (
        <Rnd
            style={{  }}
            size={{ width: cropperDimensions.width, height: cropperDimensions.height }}
            position={{ x: cropperDimensions.x as number, y: cropperDimensions.y as number }}
            onDragStop={(_, d) => setCropperDimenssions(prev => ({...prev, x: d.x, y: d.y}))}
            onResizeStop={(_, __, ref, ___, position) => setCropperDimenssions(prev => ({...prev, width: ref.style.width, height: ref.style.height, ...position }))}
        >
            {children}
        </Rnd>
    );
}