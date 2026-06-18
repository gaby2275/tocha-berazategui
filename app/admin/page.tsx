'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  CreditCard,
  Image as ImageIcon,
  Package,
  Plus,
  RefreshCw,
  Save,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Upload,
  X,
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';

type ProductRow = Database['public']['Tables']['products']['Row'];
type OrderRow = Database['public']['Tables']['orders']['Row'];

type ProductFormState = {
  name: string;
  description: string;
  price: string;
  stock: string;
  category: string;
  sku: string;
  active: boolean;
  imageUrl: string;
};

const emptyProductForm: ProductFormState = {
  name: '',
  description: '',
  price: '',
  stock: '',
  category: '',
  sku: '',
  active: true,
  imageUrl: '',
};

export default function AdminPage() {
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingProductId, setSavingProductId] = useState<string | null>(null);
  const [creatingProduct, setCreatingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState<ProductFormState>(emptyProductForm);
  const [editingImageProductId, setEditingImageProductId] = useState<string | null>(null);

  useEffect(() => {
    void loadAdminData();
  }, []);

  const totalProducts = products.length;
  const activeProducts = products.filter((product) => product.active).length;
  const lowStockProducts = products.filter((product) => product.stock <= 5).length;
  const pendingOrders = orders.filter((order) => order.status === 'pending').length;

  const totalSales = useMemo(
    () => orders.reduce((sum, order) => sum + Number(order.total || 0), 0),
    [orders]
  );

  const loadAdminData = async () => {
    setLoading(true);

    try {
      const [{ data: productsData, error: productsError }, { data: ordersData, error: ordersError }] =
        await Promise.all([
          supabase.from('products').select('*').order('created_at', { ascending: false }),
          supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(10),
        ]);

      if (productsError) throw productsError;
      if (ordersError) throw ordersError;

      setProducts((productsData || []) as ProductRow[]);
      setOrders((ordersData || []) as OrderRow[]);
    } catch (error) {
      console.error('Error loading admin data:', error);
      toast.error('No se pudieron cargar los datos del panel');
    } finally {
      setLoading(false);
    }
  };

  const handleProductFieldChange = (
    productId: string,
    field: keyof ProductRow,
    value: string | number | boolean | null
  ) => {
    setProducts((current) =>
      current.map((product) =>
        product.id === productId ? { ...product, [field]: value } : product
      )
    );
  };

  const saveProduct = async (product: ProductRow) => {
    setSavingProductId(product.id);

    try {
      const payload: Database['public']['Tables']['products']['Update'] = {
        name: product.name,
        description: product.description,
        price: Number(product.price),
        stock: Number(product.stock),
        category: product.category,
        sku: product.sku,
        active: product.active,
      };

      const { error } = await supabase
        .from('products')
        .update(payload as never)
        .eq('id', product.id);

      if (error) throw error;

      toast.success(`Producto "${product.name}" actualizado`);
      await loadAdminData();
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('No se pudo actualizar el producto');
    } finally {
      setSavingProductId(null);
    }
  };

  const createProduct = async () => {
    if (!newProduct.name || !newProduct.price) {
      toast.error('Nombre y precio son obligatorios');
      return;
    }

    setCreatingProduct(true);

    try {
      const images = newProduct.imageUrl ? [newProduct.imageUrl] : [];
      
      const payload: Database['public']['Tables']['products']['Insert'] = {
        name: newProduct.name,
        description: newProduct.description || null,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock || 0),
        category: newProduct.category || null,
        sku: newProduct.sku || null,
        active: newProduct.active,
        images,
        wholesale_prices: [],
      };

      const { error } = await supabase.from('products').insert([payload] as never);

      if (error) throw error;

      toast.success('Producto creado correctamente');
      setNewProduct(emptyProductForm);
      await loadAdminData();
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error('No se pudo crear el producto');
    } finally {
      setCreatingProduct(false);
    }
  };

  const updateProductImage = async (productId: string, imageUrl: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ images: [imageUrl] } as never)
        .eq('id', productId);

      if (error) throw error;

      toast.success('Imagen actualizada');
      setEditingImageProductId(null);
      await loadAdminData();
    } catch (error) {
      console.error('Error updating image:', error);
      toast.error('No se pudo actualizar la imagen');
    }
  };

  return (
    <div className="min-h-screen text-slate-100">
      <Toaster position="top-right" />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-amber-300/70">Backoffice</p>
            <h1 className="text-xl font-bold text-white sm:text-3xl">Rocha Berazategui Admin</h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => void loadAdminData()}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-white/10"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Recargar</span>
            </button>

            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Catálogo</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <section className="hero-grid relative overflow-hidden rounded-[2rem] border border-white/10 p-6 sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.16),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.16),transparent_24%)]" />
          <div className="relative grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-sm text-amber-200">
                <Sparkles className="h-4 w-4" />
                Gestión mayorista para gastronomía
              </div>
              <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight text-white sm:text-5xl">
                Controlá productos, pedidos y stock de Rocha Berazategui desde un panel visual
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Administrá muzarella, harinas, congelados, combos y productos clave para negocios
                gastronómicos desde escritorio o celular.
              </p>
            </div>

            <div className="glass-panel-strong rounded-[2rem] p-5 sm:p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-amber-300/70">Estado general</p>
              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-400">Productos</p>
                  <p className="mt-2 text-3xl font-black text-white">{totalProducts}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-400">Pedidos</p>
                  <p className="mt-2 text-3xl font-black text-white">{orders.length}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-400">Pendientes</p>
                  <p className="mt-2 text-3xl font-black text-amber-300">{pendingOrders}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-400">Ventas</p>
                  <p className="mt-2 text-3xl font-black text-emerald-300">
                    ${totalSales.toFixed(0)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div className="glass-panel rounded-[2rem] p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-amber-400/15 p-3">
                <Package className="h-6 w-6 text-amber-300" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Productos</p>
                <p className="text-3xl font-black text-white">{totalProducts}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-400">{activeProducts} activos en catálogo</p>
          </div>

          <div className="glass-panel rounded-[2rem] p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-emerald-400/15 p-3">
                <ShoppingCart className="h-6 w-6 text-emerald-300" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Pedidos</p>
                <p className="text-3xl font-black text-white">{orders.length}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-400">{pendingOrders} pedidos pendientes</p>
          </div>

          <div className="glass-panel rounded-[2rem] p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-orange-400/15 p-3">
                <CreditCard className="h-6 w-6 text-orange-300" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Ventas</p>
                <p className="text-3xl font-black text-white">${totalSales.toFixed(2)}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-400">Total de órdenes registradas</p>
          </div>

          <div className="glass-panel rounded-[2rem] p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-amber-400/15 p-3">
                <TrendingUp className="h-6 w-6 text-amber-300" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Stock bajo</p>
                <p className="text-3xl font-black text-white">{lowStockProducts}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-400">Productos con 5 o menos unidades</p>
          </div>
        </section>

        <section className="glass-panel rounded-[2rem] p-5 sm:p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-2xl bg-amber-400/15 p-3">
              <Plus className="h-5 w-5 text-amber-300" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-amber-300/70">Alta rápida</p>
              <h2 className="text-2xl font-bold text-white">Crear producto gastronómico</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <input
              type="text"
              placeholder="Nombre"
              value={newProduct.name}
              onChange={(e) => setNewProduct((current) => ({ ...current, name: e.target.value }))}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white placeholder:text-slate-500 focus:border-amber-400/40 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Categoría"
              value={newProduct.category}
              onChange={(e) => setNewProduct((current) => ({ ...current, category: e.target.value }))}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white placeholder:text-slate-500 focus:border-amber-400/40 focus:outline-none"
            />
            <input
              type="text"
              placeholder="SKU"
              value={newProduct.sku}
              onChange={(e) => setNewProduct((current) => ({ ...current, sku: e.target.value }))}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white placeholder:text-slate-500 focus:border-amber-400/40 focus:outline-none"
            />
            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={newProduct.active}
                onChange={(e) => setNewProduct((current) => ({ ...current, active: e.target.checked }))}
              />
              Producto activo
            </label>

            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="Precio"
              value={newProduct.price}
              onChange={(e) => setNewProduct((current) => ({ ...current, price: e.target.value }))}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white placeholder:text-slate-500 focus:border-amber-400/40 focus:outline-none"
            />
            <input
              type="number"
              min="0"
              placeholder="Stock"
              value={newProduct.stock}
              onChange={(e) => setNewProduct((current) => ({ ...current, stock: e.target.value }))}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white placeholder:text-slate-500 focus:border-amber-400/40 focus:outline-none"
            />
            <div className="md:col-span-2 xl:col-span-2">
              <input
                type="text"
                placeholder="Descripción"
                value={newProduct.description}
                onChange={(e) => setNewProduct((current) => ({ ...current, description: e.target.value }))}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white placeholder:text-slate-500 focus:border-amber-400/40 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <ImageIcon className="h-4 w-4" />
              <span>Imagen del producto</span>
            </div>
            <input
              type="url"
              placeholder="URL de la imagen (ej: https://i.ibb.co/abc123/producto.jpg)"
              value={newProduct.imageUrl}
              onChange={(e) => setNewProduct((current) => ({ ...current, imageUrl: e.target.value }))}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white placeholder:text-slate-500 focus:border-amber-400/40 focus:outline-none"
            />
            {newProduct.imageUrl && (
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">
                <img
                  src={newProduct.imageUrl}
                  alt="Vista previa"
                  className="h-32 w-32 rounded-xl object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '';
                    toast.error('URL de imagen inválida');
                  }}
                />
              </div>
            )}
            <p className="text-xs text-slate-500">
              💡 Sube tu imagen a <a href="https://imgbb.com" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">ImgBB</a> (gratis) y pega el link "Direct link" aquí
            </p>
          </div>

          <div className="mt-5">
            <button
              onClick={() => void createProduct()}
              disabled={creatingProduct}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-600 px-5 py-3 font-semibold text-white shadow-lg shadow-orange-500/20 hover:from-amber-300 hover:to-orange-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Plus className="h-4 w-4" />
              {creatingProduct ? 'Creando...' : 'Crear producto'}
            </button>
          </div>
        </section>

        <section className="glass-panel rounded-[2rem] p-5 sm:p-6">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.24em] text-amber-300/70">Catálogo</p>
            <h2 className="text-2xl font-bold text-white">Editar productos</h2>
          </div>

          {loading ? (
            <div className="py-12 text-center text-slate-400">Cargando productos...</div>
          ) : products.length === 0 ? (
            <div className="py-12 text-center text-slate-400">No hay productos cargados.</div>
          ) : (
            <div className="space-y-4">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="rounded-[2rem] border border-white/10 bg-slate-950/45 p-4 sm:p-5"
                >
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
                    <input
                      type="text"
                      value={product.name}
                      onChange={(e) =>
                        handleProductFieldChange(product.id, 'name', e.target.value)
                      }
                      className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white focus:border-amber-400/40 focus:outline-none"
                    />
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={product.price}
                      onChange={(e) =>
                        handleProductFieldChange(product.id, 'price', Number(e.target.value))
                      }
                      className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white focus:border-amber-400/40 focus:outline-none"
                    />
                    <input
                      type="number"
                      min="0"
                      value={product.stock}
                      onChange={(e) =>
                        handleProductFieldChange(product.id, 'stock', Number(e.target.value))
                      }
                      className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white focus:border-amber-400/40 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={product.category || ''}
                      onChange={(e) =>
                        handleProductFieldChange(product.id, 'category', e.target.value)
                      }
                      placeholder="Categoría"
                      className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white placeholder:text-slate-500 focus:border-amber-400/40 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={product.sku || ''}
                      onChange={(e) =>
                        handleProductFieldChange(product.id, 'sku', e.target.value)
                      }
                      placeholder="SKU"
                      className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white placeholder:text-slate-500 focus:border-amber-400/40 focus:outline-none"
                    />
                    <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-300">
                      <input
                        type="checkbox"
                        checked={product.active}
                        onChange={(e) =>
                          handleProductFieldChange(product.id, 'active', e.target.checked)
                        }
                      />
                      Activo
                    </label>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1fr_auto] xl:items-start">
                    <textarea
                      value={product.description || ''}
                      onChange={(e) =>
                        handleProductFieldChange(product.id, 'description', e.target.value)
                      }
                      rows={3}
                      placeholder="Descripción"
                      className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white placeholder:text-slate-500 focus:border-amber-400/40 focus:outline-none"
                    />
                    <button
                      onClick={() => void saveProduct(product)}
                      disabled={savingProductId === product.id}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 font-semibold text-slate-950 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Save className="h-4 w-4" />
                      {savingProductId === product.id ? 'Guardando...' : 'Guardar'}
                    </button>
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <ImageIcon className="h-4 w-4" />
                        <span>Imagen del producto</span>
                      </div>
                      {Array.isArray(product.images) && product.images[0] && (
                        <img
                          src={String(product.images[0])}
                          alt={product.name}
                          className="h-16 w-16 rounded-lg object-cover"
                        />
                      )}
                    </div>
                    {editingImageProductId === product.id ? (
                      <div className="space-y-3">
                        <input
                          type="url"
                          placeholder="Nueva URL de imagen"
                          className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-2 text-sm text-white placeholder:text-slate-500 focus:border-amber-400/40 focus:outline-none"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              void updateProductImage(product.id, e.currentTarget.value);
                            }
                          }}
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              const input = e.currentTarget.parentElement?.previousElementSibling as HTMLInputElement;
                              if (input?.value) {
                                void updateProductImage(product.id, input.value);
                              }
                            }}
                            className="flex-1 rounded-xl bg-emerald-500 px-3 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
                          >
                            Guardar
                          </button>
                          <button
                            onClick={() => setEditingImageProductId(null)}
                            className="rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-slate-300 hover:bg-white/5"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setEditingImageProductId(product.id)}
                        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950/70 px-4 py-2 text-sm text-slate-300 hover:bg-white/5"
                      >
                        <Upload className="h-4 w-4" />
                        {Array.isArray(product.images) && product.images[0] ? 'Cambiar imagen' : 'Agregar imagen'}
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="glass-panel rounded-[2rem] p-5 sm:p-6">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.24em] text-amber-300/70">Operaciones</p>
            <h2 className="text-2xl font-bold text-white">Últimos pedidos</h2>
          </div>

          {loading ? (
            <div className="py-12 text-center text-slate-400">Cargando pedidos...</div>
          ) : orders.length === 0 ? (
            <div className="py-12 text-center text-slate-400">Todavía no hay pedidos.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-slate-300">
                <thead>
                  <tr className="border-b border-white/10 text-left text-slate-500">
                    <th className="py-3 pr-4">ID</th>
                    <th className="py-3 pr-4">Estado</th>
                    <th className="py-3 pr-4">Pago</th>
                    <th className="py-3 pr-4">Método</th>
                    <th className="py-3 pr-4">Total</th>
                    <th className="py-3 pr-4">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-white/5 last:border-b-0">
                      <td className="py-4 pr-4 font-mono text-xs text-slate-400">
                        {order.id.slice(0, 8)}...
                      </td>
                      <td className="py-4 pr-4 capitalize text-white">{order.status}</td>
                      <td className="py-4 pr-4 capitalize">{order.payment_status}</td>
                      <td className="py-4 pr-4 capitalize">{order.payment_method}</td>
                      <td className="py-4 pr-4 font-semibold text-emerald-300">
                        ${Number(order.total).toFixed(2)}
                      </td>
                      <td className="py-4 pr-4 text-slate-400">
                        {new Date(order.created_at).toLocaleString('es-AR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

// Made with Bob
