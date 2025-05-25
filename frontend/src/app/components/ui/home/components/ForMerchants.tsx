// components/ForMerchants.tsx
import Button from '@/app/components/base/button/Button';
import Image from 'next/image';
import Link from 'next/link';

const ForMerchants = () => {
  return (
    <section className="py-12 bg-white rounded-xl shadow-sm p-6 my-12">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2 order-2 md:order-1">
          <div className="relative aspect-video">
            <Image 
              src="/images/company_illustration.svg" 
              alt="For Merchants"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="md:w-1/2 space-y-6 order-1 md:order-2">
          <h2 className="text-3xl font-bold text-gray-900">For Merchants</h2>
          <p className="text-lg text-gray-600">
            Grow your business by reaching thousands of potential customers looking for your services.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <svg className="h-6 w-6 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Showcase your services to a targeted audience</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Get discovered by customers actively searching</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Manage bookings and payments seamlessly</span>
            </li>
          </ul>
          <Button variant="primary">
            <Link href="/signup/merchant">
              Join as a Merchant
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ForMerchants;