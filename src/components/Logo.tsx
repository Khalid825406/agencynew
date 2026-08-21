import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="inline-flex shrink-0 items-center select-none">
      <Image
        src="/nexbravelogobackbg.png"
        alt="NexBrave Solutions"
        width={959}
        height={260}
        priority
        className="h-8 w-auto sm:h-9"
      />
    </Link>
  );
}
