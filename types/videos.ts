export type Video = {
    _id?: string;
    name: string;
    video: string;
    createdAt?: Date;
    videoKey: string;
    genres?: string[];
    thumbnail?: string;
    viewsCount?: number;
    description?: string;
    downloadCount?: number;
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

export type SearchParams = {
    keyword?: string;
    genres?: string[];
}