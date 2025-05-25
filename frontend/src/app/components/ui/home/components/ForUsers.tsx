// components/ForUsers.tsx
import Button from '@/app/components/base/button/Button';
import Image from 'next/image';
import Link from 'next/link';

const ForUsers = () => {
  return (
    <section className="py-12 bg-white rounded-xl shadow-sm p-6 my-12">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">For Users</h2>
          <p className="text-lg text-gray-600">
            Find the perfect service provider for your needs with just a few clicks.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <svg className="h-6 w-6 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Browse thousands of service providers</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Compare prices and read reviews</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Book appointments instantly</span>
            </li>
          </ul>
          <Button variant="primary">
            <Link href="/merchants">
              Find Services
            </Link>
          </Button>
        </div>
        <div className="md:w-1/2">
          <div className="relative aspect-video">
            <Image 
              src="/images/custom_product.svg" 
              alt="For Users"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForUsers;