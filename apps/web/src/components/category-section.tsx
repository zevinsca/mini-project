"use client";

import React, { useEffect, useState } from "react";
import CategoryCard from "./category-card";

type Category = {
  id: string;
  name: string;
  image: string;
  description: string;
};

export default function CategorySection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

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
          <CategoryCard
            key={category.id}
            href={`/categories/${category.name.toLowerCase()}`}
            src={category.image}
            alt={`${category.name} Category`}
            title={category.name}
          />
        ))}
      </div>
    </section>
  );
}
