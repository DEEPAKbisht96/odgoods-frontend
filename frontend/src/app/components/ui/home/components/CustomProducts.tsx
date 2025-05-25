
import { customProducts } from "@/dummy_data/data/custom_product";
import ProductCard from "./ProductCard";
import Link from "next/link";

const CustomProducts = () => {
  return (
    <section className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">Popular Custom Products</h2>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Browse some of our most requested custom products
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {customProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      <div className="text-center mt-10">
        <button className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition">
          <Link href="/samples">
            View All Products
          </Link>
        </button>
      </div>
    </section>
  );
};

export default CustomProducts;