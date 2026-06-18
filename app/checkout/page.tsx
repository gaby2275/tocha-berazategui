'use client';

import { useEffect, useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { supabase } from '@/lib/supabase';
import {
  ArrowLeft,
  CreditCard,
  ShieldCheck,
  Store,
  Truck,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function CheckoutPage() {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const { items, getTotal, clearCart } = useCartStore();
  const hydratedItems = isHydrated ? items : [];
  const total = isHydrated ? getTotal() : 0;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Juan Pérez',
    email: 'juan.perez@ejemplo.com',
    phone: '1132044814',
    address: 'Av. Mitre 1234',
    city: 'Berazategui',
    postalCode: '1884',
    notes: 'Entregar entre 10 y 14hs',
  });
  const [paymentMethod, setPaymentMethod] = useState<'mercadopago' | 'paypal' | 'transfer'>(
    'transfer'
  );

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (hydratedItems.length === 0) {
      toast.error('El carrito está vacío');
      return;
    }

    if (!formData.name || !formData.phone || !formData.address || !formData.city) {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }

    setLoading(true);

    try {
      // Crear mensaje de WhatsApp
      let mensaje = `🛒 *NUEVO PEDIDO - Rocha Berazategui*\n\n`;
      mensaje += `👤 *Cliente:* ${formData.name}\n`;
      mensaje += `📧 *Email:* ${formData.email}\n`;
      mensaje += `📱 *Teléfono:* ${formData.phone}\n`;
      mensaje += `📍 *Dirección:* ${formData.address}, ${formData.city}`;
      if (formData.postalCode) mensaje += ` (CP: ${formData.postalCode})`;
      mensaje += `\n\n`;

      mensaje += `📦 *PRODUCTOS:*\n`;
      hydratedItems.forEach((item, index) => {
        mensaje += `${index + 1}. ${item.name}\n`;
        mensaje += `   Cantidad: ${item.quantity} x $${item.price.toFixed(2)} = $${(item.quantity * item.price).toFixed(2)}\n`;
      });

      mensaje += `\n💰 *TOTAL: $${total.toFixed(2)}*\n\n`;

      const paymentMethodText =
        paymentMethod === 'mercadopago' ? 'MercadoPago' :
        paymentMethod === 'paypal' ? 'PayPal' :
        'Transferencia bancaria';
      
      mensaje += `💳 *Forma de pago:* ${paymentMethodText}\n`;

      if (formData.notes) {
        mensaje += `\n📝 *Notas:* ${formData.notes}\n`;
      }

      mensaje += `\n✅ *Pedido confirmado y listo para procesar*`;

      // Codificar mensaje para URL
      const mensajeCodificado = encodeURIComponent(mensaje);
      const whatsappURL = `https://wa.me/5491132044814?text=${mensajeCodificado}`;

      // Guardar en base de datos (opcional, para registro)
      try {
        await supabase.from('orders').insert([
          {
            total,
            shipping_address: {
              street: formData.address,
              city: formData.city,
              postalCode: formData.postalCode,
            },
            payment_method: paymentMethod,
            payment_status: 'pending',
            status: 'pending',
            notes: `Cliente: ${formData.name} - Tel: ${formData.phone} - Email: ${formData.email}${formData.notes ? ' - ' + formData.notes : ''}`,
          },
        ] as never);
      } catch (dbError) {
        console.log('Error guardando en BD (no crítico):', dbError);
      }

      toast.success('¡Pedido listo! Redirigiendo a WhatsApp...');
      
      clearCart();

      // Redirigir a WhatsApp
      setTimeout(() => {
        window.open(whatsappURL, '_blank');
        router.push('/');
      }, 1500);
    } catch (error) {
      console.error('Error procesando pedido:', error);
      toast.error('Error al procesar el pedido. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  if (!isHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 text-slate-100">
        <div className="glass-panel mx-auto max-w-xl rounded-[2rem] px-6 py-14 text-center">
          <h2 className="text-2xl font-bold text-white">Cargando checkout...</h2>
          <p className="mt-3 text-slate-400">Estamos preparando tu pedido.</p>
        </div>
      </div>
    );
  }

  if (hydratedItems.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 text-slate-100">
        <div className="glass-panel mx-auto max-w-xl rounded-[2rem] px-6 py-14 text-center">
          <h2 className="text-2xl font-bold text-white">El carrito está vacío</h2>
          <p className="mt-3 text-slate-400">
            Antes de finalizar la compra necesitás agregar productos al pedido.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-amber-400 to-orange-600 px-6 py-3 font-semibold text-white shadow-lg shadow-orange-500/20 hover:from-amber-300 hover:to-orange-500"
          >
            Volver al catálogo
          </Link>
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
            href="/cart"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Link>

          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.24em] text-amber-300/70">Checkout</p>
            <h1 className="text-lg font-semibold text-white sm:text-2xl">Finalizar pedido mayorista</h1>
          </div>

          <div className="rounded-full bg-white/5 px-4 py-2 text-sm text-slate-300">
            ${total.toFixed(2)}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="space-y-6">
            <div className="glass-panel rounded-[2rem] p-5 sm:p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-amber-300/70">Datos del cliente</p>
              <h2 className="mt-2 text-2xl font-bold text-white">Información de entrega</h2>
              <p className="mt-2 text-sm text-slate-400">
                Completá tus datos para preparar el pedido de Rocha Berazategui y coordinar la entrega.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white placeholder:text-slate-500 focus:border-amber-400/40 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white placeholder:text-slate-500 focus:border-amber-400/40 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white placeholder:text-slate-500 focus:border-amber-400/40 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">Ciudad *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white placeholder:text-slate-500 focus:border-amber-400/40 focus:outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Dirección *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white placeholder:text-slate-500 focus:border-amber-400/40 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Código postal
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white placeholder:text-slate-500 focus:border-amber-400/40 focus:outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Notas adicionales
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Indicaciones de entrega, horarios del local, referencias, etc."
                      className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white placeholder:text-slate-500 focus:border-amber-400/40 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-amber-300" />
                    <div>
                      <h3 className="font-semibold text-white">Método de pago</h3>
                      <p className="text-sm text-slate-400">
                        Elegí cómo querés continuar con tu pedido mayorista.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-slate-950/50 p-4 hover:border-amber-400/30">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="mercadopago"
                        checked={paymentMethod === 'mercadopago'}
                        onChange={(e) =>
                          setPaymentMethod(e.target.value as 'mercadopago' | 'paypal' | 'transfer')
                        }
                        className="mt-1"
                      />
                      <div>
                        <p className="font-semibold text-white">MercadoPago</p>
                        <p className="text-sm text-slate-400">
                          Tarjetas, saldo en cuenta y medios locales.
                        </p>
                      </div>
                    </label>

                    <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-slate-950/50 p-4 hover:border-amber-400/30">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={paymentMethod === 'paypal'}
                        onChange={(e) =>
                          setPaymentMethod(e.target.value as 'mercadopago' | 'paypal' | 'transfer')
                        }
                        className="mt-1"
                      />
                      <div>
                        <p className="font-semibold text-white">PayPal</p>
                        <p className="text-sm text-slate-400">
                          Ideal para pagos internacionales.
                        </p>
                      </div>
                    </label>

                    <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-slate-950/50 p-4 hover:border-amber-400/30">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="transfer"
                        checked={paymentMethod === 'transfer'}
                        onChange={(e) =>
                          setPaymentMethod(e.target.value as 'mercadopago' | 'paypal' | 'transfer')
                        }
                        className="mt-1"
                      />
                      <div>
                        <p className="font-semibold text-white">Transferencia bancaria</p>
                        <p className="text-sm text-slate-400">
                          Coordinamos los datos luego de confirmar el pedido.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-gradient-to-r from-amber-400 to-orange-600 px-6 py-4 text-base font-semibold text-white shadow-xl shadow-orange-500/20 hover:from-amber-300 hover:to-orange-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? 'Procesando pedido...' : 'Confirmar pedido'}
                </button>
              </form>
            </div>
          </section>

          <aside className="space-y-4">
            <div className="glass-panel-strong mobile-safe rounded-[2rem] p-5 sm:p-6 lg:sticky lg:top-24">
              <p className="text-sm uppercase tracking-[0.24em] text-amber-300/70">Resumen</p>
              <h2 className="mt-2 text-2xl font-bold text-white">Tu pedido</h2>

              <div className="mt-6 space-y-3">
                {hydratedItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-white">{item.name}</p>
                      <p className="text-sm text-slate-400">Cantidad: {item.quantity}</p>
                    </div>
                    <p className="whitespace-nowrap font-semibold text-amber-300">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3 border-t border-white/10 pt-5">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Envío</span>
                  <span className="text-emerald-300">A coordinar</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-lg font-semibold text-white">Total</span>
                  <span className="text-3xl font-black text-white">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-start gap-3">
                    <Truck className="mt-0.5 h-5 w-5 text-amber-300" />
                    <div>
                      <p className="font-semibold text-white">Entrega flexible</p>
                      <p className="mt-1 text-sm text-slate-400">
                        Coordinamos envío según zona, volumen y necesidad del negocio.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-5 w-5 text-emerald-300" />
                    <div>
                      <p className="font-semibold text-white">Proceso claro</p>
                      <p className="mt-1 text-sm text-slate-400">
                        Confirmación simple para usar desde celular o escritorio.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-start gap-3">
                    <Store className="mt-0.5 h-5 w-5 text-orange-300" />
                    <div>
                      <p className="font-semibold text-white">Pensado para gastronomía</p>
                      <p className="mt-1 text-sm text-slate-400">
                        Ideal para pizzerías, hamburgueserías, bares, rotiserías y cocinas profesionales.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

// Made with Bob
