"use client"

import { useEffect } from 'react';
import { Rnd } from 'react-rnd'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Crop } from '@/types/clips';

interface Props {
    videoHeight: number;
    videoWidth: number;
    crop: Crop;
    setCrop: Function;
}

const DEFAULT_WIDTH = 200;
const DEFAULT_HEIGHT = 200;

export default function CropBox({ crop, setCrop, videoHeight, videoWidth }: Props) {
    const selectedCropRatio = useSelector((state: RootState) => state.crop.ratio);

    useEffect(() => {
        let height = videoHeight ?? DEFAULT_HEIGHT;
        let width = videoHeight ? videoHeight/2 : DEFAULT_WIDTH

        if(selectedCropRatio) {
            if(selectedCropRatio[0] > selectedCropRatio[1]) {
                width = videoWidth ? videoWidth : DEFAULT_WIDTH;
                height = (width / selectedCropRatio[0]) * selectedCropRatio[1];
            } else {
                height = videoHeight ? videoHeight : DEFAULT_HEIGHT;
                width = (height / selectedCropRatio[1]) * selectedCropRatio[0];
            }
        }

        setCrop((prev: Crop) => ({ ...prev, height, width  }));
    }, [videoHeight, selectedCropRatio]);

    return (
        <Rnd
            size={{ width: crop.width, height: crop.height }}
            position={{ x: crop.x as number, y: crop.y as number }}
            onDragStop={(_, d) => setCrop((prev: Crop) => ({...prev, x: d.x, y: d.y}))}
            onResizeStop={
                (_, __, ref, ___, position) => setCrop((prev: Crop) => ({...prev, width: parseInt(ref.style.width.replace("px", "")), height: parseInt(ref.style.height.replace("px", "")), ...position }))
            }
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