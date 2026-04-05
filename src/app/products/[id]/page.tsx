'use client';

import React, { useCallback, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Loader2, ChevronRight, Star, CheckCircle, ShoppingBag,
  Heart, ArrowLeftRight, Truck, RefreshCcw, ShieldCheck
} from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function ProductDetailsPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const addToCart = useStore((state) => state.addToCart);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const isInWishlist = useStore((state) => state.isInWishlist);

  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [activeTab, setActiveTab] = useState('description');
  const [selectedSize, setSelectedSize] = useState('M');

  const fetchProduct = useCallback(async () => {
    if (!id) return;

    setIsLoading(true);
    try {
      const response = await axios.get(`/api/products/${id}`);
      if (response.data.success) {
        const data = response.data.data;
        setProduct(data);
        setSelectedImage(data.images?.[0] || data.thumbnail);
      }
    } catch (err) {
      const axiosError = err as AxiosError<any>;
      setError(axiosError.response?.data?.message || 'Failed to load product details.');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center bg-surface">
        <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
        <p className="font-headline tracking-widest uppercase text-sm text-primary">Retrieving Details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center bg-surface">
        <p className="text-error font-headline mb-4">{error || 'Product not found'}</p>
        <Link href="/" className="underline text-sm font-bold uppercase tracking-widest text-primary">
          Return Home
        </Link>
      </div>
    );
  }

  const originalPrice = product.discountPercentage
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

  const isFavorited = isInWishlist(product._id);

  const apparelCategories = ['mens-shirts', 'mens-shoes', 'womens-dresses', 'womens-shoes', 'tops'];
  const requiresSizeSelector = apparelCategories.includes(product.category?.toLowerCase());

  return (
    <main className="pt-28 pb-20 max-w-screen-2xl mx-auto px-4 md:px-8 bg-surface min-h-screen text-on-surface">
      
      <nav className="mb-8 md:mb-12 flex items-center flex-wrap gap-2 text-xs font-medium uppercase tracking-widest text-primary/70">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="hover:text-primary transition-colors cursor-pointer">{product.category}</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-primary font-bold truncate">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        
        <section className="grid grid-cols-1 gap-4 md:gap-6">
          <div className="aspect-square md:aspect-[4/5] bg-surface-container-lowest rounded-xl overflow-hidden group cursor-zoom-in relative border border-outline-variant/10 shadow-sm">
            <img 
              src={selectedImage} 
              alt={product.title} 
              className="w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-105 mix-blend-multiply" 
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-tighter uppercase shadow-sm border border-outline-variant/20 text-primary">
              Signature Collection
            </div>
          </div>
          
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3 md:gap-4">
              {product.images.map((img: string, idx: number) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`aspect-square bg-surface-container-lowest rounded-lg overflow-hidden border transition-all ${selectedImage === img ? 'border-primary' : 'border-outline-variant/20 hover:opacity-80'}`}
                >
                  <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-contain mix-blend-multiply p-2" />
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="flex flex-col gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="bg-secondary-container text-primary px-3 py-1 rounded text-[10px] font-bold tracking-widest uppercase">
                {product.brand || 'Atelier Exclusive'}
              </span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-semibold">{product.rating?.toFixed(1)}</span>
                <span className="text-xs text-primary/70 ml-1">
                  ({product.reviews?.length || 0} Reviews)
                </span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-primary">{product.title}</h1>
            
            <div className="flex items-end gap-4 flex-wrap">
              <span className="text-3xl font-bold tracking-tight text-primary">${product.price?.toFixed(2)}</span>
              {originalPrice && (
                <>
                  <span className="text-lg text-primary/60 line-through mb-1">${originalPrice}</span>
                  <span className="bg-error/10 text-error px-2 py-0.5 rounded text-[11px] font-black uppercase mb-1">
                    Save {Math.round(product.discountPercentage)}%
                  </span>
                </>
              )}
            </div>
            
            <p className="text-primary/80 leading-relaxed max-w-xl text-sm md:text-base font-medium">
              {product.description}
            </p>
            
            <div className={`flex items-center gap-2 text-sm font-bold tracking-wide ${product.stock > 0 ? 'text-emerald-700' : 'text-error'}`}>
              <CheckCircle className="w-4 h-4" />
              {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </div>
          </div>

          {}
          {requiresSizeSelector && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-widest text-primary">Select Size</label>
                <button className="text-[10px] font-bold uppercase tracking-widest underline underline-offset-4 decoration-outline-variant text-primary/70 hover:text-primary">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2.5 text-xs font-bold rounded transition-all ${
                      selectedSize === size 
                        ? 'border-2 border-primary text-primary' 
                        : 'border border-outline-variant/30 text-primary/70 hover:border-primary hover:text-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {}
          <div className="space-y-3 pt-6 border-t border-outline-variant/20">
            <div className="flex gap-3 md:gap-4">
              <button 
                onClick={() => addToCart(product)}
                disabled={product.stock === 0}
                className="flex-1 bg-gradient-to-br from-primary to-primary-container text-white py-3.5 rounded-lg font-bold tracking-widest uppercase text-xs flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/10 disabled:opacity-50 disabled:hover:scale-100 cursor-pointer disabled:cursor-not-allowed"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Cart
              </button>
              
              <button 
                onClick={() => toggleWishlist(product)}
                className={`w-[50px] shrink-0 flex items-center justify-center border rounded-lg transition-colors group ${
                  isFavorited ? 'border-error/20 bg-error/5 hover:bg-error/10' : 'border-outline-variant/30 hover:border-primary'
                }`}
              >
                <Heart 
                  className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                    isFavorited ? 'fill-error text-error' : 'text-primary'
                  }`} 
                />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <button className="bg-surface-container-highest text-primary py-3 rounded-lg font-bold uppercase text-[10px] tracking-widest hover:bg-surface-container-high transition-colors">
                Buy it now
              </button>
              <button className="bg-surface border border-outline-variant/30 text-primary py-3 rounded-lg font-bold uppercase text-[10px] tracking-widest hover:border-primary transition-colors flex items-center justify-center gap-2">
                <ArrowLeftRight className="w-3 h-3" /> Compare
              </button>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-xl p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-outline-variant/30">
            <div className="flex flex-col items-center text-center gap-1.5 px-2 first:pt-0 pt-4 sm:pt-0">
              <Truck className="w-5 h-5 text-primary/70" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Free Delivery</span>
              <p className="text-[10px] text-primary/70 font-medium">{product.shippingInformation}</p>
            </div>
            <div className="flex flex-col items-center text-center gap-1.5 px-2 pt-4 sm:pt-0">
              <RefreshCcw className="w-5 h-5 text-primary/70" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Returns</span>
              <p className="text-[10px] text-primary/70 font-medium">{product.returnPolicy}</p>
            </div>
            <div className="flex flex-col items-center text-center gap-1.5 px-2 pt-4 sm:pt-0">
              <ShieldCheck className="w-5 h-5 text-primary/70" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Warranty</span>
              <p className="text-[10px] text-primary/70 font-medium">{product.warrantyInformation}</p>
            </div>
          </div>
        </section>
      </div>

      <section className="mt-20 md:mt-28">
        <div className="border-b border-outline-variant/20 flex gap-8 md:gap-12 overflow-x-auto hide-scrollbar whitespace-nowrap">
          {['description', 'specifications', 'reviews'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 md:pb-6 text-xs md:text-sm font-bold uppercase tracking-widest transition-colors relative ${
                activeTab === tab 
                  ? 'border-b-2 border-primary text-primary' 
                  : 'text-primary/50 hover:text-primary'
              }`}
            >
              {tab === 'reviews' ? `Reviews (${product.reviews?.length || 0})` : tab}
            </button>
          ))}
        </div>

        <div className="py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {activeTab === 'description' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
              <div className="lg:col-span-2 space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-primary">The Atelier Standard</h3>
                <p className="text-primary/80 font-medium leading-loose text-sm md:text-base">
                  {product.description} Born from the necessity of modern utility and refined in the studios of THE ATELIER, this piece represents the pinnacle of premium engineering.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="max-w-3xl">
              <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-primary">Technical Specs</h4>
              <dl className="space-y-4">
                <div className="flex justify-between py-3 border-b border-outline-variant/20">
                  <dt className="text-[10px] font-bold text-primary/70 uppercase tracking-widest">SKU</dt>
                  <dd className="text-xs font-bold text-primary">{product.sku}</dd>
                </div>
                <div className="flex justify-between py-3 border-b border-outline-variant/20">
                  <dt className="text-[10px] font-bold text-primary/70 uppercase tracking-widest">Weight</dt>
                  <dd className="text-xs font-bold text-primary">{product.weight} oz</dd>
                </div>
                {product.dimensions && (
                  <div className="flex justify-between py-3 border-b border-outline-variant/20">
                    <dt className="text-[10px] font-bold text-primary/70 uppercase tracking-widest">Dimensions</dt>
                    <dd className="text-xs font-bold text-primary">
                      {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm
                    </dd>
                  </div>
                )}
                <div className="flex justify-between py-3 border-b border-outline-variant/20">
                  <dt className="text-[10px] font-bold text-primary/70 uppercase tracking-widest">Minimum Order</dt>
                  <dd className="text-xs font-bold text-primary">{product.minimumOrderQuantity} units</dd>
                </div>
              </dl>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((review: any, idx: number) => (
                  <div key={idx} className="bg-surface-container-lowest p-6 md:p-8 rounded-2xl shadow-sm border border-outline-variant/10">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-outline-variant/30'}`} />
                      ))}
                    </div>
                    <p className="text-sm font-medium text-primary/80 italic mb-6 line-clamp-3">"{review.comment}"</p>
                    <div className="flex items-center gap-3 mt-auto">
                      <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-xs font-bold text-primary">
                        {review.reviewerName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-primary">{review.reviewerName}</p>
                        <p className="text-[10px] text-primary/60 font-bold uppercase tracking-wide mt-0.5">Verified Buyer</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-primary/70 font-medium italic">No reviews yet for this product.</p>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}