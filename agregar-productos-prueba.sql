-- ============================================
-- AGREGAR PRODUCTOS DE PRUEBA
-- Ejecuta este script en Supabase SQL Editor
-- ============================================

-- Productos de ejemplo para Rocha Berazategui
INSERT INTO products (name, description, price, stock, category, sku, active, images, wholesale_prices) VALUES

-- Categoría: Hamburguesas
('Pan de Hamburguesa x12', 'Pan fresco para hamburguesas, pack de 12 unidades', 2500.00, 100, 'Panadería', 'PAN-HAMB-12', true, 
 '["https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400"]'::jsonb,
 '[{"quantity": 5, "price": 2300}, {"quantity": 10, "price": 2100}]'::jsonb),

('Medallones de Carne x20', 'Medallones de carne vacuna premium, 20 unidades de 150g', 8500.00, 50, 'Carnes', 'MED-CARNE-20', true,
 '["https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400"]'::jsonb,
 '[{"quantity": 3, "price": 8000}, {"quantity": 5, "price": 7500}]'::jsonb),

('Queso Cheddar x1kg', 'Queso cheddar en fetas, ideal para hamburguesas', 4200.00, 80, 'Lácteos', 'QUES-CHED-1K', true,
 '["https://images.unsplash.com/photo-1552767059-ce182ead6c1b?w=400"]'::jsonb,
 '[{"quantity": 5, "price": 4000}, {"quantity": 10, "price": 3800}]'::jsonb),

-- Categoría: Pizzas
('Muzzarella x5kg', 'Muzzarella rallada premium para pizzas', 6800.00, 120, 'Lácteos', 'MUZZ-5KG', true,
 '["https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400"]'::jsonb,
 '[{"quantity": 3, "price": 6500}, {"quantity": 5, "price": 6200}]'::jsonb),

('Salsa de Tomate x5L', 'Salsa de tomate especial para pizzas, lata de 5 litros', 3200.00, 90, 'Salsas', 'SALSA-TOM-5L', true,
 '["https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400"]'::jsonb,
 '[{"quantity": 5, "price": 3000}, {"quantity": 10, "price": 2800}]'::jsonb),

('Harina 0000 x25kg', 'Harina 0000 para pizzas y pastas', 5500.00, 60, 'Harinas', 'HAR-0000-25K', true,
 '["https://images.unsplash.com/photo-1628672795205-4d0e1d2c4f5e?w=400"]'::jsonb,
 '[{"quantity": 3, "price": 5200}, {"quantity": 5, "price": 5000}]'::jsonb),

-- Categoría: Bebidas
('Coca Cola 2.25L x6', 'Pack de 6 botellas de Coca Cola 2.25L', 7200.00, 150, 'Bebidas', 'COCA-225-6', true,
 '["https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400"]'::jsonb,
 '[{"quantity": 5, "price": 6800}, {"quantity": 10, "price": 6500}]'::jsonb),

('Agua Mineral 500ml x24', 'Caja de 24 botellas de agua mineral 500ml', 4500.00, 200, 'Bebidas', 'AGUA-500-24', true,
 '["https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400"]'::jsonb,
 '[{"quantity": 5, "price": 4200}, {"quantity": 10, "price": 4000}]'::jsonb),

-- Categoría: Papas Fritas
('Papas Pre-Fritas x10kg', 'Papas pre-fritas congeladas, bolsa de 10kg', 8900.00, 70, 'Congelados', 'PAP-PREF-10K', true,
 '["https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400"]'::jsonb,
 '[{"quantity": 3, "price": 8500}, {"quantity": 5, "price": 8200}]'::jsonb),

-- Categoría: Condimentos
('Ketchup x5kg', 'Ketchup en balde de 5kg', 4800.00, 100, 'Salsas', 'KETCH-5KG', true,
 '["https://images.unsplash.com/photo-1528751014936-863e6e7a319c?w=400"]'::jsonb,
 '[{"quantity": 5, "price": 4500}, {"quantity": 10, "price": 4200}]'::jsonb),

('Mayonesa x5kg', 'Mayonesa en balde de 5kg', 5200.00, 100, 'Salsas', 'MAYO-5KG', true,
 '["https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=400"]'::jsonb,
 '[{"quantity": 5, "price": 4900}, {"quantity": 10, "price": 4600}]'::jsonb),

('Mostaza x3kg', 'Mostaza en balde de 3kg', 3800.00, 80, 'Salsas', 'MOST-3KG', true,
 '["https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=400"]'::jsonb,
 '[{"quantity": 5, "price": 3600}, {"quantity": 10, "price": 3400}]'::jsonb);

-- Verificar que se insertaron correctamente
SELECT COUNT(*) as total_productos FROM products WHERE active = true;

-- Made with Bob
