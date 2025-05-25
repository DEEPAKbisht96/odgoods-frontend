// components/ui/CategoryFilter.tsx

import { sampleProducts } from "@/dummy_data/data/sample_products";

type CategoryFilterProps = {
  selectedCategories: string[];
  onChange: (categories: string[]) => void;
};

const CategoryFilter = ({ selectedCategories, onChange }: CategoryFilterProps) => {
  // Get unique categories from products
  const categories = Array.from(
    new Set(sampleProducts.map((product) => product.category))
  ).map((category) => ({
    id: category,
    name: category
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' '),
  }));

  const handleCategoryChange = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    onChange(newCategories);
  };

  return (
    <div className="space-y-2">
      <h3 className="font-medium text-gray-900">Categories</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center">
            <input
              id={`category-${category.id}`}
              name={`category-${category.id}`}
              type="checkbox"
              checked={selectedCategories.includes(category.id)}
              onChange={() => handleCategoryChange(category.id)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor={`category-${category.id}`}
              className="ml-3 text-sm text-gray-700"
            >
              {category.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;