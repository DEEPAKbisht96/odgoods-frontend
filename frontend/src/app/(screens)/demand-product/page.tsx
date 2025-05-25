// app/demand-product/page.tsx
'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { PaperClipIcon, XMarkIcon } from '@heroicons/react/24/outline';

const DemandProduct = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    description: '',
    quantity: '',
    deadline: '',
    budget: '',
    referenceLinks: '',
    specialRequirements: '',
  });
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    '3D Printed Items',
    'Custom Jewelry',
    'Electronics',
    'Furniture',
    'Home Decor',
    'Fashion Accessories',
    'Artwork',
    'Custom Clothing',
    'Other',
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        setPdfFile(file);
        setErrors((prev) => ({ ...prev, pdfFile: '' }));
      } else {
        setErrors((prev) => ({
          ...prev,
          pdfFile: 'Please upload a PDF file only',
        }));
      }
    }
  };

  const removeFile = () => {
    setPdfFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.productName.trim()) {
      newErrors.productName = 'Product name is required';
    }
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!pdfFile) {
      newErrors.pdfFile = 'Design PDF is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call with form data and file upload
      const formPayload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formPayload.append(key, value);
      });
      if (pdfFile) {
        formPayload.append('designFile', pdfFile);
      }

      // In a real app, you would send this to your backend
      // await fetch('/api/demand-product', {
      //   method: 'POST',
      //   body: formPayload,
      // });

      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Redirect to confirmation page
      router.push('/demand-product/confirmation');
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({
        ...errors,
        form: 'Failed to submit request. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Request a Custom Product</h1>
          <p className="mt-2 text-lg text-gray-600">
            Fill out the form below to get your custom product made
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 sm:p-8">
          {errors.form && (
            <div className="mb-4 p-4 bg-red-50 rounded-md">
              <p className="text-red-800">{errors.form}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="productName"
                className="block text-sm font-medium text-gray-700"
              >
                Product Name *
              </label>
              <input
                type="text"
                id="productName"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  errors.productName
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                }`}
              />
              {errors.productName && (
                <p className="mt-1 text-sm text-red-600">{errors.productName}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  errors.category
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                }`}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Detailed Description *
                <span className="text-gray-500 font-normal ml-1">
                  (Materials, dimensions, colors, etc.)
                </span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  errors.description
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                }`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="deadline"
                  className="block text-sm font-medium text-gray-700"
                >
                  Deadline
                </label>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="budget"
                  className="block text-sm font-medium text-gray-700"
                >
                  Budget (USD)
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="budget"
                    name="budget"
                    min="0"
                    step="0.01"
                    value={formData.budget}
                    onChange={handleChange}
                    className="block w-full pl-7 pr-12 rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="referenceLinks"
                className="block text-sm font-medium text-gray-700"
              >
                Reference Links
                <span className="text-gray-500 font-normal ml-1">
                  (Pinterest, Instagram, etc.)
                </span>
              </label>
              <input
                type="text"
                id="referenceLinks"
                name="referenceLinks"
                value={formData.referenceLinks}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="https://..."
              />
            </div>

            <div>
              <label
                htmlFor="specialRequirements"
                className="block text-sm font-medium text-gray-700"
              >
                Special Requirements
              </label>
              <textarea
                id="specialRequirements"
                name="specialRequirements"
                rows={3}
                value={formData.specialRequirements}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Any additional requirements or notes..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Design PDF *
                <span className="text-gray-500 font-normal ml-1">
                  (Upload sketches, technical drawings, or specifications)
                </span>
              </label>
              <div
                className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${
                  errors.pdfFile ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <div className="space-y-1 text-center">
                  {pdfFile ? (
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center">
                        <PaperClipIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-700">
                          {pdfFile.name}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="pdfFile"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                        >
                          <span>Upload a file</span>
                          <input
                            id="pdfFile"
                            name="pdfFile"
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".pdf"
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PDF up to 10MB
                      </p>
                    </>
                  )}
                </div>
              </div>
              {errors.pdfFile && (
                <p className="mt-1 text-sm text-red-600">{errors.pdfFile}</p>
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DemandProduct;