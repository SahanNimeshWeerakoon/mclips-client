"use client"

import { Link } from "@heroui/link";
import { DownloadIcon as Icon } from "@/components/icons";

interface Props {
    title: string;
    videoKey: string;
}

export default function DownloadIcon({ videoKey, title }: Props) {
    const handleClick = async () => {
        const res = await fetch(`/api/video/download?key=${videoKey}`);
        const resData = await res.json();

        const a = document.createElement("a");
        a.href = resData.data;
        a.download = `${title}.mp4`
        document.body.appendChild(a);
        a.click();
        a.remove();
    }
    return (
        <Link onClick={handleClick}>
            <Icon className="w-5 h-5" />
        </Link>
    );
}