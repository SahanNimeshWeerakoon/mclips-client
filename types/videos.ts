export type Video = {
    id?: string;
    name: string;
    description?: string;
    video: string;
    genres?: string[];
    thumbnail?: string;
    createdAt?: Date;
    downloadCount?: number;
    viewsCount?: number;
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