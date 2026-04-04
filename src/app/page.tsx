'use client';

import React, { useCallback, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { Loader2, ShoppingCart, Heart, Eye, Star, Truck, ShieldCheck, RefreshCcw, Headset, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/products');
      if (response.data.success) {
        setProducts(response.data.data.slice(0, 4)); // Grab top 4 for Trending
      } else {
        setError('Failed to load products.');
      }
    } catch (err) {
      const axiosError = err as AxiosError<any>;
      setError(axiosError.response?.data.message ?? 'Failed to fetch products');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // --- Handlers for Quick Actions (Prevents triggering the card Link) ---
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); 
    console.log("Added to cart from quick action!");
    // Later, we will add Context API logic here
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Added to wishlist from quick action!");
  };

  return (
    <main className="pt-20">
      
      {/* HERO SECTION */}
      <section className="relative h-[921px] min-h-[600px] flex items-center overflow-hidden bg-surface">
        <div className="absolute inset-0 bg-gradient-to-br from-surface to-surface-container-high z-0"></div>
        <div className="max-w-screen-2xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="max-w-xl">
            <span className="inline-block px-3 py-1 bg-secondary-container text-on-secondary-container text-xs font-bold uppercase tracking-widest mb-6 rounded-sm">AW 2024 Collection</span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter font-headline text-primary leading-[0.9] mb-8">
              Modern <br/>Elegance <br/><span className="text-on-primary-container">For Every Day</span>
            </h1>
            <p className="text-lg text-secondary mb-10 max-w-md leading-relaxed">
              Experience a curated collection where heritage craftsmanship meets contemporary silhouettes. Designed for the discerning individual.
            </p>
            <div className="flex items-center space-x-6">
              <button className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-10 py-5 rounded-lg font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform duration-300 shadow-xl shadow-primary/20">
                Shop Now
              </button>
              <button className="text-primary font-bold text-sm uppercase tracking-widest group flex items-center">
                Explore Lookbook
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
          <div className="relative hidden lg:block h-full">
            <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-surface-container-lowest rounded-full blur-3xl opacity-50"></div>
            <img 
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop" 
              alt="Fashion photography" 
              className="relative z-10 w-full h-[700px] object-cover rounded-xl shadow-2xl hover:scale-[1.02] transition-transform duration-700" 
            />
          </div>
        </div>
      </section>

      {/* TRUST ELEMENTS BAR */}
      <section className="bg-surface-container-lowest py-12">
        <div className="max-w-screen-2xl mx-auto px-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-surface-container-low rounded-full flex items-center justify-center text-primary">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest">Free Shipping</h4>
              <p className="text-xs text-secondary">On orders over $100</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-surface-container-low rounded-full flex items-center justify-center text-primary">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest">Secure Payment</h4>
              <p className="text-xs text-secondary">SSL Certified protection</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-surface-container-low rounded-full flex items-center justify-center text-primary">
              <RefreshCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest">Easy Returns</h4>
              <p className="text-xs text-secondary">30-day return policy</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-surface-container-low rounded-full flex items-center justify-center text-primary">
              <Headset className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest">24/7 Support</h4>
              <p className="text-xs text-secondary">Dedicated assistance</p>
            </div>
          </div>
        </div>
      </section>

      {/* TRENDING PRODUCTS */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-on-primary-container">Selected Works</span>
            <h2 className="text-4xl font-bold tracking-tighter font-headline mt-2">Trending Now</h2>
          </div>
          
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center">
              <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
              <p className="font-headline tracking-widest uppercase text-sm">Loading Collection...</p>
            </div>
          ) : error ? (
            <div className="py-20 text-center text-error font-headline">{error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {/* --- UPDATED PRODUCT CARD --- */}
              {products.map((product) => (
                <Link 
                  href={`/products/${product._id}`} 
                  key={product._id} 
                  className="block group bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_20px_40px_-10px_rgba(14,22,41,0.05)] transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-white">
                    <img 
                      src={product.thumbnail} 
                      alt={product.title} 
                      className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110 mix-blend-multiply" 
                    />
                    
                    {product.discountPercentage > 10 && (
                      <span className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold uppercase px-2 py-1 rounded-sm z-10">
                        {Math.round(product.discountPercentage)}% Off
                      </span>
                    )}
                    
                    {/* Hover Actions: Hidden on mobile (md:flex) to ensure clean tap-to-navigate */}
                    <div className="hidden md:flex absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/40 backdrop-blur-md justify-around z-20">
                      <button 
                        onClick={handleAddToCart}
                        className="h-10 w-10 rounded-full bg-white text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={handleWishlist}
                        className="h-10 w-10 rounded-full bg-white text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                      >
                        <Heart className="w-5 h-5" />
                      </button>
                      <div className="h-10 w-10 rounded-full bg-white text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                        <Eye className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 border-t border-surface-container">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-primary truncate pr-2">{product.title}</h3>
                      <div className="flex items-center text-amber-500 shrink-0">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-xs font-bold ml-1 text-primary">{product.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-secondary line-clamp-1 mb-4 uppercase tracking-wider">{product.category}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-black text-primary">${product.price.toFixed(2)}</span>
                    </div>
                  </div>
                </Link>
              ))}
              {/* --- END UPDATED PRODUCT CARD --- */}

            </div>
          )}
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="max-w-screen-2xl mx-auto px-8 my-24">
        <div className="relative h-[500px] rounded-2xl overflow-hidden flex items-center">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop" 
            alt="Promo Banner" 
            className="absolute inset-0 w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-primary/60 backdrop-blur-[2px]"></div>
          <div className="relative z-10 p-12 lg:p-24 max-w-2xl text-white">
            <h2 className="text-5xl lg:text-7xl font-bold font-headline tracking-tighter leading-none mb-6">
              Seasonal <br/>Discovery Sale
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-md">
              Unlock up to 40% off on our archive collection. Timeless pieces curated for the modern wardrobe.
            </p>
            <button className="bg-white text-primary px-10 py-4 rounded-lg font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform">
              Explore Collection
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}