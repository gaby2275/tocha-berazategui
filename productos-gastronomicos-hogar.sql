-- ============================================
-- PRODUCTOS PARA LOCALES GASTRONÓMICOS Y HOGAR
-- Rocha Berazategui
-- ============================================

-- Primero, eliminar los productos de prueba anteriores
DELETE FROM products;

-- Insertar productos reales para gastronomía y hogar
INSERT INTO products (name, description, price, stock, category, sku, active, images, wholesale_prices) VALUES

-- CATEGORÍA: LÁCTEOS
('Queso Muzzarella x5kg', 'Muzzarella rallada premium para pizzas y preparaciones. Ideal para locales gastronómicos y uso hogareño.', 12500.00, 80, 'Lácteos', 'MUZZ-5KG', true,
 '["https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400"]'::jsonb,
 '[{"quantity": 3, "price": 12000}, {"quantity": 5, "price": 11500}]'::jsonb),

('Queso Cremoso x3kg', 'Queso cremoso untable para sandwiches, tostadas y preparaciones. Balde de 3kg.', 8900.00, 60, 'Lácteos', 'CREM-3KG', true,
 '["https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400"]'::jsonb,
 '[{"quantity": 3, "price": 8500}, {"quantity": 5, "price": 8200}]'::jsonb),

('Manteca x5kg', 'Manteca premium para repostería y cocina. Ideal para panaderías y uso hogareño.', 9800.00, 50, 'Lácteos', 'MANT-5KG', true,
 '["https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400"]'::jsonb,
 '[{"quantity": 3, "price": 9400}, {"quantity": 5, "price": 9000}]'::jsonb),

-- CATEGORÍA: HARINAS Y PANIFICACIÓN
('Harina 0000 x25kg', 'Harina 0000 para pizzas, pastas y panificación. Bolsa de 25kg.', 8500.00, 100, 'Harinas', 'HAR-0000-25', true,
 '["https://images.unsplash.com/photo-1628672795205-4d0e1d2c4f5e?w=400"]'::jsonb,
 '[{"quantity": 3, "price": 8200}, {"quantity": 5, "price": 7900}]'::jsonb),

('Levadura Fresca x500g', 'Levadura fresca para panificación profesional. Pack de 500g.', 2800.00, 120, 'Harinas', 'LEV-500G', true,
 '["https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400"]'::jsonb,
 '[{"quantity": 5, "price": 2600}, {"quantity": 10, "price": 2400}]'::jsonb),

('Premezcla para Pizza x10kg', 'Premezcla lista para preparar masa de pizza. Solo agregar agua. 10kg.', 6500.00, 70, 'Harinas', 'PREM-PIZ-10', true,
 '["https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400"]'::jsonb,
 '[{"quantity": 3, "price": 6200}, {"quantity": 5, "price": 5900}]'::jsonb),

-- CATEGORÍA: CARNES Y PROTEÍNAS
('Hamburguesas Caseras x20u', 'Medallones de carne vacuna 100% caseros. 20 unidades de 120g c/u.', 15500.00, 40, 'Carnes', 'HAMB-CAS-20', true,
 '["https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400"]'::jsonb,
 '[{"quantity": 3, "price": 15000}, {"quantity": 5, "price": 14500}]'::jsonb),

('Milanesas de Pollo x3kg', 'Milanesas de pollo rebozadas listas para freír. Bolsa de 3kg.', 11200.00, 50, 'Carnes', 'MIL-POLL-3K', true,
 '["https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400"]'::jsonb,
 '[{"quantity": 3, "price": 10800}, {"quantity": 5, "price": 10400}]'::jsonb),

('Salchichas Parrilleras x5kg', 'Salchichas tipo parrilleras para choripán y parrilla. Bolsa de 5kg.', 9800.00, 60, 'Carnes', 'SALCH-5KG', true,
 '["https://images.unsplash.com/photo-1612392062798-2dbaa2c2c993?w=400"]'::jsonb,
 '[{"quantity": 3, "price": 9400}, {"quantity": 5, "price": 9000}]'::jsonb),

-- CATEGORÍA: CONGELADOS
('Papas Pre-Fritas x10kg', 'Papas bastón pre-fritas congeladas. Listas para freír. Bolsa de 10kg.', 13500.00, 80, 'Congelados', 'PAP-PREF-10', true,
 '["https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400"]'::jsonb,
 '[{"quantity": 3, "price": 13000}, {"quantity": 5, "price": 12500}]'::jsonb),

('Empanadas Congeladas x100u', 'Empanadas de carne congeladas listas para hornear. Caja de 100 unidades.', 18500.00, 30, 'Congelados', 'EMP-100U', true,
 '["https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400"]'::jsonb,
 '[{"quantity": 2, "price": 18000}, {"quantity": 3, "price": 17500}]'::jsonb),

('Vegetales Grillados x2kg', 'Mix de vegetales grillados congelados (berenjena, zucchini, pimiento). 2kg.', 7800.00, 50, 'Congelados', 'VEG-GRILL-2K', true,
 '["https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400"]'::jsonb,
 '[{"quantity": 5, "price": 7400}, {"quantity": 10, "price": 7000}]'::jsonb),

