import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { title, subtitle } from "@/components/primitives";
import Search from "@/components/search/search";
import { Videos } from "@/components/video/videos";
import VideoCropper from "@/components/video/videoCropper";

export default function Home() {
  return (
    <section className="mx-auto py-10 px-10">
      <Search />
      <Videos />
    </section>
  );
}
