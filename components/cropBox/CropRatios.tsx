"use client"
import { useDispatch } from "react-redux";

import { AppDispatch } from "@/store/store";
import { setCropRatio } from "@/store/slices/cropSlice";

export default function CropRatios() {
    const dispatch = useDispatch<AppDispatch>();
    return (
        <div className="w-full flex items-end">
            <button
                className="mr-10 border rounded px-5 py-5"
                onClick={() => dispatch(setCropRatio([1, 1]))}>1:1</button>
            <button
                className="mr-10 border rounded px-8 py-6"
                onClick={() => dispatch(setCropRatio([4, 3]))}>4:3</button>
            <button
                className="mr-10 border rounded px-3 py-9"
                onClick={() => dispatch(setCropRatio([1, 3]))}>1:3</button>
        </div>
    );
}