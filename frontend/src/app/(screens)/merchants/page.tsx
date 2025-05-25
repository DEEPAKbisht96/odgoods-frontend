// app/merchants/page.tsx
'use client';

import { useState } from 'react';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { merchants } from '@/dummy_data/data/merchants';
import MerchantCard from '@/app/components/ui/merchant/MerchantCard';

const Merchants = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Get all unique categories from merchants
  const allCategories = Array.from(
    new Set(merchants.flatMap(merchant => merchant.categories))
  );

  // Filter merchants based on search, categories, and rating
  const filteredMerchants = merchants.filter((merchant) => {
    // Search term filter
    const matchesSearch =
      merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      merchant.description.toLowerCase().includes(searchTerm.toLowerCase());

    // Category filter
    const matchesCategories =
      selectedCategories.length === 0 ||
      selectedCategories.some(cat => merchant.categories.includes(cat));

    // Rating filter
    const matchesRating = merchant.rating >= minRating;

    return matchesSearch && matchesCategories && matchesRating;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setMinRating(0);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
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
                  placeholder="Search merchants..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Minimum Rating</h3>
                <div className="flex items-center space-x-2 mt-2">
                  {[0, 3, 4, 4.5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setMinRating(rating)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        minRating === rating
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {rating === 0 ? 'Any' : `${rating}+`}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Categories</h3>
                <div className="mt-2 space-y-2">
                  {allCategories.map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        id={`mobile-category-${category}`}
                        name={`mobile-category-${category}`}
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => {
                          setSelectedCategories(prev =>
                            prev.includes(category)
                              ? prev.filter(c => c !== category)
                              : [...prev, category]
                          );
                        }}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`mobile-category-${category}`}
                        className="ml-3 text-sm text-gray-700"
                      >
                        {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

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
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Featured Merchants</h1>
              <p className="mt-1 text-sm text-gray-500">
                Choose a merchant to fulfill your custom product request
              </p>
            </div>
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
                  placeholder="Search merchants..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Minimum Rating</h3>
                <div className="flex items-center space-x-2 mt-2">
                  {[0, 3, 4, 4.5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setMinRating(rating)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        minRating === rating
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {rating === 0 ? 'Any' : `${rating}+`}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Categories</h3>
                <div className="mt-2 space-y-2">
                  {allCategories.map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        id={`category-${category}`}
                        name={`category-${category}`}
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => {
                          setSelectedCategories(prev =>
                            prev.includes(category)
                              ? prev.filter(c => c !== category)
                              : [...prev, category]
                          );
                        }}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className="ml-3 text-sm text-gray-700"
                      >
                        {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={clearFilters}
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                Clear all filters
              </button>
            </div>

            {/* Merchant grid */}
            <div className="lg:col-span-3">
              {filteredMerchants.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMerchants.map((merchant) => (
                    <MerchantCard key={merchant.id} merchant={merchant} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900">
                    No merchants found
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

export default Merchants;