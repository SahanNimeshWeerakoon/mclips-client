export type Clip = {
    id?: string;
    name: string;
    description?: string;
    video: string;
    genres?: string[];
}

export type VideoSize = {
    width: number;
    height: number;
}

export type Crop = VideoSize & {
    x: number;
    y: number;
}

export interface VideoCropperHandle {
    cropVideo: () => void;
}