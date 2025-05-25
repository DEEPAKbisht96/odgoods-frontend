// components/ui/MerchantCard.tsx
import { Merchant } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { StarIcon } from '@heroicons/react/24/solid';

const MerchantCard = ({ merchant }: { merchant: Merchant }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition h-full flex flex-col border border-gray-100">
      <div className="relative h-48">
        <Image 
          src={merchant.imageUrl}
          alt={merchant.name}
          fill
          className="object-cover"
        />
        {merchant.featured && (
          <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">
            Featured
          </div>
        )}
      </div>
      <div className="p-4 flex-grow">
        <h3 className="font-semibold text-lg mb-1">{merchant.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{merchant.description}</p>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <StarIcon className="h-4 w-4 text-yellow-500" />
            <span className="ml-1 text-sm font-medium text-gray-900">
              {merchant.rating}
            </span>
            <span className="mx-1 text-gray-300">|</span>
            <span className="text-sm text-gray-500">
              {merchant.reviewCount} reviews
            </span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {merchant.categories.map((category, index) => (
            <span 
              key={index} 
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
            >
              {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </span>
          ))}
        </div>
      </div>
      <div className="px-4 pb-4 flex justify-between items-center text-sm">
        <div>
          <span className="text-gray-500">Delivery in</span>{' '}
          <span className="font-medium">{merchant.deliveryTime}</span>
        </div>
        <div>
          <span className="text-gray-500">Min order</span>{' '}
          <span className="font-medium">{merchant.minOrder}</span>
        </div>
      </div>
      <div className="px-4 pb-4">
        <Link 
          href={`/merchants/${merchant.id}`}
          className="w-full block text-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition text-sm font-medium"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default MerchantCard;