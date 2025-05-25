// app/sample-products/page.tsx
'use client';

import { useState } from 'react';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { sampleProducts } from '@/dummy_data/data/sample_products';
import CategoryFilter from '@/app/components/ui/sample_products/CategoryFilter';
import PriceRangeFilter from '@/app/components/ui/sample_products/PriceRangeFilter';
import ProductCard from '@/app/components/ui/home/components/ProductCard';
import Navbar from '@/app/components/ui/home/components/Navbar';

const SampleProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Extract price from priceRange string (e.g., "$30-$150" => [30, 150])
  const getPriceValues = (priceRange: string): [number, number] => {
    const prices = priceRange.replace('$', '').split('-').map(Number);
    return [prices[0], prices[1]];
  };

  // Filter products based on search, categories, and price range
  const filteredProducts = sampleProducts.filter((product) => {
    // Search term filter
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.examples.some((example) =>
        example.toLowerCase().includes(searchTerm.toLowerCase())
      );

    // Category filter
    const matchesCategories =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    // Price range filter
    const [minPrice, maxPrice] = getPriceValues(product.priceRange);
    const [selectedMin, selectedMax] = priceRange;
    const matchesPriceRange =
      (minPrice >= selectedMin && minPrice <= selectedMax) ||
      (maxPrice >= selectedMin && maxPrice <= selectedMax);

    return matchesSearch && matchesCategories && matchesPriceRange;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setPriceRange([0, 5000]);
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      <Navbar/>

      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile filter dialog */}
        <div
          className={`fixed inset-0 z-40 lg:hidden ${
            mobileFiltersOpen ? 'block' : 'hidden'
          }`}
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
          <div className="fixed inset-y-0 right-0 max-w-xs flex flex-col w-full h-full bg-white shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                className="-mr-2 w-10 h-10 p-2 flex items-center justify-center text-gray-400 hover:text-gray-500"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4 space-y-6">
              <div>
                <label htmlFor="mobile-search" className="sr-only">
                  Search
                </label>
                <input
                  type="text"
                  id="mobile-search"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <CategoryFilter
                selectedCategories={selectedCategories}
                onChange={setSelectedCategories}
              />
              <PriceRangeFilter
                onChange={(min, max) => setPriceRange([min, max])}
              />
              <button
                onClick={clearFilters}
                className="w-full text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                Clear all filters
              </button>
            </div>
          </div>
        </div>

        <main className="py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Custom Products</h1>
            <button
              type="button"
              className="lg:hidden p-2 -m-2 text-gray-400 hover:text-gray-500"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <FunnelIcon className="h-5 w-5" />
              <span className="sr-only">Filters</span>
            </button>
          </div>

          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* Filters */}
            <div className="hidden lg:block space-y-6">
              <div>
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <input
                  type="text"
                  id="search"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <CategoryFilter
                selectedCategories={selectedCategories}
                onChange={setSelectedCategories}
              />
              <PriceRangeFilter
                onChange={(min, max) => setPriceRange([min, max])}
              />
              <button
                onClick={clearFilters}
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                Clear all filters
              </button>
            </div>

            {/* Product grid */}
            <div className="lg:col-span-3">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900">
                    No products found
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your search or filter criteria
                  </p>
                  <button
                    onClick={clearFilters}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SampleProducts;