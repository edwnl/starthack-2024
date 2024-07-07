import Title from "antd/es/typography/Title";
import { Button } from "antd";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="my-auto mx-auto text-center">
      <Title level={3} style={{ fontFamily: "Montserrat, sans-serif" }}>
        Page not found!
      </Title>
      <Link href="/" passHref>
        <Button>Back to Home</Button>
      </Link>
    </div>
  );
}
