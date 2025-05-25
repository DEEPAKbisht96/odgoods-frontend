"use client"

// components/HeroSection.tsx
import Button from '@/app/components/base/button/Button';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-white to-indigo-50">
      {/* 3D floating elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-lg bg-indigo-100/50 shadow-lg transform rotate-12 animate-float-1"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-purple-100/50 shadow-lg transform -rotate-6 animate-float-2"></div>
        <div className="absolute bottom-1/4 left-1/3 w-28 h-28 rounded-lg bg-blue-100/50 shadow-lg transform rotate-45 animate-float-3"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Content */}
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              <span className="relative inline-block">
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                  Bespoke Creations
                </span>
              </span>
              <br />
              <span className="text-gray-800">Made Exactly to Your Vision</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-lg">
              Our artisan network transforms your ideas into reality. Perfect for unique gifts, 
              custom home decor, or personalized tech accessories.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button 
                variant="primary" 
                className="relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <Link href="/merchants">
                    View Merchants
                  </Link>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
              </Button>
              <Button 
                variant="secondary"
                className="group relative overflow-hidden border border-gray-200 bg-white hover:bg-gray-50"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <Link href="/samples">
                    See Some Samples
                  </Link>
                </span>
                <span className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
              </Button>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                    <Image 
                      src={`/images/avatars/avatar_${item}.png`}
                      width={40}
                      height={40}
                      alt={`Customer ${item}`}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-600">
                <p>Trusted by 500+ creators</p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-gray-500">5.0 (200+ reviews)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="lg:w-1/2 relative">
            <div className="relative aspect-[1/1] rounded-3xl overflow-hidden shadow-2xl bg-white">
              {/* Main product showcase */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="relative w-full h-full">
                  <Image 
                    src="/images/main_hero_product.jpg" 
                    alt="Custom product examples"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
              
              {/* Floating product cards */}
              <div className="absolute -left-6 -top-6 w-40 h-40 bg-white rounded-2xl shadow-xl p-3 transform rotate-6 transition-all duration-500 hover:rotate-0 hover:scale-105">
                <div className="w-full h-full bg-indigo-50 rounded-lg flex items-center justify-center overflow-hidden">
                  <Image 
                    src="/images/product_1.png" 
                    width={160}
                    height={160}
                    alt="Custom engraved watch"
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-white rounded-2xl shadow-xl p-3 transform -rotate-3 transition-all duration-500 hover:rotate-0 hover:scale-105">
                <div className="w-full h-full bg-purple-50 rounded-lg flex items-center justify-center overflow-hidden">
                  <Image 
                    src="/images/product_2.png" 
                    width={144}
                    height={144}
                    alt="Personalized notebook"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes float-1 {
          0%, 100% { transform: translateY(0) rotate(12deg); }
          50% { transform: translateY(-20px) rotate(15deg); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0) rotate(-6deg); }
          50% { transform: translateY(-15px) rotate(-9deg); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translateY(0) rotate(45deg); }
          50% { transform: translateY(-25px) rotate(48deg); }
        }
        .animate-float-1 { animation: float-1 8s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 10s ease-in-out infinite; }
        .animate-float-3 { animation: float-3 12s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default HeroSection;