"use client"

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSignUpDropdownOpen, setIsSignUpDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close mobile menu when clicking on a link
  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSignUpDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white shadow-sm'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-indigo-600 flex-shrink-0"
            onClick={closeMobileMenu}
          >
            OD-Goods
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/marketplace"
              className="text-gray-700 hover:text-indigo-600 transition px-3 py-2 rounded-md text-sm font-medium"
            >
              Marketplace
            </Link>

            <Link
              href="/demand-product"
              className="text-gray-700 hover:text-indigo-600 transition px-3 py-2 rounded-md text-sm font-medium"
            >
              Demand Product
            </Link>

            <Link
              href="/samples"
              className="text-gray-700 hover:text-indigo-600 transition px-3 py-2 rounded-md text-sm font-medium"
            >
              Samples
            </Link>
            <Link
              href="/merchants"
              className="text-gray-700 hover:text-indigo-600 transition px-3 py-2 rounded-md text-sm font-medium"
            >
              Merchants
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-indigo-600 transition px-3 py-2 rounded-md text-sm font-medium"
            >
              Contact
            </Link>
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="px-4 py-2 text-gray-700 hover:text-indigo-600 transition rounded-md text-sm font-medium"
            >
              Login
            </Link>
            
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsSignUpDropdownOpen(!isSignUpDropdownOpen)}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition text-sm font-medium"
              >
                Sign up
                <ChevronDownIcon className={`ml-1 h-4 w-4 transition-transform ${isSignUpDropdownOpen ? 'transform rotate-180' : ''}`} />
              </button>
              
              {isSignUpDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <Link
                    href="/signup"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    onClick={() => setIsSignUpDropdownOpen(false)}
                  >
                    As User
                  </Link>
                  <Link
                    href="/signup/merchant"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    onClick={() => setIsSignUpDropdownOpen(false)}
                  >
                    As Merchant
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 focus:outline-none"
              aria-label="Main menu"
            >
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white h-screen">
          <Link
            href="/"
            className="block px-3 py-4 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
            onClick={closeMobileMenu}
          >
            Home
          </Link>
          <Link
            href="/marketplace"
            className="block px-3 py-4 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
            onClick={closeMobileMenu}
          >
            Marketplace
          </Link>
          <Link
            href="/demand-product"
            className="block px-3 py-4 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
            onClick={closeMobileMenu}
          >
            Demand Product
          </Link>
          <Link
            href="/samples"
            className="block px-3 py-4 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
            onClick={closeMobileMenu}
          >
            Samples
          </Link>
          <Link
            href="/merchants"
            className="block px-3 py-4 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
            onClick={closeMobileMenu}
          >
            Merchants
          </Link>
          <Link
            href="/contact"
            className="block px-3 py-4 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
            onClick={closeMobileMenu}
          >
            Contact
          </Link>

          <div className="pt-4 border-t border-gray-200 mt-4">
            <Link
              href="/login"
              className="w-full block px-4 py-3 text-left rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 mb-2"
              onClick={closeMobileMenu}
            >
              Login
            </Link>
            
            <div className="mb-2">
              <button
                className="w-full flex justify-between items-center px-4 py-3 rounded-md text-base font-medium bg-indigo-600 text-white hover:bg-indigo-700"
                onClick={() => setIsSignUpDropdownOpen(!isSignUpDropdownOpen)}
              >
                Sign Up
                <ChevronDownIcon className={`ml-1 h-4 w-4 transition-transform ${isSignUpDropdownOpen ? 'transform rotate-180' : ''}`} />
              </button>
              
              {isSignUpDropdownOpen && (
                <div className="mt-1 bg-white rounded-md shadow-inner">
                  <Link
                    href="/signup"
                    className="block px-6 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    onClick={closeMobileMenu}
                  >
                    As User
                  </Link>
                  <Link
                    href="/signup/merchant"
                    className="block px-6 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    onClick={closeMobileMenu}
                  >
                    As Merchant
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;