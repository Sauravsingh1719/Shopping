'use client';

import React, { useCallback, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Loader2, ShoppingCart, Heart, Eye, Star, ChevronRight } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function CategoryPage() {
  const params = useParams<{ slug: string }>();
  const currentCategory = params?.slug ? decodeURIComponent(params.slug) : '';

  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { addToCart, toggleWishlist, isInWishlist } = useStore();

  const fetchCategoryProducts = useCallback(async () => {
    if (!currentCategory) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/products?category=${currentCategory}`);
      if (response.data.success) {
        setProducts(response.data.data);
      } else {
        setError('No items found in this category.');
      }
    } catch (err) {
      const axiosError = err as AxiosError<any>;
      setError(axiosError.response?.data.message ?? 'Failed to fetch category');
    } finally {
      setIsLoading(false);
    }
  }, [currentCategory]);

  useEffect(() => {
    fetchCategoryProducts();
  }, [fetchCategoryProducts]);

  return (
    <main className="pt-28 pb-20 max-w-screen-2xl mx-auto px-4 md:px-8 bg-surface min-h-screen">
      
      {}
      {}
      <nav className="mb-8 flex items-center flex-wrap gap-2 text-xs font-medium uppercase tracking-widest text-primary/70">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-primary font-bold">{currentCategory.replace('-', ' ')}</span>
      </nav>

      <div className="mb-12">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-primary leading-none mb-4 capitalize">
          {currentCategory.replace('-', ' ')}
        </h1>
        {}
        <p className="max-w-xl text-primary/80 font-medium text-lg">
          Curated essentials for the modern lifestyle. Precision-tailored for the discerning aesthetic.
        </p>
      </div>

      {}
      <section className="sticky top-20 z-40 bg-surface py-4 mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-outline-variant/20">
        {}
        <span className="text-sm font-bold text-primary/80">{products.length} Results Found</span>
      </section>

      {}
      {isLoading ? (
        <div className="py-32 flex flex-col items-center justify-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
          <p className="font-headline tracking-widest uppercase text-sm text-primary">Curating Collection...</p>
        </div>
      ) : error ? (
        <div className="py-32 text-center flex flex-col items-center">
          <p className="text-error font-headline mb-4">{error}</p>
          <Link href="/" className="px-8 py-3 bg-primary text-white rounded-lg text-sm font-bold uppercase tracking-widest">
            Back to Home
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => {
            const isFavorited = isInWishlist(product._id);
            return (
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
                  
                  {}
                  <div className="hidden md:flex absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/40 backdrop-blur-md justify-around z-20">
                    <button 
                      onClick={(e) => { e.preventDefault(); addToCart(product); }}
                      className="h-10 w-10 rounded-full bg-white text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                      className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors ${isFavorited ? 'bg-error text-white' : 'bg-white text-primary hover:bg-primary hover:text-white'}`}
                    >
                      <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                    </button>
                    <Link 
                      href={`/products/${product._id}`}
                      onClick={(e) => e.stopPropagation()} 
                      className="h-10 w-10 rounded-full bg-white text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
                
                <div className="p-6 border-t border-surface-container">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-primary truncate pr-2">{product.title}</h3>
                    <div className="flex items-center text-amber-500 shrink-0">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-xs font-bold ml-1 text-primary">{product.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  {}
                  <p className="text-xs text-primary/70 font-medium line-clamp-1 mb-4 uppercase tracking-wider">{product.brand || product.category}</p>
                  <span className="text-xl font-black text-primary">${product.price.toFixed(2)}</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}