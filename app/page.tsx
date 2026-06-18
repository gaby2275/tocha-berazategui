'use client';

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useCartStore } from '@/store/cartStore';
import {
  ArrowRight,
  MapPin,
  MessageCircle,
  Package,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Truck,
} from 'lucide-react';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  images: any;
  category: string | null;
  wholesale_prices: any;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isHydrated, setIsHydrated] = useState(false);
  const { addItem, getItemCount } = useCartStore();
  const cartCount = isHydrated ? getItemCount() : 0;

  useEffect(() => {
    setIsHydrated(true);
    void fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    if (product.stock <= 0) {
      toast.error('Producto sin stock');
      return;
    }

    const productImage =
      Array.isArray(product.images) && typeof product.images[0] === 'string'
        ? product.images[0]
        : undefined;

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: productImage,
      stock: product.stock,
    });

    toast.success(`${product.name} agregado al carrito`);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const featuredCategories = useMemo(() => {
    const categories = products
      .map((product) => product.category)
      .filter((category): category is string => Boolean(category));

    return Array.from(new Set(categories)).slice(0, 4);
  }, [products]);

  return (
    <div className="min-h-screen text-slate-100">
      <Toaster position="top-right" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center">
            <img
              src="/logo-rocha.jpg"
              alt="Distribuidora Rocha Berazategui"
              className="h-20 w-auto sm:h-24 md:h-28"
            />
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/admin"
              className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 hover:border-amber-400/40 hover:bg-white/10 sm:inline-flex"
            >
              Admin
            </Link>

            <Link
              href="/cart"
              className="relative inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-orange-500/10 hover:bg-amber-50"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Carrito</span>
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-400 px-1 text-[11px] font-bold text-slate-950">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      <main className="relative overflow-hidden pb-20 md:pb-0">
        {/* Botones flotantes de contacto */}
        <div className="fixed bottom-24 right-4 z-40 flex flex-col gap-3 md:bottom-6">
          <a
            href="https://wa.me/5491132044814?text=Hola!%20Quiero%20hacer%20un%20pedido"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 shadow-lg shadow-green-500/30 hover:bg-green-400 hover:scale-110 transition-all"
            title="WhatsApp"
          >
            <MessageCircle className="h-7 w-7 text-white" />
          </a>
          <a
            href="https://www.instagram.com/rochaberazategui/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 shadow-lg shadow-pink-500/30 hover:scale-110 transition-all"
            title="Instagram"
          >
            <svg className="h-7 w-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div>

        <section className="hero-grid relative border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.16),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.16),transparent_24%)]" />
          <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-sm text-amber-200">
                <Sparkles className="h-4 w-4" />
                Mayorista Virtual
              </div>

              <h2 className="text-3xl font-black text-white sm:text-4xl lg:text-5xl">
                Distribuidora <span className="gradient-text">Rocha Berazategui</span>
              </h2>
              <p className="mx-auto max-w-2xl text-base text-slate-300 sm:text-lg">
                Catálogo online para negocios gastronómicos • Pedidos por WhatsApp
              </p>

              <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
                <MapPin className="h-4 w-4" />
                <span>Av. 21 y Dardo Rocha, Berazategui</span>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="glass-panel rounded-2xl p-4 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-400/15">
                    <ShoppingCart className="h-6 w-6 text-amber-300" />
                  </div>
                  <p className="text-lg font-bold text-white">1. Elegí</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Navegá el catálogo y agregá productos
                  </p>
                </div>
                <div className="glass-panel rounded-2xl p-4 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400/15">
                    <ShoppingCart className="h-6 w-6 text-emerald-300" />
                  </div>
                  <p className="text-lg font-bold text-white">2. Revisá</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Verificá tu carrito y cantidades
                  </p>
                </div>
                <div className="glass-panel rounded-2xl p-4 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-orange-400/15">
                    <Truck className="h-6 w-6 text-orange-300" />
                  </div>
                  <p className="text-lg font-bold text-white">3. Enviá</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Pedí por WhatsApp en un click
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="glass-panel rounded-[2rem] p-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-950/60 py-3 pl-12 pr-4 text-white placeholder:text-slate-400 focus:border-amber-400/40 focus:outline-none"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">Productos Disponibles</h3>
              <p className="mt-1 text-sm text-slate-400">{filteredProducts.length} productos en catálogo</p>
            </div>
          </div>
          {loading ? (
            <div className="flex min-h-[320px] items-center justify-center">
              <div className="h-14 w-14 animate-spin rounded-full border-2 border-amber-300/20 border-t-amber-400" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="glass-panel rounded-[2rem] px-6 py-16 text-center">
              <Package className="mx-auto h-14 w-14 text-slate-500" />
              <h3 className="mt-4 text-xl font-semibold text-white">No encontramos productos</h3>
              <p className="mt-2 text-sm text-slate-400">
                {searchTerm
                  ? 'Probá con otro término de búsqueda.'
                  : 'Todavía no hay productos disponibles en el catálogo.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <article
                  key={product.id}
                  className="glass-panel group overflow-hidden rounded-3xl border border-white/10"
                >
                  <div className="relative aspect-square overflow-hidden bg-slate-900">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
                        <Package className="h-20 w-20 text-slate-600" />
                      </div>
                    )}
                    {product.stock > 0 && (
                      <div className="absolute right-3 top-3 rounded-full bg-emerald-400/90 px-3 py-1 text-xs font-bold text-slate-950">
                        Disponible
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 p-4">
                    <div>
                      {product.category && (
                        <span className="text-xs font-medium text-amber-300">{product.category}</span>
                      )}
                      <h3 className="mt-1 text-lg font-bold text-white">{product.name}</h3>
                      <p className="mt-1 line-clamp-2 text-sm text-slate-400">
                        {product.description || 'Producto mayorista'}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-2xl font-black text-white">
                          ${product.price.toFixed(2)}
                        </p>
                        {product.wholesale_prices && (
                          <p className="text-xs text-amber-300">Desc. por volumen</p>
                        )}
                      </div>

                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock <= 0}
                        className="flex-shrink-0 rounded-xl bg-gradient-to-r from-amber-400 to-orange-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 hover:from-amber-300 hover:to-orange-500 disabled:cursor-not-allowed disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-400 disabled:shadow-none"
                      >
                        {product.stock <= 0 ? 'Sin stock' : '+ Agregar'}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-slate-400 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="font-medium text-slate-200">Rocha Berazategui</p>
            <p>Distribuidora mayorista de alimentos para negocios gastronómicos.</p>
          </div>
          <div className="flex flex-wrap gap-3 text-slate-300">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Gastronomía
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Mayorista
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Responsive
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Made with Bob
