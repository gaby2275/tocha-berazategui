-- ============================================
-- SCRIPT DE CONFIGURACIÓN DE BASE DE DATOS
-- Mayorista Virtual - Supabase Setup
-- ============================================

-- Eliminar tablas existentes si existen (solo para desarrollo)
DROP TABLE IF EXISTS deliveries CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- ============================================
-- TABLA: users
-- ============================================
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

-- ============================================
-- TABLA: products
-- ============================================
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  stock INTEGER DEFAULT 0 CHECK (stock >= 0),
  images JSONB DEFAULT '[]'::jsonb,
  wholesale_prices JSONB DEFAULT '[]'::jsonb,
  category TEXT,
  sku TEXT UNIQUE,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLA: orders
-- ============================================
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  total DECIMAL(10,2) NOT NULL CHECK (total >= 0),
  shipping_address JSONB NOT NULL,
  tracking_number TEXT,
  payment_method TEXT CHECK (payment_method IN ('mercadopago', 'paypal', 'transfer')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLA: order_items
-- ============================================
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLA: deliveries
-- ============================================
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

-- ============================================
-- ÍNDICES PARA MEJORAR RENDIMIENTO
-- ============================================
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);
CREATE INDEX idx_deliveries_order_id ON deliveries(order_id);
CREATE INDEX idx_deliveries_status ON deliveries(status);
CREATE INDEX idx_products_active ON products(active);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- ============================================
-- FUNCIÓN PARA ACTUALIZAR updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- ============================================
-- TRIGGERS PARA updated_at
-- ============================================
CREATE TRIGGER update_users_updated_at 
  BEFORE UPDATE ON users
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at 
  BEFORE UPDATE ON products
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at 
  BEFORE UPDATE ON orders
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_deliveries_updated_at 
  BEFORE UPDATE ON deliveries
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- DATOS DE PRUEBA (OPCIONAL)
-- ============================================

-- Insertar usuario administrador de prueba
INSERT INTO users (email, name, phone, role) VALUES
('admin@rochaberazategui.com', 'Administrador Rocha Berazategui', '+54 11 1234-5678', 'admin');

-- Insertar productos demo Rocha Berazategui
INSERT INTO products (name, description, price, stock, category, sku, wholesale_prices, images) VALUES
(
  'Muzzarella Barra x 4 kg',
  'Muzzarella para pizzerías, casas de comida y negocios gastronómicos. Excelente rendimiento, funde parejo y aporta gran sabor.',
  28500.00,
  40,
  'Lácteos',
  'ROCHA-MUZ-004',
  '[{"min": 5, "price": 27200}, {"min": 10, "price": 25900}]'::jsonb,
  '["https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80"]'::jsonb
),
(
  'Harina 000 x 50 kg',
  'Bolsa de harina ideal para panaderías, pizzerías y elaboración gastronómica diaria. Excelente relación precio-calidad.',
  21900.00,
  65,
  'Almacén',
  'ROCHA-HAR-050',
  '[{"min": 3, "price": 21000}, {"min": 10, "price": 19900}]'::jsonb,
  '["https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80"]'::jsonb
),
(
  'Combo Patys + Panes Hamburguesa',
  'Combo pensado para hamburgueserías, food trucks y eventos. Incluye medallones y panes listos para despacho rápido.',
  32900.00,
  28,
  'Congelados',
  'ROCHA-COMBO-BURGER',
  '[{"min": 3, "price": 31500}, {"min": 8, "price": 29900}]'::jsonb,
  '["https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80"]'::jsonb
),
(
  'Papas Fritas Congeladas x 2.5 kg',
  'Papas prefritas congeladas para locales gastronómicos con alto volumen. Crocantes, prácticas y de cocción rápida.',
  8900.00,
  90,
  'Congelados',
  'ROCHA-PAPA-25',
  '[{"min": 6, "price": 8400}, {"min": 15, "price": 7900}]'::jsonb,
  '["https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=1200&q=80"]'::jsonb
),
(
  'Aceite de Girasol x 5 L',
  'Aceite para cocinas profesionales, rotiserías y restaurantes. Presentación rendidora para uso intensivo.',
  12400.00,
  55,
  'Almacén',
  'ROCHA-ACE-005',
  '[{"min": 4, "price": 11800}, {"min": 12, "price": 11100}]'::jsonb,
  '["https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1200&q=80"]'::jsonb
),
(
  'Jamón Cocido Feteado x 3 kg',
  'Jamón cocido para sandwicherías, bares y gastronomía. Producto práctico para despacho rápido y armado de combos.',
  26700.00,
  22,
  'Fiambres',
  'ROCHA-JAM-003',
  '[{"min": 4, "price": 25500}, {"min": 10, "price": 24300}]'::jsonb,
  '["https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&w=1200&q=80"]'::jsonb
);

