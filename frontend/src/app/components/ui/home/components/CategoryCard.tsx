// components/ui/CategoryCard.tsx
import { ProductCategory } from '@/types';
import Link from 'next/link';

const CategoryCard = ({ category }: { category: ProductCategory }) => {
  return (
    <Link href={`/samples`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition h-full flex flex-col">
        <div className="p-6 flex-grow">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
              <category.icon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold ml-4">{category.name}</h3>
          </div>
          <p className="text-gray-600">{category.description}</p>
        </div>
        <div className="px-6 pb-4">
          <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            Browse Products →
          </button>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;