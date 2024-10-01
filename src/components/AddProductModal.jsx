import React, { useState } from 'react';
import axiosInstance from '../api/axios';

const AddProductModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    imageUrl: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { title, description, price, category, stock, imageUrl } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!title || !description || !price || !category) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post('/products', {
        title,
        description,
        price: parseFloat(price),
        category,
        stock: parseInt(stock) || 0,
        imageUrl,
      });
      onAdd(response.data);
      onClose();
      alert('Product added successfully.');
    } catch (err) {
      console.error('Error adding product:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Failed to add product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add New Product</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              required
              value={description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            ></textarea>
          </div>
          <div>
            <label htmlFor="price" className="block text-sm">
              Price ($) *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              required
              min="0"
              step="0.01"
              value={price}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm">
              Category *
            </label>
            <input
              type="text"
              id="category"
              name="category"
              required
              value={category}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label htmlFor="stock" className="block text-sm">
              Stock
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              min="0"
              value={stock}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label htmlFor="imageUrl" className="block text-sm">
              Image URL
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={imageUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
