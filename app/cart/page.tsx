'use client';

import { useEffect, useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import {
  ArrowLeft,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function CartPage() {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const { items, removeItem, updateQuantity, clearCart, getTotal } = useCartStore();
  const hydratedItems = isHydrated ? items : [];
  const total = isHydrated ? getTotal() : 0;

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleCheckout = () => {
    if (hydratedItems.length === 0) {
      toast.error('El carrito está vacío');
      return;
    }
    router.push('/checkout');
  };

  const handleUpdateQuantity = (id: string, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemoveItem = (id: string, name: string) => {
    removeItem(id);
    toast.success(`${name} eliminado del carrito`);
  };

  const handleClearCart = () => {
    if (window.confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      clearCart();
      toast.success('Carrito vaciado');
    }
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen text-slate-100">
        <Toaster position="top-right" />
        <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4">
          <div className="glass-panel rounded-[2rem] px-6 py-10 text-center text-slate-300">
            Cargando carrito...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-slate-100">
      <Toaster position="top-right" />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Link>

          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.24em] text-amber-300/70">Tu pedido</p>
            <h1 className="text-lg font-semibold text-white sm:text-2xl">Carrito Rocha Berazategui</h1>
          </div>

          <div className="rounded-full bg-white/5 px-4 py-2 text-sm text-slate-300">
            {hydratedItems.length} producto{hydratedItems.length === 1 ? '' : 's'}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        {hydratedItems.length === 0 ? (
          <div className="glass-panel mx-auto max-w-2xl rounded-[2rem] px-6 py-16 text-center">
            <ShoppingBag className="mx-auto h-16 w-16 text-slate-500" />
            <h2 className="mt-5 text-2xl font-bold text-white">Tu carrito está vacío</h2>
            <p className="mt-3 text-slate-400">
              Sumá insumos para empezar un pedido mayorista para tu negocio gastronómico.
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-amber-400 to-orange-600 px-6 py-3 font-semibold text-white shadow-lg shadow-orange-500/20 hover:from-amber-300 hover:to-orange-500"
            >
              Explorar catálogo
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <section className="space-y-4">
              <div className="glass-panel rounded-[2rem] p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-amber-300/70">Resumen</p>
                    <h2 className="text-2xl font-bold text-white">Productos seleccionados</h2>
                  </div>
                  <button
                    onClick={handleClearCart}
                    className="inline-flex items-center justify-center rounded-full border border-rose-400/20 bg-rose-400/10 px-4 py-2 text-sm font-medium text-rose-300 hover:bg-rose-400/15"
                  >
                    Vaciar carrito
                  </button>
                </div>
              </div>

              {hydratedItems.map((item) => (
                <article
                  key={item.id}
                  className="glass-panel rounded-[2rem] p-4 sm:p-5"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="h-24 w-full overflow-hidden rounded-[1.5rem] bg-slate-900 sm:h-24 sm:w-24">
                      {typeof item.image === 'string' && item.image.trim().length > 0 ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.nextElementSibling as HTMLDivElement | null;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div
                        className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800"
                        style={{
                          display:
                            typeof item.image === 'string' && item.image.trim().length > 0
                              ? 'none'
                              : 'flex',
                        }}
                      >
                        <ShoppingBag className="h-8 w-8 text-slate-600" />
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                          <p className="mt-1 text-sm text-slate-400">
                            Stock disponible: {item.stock}
                          </p>
                          <p className="mt-2 text-2xl font-black text-white">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>

                        <button
                          onClick={() => handleRemoveItem(item.id, item.name)}
                          className="inline-flex items-center gap-2 self-start rounded-full border border-rose-400/20 bg-rose-400/10 px-3 py-2 text-sm font-medium text-rose-300 hover:bg-rose-400/15"
                        >
                          <Trash2 className="h-4 w-4" />
                          Quitar
                        </button>
                      </div>

                      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="inline-flex w-fit items-center gap-3 rounded-full border border-white/10 bg-slate-950/60 px-3 py-2">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                            className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-200 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="min-w-8 text-center text-base font-semibold text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                            className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-200 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                            disabled={item.quantity >= item.stock}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="text-left sm:text-right">
                          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Subtotal</p>
                          <p className="text-2xl font-black text-amber-300">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            <aside className="space-y-4">
              <div className="glass-panel-strong mobile-safe rounded-[2rem] p-5 sm:p-6 lg:sticky lg:top-24">
                <p className="text-sm uppercase tracking-[0.24em] text-amber-300/70">Checkout</p>
                <h2 className="mt-2 text-2xl font-bold text-white">Resumen del pedido</h2>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Envío</span>
                    <span className="text-emerald-300">A coordinar</span>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-white">Total</span>
                      <span className="text-3xl font-black text-white">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="mt-6 w-full rounded-2xl bg-gradient-to-r from-amber-400 to-orange-600 px-4 py-4 text-base font-semibold text-white shadow-xl shadow-orange-500/20 hover:from-amber-300 hover:to-orange-500"
                >
                  Proceder al pago
                </button>

                <div className="mt-6 grid gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-start gap-3">
                      <Truck className="mt-0.5 h-5 w-5 text-amber-300" />
                      <div>
                        <p className="font-semibold text-white">Entrega coordinada</p>
                        <p className="mt-1 text-sm text-slate-400">
                          Definimos envío y logística según tu local, volumen y frecuencia de compra.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="mt-0.5 h-5 w-5 text-emerald-300" />
                      <div>
                        <p className="font-semibold text-white">Compra mayorista segura</p>
                        <p className="mt-1 text-sm text-slate-400">
                          Ideal para pizzerías, hamburgueserías, bares y negocios gastronómicos.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}

// Made with Bob
