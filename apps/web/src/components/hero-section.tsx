import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="px-4 pt-28 lg:pt-24" id="hero-section">
      <div className="relative w-full min-h-[60vh] max-w-7xl mx-auto rounded-2xl lg:rounded-4xl overflow-hidden bg-black">
        <Image
          fill
          className="object-contain object-center"
          src="/hero/hero-concert-banner.png"
          alt="Home Banner"
        />
      </div>
    </section>
  );
}
