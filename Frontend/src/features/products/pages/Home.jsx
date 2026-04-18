import React, { useEffect } from 'react';
import { useProduct } from '../hooks/useProduct';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';

const Home = () => {
  const { handleGetAllProducts } = useProduct();
  const products = useSelector((state) => state.product.products);
  const navigate = useNavigate();



  useEffect(() => {
    handleGetAllProducts();
  }, []);

  return (
    <div className="min-h-screen bg-surface font-inter">
      {/* Editorial Navigation */}
      <nav className="border-b border-outline-variant/10 px-6 py-6 flex justify-between items-center bg-surface/80 backdrop-blur-md sticky top-0 z-50">
        <Link to="/" className="text-2xl font-manrope font-extrabold text-brand-green tracking-tighter">
          SNITCH
        </Link>
        <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
          <Link to="/" className="hover:text-brand-gold transition-colors">Archive</Link>
          <Link to="/" className="hover:text-brand-gold transition-colors">Dashboard</Link>
          <button className="hover:text-brand-gold transition-colors">Cart (0)</button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative py-24 px-6 md:py-32 lg:py-48 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] text-brand-gold mb-6 animate-in slide-in-from-bottom-4 duration-700">
            Season Archive S/S 2026
          </p>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-manrope font-extrabold text-brand-green leading-[0.85] tracking-tighter mb-12 animate-in slide-in-from-bottom-8 duration-1000">
            THE NEW <br />
            STANDARD
          </h1>
          <div className="flex flex-col md:flex-row gap-12 md:items-end">
            <p className="max-w-md text-sm md:text-base text-on-surface-variant leading-relaxed opacity-70 font-light animate-in fade-in duration-1000 delay-300">
              Curating the world's most exceptional craftsmanship. Our archive is an illuminated registry of timeless originals, preserved for the discerning few.
            </p>
            <div className="flex-1 border-b border-outline-variant/20 mb-2"></div>
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant/40 animate-in fade-in duration-1000 delay-500">
              [ 001 - 012 ]
            </div>
          </div>
        </div>
        
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-brand-gold/5 to-transparent pointer-events-none z-0"></div>
      </header>

      {/* Product Discovery Grid */}
      <main className="max-w-7xl mx-auto px-6 pb-32">
        <div className="flex justify-between items-center mb-12 border-b border-outline-variant/20 pb-4">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant">
            Featured Registries
          </h2>
          <div className="flex gap-4">
             {/* Simple placeholders for sort/filter */}
             <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant/30">Filters</span>
             <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant/30">Sort</span>
          </div>
        </div>

        {products && products.length > 0 ? (
          <div 
         
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {products.map((product, index) => (
              <div 
               onClick={()=>navigate(`/product/${product._id}`)}
                key={product._id} 
                className="group animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Visual Repository Entry */}
                <div className="relative aspect-3/4 mb-6 overflow-hidden rounded-2xl bg-surface-high shadow-sm">
                  <img 
                    src={product.images[0]?.url || 'https://via.placeholder.com/600x800?text=No+Image'} 
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-brand-green/0 group-hover:bg-brand-green/5 transition-colors duration-700" />
                  
                  {/* Quick View Link (Subtle) */}
                  <div 
                  
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                     <span className="bg-brand-gold text-brand-green px-6 py-3 rounded-full text-[9px] font-bold uppercase tracking-[0.3em] shadow-xl">
                        View Registry
                     </span>
                  </div>
                </div>

                {/* Entry Details */}
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-manrope font-extrabold text-xl text-brand-green uppercase tracking-tight leading-none group-hover:text-brand-gold transition-colors duration-300">
                      {product.title}
                    </h3>
                    <p className="font-manrope font-extrabold text-brand-green whitespace-nowrap pt-1">
                      {product.price.currency} {product.price.amount.toLocaleString()}
                    </p>
                  </div>
                  <p className="text-[10px] text-on-surface-variant/50 font-inter uppercase tracking-[0.2em]">
                    Archive Ref: {product._id.slice(-8).toUpperCase()}
                  </p>
                  <p className="text-xs text-on-surface-variant line-clamp-2 opacity-60 font-light leading-relaxed group-hover:opacity-100 transition-opacity duration-500">
                    {product.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-48 text-center bg-surface-high rounded-3xl border-2 border-dashed border-outline-variant/30">
            <h3 className="font-manrope text-2xl font-extrabold text-brand-green opacity-30 uppercase tracking-[0.2em]">
              Archive Silent
            </h3>
            <p className="text-[10px] text-on-surface-variant/40 uppercase tracking-widest mt-2">
              Waiting for first registry establishment...
            </p>
          </div>
        )}
      </main>

      {/* Editorial Footer */}
      <footer className="bg-brand-green py-24 px-6 text-surface">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="space-y-8">
            <h2 className="text-4xl font-manrope font-extrabold tracking-tighter">SNITCH</h2>
            <p className="max-w-xs text-sm opacity-50 font-light leading-relaxed">
              An illuminated archive dedicated to the preservation of original craftsmanship and the art of the permanent.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-16 md:gap-32">
            <div className="space-y-6">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40">Company</h4>
              <ul className="space-y-4 text-xs font-medium uppercase tracking-widest">
                <li><Link to="/" className="hover:text-brand-gold transition-colors">About</Link></li>
                <li><Link to="/" className="hover:text-brand-gold transition-colors">Archive</Link></li>
                <li><Link to="/" className="hover:text-brand-gold transition-colors">Manifesto</Link></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40">Establishment</h4>
              <ul className="space-y-4 text-xs font-medium uppercase tracking-widest">
                <li><Link to="/seller/dashboard" className="hover:text-brand-gold transition-colors">Registry</Link></li>
                <li><Link to="/seller/create-product" className="hover:text-brand-gold transition-colors">Curate</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[9px] uppercase tracking-[0.5em] opacity-30">© 2026 SNITCH WORLDWIDE • ALL RIGHTS RESERVED</p>
            <p className="text-[9px] uppercase tracking-[0.5em] opacity-30">ESTABLISHED IN THE CLOUD</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;