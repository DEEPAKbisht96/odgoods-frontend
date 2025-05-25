// components/ui/PriceRangeFilter.tsx
import { useState } from 'react';

type PriceRangeFilterProps = {
  onChange: (min: number, max: number) => void;
};

const PriceRangeFilter = ({ onChange }: PriceRangeFilterProps) => {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(5000);

  const handleApply = () => {
    onChange(minPrice, maxPrice);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-gray-900">Price Range</h3>
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <label htmlFor="minPrice" className="block text-sm text-gray-700 mb-1">
            Min
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              name="minPrice"
              id="minPrice"
              min="0"
              max={maxPrice - 1}
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="flex-1">
          <label htmlFor="maxPrice" className="block text-sm text-gray-700 mb-1">
            Max
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              name="maxPrice"
              id="maxPrice"
              min={minPrice + 1}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>
      <button
        onClick={handleApply}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 text-sm"
      >
        Apply
      </button>
    </div>
  );
};

export default PriceRangeFilter;