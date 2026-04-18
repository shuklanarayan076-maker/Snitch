import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router'
import { useProduct } from '../hooks/useProduct';

const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { handleGetProductById } = useProduct();

    async function fetchProductDetails() {
        setLoading(true);
        try {
            const data = await handleGetProductById(productId);
            setProduct(data);
        } catch (error) {
            console.error("Failed to fetch product:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProductDetails();
    }, [productId]);

    const handleNextImage = () => {
        if (!product?.images?.length) return;
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    };

    const handlePrevImage = () => {
        if (!product?.images?.length) return;
        setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-surface flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-2 border-brand-green/20 border-t-brand-gold rounded-full animate-spin"></div>
                <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.4em] text-on-surface-variant/40 animate-pulse">
                    Accessing Archive...
                </p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 text-center">
                <h1 className="text-4xl font-manrope font-extrabold text-brand-green opacity-20 uppercase tracking-tighter mb-4">
                    Registry Entry Not Found
                </h1>
                <Link to="/" className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold hover:opacity-70 transition-opacity">
                    Return to Archive
                </Link>
            </div>
        );
    }

    const { title, description, price, images, _id } = product;
    const mainImage = images?.[currentImageIndex]?.url || 'https://via.placeholder.com/1200x1600?text=Registry+Missing';

    return (
        <div className="min-h-screen bg-surface font-inter selection:bg-brand-gold selection:text-brand-green">
            {/* Editorial Navigation */}
            <nav className="border-b border-outline-variant/10 px-6 py-6 flex justify-between items-center bg-surface/80 backdrop-blur-md sticky top-0 z-50">
                <Link to="/" className="text-2xl font-manrope font-extrabold text-brand-green tracking-tighter">
                    SNITCH
                </Link>
                <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
                    <Link to="/" className="hover:text-brand-gold transition-colors">Archive</Link>
                    <button className="hover:text-brand-gold transition-colors">Cart (0)</button>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-12 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    
                    {/* Visual Repository Entry (Image Gallery) */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-surface-high group cursor-zoom-in max-w-md mx-auto shadow-2xl shadow-brand-green/5">
                            <img 
                                src={mainImage} 
                                alt={title}
                                className="w-full h-full object-cover transition-all duration-700 ease-in-out scale-100 group-hover:scale-105"
                            />
                            
                            {/* Metadata Label Overlay */}
                            <div className="absolute top-8 left-8">
                                <span className="bg-brand-green/90 backdrop-blur-md text-surface text-[9px] font-bold uppercase tracking-[0.3em] px-4 py-2 rounded-full shadow-lg">
                                    Archive Entry {currentImageIndex + 1}/{images?.length || 1}
                                </span>
                            </div>

                            {/* Navigation Buttons (Two Buttons, No Slider) */}
                            {images?.length > 1 && (
                                <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                                        className="w-12 h-12 rounded-full bg-surface/90 backdrop-blur-md text-brand-green flex items-center justify-center hover:bg-brand-gold transition-colors pointer-events-auto shadow-xl group/btn"
                                        aria-label="Previous Image"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:-translate-x-0.5 transition-transform">
                                            <polyline points="15 18 9 12 15 6"></polyline>
                                        </svg>
                                    </button>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                                        className="w-12 h-12 rounded-full bg-surface/90 backdrop-blur-md text-brand-green flex items-center justify-center hover:bg-brand-gold transition-colors pointer-events-auto shadow-xl group/btn"
                                        aria-label="Next Image"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:translate-x-0.5 transition-transform">
                                            <polyline points="9 18 15 12 9 6"></polyline>
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>
                        
                        {/* Dynamic Thumbnails Below */}
                        {images?.length > 1 && (
                            <div className="flex gap-4 max-w-md mx-auto overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
                                {images.map((img, idx) => (
                                    <button 
                                        key={img._id || idx}
                                        onClick={() => setCurrentImageIndex(idx)}
                                        className={`relative w-20 aspect-square rounded-xl overflow-hidden flex-shrink-0 transition-all duration-300 border-2 ${
                                            currentImageIndex === idx 
                                            ? 'border-brand-gold scale-105 shadow-lg' 
                                            : 'border-transparent opacity-40 hover:opacity-80'
                                        }`}
                                    >
                                        <img 
                                            src={img.url} 
                                            alt={`${title} view ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Registry Metadata (Details) */}
                    <div className="lg:col-span-7 space-y-12 lg:sticky lg:top-32">
                        <div className="space-y-4 animate-in slide-in-from-right-8 duration-700">
                            <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold">
                                Registry Ref: {_id.slice(-12).toUpperCase()}
                            </p>
                            <h1 className="text-5xl md:text-6xl font-manrope font-extrabold text-brand-green leading-[0.9] tracking-tighter uppercase">
                                {title}
                            </h1>
                            <div className="flex items-center gap-4 pt-2">
                                <p className="text-3xl font-manrope font-extrabold text-brand-green">
                                    {price.currency} {price.amount.toLocaleString()}
                                </p>
                                <span className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest border border-outline-variant/30 px-2 py-1 rounded">
                                    Duty Paid
                                </span>
                            </div>
                        </div>

                        <div className="space-y-6 animate-in slide-in-from-right-12 duration-1000">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant border-b border-outline-variant/20 pb-2 inline-block">
                                Specification
                            </h3>
                            <p className="text-sm md:text-base text-on-surface-variant leading-relaxed opacity-70 font-light">
                                {description || "The definitive expression of contemporary craftsmanship. This registry entry represents a unique convergence of archival silhouette and modern utility, curated specifically for the Snitch ecosystem."}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="space-y-4 pt-8 animate-in slide-in-from-bottom-8 duration-1000 delay-300">
                            <button className="w-full py-6 rounded-2xl bg-brand-green text-surface text-xs font-bold uppercase tracking-[0.4em] hover:bg-brand-gold hover:text-brand-green transition-all duration-500 shadow-2xl shadow-brand-green/20 group">
                                <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">Buy Now — Establish Registry</span>
                            </button>
                            <button className="w-full py-6 rounded-2xl border border-brand-green/20 text-brand-green text-xs font-bold uppercase tracking-[0.4em] hover:bg-surface-high transition-colors duration-500">
                                Add to Archive Cart
                            </button>
                        </div>

                        <div className="pt-12 grid grid-cols-2 gap-8 border-t border-outline-variant/10">
                            <div className="space-y-2">
                                <h4 className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant/40">Provenance</h4>
                                <p className="text-[10px] font-medium text-on-surface-variant">Verified Authentic</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant/40">Logistics</h4>
                                <p className="text-[10px] font-medium text-on-surface-variant">Global Transit Priority</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Editorial Footer (Minimal version) */}
            <footer className="border-t border-outline-variant/10 py-12 px-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center opacity-30">
                    <p className="text-[9px] uppercase tracking-[0.5em]">SNITCH WORLDWIDE</p>
                    <p className="text-[9px] uppercase tracking-[0.5em]">{new Date().getFullYear()} ARCHIVE SYSTEM</p>
                </div>
            </footer>
        </div>
    )
}

export default ProductDetail