"use client";

import { useState, useEffect } from "react";

type Category = {
  id: string;
  name: string;
};

export default function CreateEventPage() {
  const [name, setName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [salesStart, setSalesStart] = useState("");
  const [salesEnd, setSalesEnd] = useState("");
  const [imagePreview, setImagePreview] = useState<FileList | null>(null);
  const [imageContent, setImageContent] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/categories");
        const data = await response.json();
        setCategories(data.data || []); // Adjust based on your API response structure
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(e.target.selectedOptions);
    const values = options.map((opt) => opt.value);
    setSelectedCategories(values);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !name ||
      !shortDescription ||
      !description ||
      !eventDate ||
      !location ||
      !price ||
      !stock ||
      !salesStart ||
      !salesEnd ||
      !imagePreview ||
      !imageContent ||
      selectedCategories.length === 0
    ) {
      setMessage("Please fill in all fields and upload images.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("shortDescription", shortDescription);
    formData.append("description", description);
    formData.append("eventDate", eventDate);
    formData.append("location", location);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("salesStart", salesStart);
    formData.append("salesEnd", salesEnd);

    selectedCategories.forEach((id) => {
      formData.append("categories", id); // can append multiple values
    });

    Array.from(imagePreview).forEach((file) => {
      formData.append("imagePreview", file);
    });

    Array.from(imageContent).forEach((file) => {
      formData.append("imageContent", file);
    });

    try {
      setLoading(true);
      setMessage("");

      const response = await fetch("http://localhost:8000/api/v1/events", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to create event.");
      }

      setMessage("Event created successfully!");
      setName("");
      setShortDescription("");
      setDescription("");
      setEventDate("");
      setLocation("");
      setPrice("");
      setStock("");
      setSalesStart("");
      setSalesEnd("");
      setImagePreview(null);
      setImageContent(null);
      setSelectedCategories([]);
    } catch (error) {
      console.error(error);
      setMessage("Failed to create event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 pt-32">
      <h1 className="text-3xl font-bold mb-6">Create New Event</h1>

      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.includes("success")
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Event Name</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Short Description</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            className="w-full border rounded p-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Event Date</label>
          <input
            type="datetime-local"
            className="w-full border rounded p-2"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Location</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Price</label>
          <input
            type="number"
            step="0.01"
            className="w-full border rounded p-2"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Stock</label>
          <input
            type="number"
            className="w-full border rounded p-2"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Sales Start</label>
          <input
            type="datetime-local"
            className="w-full border rounded p-2"
            value={salesStart}
            onChange={(e) => setSalesStart(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Sales End</label>
          <input
            type="datetime-local"
            className="w-full border rounded p-2"
            value={salesEnd}
            onChange={(e) => setSalesEnd(e.target.value)}
            required
          />
        </div>

        {/* Category Selection */}
        <div>
          <label className="block mb-1 font-semibold">Categories</label>
          <select
            multiple
            value={selectedCategories}
            onChange={handleCategoryChange}
            className="w-full border rounded p-2"
            required
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-600">
            Hold down the Ctrl (Windows) or Cmd (Mac) key to select multiple
            categories.
          </p>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Image Preview</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImagePreview(e.target.files)}
            className="w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Image Content</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImageContent(e.target.files)}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}
