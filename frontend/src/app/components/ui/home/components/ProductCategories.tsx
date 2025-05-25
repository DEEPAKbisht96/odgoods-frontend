// components/ProductCategories.tsx

import { categories } from "@/dummy_data/data/categories";
import CategoryCard from "./CategoryCard";

const ProductCategories = () => {
  return (
    <section className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">Product Categories</h2>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Choose from our wide range of customizable product categories
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
};

export default ProductCategories;