-- ============================================
-- POLÍTICAS DE SEGURIDAD (RLS)
-- ============================================

-- Habilitar RLS en todas las tablas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliveries ENABLE ROW LEVEL SECURITY;

-- Políticas para products (lectura pública, escritura solo admin)
CREATE POLICY "Products are viewable by everyone" 
  ON products FOR SELECT 
  USING (active = true);

CREATE POLICY "Products are insertable by admins" 
  ON products FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Products are updatable by admins" 
  ON products FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Products are deletable by admins" 
  ON products FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- Políticas para users (usuarios pueden ver y editar su propia info)
CREATE POLICY "Users can view own data" 
  ON users FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data" 
  ON users FOR UPDATE 
  USING (auth.uid() = id);

-- Políticas para orders (usuarios ven sus propios pedidos, admins ven todos)
CREATE POLICY "Users can view own orders" 
  ON orders FOR SELECT 
  USING (
    auth.uid() = user_id 
    OR EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Users can create orders" 
  ON orders FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update orders" 
  ON orders FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- Políticas para order_items
CREATE POLICY "Users can view own order items" 
  ON order_items FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Users can create order items" 
  ON order_items FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

-- Políticas para deliveries
CREATE POLICY "Users can view own deliveries" 
  ON deliveries FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = deliveries.order_id 
      AND orders.user_id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Admins can manage deliveries" 
  ON deliveries FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- ============================================
-- VISTAS ÚTILES
-- ============================================

-- Vista de pedidos con información del usuario
CREATE OR REPLACE VIEW orders_with_user AS
SELECT 
  o.*,
  u.name as user_name,
  u.email as user_email,
  u.phone as user_phone
FROM orders o
JOIN users u ON o.user_id = u.id;

-- Vista de items de pedido con información del producto
CREATE OR REPLACE VIEW order_items_with_product AS
SELECT 
  oi.*,
  p.name as product_name,
  p.description as product_description,
  p.images as product_images
FROM order_items oi
JOIN products p ON oi.product_id = p.id;

-- ============================================
-- FUNCIONES ÚTILES
-- ============================================

-- Función para obtener el total de un pedido
CREATE OR REPLACE FUNCTION get_order_total(order_uuid UUID)
RETURNS DECIMAL AS $$
  SELECT COALESCE(SUM(quantity * price), 0)
  FROM order_items
  WHERE order_id = order_uuid;
$$ LANGUAGE SQL;

-- Función para verificar stock disponible
CREATE OR REPLACE FUNCTION check_product_stock(product_uuid UUID, required_quantity INTEGER)
RETURNS BOOLEAN AS $$
  SELECT stock >= required_quantity
  FROM products
  WHERE id = product_uuid;
$$ LANGUAGE SQL;

-- ============================================
-- COMENTARIOS EN TABLAS
-- ============================================

COMMENT ON TABLE users IS 'Usuarios del sistema (clientes y administradores)';
COMMENT ON TABLE products IS 'Catálogo de productos disponibles';
COMMENT ON TABLE orders IS 'Pedidos realizados por los clientes';
COMMENT ON TABLE order_items IS 'Items individuales de cada pedido';
COMMENT ON TABLE deliveries IS 'Información de seguimiento de entregas';

-- ============================================
-- FIN DEL SCRIPT
-- ============================================

-- Verificar que todo se creó correctamente
SELECT 'Setup completado exitosamente!' as status;

-- Made with Bob
