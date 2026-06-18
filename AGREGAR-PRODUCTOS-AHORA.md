# 🛒 Agregar Productos a tu App - AHORA (2 minutos)

## 📋 Problema: "No hay productos en el catálogo"

Tu app está funcionando correctamente, pero la base de datos está vacía.

**Solución:** Agregar productos en Supabase.

---

## 🚀 Pasos para Agregar Productos (2 minutos):

### Paso 1: Abre Supabase

1. Ve a: https://supabase.com/dashboard
2. Inicia sesión
3. Selecciona tu proyecto: **retcrviyztopnsuhufrt**

### Paso 2: Abre el SQL Editor

1. En el menú izquierdo, haz clic en **SQL Editor**
2. Haz clic en **+ New query**

### Paso 3: Copia y Pega el Script

1. Abre el archivo: `agregar-productos-prueba.sql`
2. **Copia TODO el contenido** del archivo
3. **Pégalo** en el SQL Editor de Supabase

### Paso 4: Ejecuta el Script

1. Haz clic en el botón **Run** (o presiona Cmd + Enter)
2. Espera 2-3 segundos
3. Verás un mensaje: "Success. Rows returned: 1"
4. Debería mostrar: `total_productos: 12`

---

## ✅ Verificar que Funcionó

### En Supabase:

1. Ve a **Table Editor** en el menú izquierdo
2. Selecciona la tabla **products**
3. Deberías ver 12 productos listados

### En tu App:

1. Abre Safari en tu iPhone
2. Ve a: `https://mayorista-virtual-c18pmthvs-prueba3.vercel.app`
3. Recarga la página (desliza hacia abajo)
4. **¡Deberías ver los 12 productos!**

---

## 📦 Productos que se Agregarán:

1. **Pan de Hamburguesa x12** - $2,500
2. **Medallones de Carne x20** - $8,500
3. **Queso Cheddar x1kg** - $4,200
4. **Muzzarella x5kg** - $6,800
5. **Salsa de Tomate x5L** - $3,200
6. **Harina 0000 x25kg** - $5,500
7. **Coca Cola 2.25L x6** - $7,200
8. **Agua Mineral 500ml x24** - $4,500
9. **Papas Pre-Fritas x10kg** - $8,900
10. **Ketchup x5kg** - $4,800
11. **Mayonesa x5kg** - $5,200
12. **Mostaza x3kg** - $3,800

Todos con:
- ✅ Imágenes
- ✅ Precios mayoristas
- ✅ Stock disponible
- ✅ Categorías

---

## 🔄 Si Ya Ejecutaste el Script Antes

Si ya ejecutaste el script y quieres agregar más productos:

1. Edita el archivo `agregar-productos-prueba.sql`
2. Agrega más productos siguiendo el mismo formato
3. Ejecuta el script nuevamente en Supabase

---

## 📝 Formato para Agregar Tus Propios Productos

```sql
INSERT INTO products (name, description, price, stock, category, sku, active, images, wholesale_prices) VALUES
('Nombre del Producto', 'Descripción', 1000.00, 50, 'Categoría', 'SKU-001', true,
 '["URL_DE_IMAGEN"]'::jsonb,
 '[{"quantity": 5, "price": 950}, {"quantity": 10, "price": 900}]'::jsonb);
```

**Explicación:**
- `name`: Nombre del producto
- `description`: Descripción
- `price`: Precio unitario
- `stock`: Cantidad disponible
- `category`: Categoría (ej: "Bebidas", "Carnes", etc.)
- `sku`: Código único del producto
- `active`: true (visible) o false (oculto)
- `images`: Array de URLs de imágenes
- `wholesale_prices`: Precios por cantidad (mayorista)

---

## 🖼️ Imágenes de Productos

Los productos de prueba usan imágenes de Unsplash (gratis).

**Para usar tus propias imágenes:**

1. Sube las imágenes a:
   - Supabase Storage
   - Cloudinary
   - ImgBB
   - O cualquier servicio de hosting de imágenes

2. Copia la URL de la imagen

3. Úsala en el campo `images`:
   ```sql
   '["https://tu-url-de-imagen.com/producto.jpg"]'::jsonb
   ```

---

## 🆘 Problemas Comunes

### "Error: duplicate key value violates unique constraint"

**Causa:** Ya ejecutaste el script antes.

**Solución:**
1. Elimina los productos existentes:
   ```sql
   DELETE FROM products;
   ```
2. Vuelve a ejecutar el script

### "Error: relation 'products' does not exist"

**Causa:** No creaste las tablas.

**Solución:**
1. Ejecuta primero: `supabase-setup.sql`
2. Luego ejecuta: `agregar-productos-prueba.sql`

### Los productos no aparecen en la app

**Solución:**
1. Verifica en Supabase que los productos existan
2. Recarga la app en tu iPhone
3. Verifica que las credenciales de Supabase sean correctas

---

## ✅ Checklist

- [ ] Abrí Supabase Dashboard
- [ ] Fui a SQL Editor
- [ ] Copié el contenido de `agregar-productos-prueba.sql`
- [ ] Pegué en SQL Editor
- [ ] Hice clic en Run
- [ ] Vi "Success" y "total_productos: 12"
- [ ] Verifiqué en Table Editor que hay 12 productos
- [ ] Recargué la app en mi iPhone
- [ ] ¡Los productos aparecen!

---

## 🎯 Próximos Pasos

Una vez que los productos aparezcan:

1. **Prueba agregar al carrito**
2. **Prueba el checkout**
3. **Personaliza los productos** con tus propios datos
4. **Agrega más productos** según tu negocio
5. **Comparte con clientes**

---

## 📞 Resumen Rápido

```bash
1. https://supabase.com/dashboard
2. SQL Editor → New query
3. Copiar agregar-productos-prueba.sql
4. Pegar y Run
5. Recargar app en iPhone
6. ¡Listo!
```

---

**¡En 2 minutos tendrás productos en tu app!** 🚀