import { Link } from "@heroui/link";
import { DownloadIcon as Icon } from "@/components/icons";

export default function DownloadIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <Link>
            <Icon className="w-5 h-5" />
        </Link>
    );
}