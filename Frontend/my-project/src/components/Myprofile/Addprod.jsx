import React, { useState } from 'react';
import axios from 'axios';

const Addprod = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    breadcrumbs: '',
    images: ['', '', ''],
    colors: [],
    sizes: [],
    description: '',
    highlights: [],
    details: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleColorChange = (e, index) => {
    const newColors = [...formData.colors];
    newColors[index] = e.target.value;
    setFormData({ ...formData, colors: newColors });
  };

  const handleAddColor = () => {
    setFormData({ ...formData, colors: [...formData.colors, ''] });
  };

  const handleRemoveColor = (index) => {
    const newColors = [...formData.colors];
    newColors.splice(index, 1);
    setFormData({ ...formData, colors: newColors });
  };

  const handleSizeChange = (e, index) => {
    const newSizes = [...formData.sizes];
    newSizes[index] = e.target.value;
    setFormData({ ...formData, sizes: newSizes });
  };

  const handleAddSize = () => {
    setFormData({ ...formData, sizes: [...formData.sizes, ''] });
  };

  const handleRemoveSize = (index) => {
    const newSizes = [...formData.sizes];
    newSizes.splice(index, 1);
    setFormData({ ...formData, sizes: newSizes });
  };

  const handleImageChange = (e, index) => {
    const newImages = [...formData.images];
    newImages[index] = e.target.value;
    setFormData({ ...formData, images: newImages });
  };

  const handleAddImage = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  const handleRemoveImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/prod/create', formData);
      console.log('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };




  return (
    <div className='p-4 sm:ml-64'>
    <div className='p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700'>
    <div className='w-svw max-w-md mx-auto'>
      <form onSubmit={handleSubmit} className="">
    <div className="grid grid-cols-2 gap-x-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter product name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Enter Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter price"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="breadcrumbs" className="block text-gray-700 font-bold mb-2">Enter Breadcrumbs</label>
            <input
              type="text"
              name="breadcrumbs"
              value={formData.breadcrumbs}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter breadcrumbs"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter description"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="highlights" className="block text-gray-700 font-bold mb-2">Highlights</label>
            <input
              type="text"
              name="highlights"
              value={formData.highlights}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter highlights"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="details" className="block text-gray-700 font-bold mb-2">Details</label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter details"
              required
            />
          </div>
          {/* Add other input fields here */}
          
        </div>
       <div className='grid grid-cols-2 gap-x-4'>
        <div className="mb-4">
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Enter Image URLs</label>
            {formData.images.map((imageURL, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="text"
                  value={imageURL}
                  onChange={(e) => handleImageChange(e, index)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder={`Enter image URL ${index + 1}`}
                  required
                />
                <button type="button" onClick={() => handleRemoveImage(index)} className="ml-2 text-red-600">Remove</button>
              </div>
            ))}
            <button type="button" onClick={handleAddImage} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Image</button>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Select colors</label>
          {formData.colors.map((colorValue, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="color"
                value={colorValue}
                onChange={(e) => handleColorChange(e, index)}
                className="appearance-none border rounded-full h-8 w-8 mr-2 focus:outline-none focus:shadow-outline"
                required
              />
              <input
                type="text"
                value={colorValue}
                onChange={(e) => handleColorChange(e, index)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter color"
                required
              />
              <button type="button" onClick={() => handleRemoveColor(index)} className="ml-2 text-red-600">Remove</button>
            </div>
          ))}
          <button type="button" onClick={handleAddColor} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Color</button>
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Enter Sizes</label>
          {formData.sizes.map((sizeValue, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={sizeValue}
                onChange={(e) => handleSizeChange(e, index)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter size"
                required
              />
              <button type="button" onClick={() => handleRemoveSize(index)} className="ml-2 text-red-600">Remove</button>
            </div>
          ))}
          <button type="button" onClick={handleAddSize} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Size</button>
        </div>
        </div>

        <button type="submit" className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full">Add Product</button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default Addprod;
