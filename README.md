# 🛒 Mayorista Virtual - E-commerce B2B

Sistema completo de e-commerce para mayoristas con entrega a domicilio, integración de pagos (MercadoPago y PayPal) y sistema de tracking de entregas.

## 🚀 Características

- ✅ Catálogo de productos con búsqueda y filtros
- ✅ Carrito de compras con persistencia
- ✅ Sistema de precios mayoristas por volumen
- ✅ Integración con MercadoPago (Argentina)
- ✅ Integración con PayPal (Internacional)
- ✅ Sistema de tracking de entregas
- ✅ Panel de administración
- ✅ Gestión de inventario
- ✅ Notificaciones por email
- ✅ Responsive design (móvil y desktop)

## 📋 Requisitos

- Node.js v20 o superior
- npm o yarn
- Cuenta en Supabase (gratis)
- Cuenta en MercadoPago (opcional)
- Cuenta en PayPal (opcional)

## 🔧 Instalación

### 1. Clonar o navegar al proyecto

```bash
cd /Users/gabrieladam/client-env/mayorista-virtual
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
cp .env.local.example .env.local
```

Edita `.env.local` con tus credenciales:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anon
SUPABASE_SERVICE_ROLE_KEY=tu_clave_service_role

# MercadoPago
MERCADOPAGO_ACCESS_TOKEN=tu_access_token
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=tu_public_key

# PayPal
PAYPAL_CLIENT_ID=tu_client_id
PAYPAL_CLIENT_SECRET=tu_client_secret
PAYPAL_MODE=sandbox

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Mayorista Virtual
```

### 4. Configurar Base de Datos en Supabase

1. Ve a https://supabase.com y crea un proyecto
2. En el SQL Editor, ejecuta el siguiente script:

```sql
-- Tabla de usuarios
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  address JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de productos
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  stock INTEGER DEFAULT 0,
  images JSONB,
  wholesale_prices JSONB,
  category TEXT,
  sku TEXT UNIQUE,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de pedidos
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  total DECIMAL(10,2) NOT NULL,
  shipping_address JSONB NOT NULL,
  tracking_number TEXT,
  payment_method TEXT CHECK (payment_method IN ('mercadopago', 'paypal', 'transfer')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de items del pedido
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de entregas
CREATE TABLE deliveries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_transit', 'delivered', 'failed')),
  location JSONB,
  estimated_delivery TIMESTAMPTZ,
  actual_delivery TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_deliveries_order_id ON deliveries(order_id);
CREATE INDEX idx_products_active ON products(active);

-- Función para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_deliveries_updated_at BEFORE UPDATE ON deliveries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

3. Configura las políticas de seguridad (RLS) en Supabase:
   - Ve a Authentication → Policies
   - Habilita RLS en todas las tablas
   - Crea políticas según tus necesidades

### 5. Agregar productos de prueba (opcional)

```sql
INSERT INTO products (name, description, price, stock, category, active) VALUES
('Producto 1', 'Descripción del producto 1', 100.00, 50, 'Categoría A', true),
('Producto 2', 'Descripción del producto 2', 150.00, 30, 'Categoría B', true),
('Producto 3', 'Descripción del producto 3', 200.00, 20, 'Categoría A', true);
```

## ▶️ Ejecutar el Proyecto

### Modo Desarrollo

```bash
npm run dev
```

El sitio estará disponible en: http://localhost:3000

### Compilar para Producción

```bash
npm run build
npm start
```

## 📁 Estructura del Proyecto

```
mayorista-virtual/
├── app/                      # Páginas de Next.js 14 (App Router)
│   ├── page.tsx             # Página principal (catálogo)
│   ├── cart/                # Carrito de compras
│   ├── checkout/            # Proceso de pago
│   ├── admin/               # Panel de administración
│   └── layout.tsx           # Layout principal
├── lib/                     # Utilidades y configuraciones
│   └── supabase.ts         # Cliente de Supabase
├── store/                   # Estado global (Zustand)
│   └── cartStore.ts        # Store del carrito
├── types/                   # Tipos de TypeScript
│   └── database.ts         # Tipos de la base de datos
├── public/                  # Archivos estáticos
└── .env.local              # Variables de entorno (no incluido en git)
```

## 🚀 Desplegar en Vercel (GRATIS)

### Opción 1: Desde la interfaz web

1. Ve a https://vercel.com
2. Conecta tu repositorio de GitHub
3. Vercel detectará automáticamente Next.js
4. Agrega las variables de entorno
5. Despliega

### Opción 2: Desde la CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Desplegar
vercel

# Configurar variables de entorno
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# ... agregar todas las variables
```

## 🔐 Configurar Administrador

1. Crea un usuario en Supabase Authentication
2. En la tabla `users`, actualiza el campo `role` a 'admin':

```sql
UPDATE users SET role = 'admin' WHERE email = 'tu-email@ejemplo.com';
```

## 💳 Configurar Pasarelas de Pago

### MercadoPago

1. Ve a https://www.mercadopago.com.ar/developers
2. Crea una aplicación
3. Obtén tus credenciales (Access Token y Public Key)
4. Agrégalas a `.env.local`

### PayPal

1. Ve a https://developer.paypal.com
2. Crea una aplicación
3. Obtén Client ID y Secret
4. Agrégalas a `.env.local`

## 📊 Funcionalidades Principales

### Para Clientes

- Ver catálogo de productos
- Buscar y filtrar productos
- Agregar productos al carrito
- Ver precios mayoristas por volumen
- Realizar pedidos
- Pagar con MercadoPago o PayPal
- Seguir el estado de sus pedidos

### Para Administradores

- Gestionar productos (crear, editar, eliminar)
- Ver y gestionar pedidos
- Actualizar estado de entregas
- Ver estadísticas de ventas
- Gestionar inventario

## 🛠️ Tecnologías Utilizadas

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Base de Datos:** Supabase (PostgreSQL)
- **Estado:** Zustand
- **Pagos:** MercadoPago SDK, PayPal SDK
- **UI:** Lucide Icons, React Hot Toast
- **Deployment:** Vercel

## 💰 Costos

- **Desarrollo:** $0
- **Supabase:** $0/mes (plan gratuito hasta 500MB)
- **Vercel:** $0/mes (plan hobby)
- **MercadoPago:** Solo comisiones por transacción (~3-5%)
- **PayPal:** Solo comisiones por transacción (~4-5%)

**Total para empezar: $0/mes** 🎉

## 📝 Notas Importantes

1. **Node.js:** Asegúrate de tener Node.js v20+ instalado
2. **Variables de entorno:** Nunca subas `.env.local` a git
3. **Seguridad:** Configura correctamente las políticas RLS en Supabase
4. **Producción:** Cambia `PAYPAL_MODE` a 'live' en producción

## 🐛 Solución de Problemas

### Error: "Unsupported engine"
- Actualiza Node.js a v20 o superior

### Error: "Cannot find module '@/types/database'"
- Verifica que el archivo `types/database.ts` exista
- Ejecuta `npm install` nuevamente

### Error de conexión a Supabase
- Verifica que las variables de entorno estén correctamente configuradas
- Verifica que las tablas existan en Supabase

## 📞 Soporte

Para problemas o preguntas:
1. Revisa la documentación de Supabase
2. Revisa la documentación de Next.js
3. Verifica los logs en la consola del navegador

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

Desarrollado con ❤️ para mayoristas
