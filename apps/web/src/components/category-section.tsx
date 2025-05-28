import CategoryCard from "./category-card";

export default function CategorySection() {
  return (
    <section
      className="mx-auto container lg:pt-20 pt-10 lg:px-16 px-3"
      id="category-section"
    >
      <div className="grid lg:grid-cols-6 grid-cols-2 gap-3">
        <CategoryCard
          href="/"
          src="/category/visual-arts.png"
          alt="Visual Arts Category"
          title="Visual Arts"
        />
        <CategoryCard
          href="/"
          src="/category/games.jpg"
          alt="Games Category"
          title="Games"
        />
        <CategoryCard
          href="/"
          src="/category/media.jpg"
          alt="Media Category"
          title="Media"
        />
        <CategoryCard
          href="/"
          src="/category/culture.jpg"
          alt="Culture Category"
          title="Culture"
        />
        <CategoryCard
          href="/"
          src="/category/top-list.jpg"
          alt="Top Lists & Features Category"
          title="Top Lists & Features"
        />
        <CategoryCard
          href="/"
          src="/category/collectibles.jpg"
          alt="Merch and Collectibles Category"
          title="Merch and Collectibles"
        />
      </div>
    </section>
  );
}
