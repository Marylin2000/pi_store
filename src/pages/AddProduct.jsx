import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { addProductWithImages } from '../services/productServices';
import Swal from 'sweetalert2';

const AddProductForm = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });
    return unsubscribe;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (thumbnail && images.length <= 4) {
      setIsSubmitting(true);
      try {
        await addProductWithImages({
          name,
          price: parseFloat(price),
          description,
          category,
          thumbnail,
          images,
        });

        // Reset form fields after successful submission
        setName('');
        setPrice('');
        setDescription('');
        setCategory('');
        setThumbnail(null);
        setImages([]);

        // Show success alert
        Swal.fire({
          icon: 'success',
          title: 'Product added successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error("Error adding product:", error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.error("Please select a thumbnail and up to 4 additional images.");
    }
  };

  if (!user) return <div className="text-center mt-8">Please log in to add products.</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-700 text-center">Add New Product</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
          required
        ></textarea>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Thumbnail:</label>
          <input
            type="file"
            onChange={(e) => setThumbnail(e.target.files[0])}
            accept="image/*"
            className="w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Additional Images (max 4):</label>
          <input
            type="file"
            onChange={(e) => setImages(Array.from(e.target.files))}
            accept="image/*"
            multiple
            className="w-full p-2"
          />
        </div>
        <button
          type="submit"
          className={`w-full p-3 rounded-lg transition-all duration-300 ${
            isSubmitting
              ? 'bg-indigo-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white'
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
