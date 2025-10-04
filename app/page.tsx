import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import Search from "@/components/search/search";

export default function Home() {
  return (
    <section>
      <Search />
    </section>
  );
}
