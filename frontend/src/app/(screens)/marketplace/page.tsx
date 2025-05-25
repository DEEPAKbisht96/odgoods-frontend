// app/marketplace/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Navbar from '@/app/components/ui/home/components/Navbar';

// Mock data type - replace with your actual data structure from API
type Product = {
  id: string;
  productName: string;
  category: string;
  description: string;
  quantity: number;
  deadline: string;
  budget: number;
  referenceLinks: string;
  specialRequirements: string;
  createdAt: string;
  status: 'pending' | 'in-progress' | 'completed';
};

const Marketplace = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    minBudget: '',
    maxBudget: '',
    status: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  // Categories from your demand product form
  const categories = [
    '3D Printed Items',
    'Custom Jewelry',
    'Electronics',
    'Furniture',
    'Home Decor',
    'Fashion Accessories',
    'Artwork',
    'Custom Clothing',
    'Other',
  ];

  // Fetch products - in a real app, this would be an API call
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        // Mock data - replace with actual API call
        const mockProducts: Product[] = [
          {
            id: '1',
            productName: 'Custom Wooden Desk',
            category: 'Furniture',
            description: 'Handcrafted wooden desk with storage compartments',
            quantity: 1,
            deadline: '2023-12-15',
            budget: 500,
            referenceLinks: 'https://pinterest.com/custom-desks',
            specialRequirements: 'Eco-friendly materials only',
            createdAt: '2023-11-01T10:30:00Z',
            status: 'pending',
          },
          {
            id: '2',
            productName: 'Personalized Necklace',
            category: 'Custom Jewelry',
            description: 'Silver necklace with name engraving',
            quantity: 2,
            deadline: '2023-12-20',
            budget: 150,
            referenceLinks: 'https://instagram.com/jewelry-examples',
            specialRequirements: 'Need by Christmas',
            createdAt: '2023-11-05T14:45:00Z',
            status: 'in-progress',
          },
          {
            id: '3',
            productName: 'Smart Home Controller',
            category: 'Electronics',
            description: 'Custom PCB for home automation',
            quantity: 5,
            deadline: '2024-01-10',
            budget: 1200,
            referenceLinks: 'https://example.com/smart-home',
            specialRequirements: 'Must be compatible with Home Assistant',
            createdAt: '2023-11-10T09:15:00Z',
            status: 'pending',
          },
          {
            id: '4',
            productName: 'Abstract Wall Art',
            category: 'Artwork',
            description: 'Large canvas painting in modern abstract style',
            quantity: 1,
            deadline: '2023-12-01',
            budget: 800,
            referenceLinks: '',
            specialRequirements: 'Color scheme: blues and greys',
            createdAt: '2023-10-28T16:20:00Z',
            status: 'completed',
          },
        ];

        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let result = [...products];

    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (product) =>
          product.productName.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term)
      );
    }

    // Apply category filter
    if (filters.category) {
      result = result.filter((product) => product.category === filters.category);
    }

    // Apply budget filters
    if (filters.minBudget) {
      const min = parseFloat(filters.minBudget);
      result = result.filter((product) => product.budget >= min);
    }

    if (filters.maxBudget) {
      const max = parseFloat(filters.maxBudget);
      result = result.filter((product) => product.budget <= max);
    }

    // Apply status filter
    if (filters.status) {
      result = result.filter((product) => product.status === filters.status);
    }

    setFilteredProducts(result);
  }, [searchTerm, filters, products]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      category: '',
      minBudget: '',
      maxBudget: '',
      status: '',
    });
    setSearchTerm('');
  };

  const viewProductDetails = (productId: string) => {
    router.push(`/marketplace/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        {/* navbar  */}
        <Navbar/>
      <div className="max-w-7xl mx-auto">

        {/* Search and Filter Bar */}
        <div className="mb-8 bg-white shadow rounded-lg p-4 mt-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FunnelIcon className="h-5 w-5 mr-2 text-gray-400" />
              Filters
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    value={filters.category}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="minBudget" className="block text-sm font-medium text-gray-700">
                    Min Budget ($)
                  </label>
                  <input
                    type="number"
                    id="minBudget"
                    name="minBudget"
                    className="mt-1 block w-full shadow-sm sm:text-sm rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    value={filters.minBudget}
                    onChange={handleFilterChange}
                    min="0"
                  />
                </div>

                <div>
                  <label htmlFor="maxBudget" className="block text-sm font-medium text-gray-700">
                    Max Budget ($)
                  </label>
                  <input
                    type="number"
                    id="maxBudget"
                    name="maxBudget"
                    className="mt-1 block w-full shadow-sm sm:text-sm rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    value={filters.maxBudget}
                    onChange={handleFilterChange}
                    min="0"
                  />
                </div>

                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    value={filters.status}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4 flex justify-between items-center">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{filteredProducts.length}</span> results
          </p>
          {Object.values(filters).some(Boolean) || searchTerm ? (
            <button
              onClick={resetFilters}
              className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
            >
              Clear all
              <XMarkIcon className="ml-1 h-4 w-4" />
            </button>
          ) : null}
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300 cursor-pointer"
                  onClick={() => viewProductDetails(product.id)}
                >
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex justify-between">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {product.productName}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          product.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : product.status === 'in-progress'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {product.status.replace('-', ' ')}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <span className="truncate">{product.category}</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                      {product.description}
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Quantity</p>
                        <p className="text-sm text-gray-900">{product.quantity}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Budget</p>
                        <p className="text-sm text-gray-900">${product.budget.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Deadline</p>
                        <p className="text-sm text-gray-900">
                          {new Date(product.deadline).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Posted</p>
                        <p className="text-sm text-gray-900">
                          {new Date(product.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-500">
                  <MagnifyingGlassIcon className="mx-auto h-12 w-12" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No products found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your search or filter to find what you're looking for.
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={resetFilters}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Reset all filters
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;