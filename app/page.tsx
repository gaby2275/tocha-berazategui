'use client';

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useCartStore } from '@/store/cartStore';
import {
  ArrowRight,
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
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 shadow-lg shadow-orange-500/20">
              <Package className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-amber-300/80">
                Distribuidora gastronómica
              </p>
              <h1 className="text-lg font-semibold text-white sm:text-xl">Rocha Berazategui</h1>
            </div>
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

      <main className="relative overflow-hidden">
        <section className="hero-grid relative border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.16),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.16),transparent_24%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-20">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-sm text-amber-200">
                <Sparkles className="h-4 w-4" />
                Mayorista de alimentos para negocios gastronómicos
              </div>

              <div className="space-y-4">
                <h2 className="max-w-3xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                  Insumos para tu cocina profesional con una experiencia{' '}
                  <span className="gradient-text">rápida y moderna</span>
                </h2>
                <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                  Rocha Berazategui abastece pizzerías, hamburgueserías, bares, rotiserías y
                  negocios gastronómicos con productos mayoristas, combos y entregas coordinadas.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/cart"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-600 px-6 py-3 font-semibold text-white shadow-xl shadow-orange-500/20 hover:from-amber-300 hover:to-orange-500"
                >
                  Hacer pedido
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/admin"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-slate-100 hover:bg-white/10"
                >
                  Ver panel admin
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-3">
                <div className="glass-panel rounded-2xl p-4">
                  <Truck className="mb-3 h-5 w-5 text-amber-300" />
                  <p className="text-sm font-semibold text-white">Entrega coordinada</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Reparto pensado para locales gastronómicos y compras por volumen.
                  </p>
                </div>
                <div className="glass-panel rounded-2xl p-4">
                  <ShieldCheck className="mb-3 h-5 w-5 text-emerald-300" />
                  <p className="text-sm font-semibold text-white">Compra mayorista confiable</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Productos clave para cocina profesional y reposición constante.
                  </p>
                </div>
                <div className="glass-panel rounded-2xl p-4">
                  <ShoppingCart className="mb-3 h-5 w-5 text-orange-300" />
                  <p className="text-sm font-semibold text-white">Pedido simple</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Sumá mercadería rápido desde web o celular.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-panel-strong mobile-safe rounded-[2rem] p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Catálogo activo</p>
                  <p className="text-3xl font-bold text-white">{products.length}</p>
                </div>
                <div className="rounded-2xl bg-emerald-400/15 px-3 py-2 text-sm font-semibold text-emerald-300">
                  Disponible
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-400">Especialidades</p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    Muzzarella, harinas, congelados y combos
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-400">Categorías destacadas</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {featuredCategories.length > 0 ? (
                      featuredCategories.map((category) => (
                        <span
                          key={category}
                          className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-200"
                        >
                          {category}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-slate-500">Cargando categorías...</span>
                    )}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-amber-400/15 to-orange-600/15 p-4">
                  <p className="text-sm text-slate-300">Pensado para gastronomía</p>
                  <p className="mt-1 text-xl font-bold text-white">
                    Insumos mayoristas para cocinar, vender y crecer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="glass-panel rounded-[2rem] p-4 sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-amber-300/70">Explorar</p>
                <h3 className="mt-1 text-2xl font-bold text-white">
                  Encontrá insumos para tu negocio
                </h3>
              </div>

              <div className="relative w-full lg:max-w-xl">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Buscar muzarella, harina, panes, patys..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="soft-ring w-full rounded-2xl border border-white/10 bg-slate-950/60 py-3 pl-12 pr-4 text-white placeholder:text-slate-500 focus:border-amber-400/40 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
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
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <article
                  key={product.id}
                  className="glass-panel group overflow-hidden rounded-[2rem] border border-white/10"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
                        <Package className="h-16 w-16 text-slate-600" />
                      </div>
                    )}

                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                      {product.category && (
                        <span className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs font-medium text-slate-200">
                          {product.category}
                        </span>
                      )}
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          product.stock > 0
                            ? 'bg-emerald-400/15 text-emerald-300'
                            : 'bg-rose-400/15 text-rose-300'
                        }`}
                      >
                        {product.stock > 0 ? `Stock ${product.stock}` : 'Sin stock'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 p-5">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{product.name}</h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">
                        {product.description ||
                          'Producto mayorista para abastecer tu negocio gastronómico.'}
                      </p>
                    </div>

                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Precio</p>
                        <p className="mt-1 text-3xl font-black text-white">
                          ${product.price.toFixed(2)}
                        </p>
                        {product.wholesale_prices && (
                          <p className="mt-1 text-xs text-amber-300">
                            Descuentos por volumen disponibles
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock <= 0}
                        className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-amber-400 to-orange-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 hover:from-amber-300 hover:to-orange-500 disabled:cursor-not-allowed disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-400"
                      >
                        {product.stock <= 0 ? 'No disponible' : 'Agregar'}
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
