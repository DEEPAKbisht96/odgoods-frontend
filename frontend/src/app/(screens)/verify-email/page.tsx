// app/verify-email/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

const VerifyEmail = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    // Simulate email verification
    const verifyEmail = async () => {
      try {
        // await new Promise((resolve) => setTimeout(resolve, 1500));
        
        // // For demo purposes, we'll randomly succeed or fail
        // const isSuccess = Math.random() > 0.3;
        // setStatus(isSuccess ? 'success' : 'error');
        
        // if (isSuccess) {
        //   // Start countdown for redirect
        //   const timer = setInterval(() => {
        //     setCountdown((prev) => {
        //       if (prev <= 1) {
        //         clearInterval(timer);
        //         router.push('/dashboard');
        //         return 0;
        //       }
        //       return prev - 1;
        //     });
        //   }, 1000);
        // }
      } catch (err) {
        setStatus('error');
      }
    };

    verifyEmail();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md text-center">
        {status === 'loading' && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
            <h2 className="mt-6 text-2xl font-extrabold text-gray-900">
              Verifying your email...
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please wait while we verify your email address.
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
              <CheckCircleIcon className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="mt-6 text-2xl font-extrabold text-gray-900">
              Email Verified!
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Your email has been successfully verified.
            </p>
            <div className="mt-6">
              <p className="text-sm text-gray-600">
                Redirecting to dashboard in {countdown} seconds...
              </p>
              <Link
                href="/dashboard"
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Go to Dashboard Now
              </Link>
            </div>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
              <ExclamationCircleIcon className="h-10 w-10 text-red-600" />
            </div>
            <h2 className="mt-6 text-2xl font-extrabold text-gray-900">
              Verification Failed
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              The verification link is invalid or has expired.
            </p>
            <div className="mt-6">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Try Again
              </button>
              <p className="mt-4 text-sm text-gray-600">
                Need help?{' '}
                <Link
                  href="/contact"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Contact support
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;