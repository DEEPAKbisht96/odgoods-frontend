// components/ui/ProductCard.tsx
import { CustomProduct } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ product }: { product: CustomProduct }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition h-full flex flex-col">
      <div className="relative h-48">
        <Image 
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 flex-grow">
        <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
        
        <div className="mb-3">
          <h4 className="text-sm font-medium text-gray-900 mb-1">Example Requests:</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            {product.examples.map((example, index) => (
              <li key={index} className="flex items-start">
                <span className="text-indigo-500 mr-1">•</span>
                {example}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="px-4 pb-4 flex justify-between items-center">
        <span className="text-sm font-medium text-gray-900">{product.priceRange}</span>
        <span className="text-xs text-gray-500">{product.deliveryTime}</span>
      </div>
      <div className="px-4 pb-4">
        <Link 
          href={`/products/${product.id}`}
          className="w-full block text-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition text-sm font-medium"
        >
          Request This Product
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;