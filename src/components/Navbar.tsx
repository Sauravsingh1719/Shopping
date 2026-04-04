"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, User, ShieldCheck, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Electronics", href: "/electronics" },
    { name: "Fashion", href: "/fashion" },
    { name: "Beauty", href: "/beauty" },
    { name: "Home Essentials", href: "/home" },
  ];

  return (
    <>
      {}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-center px-4 md:px-8 h-16 md:h-20 w-full max-w-[1440px] mx-auto">
          
          {}
          <Link href="/" className="text-xl md:text-2xl font-bold tracking-tighter text-neutral-900 font-headline z-50">
            ATELIER
          </Link>

          {}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link, index) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`font-headline tracking-tight font-medium text-sm transition-colors ${
                  index === 0 
                    ? "text-neutral-900 border-b-2 border-neutral-900 pb-1" 
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {}
          <div className="flex items-center gap-4 md:gap-6 z-50">
            
            {}
            <div className="hidden lg:flex items-center bg-surface-container-highest px-4 py-2 rounded-full w-64">
              <Search className="text-on-surface-variant w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search collection..." 
                className="bg-transparent border-none focus:ring-0 text-sm w-full ml-2 font-body outline-none"
              />
            </div>

            {}
            <div className="hidden sm:flex items-center gap-4 text-neutral-800">
              <button className="hover:opacity-70 transition-opacity duration-300">
                <Heart className="w-5 h-5" strokeWidth={1.5} />
              </button>
              
              <button className="hover:opacity-70 transition-opacity duration-300 relative">
                <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                <span className="absolute -top-1 -right-1 bg-tertiary text-on-tertiary text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  2
                </span>
              </button>
              
              <button className="hover:opacity-70 transition-opacity duration-300">
                <User className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            {}
            <button className="sm:hidden hover:opacity-70 transition-opacity duration-300 relative text-neutral-800">
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              <span className="absolute -top-1 -right-1 bg-tertiary text-on-tertiary text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                2
              </span>
            </button>

            {}
            <button 
              className="md:hidden text-neutral-900 hover:opacity-70 transition-opacity"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" strokeWidth={1.5} />
              ) : (
                <Menu className="w-6 h-6" strokeWidth={1.5} />
              )}
            </button>

          </div>
        </div>
      </nav>

      {}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-surface/95 backdrop-blur-2xl flex flex-col pt-24 px-8 md:hidden"
          >
            {}
            <div className="flex items-center bg-white px-4 py-3 rounded-xl w-full mb-8 shadow-sm">
              <Search className="text-on-surface-variant w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search Atelier..." 
                className="bg-transparent border-none focus:ring-0 text-base w-full ml-3 font-body outline-none"
              />
            </div>

            {}
            <div className="flex flex-col space-y-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                >
                  <Link 
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-headline text-3xl font-bold tracking-tight text-neutral-900"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {}
            <div className="mt-auto pb-12 flex justify-between items-center text-neutral-500 border-t border-neutral-200 pt-6">
              <button className="flex flex-col items-center gap-1 hover:text-neutral-900">
                <Heart className="w-6 h-6" strokeWidth={1.5} />
                <span className="text-xs font-medium font-body uppercase tracking-wider">Wishlist</span>
              </button>
              <button className="flex flex-col items-center gap-1 hover:text-neutral-900">
                <User className="w-6 h-6" strokeWidth={1.5} />
                <span className="text-xs font-medium font-body uppercase tracking-wider">Account</span>
              </button>
              <Link href="/admin" className="flex flex-col items-center gap-1 hover:text-neutral-900">
                <ShieldCheck className="w-6 h-6" strokeWidth={1.5} />
                <span className="text-xs font-medium font-body uppercase tracking-wider">Admin</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}