import Link from "next/link";
import Image from "next/image";

export default function CategoryCard(props: {
  src: string;
  alt: string;
  title: string;
  href: string;
}) {
  return (
    <div>
      <Link
        href={props.href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex flex-col items-center justify-center "
      >
        <div className="relative w-32 h-32 border rounded-full flex items-center justify-center">
          <div className="relative w-16 h-16 overflow-hidden">
            <Image
              fill
              className="object-cover"
              src={props.src}
              alt={props.alt}
            />
          </div>
        </div>
        <p className="text-base justify-center pt-3">{props.title}</p>
      </Link>
    </div>
  );
}
