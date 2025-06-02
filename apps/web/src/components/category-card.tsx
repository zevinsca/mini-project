import Link from "next/link";
import Image from "next/image";

type CategoryCardProps = {
  src: string;
  alt: string;
  title: string;
  href: string;
};

export default function CategoryCard({
  src,
  alt,
  title,
  href,
}: CategoryCardProps) {
  return (
    <div className="flex flex-col items-center">
      <Link
        href={href}
        className="flex flex-col items-center justify-center"
        aria-label={title}
      >
        <div className="relative w-24 h-24 border rounded-full overflow-hidden flex items-center justify-center">
          <Image
            src={src}
            alt={alt}
            className="object-cover "
            width={50}
            height={50}
          />
        </div>
        <p className="text-base pt-3 text-center">{title}</p>
      </Link>
    </div>
  );
}
