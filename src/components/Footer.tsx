// components/shared/Footer.tsx
import Link from "next/link";
import { Globe, Camera, Radio, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full pt-20 pb-10 bg-surface-container-low text-on-surface border-t border-outline-variant/20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 px-8 max-w-screen-2xl mx-auto">
        
        {/* Brand & Mission */}
        <div>
          <span className="text-xl font-black text-primary mb-6 block uppercase tracking-tighter">THE ATELIER</span>
          <p className="text-sm font-body text-primary/80 font-medium leading-loose max-w-xs">
            The Digital Atelier represents a new standard in curated luxury commerce. Crafted for the discerning aesthetic.
          </p>
        </div>

        {/* Customer Care Links */}
        <div>
          <h5 className="text-xs font-bold uppercase tracking-widest font-headline text-primary mb-6">Customer Care</h5>
          <ul className="space-y-4">
            <li><Link href="#" className="text-sm font-body text-primary/80 font-medium hover:text-primary transition-colors hover:underline underline-offset-4 decoration-outline-variant">Help Center</Link></li>
            <li><Link href="#" className="text-sm font-body text-primary/80 font-medium hover:text-primary transition-colors hover:underline underline-offset-4 decoration-outline-variant">Shipping Info</Link></li>
            <li><Link href="#" className="text-sm font-body text-primary/80 font-medium hover:text-primary transition-colors hover:underline underline-offset-4 decoration-outline-variant">Returns & Exchanges</Link></li>
            <li><Link href="#" className="text-sm font-body text-primary/80 font-medium hover:text-primary transition-colors hover:underline underline-offset-4 decoration-outline-variant">FAQ</Link></li>
          </ul>
        </div>

        {/* Explore Links */}
        <div>
          <h5 className="text-xs font-bold uppercase tracking-widest font-headline text-primary mb-6">Explore</h5>
          <ul className="space-y-4">
            <li><Link href="/category/mens" className="text-sm font-body text-primary/80 font-medium hover:text-primary transition-colors hover:underline underline-offset-4 decoration-outline-variant">Men</Link></li>
            <li><Link href="/category/beauty" className="text-sm font-body text-primary/80 font-medium hover:text-primary transition-colors hover:underline underline-offset-4 decoration-outline-variant">Beauty</Link></li>
            <li><Link href="/category/fragrances" className="text-sm font-body text-primary/80 font-medium hover:text-primary transition-colors hover:underline underline-offset-4 decoration-outline-variant">Fragrances</Link></li>
            <li><Link href="/category/electronics" className="text-sm font-body text-primary/80 font-medium hover:text-primary transition-colors hover:underline underline-offset-4 decoration-outline-variant">Electronics</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h5 className="text-xs font-bold uppercase tracking-widest font-headline text-primary mb-6">Newsletter</h5>
          <p className="text-sm font-body text-primary/80 font-medium mb-6">Join for early access to signature drops.</p>
          <div className="flex border-b border-primary/40 focus-within:border-primary transition-colors">
            <input 
              type="email" 
              placeholder="Email Address" 
              className="bg-transparent border-none py-2 px-0 text-sm focus:ring-0 w-full text-primary placeholder:text-primary/50 outline-none"
            />
            <button className="text-primary hover:text-primary/70 transition-colors p-2">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-screen-2xl mx-auto px-8 mt-20 pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-xs font-body text-primary/80 font-bold tracking-widest uppercase">
          © {new Date().getFullYear()} THE ATELIER. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-6">
          <Link href="#" className="text-primary/80 hover:text-primary transition-colors"><Globe className="w-5 h-5" /></Link>
          <Link href="#" className="text-primary/80 hover:text-primary transition-colors"><Camera className="w-5 h-5" /></Link>
          <Link href="#" className="text-primary/80 hover:text-primary transition-colors"><Radio className="w-5 h-5" /></Link>
        </div>
      </div>
    </footer>
  );
}