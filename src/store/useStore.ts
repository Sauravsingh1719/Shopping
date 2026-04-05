import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  product: any;
  quantity: number;
}

interface StoreState {
  cart: CartItem[];
  wishlist: any[];
  
  isCartOpen: boolean; 
  
  addToCart: (product: any) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleWishlist: (product: any) => void;
  isInWishlist: (productId: string) => boolean;
  toggleCart: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      isCartOpen: false,

      addToCart: (product) => {
        const currentCart = get().cart;
        const existingItem = currentCart.find((item) => item.product._id === product._id);

        if (existingItem) {
          set({
            cart: currentCart.map((item) =>
              item.product._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
            isCartOpen: true,
          });
        } else {
          set({ 
            cart: [...currentCart, { product, quantity: 1 }],
            isCartOpen: true,
          });
        }
      },

      removeFromCart: (productId) => {
        set({ cart: get().cart.filter((item) => item.product._id !== productId) });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set({
          cart: get().cart.map((item) => 
            item.product._id === productId ? { ...item, quantity } : item
          )
        });
      },

      toggleCart: () => set({ isCartOpen: !get().isCartOpen }),

      toggleWishlist: (product) => {
        const currentWishlist = get().wishlist;
        const exists = currentWishlist.some((item) => item._id === product._id);
        if (exists) {
          set({ wishlist: currentWishlist.filter((item) => item._id !== product._id) });
        } else {
          set({ wishlist: [...currentWishlist, product] });
        }
      },

      isInWishlist: (productId) => {
        return get().wishlist.some((item) => item._id === productId);
      },
    }),
    {
      name: 'atelier-storage',
      partialize: (state) => ({ cart: state.cart, wishlist: state.wishlist }), 
    }
  )
);