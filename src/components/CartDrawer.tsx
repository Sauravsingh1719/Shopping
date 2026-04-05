"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { useStore } from "@/store/useStore";
import Link from "next/link";

export default function CartDrawer() {
  const { cart, isCartOpen, toggleCart, removeFromCart, updateQuantity } = useStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isCartOpen]);

  if (!isMounted) return null;

  const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-[60]"
          />

          {}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-surface-container-lowest shadow-2xl z-[70] flex flex-col border-l border-outline-variant/20"
          >
            {}
            <div className="flex items-center justify-between p-6 border-b border-outline-variant/20">
              <h2 className="text-xl font-bold font-headline uppercase tracking-widest text-primary">Your Cart</h2>
              <button onClick={toggleCart} className="p-2 hover:bg-surface-container rounded-full transition-colors">
                <X className="w-5 h-5 text-on-surface-variant" />
              </button>
            </div>

            {}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-surface-container rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-outline-variant" />
                  </div>
                  <p className="text-secondary font-medium">Your cart is empty.</p>
                  <button onClick={toggleCart} className="text-sm font-bold uppercase tracking-widest text-primary border-b border-primary">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.product._id} className="flex gap-4 bg-surface p-3 rounded-xl border border-outline-variant/10">
                    {}
                    <div className="w-24 h-24 bg-white rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.product.thumbnail} alt={item.product.title} className="w-full h-full object-contain p-2 mix-blend-multiply" />
                    </div>

                    {}
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-sm text-primary line-clamp-1 pr-2">{item.product.title}</h3>
                          <button onClick={() => removeFromCart(item.product._id)} className="text-on-surface-variant hover:text-error transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[10px] uppercase tracking-widest text-secondary mt-1">{item.product.category}</p>
                      </div>

                      {}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center bg-surface-container-high rounded-lg p-1">
                          <button onClick={() => updateQuantity(item.product._id, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center hover:bg-white rounded transition-colors text-primary">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-primary">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center hover:bg-white rounded transition-colors text-primary">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-bold text-primary">${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {}
            {cart.length > 0 && (
              <div className="p-6 border-t border-outline-variant/20 bg-surface">
                <div className="flex justify-between items-center mb-4 text-sm">
                  <span className="text-secondary font-medium">Subtotal</span>
                  <span className="font-black text-xl text-primary">${subtotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-on-surface-variant mb-6 text-center">Shipping and taxes calculated at checkout.</p>
                <Link href="/checkout" onClick={toggleCart} className="w-full bg-gradient-to-br from-primary to-primary-container text-white py-4 rounded-lg font-bold tracking-widest uppercase text-sm flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-xl shadow-primary/10">
                  Secure Checkout <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}