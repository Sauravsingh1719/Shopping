'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { 
  LayoutDashboard, Package, ShoppingCart, Users, Settings, 
  Search, Loader2, DollarSign, AlertCircle, TrendingUp, PieChart
} from 'lucide-react';

export default function AdminStatisticsPage() {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/admin/stats');
        if (response.data.success) {
          setStats(response.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex h-screen bg-surface font-body pt-20">
      
      {}
      <aside className="w-64 bg-surface-container-lowest border-r border-outline-variant/20 flex flex-col hidden md:flex z-10">
        <div className="p-8">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary/50 mb-4 block">Navigation</span>
          <nav className="space-y-2">
            <Link href="/admin" className="w-full flex items-center gap-3 px-4 py-3 text-primary/70 hover:bg-surface hover:text-primary rounded-lg font-medium text-sm transition-colors">
              <Package className="w-4 h-4" /> Products
            </Link>
            {}
            <Link href="/admin/overview" className="flex items-center gap-3 px-4 py-3 bg-surface-container-high text-primary rounded-lg font-bold text-sm transition-colors">
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

      {}
      <main className="flex-1 flex flex-col overflow-hidden relative z-10 bg-surface">
        
        <header className="h-20 bg-surface-container-lowest border-b border-outline-variant/20 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center bg-surface px-4 py-2 rounded-lg w-96 border border-outline-variant/20">
            <Search className="w-4 h-4 text-primary/50" />
            <input 
              type="text" 
              placeholder="Search reports..." 
              className="bg-transparent border-none focus:ring-0 text-sm w-full ml-3 text-primary outline-none placeholder:text-primary/40"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">AU</div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8 hide-scrollbar">
          
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-primary font-headline">Store Statistics</h1>
            <p className="text-sm text-primary/70 font-medium mt-1">Real-time overview of your business metrics.</p>
          </div>

          {isLoading || !stats ? (
            <div className="flex flex-col items-center justify-center py-32">
              <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
              <span className="text-xs font-bold uppercase tracking-widest text-primary/50">Compiling Data...</span>
            </div>
          ) : (
            <>
              {}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                
                {}
                <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 shadow-sm flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                      <DollarSign className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-primary mb-1">${stats.totalInventoryValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary/50">Total Inventory Value</p>
                  </div>
                </div>

                {}
                <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 shadow-sm flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                      <Package className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-primary mb-1">{stats.totalProducts}</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary/50">Total Products</p>
                  </div>
                </div>

                {}
                <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 shadow-sm flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-lg bg-error/10 flex items-center justify-center text-error">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-primary mb-1">{stats.lowStockCount}</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary/50">Low Stock Alerts</p>
                  </div>
                </div>

                {}
                <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 shadow-sm flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600">
                      <PieChart className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-primary mb-1">{stats.categoryBreakdown.length}</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary/50">Active Categories</p>
                  </div>
                </div>

              </div>

              {}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {}
                <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-primary">Inventory by Category</h3>
                    <TrendingUp className="w-4 h-4 text-primary/50" />
                  </div>
                  <div className="space-y-6">
                    {stats.categoryBreakdown.map((cat: any, index: number) => {
                      const percentage = (cat.count / stats.totalProducts) * 100;
                      
                      return (
                        <div key={index}>
                          <div className="flex justify-between text-sm font-bold text-primary mb-2">
                            <span className="capitalize">{cat._id || 'Uncategorized'}</span>
                            <span>{cat.count} items</span>
                          </div>
                          <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full transition-all duration-1000" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {}
                <div className="bg-primary text-white border border-primary rounded-xl p-6 shadow-sm flex flex-col">
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-white/80">Atelier Insights</h3>
                  <p className="text-sm font-medium leading-relaxed mb-8">
                    Your inventory valuation is strongly weighted. Maintaining current stock levels is recommended for upcoming seasonal shifts.
                  </p>
                  <div className="mt-auto p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/70 mb-1">System Status</p>
                    <div className="flex items-center gap-2 text-sm font-bold">
                      <div className="w-2 h-2 rounded-full bg-emerald-400"></div> All Systems Operational
                    </div>
                  </div>
                </div>

              </div>
            </>
          )}

        </div>
      </main>
    </div>
  );
}