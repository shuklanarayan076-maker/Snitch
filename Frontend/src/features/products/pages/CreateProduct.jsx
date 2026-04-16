import React, { useState, useRef } from 'react';
import { useProduct } from '../hooks/useProduct';
import { useNavigate } from 'react-router';

const CreateProduct = () => {
  const { handleCreateProduct } = useProduct();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priceAmount: '',
    priceCurrency: 'INR',
  });

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const totalImages = images.length + files.length;
    if (totalImages > 7) {
      alert('You can only upload up to 7 images.');
      const allowedFiles = files.slice(0, 7 - images.length);
      processFiles(allowedFiles);
    } else {
      processFiles(files);
    }
  };

  const processFiles = (files) => {
    const newFiles = files.filter(file => file.type.startsWith('image/'));
    setImages((prev) => [...prev, ...newFiles]);
    
    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) {
      setError('Please upload at least one image.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const submissionData = new FormData();
      submissionData.append('title', formData.title);
      submissionData.append('description', formData.description);
      submissionData.append('priceAmount', formData.priceAmount);
      submissionData.append('priceCurrency', formData.priceCurrency);
      
      images.forEach((image) => {
        submissionData.append('images', image);
      });

      await handleCreateProduct(submissionData);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to create product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface py-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-3xl lg:max-w-6xl mx-auto">
        {/* Header - Editorial Style */}
        <div className="mb-16 text-center lg:text-left border-b border-outline-variant/20 pb-8">
          <h1 className="text-5xl md:text-6xl font-manrope font-extrabold text-brand-green mb-4 tracking-tight">
            New Entry
          </h1>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <p className="text-on-surface-variant font-inter tracking-widest uppercase text-[10px] space-x-4">
              <span>EST. 2026</span>
              <span className="opacity-30">|</span>
              <span>Registry v1.0</span>
              <span className="opacity-30">|</span>
              <span>The Illuminated Archive</span>
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="lg:grid lg:grid-cols-[1.2fr_1fr] lg:gap-24 lg:items-start">
          {/* Left Column: Title + Visual Repository */}
          <div className="space-y-12 mb-12 lg:mb-0">
            {/* Title Section */}
            <div className="group">
              <label htmlFor="title" className="block text-[10px] font-inter font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-3 ml-1 transition-colors group-focus-within:text-brand-gold">
                Registry Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Ex: HEIRLOOM CASHMERE OVERCOAT"
                className="w-full bg-surface-high border-b-2 border-transparent px-8 py-5 rounded-t-xl transition-all focus:outline-none focus:border-brand-gold focus:bg-white text-xl font-inter text-brand-green placeholder:text-on-surface-variant/30"
              />
            </div>

            {/* Visual Repository (Drag & Drop) */}
            <div>
              <label className="block text-[10px] font-inter font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-4 ml-1">
                Visual Repository ({images.length}/7)
              </label>
              
              <div 
                className={`
                  relative min-h-[300px] bg-surface-high border-2 border-dashed rounded-2xl transition-all duration-500 flex flex-col items-center justify-center p-8
                  ${isDragging 
                    ? 'border-brand-gold bg-brand-gold/5 scale-[1.02]' 
                    : 'border-outline-variant/30 hover:border-outline-variant/60'
                  }
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {imagePreviews.length === 0 ? (
                  <div className="text-center group cursor-pointer" onClick={() => fileInputRef.current.click()}>
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 mx-auto group-hover:scale-110 transition-transform text-brand-green">
                      <span className="text-3xl font-light leading-none">+</span>
                    </div>
                    <p className="text-sm font-inter text-brand-green font-medium mb-1">Drag and drop images here</p>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">or click to browse library</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full h-full">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative aspect-[3/4] group animate-in slide-in-from-bottom-2 duration-500 fill-mode-both" style={{animationDelay: `${index * 100}ms`}}>
                        <img
                          src={preview}
                          alt={`Preview ${index}`}
                          className="w-full h-full object-cover rounded-xl shadow-sm filter grayscale hover:grayscale-0 transition-all duration-700"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-brand-green text-white rounded-full flex items-center justify-center shadow-lg transition-all scale-0 group-hover:scale-100 hover:bg-red-500"
                        >
                          <span className="text-[10px] font-bold">×</span>
                        </button>
                      </div>
                    ))}
                    {images.length < 7 && (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current.click()}
                        className="aspect-[3/4] flex flex-col items-center justify-center bg-white/50 border-2 border-dashed border-outline-variant/20 hover:border-brand-gold hover:bg-white transition-all rounded-xl group"
                      >
                        <span className="text-2xl font-light text-on-surface-variant group-hover:text-brand-gold">+</span>
                      </button>
                    )}
                  </div>
                )}
                
                {/* Drag Hint Overlay */}
                {isDragging && (
                  <div className="absolute inset-0 bg-brand-gold/10 backdrop-blur-[2px] rounded-2xl flex items-center justify-center z-10 animate-in fade-in duration-300">
                    <p className="font-manrope font-bold text-brand-gold text-lg uppercase tracking-widest">Release to Registry</p>
                  </div>
                )}
              </div>
              
              <input
                type="file"
                ref={fileInputRef}
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Right Column: Price + Description + Submit */}
          <div className="bg-white/40 lg:bg-transparent p-6 lg:p-0 rounded-3xl space-y-12">
            {/* Price Row */}
            <div className="grid grid-cols-2 gap-8 lg:gap-12">
              <div className="group">
                <label htmlFor="priceAmount" className="block text-[10px] font-inter font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-3 ml-1 transition-colors group-focus-within:text-brand-gold">
                  Valuation
                </label>
                <input
                  type="number"
                  id="priceAmount"
                  name="priceAmount"
                  required
                  value={formData.priceAmount}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  className="w-full bg-surface-high border-b-2 border-transparent px-8 py-5 rounded-t-xl transition-all focus:outline-none focus:border-brand-gold focus:bg-white text-xl font-inter text-brand-green placeholder:text-on-surface-variant/30"
                />
              </div>

              <div className="group">
                <label htmlFor="priceCurrency" className="block text-[10px] font-inter font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-3 ml-1 transition-colors group-focus-within:text-brand-gold">
                  Currency
                </label>
                <div className="relative">
                  <select
                    id="priceCurrency"
                    name="priceCurrency"
                    value={formData.priceCurrency}
                    onChange={handleInputChange}
                    className="w-full bg-surface-high border-b-2 border-transparent px-8 py-5 rounded-t-xl transition-all focus:outline-none focus:border-brand-gold focus:bg-white text-xl font-inter text-brand-green appearance-none cursor-pointer"
                  >
                    <option value="INR">INR (₹)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant opacity-30 select-none">
                    ↓
                  </div>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="group">
              <label htmlFor="description" className="block text-[10px] font-inter font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-3 ml-1 transition-colors group-focus-within:text-brand-gold">
                Manifesto & Details
              </label>
              <textarea
                id="description"
                name="description"
                rows="8"
                required
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Narrate the history, craftsmanship, and soul of this piece..."
                className="w-full bg-surface-high border-b-2 border-transparent px-8 py-5 rounded-t-xl transition-all focus:outline-none focus:border-brand-gold focus:bg-white text-lg font-inter text-brand-green resize-none placeholder:text-on-surface-variant/30 leading-relaxed"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-xl text-xs font-inter uppercase tracking-widest animate-in fade-in slide-in-from-top-2">
                {error}
              </div>
            )}

            {/* Submit Section */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  w-full py-6 rounded-2xl font-manrope font-extrabold text-xl tracking-widest uppercase shadow-xl transition-all duration-500
                  ${isSubmitting 
                    ? 'bg-outline-variant/30 text-on-surface-variant/50 cursor-not-allowed' 
                    : 'bg-brand-gold text-brand-green hover:tracking-[0.2em] hover:shadow-brand-gold/20 active:scale-[0.98]'
                  }
                `}
              >
                {isSubmitting ? 'SECURED REGISTRY...' : 'ESTABLISH REGISTRY'}
              </button>
              <p className="mt-6 text-[9px] text-center text-on-surface-variant font-inter uppercase tracking-[0.3em] opacity-40">
                Premium Marketplace Entry Process • Snitch Global
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;