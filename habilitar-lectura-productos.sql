-- Habilitar Row Level Security en la tabla products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Crear política para permitir lectura pública de productos activos
CREATE POLICY "Permitir lectura pública de productos activos"
ON products
FOR SELECT
USING (active = true);

-- Verificar que la política se creó
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE tablename = 'products';
