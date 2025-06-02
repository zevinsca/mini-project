"use client";

import React, { useEffect, useState } from "react";
import CategoryCard from "./category-card";
import FilteredEventsSection from "./filtered-events-section";

type Category = {
  id: string;
  name: string;
  image: string;
  description: string;
};

export default function CategorySection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/categories");
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  const handleClearFilter = () => {
    setSelectedCategory(null);
  };

  if (loading) {
    return (
      <section
        className="mx-auto container lg:pt-20 pt-10 lg:px-16 px-3"
        id="category-section"
      >
        <p>Loading categories...</p>
      </section>
    );
  }

  return (
    <section
      className="mx-auto container lg:pt-20 pt-10 lg:px-16 px-3"
      id="category-section"
    >
      <p className="font-bold text-center text-3xl pb-10">Event Categories</p>
      <div className="grid lg:grid-cols-6 grid-cols-2 gap-3">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => handleCategoryClick(category.name)}
          >
            <CategoryCard
              href="#"
              src={category.image}
              alt={`${category.name} Category`}
              title={category.name}
            />
          </div>
        ))}
      </div>

      {/* Clear Filter Button */}
      {selectedCategory && (
        <div className="mt-4 text-center">
          <button
            onClick={handleClearFilter}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Show All Events
          </button>
        </div>
      )}

      {/* Show Events */}
      <div className="mt-10">
        <FilteredEventsSection category={selectedCategory || undefined} />
      </div>
    </section>
  );
}
