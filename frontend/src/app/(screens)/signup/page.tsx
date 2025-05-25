// app/signup/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthInput from '@/app/components/base/input/AuthInput';
import Divider from '@/app/components/base/divider/Divider';
import SocialButton from '@/app/components/base/button/SocialButton';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple validation
    const newErrors = {
      fullName: !formData.fullName ? 'Full name is required' : '',
      email: !formData.email ? 'Email is required' : '',
      password: !formData.password
        ? 'Password is required'
        : formData.password.length < 6
        ? 'Password must be at least 6 characters'
        : '',
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error)) {
      // Simulate API call
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Redirect on successful signup
        router.push('/dashboard');
      } catch (error) {
        console.error('Signup failed:', error);
        setErrors({
          ...errors,
          email: 'This email is already registered',
        });
      }
    }

    setIsLoading(false);
  };

  const handleGoogleLogin = () => {
    // Implement Google login logic
    console.log('Google login clicked');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create a new account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <AuthInput
              type="text"
              name="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
              label="Full name"
            />
            <AuthInput
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              label="Email address"
            />
            <AuthInput
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              label="Password"
            />
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              required
            />
            <label
              htmlFor="terms"
              className="ml-2 block text-sm text-gray-900"
            >
              I agree to the{' '}
              <Link
                href="/terms"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href="/privacy"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Privacy Policy
              </Link>
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </button>
          </div>
        </form>

        <Divider text="Or sign up with" />

        <div className="grid grid-cols-1 gap-3">
          <SocialButton provider="google" onClick={handleGoogleLogin}>
            Sign up with Google
          </SocialButton>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;