"use client"

import React, { useState, useRef, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
  companyName: string;
  taxId: string;
  companyRegNumber: string;
  email: string;
  contactEmail: string;
  password: string;
  confirmPassword: string;
  contactNumber: string;
  countryCode: string;
};

const countryCodes = [
  { code: '+1', name: 'United States (+1)' },
  { code: '+44', name: 'UK (+44)' },
  { code: '+91', name: 'India (+91)' },
  { code: '+81', name: 'Japan (+81)' },
  { code: '+49', name: 'Germany (+49)' },
  { code: '+33', name: 'France (+33)' },
  { code: '+61', name: 'Australia (+61)' },
];

const MerchantSignup: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [docPreviews, setDocPreviews] = useState<Array<{name: string, type: string, url: string}>>([]);
  const [activeTab, setActiveTab] = useState<'company' | 'contact' | 'security'>('company');
  const logoInputRef = useRef<HTMLInputElement>(null);
  const docsInputRef = useRef<HTMLInputElement>(null);
  const password = watch("password", "");

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newPreviews = files.map(file => ({
      name: file.name,
      type: file.type.startsWith('image/') ? 'image' : 'document',
      url: URL.createObjectURL(file)
    }));
    setDocPreviews([...docPreviews, ...newPreviews]);
  };

  const removeDocument = (index: number) => {
    const updatedPreviews = [...docPreviews];
    URL.revokeObjectURL(updatedPreviews[index].url);
    updatedPreviews.splice(index, 1);
    setDocPreviews(updatedPreviews);
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Create Merchant Account</h2>
                <p className="mt-1 text-blue-100">Start selling on our platform in just a few steps</p>
              </div>
              <div className="bg-white/10 p-3 rounded-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="px-8 pt-6">
            <div className="flex justify-between relative">
              <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 -z-10 mx-16"></div>
              <div 
                className={`absolute top-4 left-0 h-1 bg-blue-600 transition-all duration-300 -z-10 ${activeTab === 'company' ? 'w-1/3' : activeTab === 'contact' ? 'w-2/3' : 'w-full'}`}
              ></div>
              
              <button 
                onClick={() => setActiveTab('company')}
                className={`flex flex-col items-center ${activeTab === 'company' ? 'text-blue-600' : 'text-gray-500'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeTab === 'company' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  1
                </div>
                <span className="mt-2 text-sm font-medium">Company</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('contact')}
                className={`flex flex-col items-center ${activeTab === 'contact' ? 'text-blue-600' : 'text-gray-500'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeTab === 'contact' ? 'bg-blue-600 text-white' : activeTab === 'security' ? 'bg-blue-100 text-blue-600' : 'bg-gray-200'}`}>
                  2
                </div>
                <span className="mt-2 text-sm font-medium">Contact</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('security')}
                className={`flex flex-col items-center ${activeTab === 'security' ? 'text-blue-600' : 'text-gray-500'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeTab === 'security' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  3
                </div>
                <span className="mt-2 text-sm font-medium">Security</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-6">
            {/* Company Information Tab */}
            {activeTab === 'company' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Company Details</h3>
                  
                  {/* Company Name */}
                  <div className="mb-5">
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="companyName"
                        type="text"
                        {...register("companyName", { required: "Company name is required" })}
                        className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.companyName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your company name"
                      />
                      {errors.companyName && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {errors.companyName && (
                      <p className="mt-2 text-sm text-red-600">{errors.companyName.message}</p>
                    )}
                  </div>

                  {/* Logo Upload */}
                  <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Logo
                    </label>
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {logoPreview ? (
                          <img src={logoPreview} alt="Logo preview" className="w-16 h-16 rounded-lg object-cover border border-gray-200" />
                        ) : (
                          <div className="w-16 h-16 rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <button
                          type="button"
                          onClick={() => logoInputRef.current?.click()}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          {logoPreview ? 'Change Logo' : 'Upload Logo'}
                        </button>
                        <input
                          ref={logoInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleLogoChange}
                          className="hidden"
                        />
                        <p className="mt-2 text-xs text-gray-500">
                          PNG, JPG up to 2MB
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tax ID and Registration Number */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label htmlFor="taxId" className="block text-sm font-medium text-gray-700 mb-2">
                        Tax Identification Number
                      </label>
                      <input
                        id="taxId"
                        type="text"
                        {...register("taxId")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g. 12-3456789"
                      />
                    </div>
                    <div>
                      <label htmlFor="companyRegNumber" className="block text-sm font-medium text-gray-700 mb-2">
                        Company Registration Number
                      </label>
                      <input
                        id="companyRegNumber"
                        type="text"
                        {...register("companyRegNumber")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g. 12345678"
                      />
                    </div>
                  </div>

                  {/* Legal Documents */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Legal Documents
                    </label>
                    <div className="mt-1">
                      <button
                        type="button"
                        onClick={() => docsInputRef.current?.click()}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        Upload Documents
                      </button>
                      <input
                        ref={docsInputRef}
                        type="file"
                        multiple
                        onChange={handleDocsChange}
                        className="hidden"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      />
                      
                      {docPreviews.length > 0 && (
                        <div className="mt-4 space-y-3">
                          {docPreviews.map((doc, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                              <div className="flex items-center space-x-3">
                                {doc.type === 'image' ? (
                                  <div className="flex-shrink-0">
                                    <img src={doc.url} alt="Preview" className="h-10 w-10 rounded object-cover" />
                                  </div>
                                ) : (
                                  <div className="flex-shrink-0 p-2 bg-blue-100 rounded-lg">
                                    <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                  </div>
                                )}
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                                  <p className="text-xs text-gray-500">{doc.type === 'image' ? 'Image' : 'Document'}</p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeDocument(index)}
                                className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100"
                              >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      Upload business registration, tax documents, etc. (PDF, JPG, PNG up to 5MB each)
                    </p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveTab('contact')}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
                  >
                    Next: Contact Information
                  </button>
                </div>
              </div>
            )}

            {/* Contact Information Tab */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
                  
                  {/* Email */}
                  <div className="mb-5">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Account Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="email"
                        type="email"
                        {...register("email", { 
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                          }
                        })}
                        className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Contact Email */}
                  <div className="mb-5">
                    <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-2">
                      Customer Support Email
                    </label>
                    <input
                      id="contactEmail"
                      type="email"
                      {...register("contactEmail", { 
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })}
                      className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.contactEmail ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="support@yourcompany.com"
                    />
                    {errors.contactEmail && (
                      <p className="mt-2 text-sm text-red-600">{errors.contactEmail.message}</p>
                    )}
                    <p className="mt-2 text-xs text-gray-500">
                      This email will be displayed to customers for support inquiries
                    </p>
                  </div>

                  {/* Contact Number */}
                  <div className="mb-5">
                    <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      Customer Support Phone
                    </label>
                    <div className="flex">
                      <select
                        {...register("countryCode")}
                        className="w-32 px-4 py-3 border border-gray-300 rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                      >
                        {countryCodes.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                      <input
                        id="contactNumber"
                        type="tel"
                        {...register("contactNumber")}
                        className="flex-1 px-4 py-3 border-t border-b border-r border-gray-300 rounded-r-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="123 456 7890"
                      />
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      This number will be displayed to customers for support inquiries
                    </p>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveTab('company')}
                    className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('security')}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
                  >
                    Next: Account Security
                  </button>
                </div>
              </div>
            )}

            {/* Account Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Security</h3>
                  
                  {/* Password */}
                  <div className="mb-5">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type="password"
                        {...register("password", { 
                          required: "Password is required",
                          minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters"
                          }
                        })}
                        className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.password ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Create a password"
                      />
                      {errors.password && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {errors.password && (
                      <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
                    )}
                    <div className="mt-2">
                      <div className="grid grid-cols-4 gap-2">
                        <div className={`h-1 rounded-sm ${password.length > 0 ? 'bg-red-400' : 'bg-gray-200'}`}></div>
                        <div className={`h-1 rounded-sm ${password.length >= 4 ? 'bg-yellow-400' : 'bg-gray-200'}`}></div>
                        <div className={`h-1 rounded-sm ${password.length >= 8 ? 'bg-blue-400' : 'bg-gray-200'}`}></div>
                        <div className={`h-1 rounded-sm ${password.length >= 12 ? 'bg-green-400' : 'bg-gray-200'}`}></div>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        Use 8 or more characters with a mix of letters, numbers & symbols
                      </p>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-5">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        type="password"
                        {...register("confirmPassword", { 
                          required: "Please confirm your password",
                          validate: value => value === password || "Passwords do not match"
                        })}
                        className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Confirm your password"
                      />
                      {errors.confirmPassword && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveTab('contact')}
                    className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
                  >
                    Create Merchant Account
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MerchantSignup;