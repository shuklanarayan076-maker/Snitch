import React, { useEffect, useState, useRef } from 'react';
import { useProduct } from '../hooks/useProduct';
import { useParams } from 'react-router';

const SellerProductDetails = () => {
  const { productId } = useParams();
  const { handleGetProductById,handleAddProductVariant } = useProduct();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Variant Form State
  const [variantForm, setVariantForm] = useState({
    stock: 0,
    priceAmount: '',
    priceCurrency: 'INR',
    attributes: { size: '', color: '' },
  });
  const [variantImages, setVariantImages] = useState([]);
  const [variantImagePreviews, setVariantImagePreviews] = useState([]);
  const fileInputRef = useRef(null);

  async function fetchProductDetails() {
    setLoading(true);
    try {
      const data = await handleGetProductById(productId);
      setProduct(data);
      // If product has a price, set default for variant form
      if (data?.price) {
        setVariantForm(prev => ({
          ...prev,
          priceAmount: data.price.amount,
          priceCurrency: data.price.currency || 'INR'
        }));
      }
    } catch (error) {
      console.error("Failed to fetch product:", error);
      setError("Failed to load product details.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('attr_')) {
      const attrKey = name.replace('attr_', '');
      setVariantForm(prev => ({
        ...prev,
        attributes: { ...prev.attributes, [attrKey]: value }
      }));
    } else {
      setVariantForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.filter(file => file.type.startsWith('image/'));
    setVariantImages(prev => [...prev, ...newFiles]);

    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVariantImagePreviews(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeVariantImage = (index) => {
    setVariantImages(prev => prev.filter((_, i) => i !== index));
    setVariantImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddVariantSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const variantData = {
        stock: Number(variantForm.stock),
        priceAmount: Number(variantForm.priceAmount),
        attributes: variantForm.attributes,
        images: variantImages.map((file) => ({ file }))
      };

      const data = await handleAddProductVariant(productId, variantData);
      
      // Update local state with the new product (which contains the new variant)
      if (data) {
        setProduct(data);
      }

      // Reset form
      setVariantForm({
        stock: 0,
        priceAmount: product.price.amount,
        priceCurrency: product.price.currency,
        attributes: { size: '', color: '' },
      });
      setVariantImages([]);
      setVariantImagePreviews([]);
    } catch (err) {
      console.error("Submission error:", err);
      setError("Failed to add variant.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateStock = async (variantId, newStock) => {
    try {
      await handleUpdateVariantStock(variantId, newStock);
      // Update local state
      setProduct(prev => ({
        ...prev,
        variants: prev.variants.map(v => v._id === variantId ? { ...v, stock: newStock } : v)
      }));
    } catch (err) {
      console.error("Failed to update stock:", err);
      alert("Failed to update stock.");
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-surface flex items-center justify-center">
      <div className="animate-pulse text-brand-gold font-manrope tracking-widest uppercase">Initializing Archive...</div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen bg-surface flex items-center justify-center">
      <div className="text-brand-green font-manrope">Product not found.</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface py-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Editorial Header: Product Summary */}
        <header className="mb-20 grid lg:grid-cols-2 gap-12 items-end border-b border-outline-variant/10 pb-12">
          <div>
            <p className="text-brand-gold font-inter font-bold uppercase tracking-[0.3em] text-[10px] mb-4">
              Authenticated Registry • ID: {product._id.slice(-8).toUpperCase()}
            </p>
            <h1 className="text-5xl md:text-7xl font-manrope font-extrabold text-brand-green tracking-tighter leading-none mb-6">
              {product.title}
            </h1>
            <p className="text-on-surface-variant font-inter text-lg max-w-xl leading-relaxed opacity-80">
              {product.description}
            </p>
          </div>
          <div className="flex flex-col items-start lg:items-end space-y-6">
            <div className="text-right">
              <span className="block text-[10px] font-inter font-bold uppercase tracking-widest text-on-surface-variant/40 mb-1">Base Valuation</span>
              <span className="text-4xl font-manrope font-medium text-brand-green">
                {product.price.currency} {product.price.amount.toLocaleString()}
              </span>
            </div>
            <div className="flex -space-x-4">
               {product.images?.slice(0, 4).map((img, i) => (
                 <div key={i} className="w-24 h-32 rounded-lg overflow-hidden border-2 border-surface shadow-xl rotate-[-5deg] hover:rotate-0 hover:scale-110 transition-all duration-500 first:rotate-3">
                   <img src={img.url} alt="product" className="w-full h-full object-cover" />
                 </div>
               ))}
            </div>
          </div>
        </header>

        <main className="grid lg:grid-cols-[1fr_1.5fr] gap-20">
          
          {/* Section: Variant Registry (Creation) */}
          <section className="space-y-12">
            <div className="relative">
              <h2 className="text-3xl font-manrope font-bold text-brand-green mb-2">Variant Registry</h2>
              <p className="text-[10px] font-inter uppercase tracking-widest text-on-surface-variant">Define unique attributes & stock levels</p>
              <div className="absolute -left-4 top-0 w-1 h-full bg-brand-gold opacity-30"></div>
            </div>

            <form onSubmit={handleAddVariantSubmit} className="bg-white/40 backdrop-blur-sm p-8 rounded-3xl space-y-8 shadow-sm border border-white/20">
              
              {/* Visuals */}
              <div className="space-y-4">
                <label className="block text-[10px] font-inter font-bold uppercase tracking-widest text-on-surface-variant mb-2">Visual Documentation</label>
                <div 
                  onClick={() => fileInputRef.current.click()}
                  className="min-h-[120px] bg-surface-high/50 border-2 border-dashed border-outline-variant/30 rounded-2xl flex items-center justify-center cursor-pointer hover:border-brand-gold transition-colors group"
                >
                  {variantImagePreviews.length === 0 ? (
                    <div className="text-center">
                      <span className="text-3xl font-light text-brand-green opacity-40 group-hover:opacity-100 transition-opacity">+</span>
                      <p className="text-[9px] uppercase tracking-tighter text-on-surface-variant/60 font-medium">Add variant visuals</p>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2 p-4">
                      {variantImagePreviews.map((p, i) => (
                        <div key={i} className="relative w-16 h-20 group/img">
                          <img src={p} className="w-full h-full object-cover rounded-lg" alt="preview" />
                          <button 
                            type="button"
                            onClick={(e) => { e.stopPropagation(); removeVariantImage(i); }}
                            className="absolute -top-1 -right-1 bg-brand-green text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] opacity-0 group-hover/img:opacity-100 transition-opacity"
                          >×</button>
                        </div>
                      ))}
                      <div className="w-16 h-20 bg-white/50 rounded-lg flex items-center justify-center text-brand-gold">+</div>
                    </div>
                  )}
                  <input type="file" ref={fileInputRef} hidden multiple accept="image/*" onChange={handleImageChange} />
                </div>
              </div>

              {/* Attributes (Dynamic Map) */}
              <div className="grid grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-[10px] font-inter font-bold uppercase tracking-widest text-on-surface-variant mb-2 ml-1">Dimension (Size)</label>
                  <select 
                    name="attr_size" 
                    value={variantForm.attributes.size} 
                    onChange={handleInputChange}
                    className="w-full bg-surface-high border-b-2 border-transparent px-4 py-3 rounded-t-lg focus:outline-none focus:border-brand-gold transition-all font-inter text-brand-green text-sm"
                  >
                    <option value="">Select Size</option>
                    <option value="XS">XS</option>
                    <option value="S">Small</option>
                    <option value="M">Medium</option>
                    <option value="L">Large</option>
                    <option value="XL">XL</option>
                  </select>
                </div>
                <div className="group">
                  <label className="block text-[10px] font-inter font-bold uppercase tracking-widest text-on-surface-variant mb-2 ml-1">Pigment (Color)</label>
                  <input 
                    type="text" 
                    name="attr_color" 
                    placeholder="e.g. Ivory" 
                    value={variantForm.attributes.color} 
                    onChange={handleInputChange}
                    className="w-full bg-surface-high border-b-2 border-transparent px-4 py-3 rounded-t-lg focus:outline-none focus:border-brand-gold transition-all font-inter text-brand-green text-sm"
                  />
                </div>
              </div>

              {/* Price & Stock */}
              <div className="grid grid-cols-2 gap-6">
                 <div>
                    <label className="block text-[10px] font-inter font-bold uppercase tracking-widest text-on-surface-variant mb-2 ml-1">Valuation</label>
                    <input 
                      type="number" 
                      name="priceAmount" 
                      value={variantForm.priceAmount} 
                      onChange={handleInputChange}
                      className="w-full bg-surface-high border-b-2 border-transparent px-4 py-3 rounded-t-lg focus:outline-none focus:border-brand-gold transition-all font-inter text-brand-green text-sm"
                    />
                 </div>
                 <div>
                    <label className="block text-[10px] font-inter font-bold uppercase tracking-widest text-on-surface-variant mb-2 ml-1">Inventory</label>
                    <input 
                      type="number" 
                      name="stock" 
                      value={variantForm.stock} 
                      onChange={handleInputChange}
                      className="w-full bg-surface-high border-b-2 border-transparent px-4 py-3 rounded-t-lg focus:outline-none focus:border-brand-gold transition-all font-inter text-brand-green text-sm"
                    />
                 </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-brand-gold text-brand-green py-5 rounded-2xl font-manrope font-extrabold uppercase tracking-widest shadow-lg hover:shadow-brand-gold/20 active:scale-95 transition-all text-sm"
              >
                {isSubmitting ? 'Registering...' : 'Initialize Variant'}
              </button>

              {error && <p className="text-red-500 text-[10px] uppercase font-bold text-center tracking-widest">{error}</p>}
            </form>
          </section>

          {/* Section: Active Variants Catalog */}
          <section className="space-y-12">
            <div className="flex justify-between items-end">
               <div>
                  <h2 className="text-3xl font-manrope font-bold text-brand-green mb-2">Active Catalog</h2>
                  <p className="text-[10px] font-inter uppercase tracking-widest text-on-surface-variant">Live variants in the archive</p>
               </div>
               <div className="text-[10px] font-inter font-bold text-on-surface-variant/40 tracking-widest">
                  Total SKUs: {product.variants?.length || 0}
               </div>
            </div>

            <div className="space-y-6">
               {!product.variants || product.variants.length === 0 ? (
                 <div className="bg-surface-high/50 p-20 rounded-3xl border border-dashed border-outline-variant/30 text-center">
                    <p className="text-on-surface-variant font-inter italic opacity-40">No variants established yet.</p>
                 </div>
               ) : (
                 product.variants.map((v, idx) => (
                   <div key={v._id || idx} className="group bg-white/60 hover:bg-white transition-all duration-500 rounded-3xl p-6 flex items-center gap-6 shadow-sm border border-white/30 overflow-hidden relative">
                      {/* Image Thumbnail */}
                      <div className="w-20 h-24 bg-surface rounded-xl overflow-hidden flex-shrink-0 shadow-inner">
                         {v.images?.[0]?.url && <img src={v.images[0].url} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" alt="variant" />}
                      </div>

                      {/* Info */}
                      <div className="flex-grow">
                         <div className="flex flex-wrap gap-2 mb-2">
                            {Object.entries(v.attributes || {}).map(([key, value]) => (
                               <span key={key} className="text-[8px] font-inter font-black uppercase tracking-widest bg-brand-green/5 text-brand-green px-3 py-1 rounded-full border border-brand-green/10">
                                 {key}: {value}
                               </span>
                            ))}
                         </div>
                         <div className="text-brand-green font-manrope font-semibold">
                            {v.price?.currency || 'INR'} {v.price?.amount?.toLocaleString()}
                         </div>
                      </div>

                      {/* Stock Management */}
                      <div className="flex flex-col items-end gap-2 pr-4">
                         <label className="text-[8px] font-bold uppercase tracking-[0.2em] text-on-surface-variant/30 px-1">Stock Level</label>
                         <div className="flex items-center gap-3">
                            <input 
                              type="number" 
                              className="w-16 bg-surface-high text-center py-2 rounded-lg font-inter font-bold text-brand-green text-sm focus:bg-white focus:outline-none transition-all"
                              defaultValue={v.stock}
                              onBlur={(e) => handleUpdateStock(v._id, Number(e.target.value))}
                            />
                            <button className="text-[9px] font-inter font-bold uppercase tracking-widest text-brand-gold/60 hover:text-brand-gold transition-colors">Sync</button>
                         </div>
                      </div>

                      {/* Decorative Element */}
                      <div className="absolute right-0 top-0 h-full w-1 bg-brand-green opacity-0 group-hover:opacity-10 transition-opacity"></div>
                   </div>
                 ))
               )}
            </div>
            
            <footer className="pt-8 opacity-40 text-center">
              <p className="text-[9px] font-inter uppercase tracking-[0.5em] text-on-surface-variant">Global Inventory Control System v2.6</p>
            </footer>
          </section>

        </main>
      </div>
    </div>
  );
};

export default SellerProductDetails;