'use client';

import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { 
  LayoutDashboard, Package, ShoppingCart, Users, Settings, 
  Plus, Search, Edit3, Trash2, Loader2, ArrowUpRight, X, Image as ImageIcon, Menu
} from 'lucide-react';

export default function AdminDashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // --- NEW: MOBILE SIDEBAR STATE ---
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '', category: '', price: '', stock: '', brand: '', thumbnail: '', description: ''
  });

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/products');
      if (response.data.success) {
        setProducts(response.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const openAddModal = () => {
    setEditingProductId(null);
    setFormData({ title: '', category: '', price: '', stock: '', brand: '', thumbnail: '', description: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (product: any) => {
    setEditingProductId(product._id);
    setFormData({
      title: product.title, category: product.category, price: product.price.toString(),
      stock: product.stock.toString(), brand: product.brand || '',
      thumbnail: product.thumbnail || product.images?.[0] || '', description: product.description || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, title: string) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`);
    if (!isConfirmed) return;
    try {
      const response = await axios.delete(`/api/products/${id}`);
      if (response.data.success) fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Check console.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = { ...formData, price: parseFloat(formData.price), stock: parseInt(formData.stock, 10) };
      if (editingProductId) {
        await axios.put(`/api/products/${editingProductId}`, payload);
      } else {
        await axios.post('/api/products', payload);
      }
      setIsModalOpen(false);
      fetchProducts(); 
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product. Check console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-surface font-body pt-20">
      
      {/* --- MOBILE OVERLAY BACKDROP --- */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* --- UPDATED RESPONSIVE SIDEBAR --- */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-surface-container-lowest border-r border-outline-variant/20 flex flex-col transition-transform duration-300 md:relative md:translate-x-0 ${isMobileSidebarOpen ? 'translate-x-0 pt-20' : '-translate-x-full'} md:flex md:pt-0`}>
        <div className="p-8 flex justify-between items-center md:block">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary/50 md:mb-4 block">Navigation</span>
          
          {/* Close button for mobile */}
          <button className="md:hidden text-primary/50 hover:text-primary" onClick={() => setIsMobileSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="px-8 pb-8 flex-1">
          <nav className="space-y-2">
            <Link href="/admin" onClick={() => setIsMobileSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 bg-surface-container-high text-primary rounded-lg font-bold text-sm transition-colors">
              <Package className="w-4 h-4" /> Products
            </Link>
            <Link href="/admin/overview" onClick={() => setIsMobileSidebarOpen(false)} className="w-full flex items-center gap-3 px-4 py-3 text-primary/70 hover:bg-surface hover:text-primary rounded-lg font-medium text-sm transition-colors">
              <LayoutDashboard className="w-4 h-4" /> Overview
            </Link>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-primary/70 hover:bg-surface hover:text-primary rounded-lg font-medium text-sm transition-colors">
              <ShoppingCart className="w-4 h-4" /> Orders
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-primary/70 hover:bg-surface hover:text-primary rounded-lg font-medium text-sm transition-colors">
              <Users className="w-4 h-4" /> Customers
            </button>
          </nav>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-hidden relative z-10 bg-surface">
        
        {/* --- UPDATED HEADER --- */}
        <header className="h-20 bg-surface-container-lowest border-b border-outline-variant/20 flex items-center justify-between px-4 md:px-8 shrink-0 gap-4">
          <div className="flex items-center gap-3 flex-1">
            
            {/* Hamburger Button */}
            <button 
              onClick={() => setIsMobileSidebarOpen(true)}
              className="md:hidden p-2 -ml-2 text-primary/70 hover:text-primary transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Search Bar - Shrinks on mobile */}
            <div className="flex items-center bg-surface px-4 py-2 rounded-lg w-full max-w-sm border border-outline-variant/20 focus-within:border-primary transition-colors">
              <Search className="w-4 h-4 text-primary/50 shrink-0" />
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none focus:ring-0 text-sm w-full ml-2 md:ml-3 text-primary outline-none placeholder:text-primary/40"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs md:text-sm">AU</div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-4 md:p-8 hide-scrollbar">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-primary font-headline">Inventory</h1>
              <p className="text-xs md:text-sm text-primary/70 font-medium mt-1">Manage your store's products and pricing.</p>
            </div>
            <button 
              onClick={openAddModal}
              className="bg-primary text-white px-6 py-3 rounded-lg font-bold tracking-widest uppercase text-xs flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/10 w-full sm:w-fit"
            >
              <Plus className="w-4 h-4" /> Add Product
            </button>
          </div>

          {/* Data Table */}
          <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                {/* ... (Table content remains exactly the same) ... */}
                <thead>
                  <tr className="bg-surface border-b border-outline-variant/20">
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-primary/50">Product</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-primary/50">Category</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-primary/50">Price</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-primary/50">Stock</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-primary/50 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-20 text-center">
                        <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
                        <span className="text-xs font-bold uppercase tracking-widest text-primary/50">Loading Inventory...</span>
                      </td>
                    </tr>
                  ) : filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-20 text-center">
                        <span className="text-sm font-medium text-primary/70">No products found.</span>
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((product) => (
                      <tr key={product._id} className="hover:bg-surface/50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded bg-surface border border-outline-variant/20 flex items-center justify-center p-1 shrink-0 overflow-hidden">
                              <img src={product.thumbnail} alt={product.title} className="w-full h-full object-contain mix-blend-multiply" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-primary line-clamp-1">{product.title}</p>
                              <Link href={`/products/${product._id}`} className="text-[10px] font-bold uppercase tracking-widest text-primary/40 hover:text-primary flex items-center gap-1 mt-0.5">
                                View Page <ArrowUpRight className="w-3 h-3" />
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-surface rounded text-[10px] font-bold uppercase tracking-widest text-primary/70 border border-outline-variant/10">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-bold text-primary">${product.price?.toFixed(2)}</span>
                        </td>
                        <td className="px-6 py-4">
                          {product.stock > 10 ? (
                            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                              <div className="w-2 h-2 rounded-full bg-emerald-500"></div> {product.stock}
                            </div>
                          ) : product.stock > 0 ? (
                            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600">
                              <div className="w-2 h-2 rounded-full bg-amber-400"></div> Low ({product.stock})
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 text-xs font-bold text-error">
                              <div className="w-2 h-2 rounded-full bg-error"></div> Out of Stock
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => openEditModal(product)}
                              className="p-2 text-primary/50 hover:text-primary hover:bg-surface rounded transition-colors"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDelete(product._id, product.title)}
                              className="p-2 text-primary/50 hover:text-error hover:bg-error/10 rounded transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* --- SMART MODAL (HANDLES BOTH ADD & EDIT) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-primary/20 backdrop-blur-sm">
          {/* ... Modal content remains identical to before ... */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden border border-outline-variant/20 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-outline-variant/20">
              <h2 className="text-xl font-bold font-headline text-primary">
                {editingProductId ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-surface rounded-full transition-colors">
                <X className="w-5 h-5 text-primary/50" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <form id="product-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-primary/70">Thumbnail Image URL</label>
                  <div className="flex items-center bg-surface border border-outline-variant/30 rounded-lg p-3 focus-within:border-primary transition-colors">
                    <ImageIcon className="w-4 h-4 text-primary/40 mr-3 shrink-0" />
                    <input 
                      type="url" required placeholder="https://images.unsplash.com/photo-..." 
                      className="bg-transparent border-none focus:ring-0 text-sm w-full text-primary outline-none placeholder:text-primary/30"
                      value={formData.thumbnail} onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary/70">Product Title</label>
                    <input type="text" required className="w-full bg-surface border border-outline-variant/30 rounded-lg p-3 text-sm focus:border-primary outline-none transition-colors" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary/70">Brand</label>
                    <input type="text" className="w-full bg-surface border border-outline-variant/30 rounded-lg p-3 text-sm focus:border-primary outline-none transition-colors" value={formData.brand} onChange={(e) => setFormData({...formData, brand: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary/70">Category</label>
                    <input type="text" required placeholder="e.g. beauty, mens-shoes" className="w-full bg-surface border border-outline-variant/30 rounded-lg p-3 text-sm focus:border-primary outline-none transition-colors" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary/70">Price ($)</label>
                    <input type="number" step="0.01" required className="w-full bg-surface border border-outline-variant/30 rounded-lg p-3 text-sm focus:border-primary outline-none transition-colors" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary/70">Stock Quantity</label>
                    <input type="number" required className="w-full bg-surface border border-outline-variant/30 rounded-lg p-3 text-sm focus:border-primary outline-none transition-colors" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-primary/70">Description</label>
                  <textarea required rows={4} className="w-full bg-surface border border-outline-variant/30 rounded-lg p-3 text-sm focus:border-primary outline-none transition-colors resize-none" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                </div>
              </form>
            </div>

            <div className="p-4 md:p-6 border-t border-outline-variant/20 flex items-center justify-end gap-4 bg-surface">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-primary/70 hover:text-primary transition-colors">
                Cancel
              </button>
              <button type="submit" form="product-form" disabled={isSubmitting} className="bg-primary text-white px-8 py-3 rounded-lg font-bold tracking-widest uppercase text-xs flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : (editingProductId ? 'Update Product' : 'Save Product')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}