-- CATEGORÍA: SALSAS Y ADEREZOS
('Salsa de Tomate x5L', 'Salsa de tomate natural para pizzas y pastas. Lata de 5 litros.', 4500.00, 100, 'Salsas', 'SALSA-TOM-5L', true,
 '["https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400"]'::jsonb,
 '[{"quantity": 5, "price": 4200}, {"quantity": 10, "price": 3900}]'::jsonb),

('Mayonesa x5kg', 'Mayonesa premium en balde de 5kg. Ideal para locales gastronómicos.', 8200.00, 70, 'Salsas', 'MAYO-5KG', true,
 '["https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=400"]'::jsonb,
 '[{"quantity": 3, "price": 7900}, {"quantity": 5, "price": 7600}]'::jsonb),

('Ketchup x5kg', 'Ketchup en balde de 5kg para uso gastronómico y hogareño.', 7500.00, 70, 'Salsas', 'KETCH-5KG', true,
 '["https://images.unsplash.com/photo-1528751014936-863e6e7a319c?w=400"]'::jsonb,
 '[{"quantity": 3, "price": 7200}, {"quantity": 5, "price": 6900}]'::jsonb),

('Mostaza x3kg', 'Mostaza en balde de 3kg. Sabor intenso para hamburguesas y sandwiches.', 5800.00, 60, 'Salsas', 'MOST-3KG', true,
 '["https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=400"]'::jsonb,
 '[{"quantity": 3, "price": 5500}, {"quantity": 5, "price": 5200}]'::jsonb),

-- CATEGORÍA: BEBIDAS
('Coca Cola 2.25L x6', 'Pack de 6 botellas de Coca Cola 2.25L. Ideal para locales y eventos.', 11500.00, 150, 'Bebidas', 'COCA-225-6', true,
 '["https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400"]'::jsonb,
 '[{"quantity": 5, "price": 11000}, {"quantity": 10, "price": 10500}]'::jsonb),

('Agua Mineral 500ml x24', 'Caja de 24 botellas de agua mineral sin gas 500ml.', 6500.00, 200, 'Bebidas', 'AGUA-500-24', true,
 '["https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400"]'::jsonb,
 '[{"quantity": 5, "price": 6200}, {"quantity": 10, "price": 5900}]'::jsonb),

('Jugo Concentrado x2L', 'Jugo concentrado sabores varios. Rinde 10 litros. Botella de 2L.', 3800.00, 80, 'Bebidas', 'JUGO-CONC-2L', true,
 '["https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400"]'::jsonb,
 '[{"quantity": 5, "price": 3600}, {"quantity": 10, "price": 3400}]'::jsonb),

-- CATEGORÍA: ACEITES Y CONDIMENTOS
('Aceite de Girasol x5L', 'Aceite de girasol para frituras y cocina. Bidón de 5 litros.', 8900.00, 90, 'Aceites', 'ACEIT-GIR-5L', true,
 '["https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400"]'::jsonb,
 '[{"quantity": 3, "price": 8600}, {"quantity": 5, "price": 8300}]'::jsonb),

('Sal Fina x25kg', 'Sal fina para cocina y mesa. Bolsa de 25kg.', 3200.00, 100, 'Condimentos', 'SAL-25KG', true,
 '["https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400"]'::jsonb,
 '[{"quantity": 5, "price": 3000}, {"quantity": 10, "price": 2800}]'::jsonb),

('Orégano x500g', 'Orégano seco para pizzas y pastas. Bolsa de 500g.', 4500.00, 70, 'Condimentos', 'OREG-500G', true,
 '["https://images.unsplash.com/photo-1599909533730-f9e0f8a5e3e3?w=400"]'::jsonb,
 '[{"quantity": 5, "price": 4300}, {"quantity": 10, "price": 4100}]'::jsonb),

-- CATEGORÍA: PANIFICADOS
('Pan de Hamburguesa x24u', 'Pan fresco para hamburguesas. Pack de 24 unidades.', 5800.00, 100, 'Panificados', 'PAN-HAMB-24', true,
 '["https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400"]'::jsonb,
 '[{"quantity": 5, "price": 5500}, {"quantity": 10, "price": 5200}]'::jsonb),

('Pan de Pancho x50u', 'Pan para panchos y choripán. Pack de 50 unidades.', 4200.00, 80, 'Panificados', 'PAN-PANCH-50', true,
 '["https://images.unsplash.com/photo-1619096252214-ef06c45683e3?w=400"]'::jsonb,
 '[{"quantity": 5, "price": 4000}, {"quantity": 10, "price": 3800}]'::jsonb),

('Facturas Surtidas x24u', 'Facturas surtidas frescas del día. Caja de 24 unidades.', 6500.00, 50, 'Panificados', 'FACT-24U', true,
 '["https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400"]'::jsonb,
 '[{"quantity": 3, "price": 6200}, {"quantity": 5, "price": 5900}]'::jsonb);

-- Verificar que se insertaron correctamente
SELECT COUNT(*) as total_productos, 
       array_agg(DISTINCT category) as categorias 
FROM products WHERE active = true;

-- Made with Bob
