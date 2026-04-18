import React, { useEffect } from 'react'
import { useProduct } from '../hooks/useProduct'
import { useSelector } from 'react-redux'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'




const Dashboard = () => {
    const { handleGetSellerProduct } = useProduct()
    const sellerProducts = useSelector(state => state.product.sellerProducts)
    const navigate  = useNavigate()
    useEffect(() => {
        handleGetSellerProduct()
    }, [])

    return (
        <div className="min-h-screen bg-surface py-12 px-4 sm:px-6 lg:px-12">
            <div className="max-w-7xl mx-auto">
                {/* Dashboard Header */}
                <div className="mb-16 border-b border-outline-variant/20 pb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                    <div>
                        <h1 className="text-5xl md:text-6xl font-manrope font-extrabold text-brand-green mb-4 tracking-tight">
                            The Archive
                        </h1>
                        <p className="text-on-surface-variant font-inter tracking-widest uppercase text-[10px] space-x-4">
                            <span>SELLER DASHBOARD</span>
                            <span className="opacity-30">|</span>
                            <span>{sellerProducts?.length || 0} TOTAL REGISTRIES</span>
                            <span className="opacity-30">|</span>
                            <span>ILLUMINATED ARCHIVE v1.0</span>
                        </p>
                    </div>
                    
                    <Link 
                        to="/seller/create-product"
                        className="bg-brand-gold text-brand-green px-8 py-4 rounded-2xl font-manrope font-extrabold text-sm tracking-widest uppercase shadow-lg hover:tracking-[0.2em] transition-all duration-500 active:scale-[0.98] text-center"
                    >
                        + New Entry
                    </Link>
                </div>

                {/* Product Grid */}
                {sellerProducts && sellerProducts.length > 0 ? (
                    <div  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                        {sellerProducts.map((product) => (
                            <div
                            key={product._id} className="group animate-in fade-in slide-in-from-bottom-4 duration-700">
                                {/* Product Image Container */}
                                <div  onClick={()=>{navigate(`/seller/product/${product._id}`)}} className="relative aspect-3/4 mb-6 overflow-hidden rounded-2xl bg-surface-high shadow-sm">
                                    <img 
                                        src={product.images[0]?.url || 'https://via.placeholder.com/600x800?text=No+Image'} 
                                        alt={product.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000 ease-in-out"
                                    />
                                    <div className="absolute inset-0 bg-brand-green/0 group-hover:bg-brand-green/5 transition-colors duration-700" />
                                    
                                    {/* Quick Actions Overlay (Optional/Subtle) */}
                                    <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                        <button className="bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-xl hover:bg-brand-gold transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-green">
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className="space-y-1">
                                    <div className="flex justify-between items-start gap-4">
                                        <h3 className="font-manrope font-bold text-lg text-brand-green uppercase tracking-wide line-clamp-1">
                                            {product.title}
                                        </h3>
                                        <p className="font-inter font-bold text-brand-gold whitespace-nowrap">
                                            {product.price.currency} {product.price.amount.toLocaleString()}
                                        </p>
                                    </div>
                                    <p className="text-[10px] text-on-surface-variant/60 font-inter uppercase tracking-[0.2em]">
                                        Ref: {product._id.slice(-8).toUpperCase()}
                                    </p>
                                    <p className="text-sm text-on-surface-variant line-clamp-2 pt-2 opacity-80 font-light leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="py-24 text-center">
                        <div className=" w-24 h-24 rounded-full bg-surface-high flex items-center justify-center mb-8 border border-outline-variant/30">
                            <span className="text-4xl text-on-surface-variant opacity-20">?</span>
                        </div>
                        <h2 className="font-manrope text-3xl font-extrabold text-brand-green mb-4">No Registries Found</h2>
                        <p className="text-on-surface-variant font-inter max-w-md mx-auto mb-12 opacity-60">
                            Your illuminated archive is currently empty. Start documenting your luxury collection to showcase them to the world.
                        </p>
                        <Link 
                            to="/seller/create-product"
                            className="inline-block border-2 border-brand-gold text-brand-gold px-12 py-5 rounded-2xl font-manrope font-extrabold text-sm tracking-[0.3em] uppercase hover:bg-brand-gold hover:text-brand-green transition-all duration-700"
                        >
                            Establish First Registry
                        </Link>
                    </div>
                )}

                {/* Footer Deco */}
                <div className="mt-32 pt-8 border-t border-outline-variant/10 text-center">
                    <p className="text-[9px] text-on-surface-variant font-inter uppercase tracking-[0.4em] opacity-30">
                        Snitch Curator Interface • Eternal Craftsmanship • © 2026
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
