"use client"
import { title } from "@/components/primitives";
import { Card, CardBody } from "@heroui/card";
import { useTheme } from "next-themes";

const PricingPage = () => {
  const { theme } = useTheme();

  const bgImage =
    theme === "dark"
      ? "url('/dark-background.jpg')" // your dark mode image
      : "url('/light-background.png')";

  return (
    <div
      className="h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: bgImage }}
    >
      <div className="flex gap-6">
        <Card className="w-64 shadow-lg">
          <CardBody>
            <h2 className="text-lg font-semibold">Card One</h2>
            <p>Put some text or buttons here.</p>
          </CardBody>
        </Card>
        <Card className="w-64 shadow-lg">
          <CardBody>
            <h2 className="text-lg font-semibold">Card Two</h2>
            <p>More content goes here.</p>
          </CardBody>
        </Card>
      </div>
    </div>

  );  
}

export default PricingPage;

