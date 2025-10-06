import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import Search from "@/components/search/search";
import { Videos } from "@/components/video/videos";
import VideoCropper from "@/components/video/videoCropper";

export default function Home() {
  return (
    <section className="container mx-auto py-10 px-5">
      <Search />
      <Videos />
      <p>harida balapan puke amaruwa</p>
      {/* <VideoCropper videoUrl="/video.mp4" /> */}
    </section>
  );
}
