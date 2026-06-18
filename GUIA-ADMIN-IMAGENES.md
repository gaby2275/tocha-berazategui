# 📸 Guía: Cómo Cargar Imágenes en el Admin

## ✨ Nueva Funcionalidad

Ahora podés cargar imágenes de productos directamente desde el panel de administración.

## 🎯 Cómo Usar

### Para Productos Nuevos

1. **Ve al Admin**: https://mayorista-virtual.vercel.app/admin

2. **Sección "Crear producto gastronómico"**:
   - Completa los datos del producto (nombre, precio, etc.)
   - En el campo "Imagen del producto", pega la URL de tu imagen
   - Verás una vista previa si la URL es válida
   - Haz clic en "Crear producto"

### Para Productos Existentes

1. **Ve al Admin**: https://mayorista-virtual.vercel.app/admin

2. **Sección "Editar productos"**:
   - Busca el producto que quieres editar
   - Al final de cada producto hay una sección "Imagen del producto"
   - Haz clic en "Agregar imagen" o "Cambiar imagen"
   - Pega la nueva URL
   - Haz clic en "Guardar"

## 📤 Cómo Obtener URLs de Imágenes

### Opción 1: ImgBB (Recomendado - Gratis)

1. Ve a https://imgbb.com
2. Haz clic en "Start uploading"
3. Sube tu foto del producto
4. Copia el link "Direct link"
5. Pega ese link en el admin

**Ejemplo de URL válida:**
```
https://i.ibb.co/abc123/producto.jpg
```

### Opción 2: Cloudinary (Profesional)

1. Crea cuenta en https://cloudinary.com
2. Sube tus imágenes
3. Copia la URL pública
4. Pega en el admin

### Opción 3: Google Drive (No Recomendado)

Google Drive no funciona bien para esto. Usa ImgBB.

## ✅ Consejos para Buenas Fotos

1. **Fondo limpio**: Blanco o neutro
2. **Buena luz**: Natural o artificial uniforme
3. **Producto completo**: Muestra todo el empaque
4. **Enfoque nítido**: Sin blur
5. **Tamaño**: Mínimo 600x600px

## 🔄 Flujo Completo

```
1. Saca foto del producto con tu celular
   ↓
2. Sube a ImgBB desde el navegador
   ↓
3. Copia el "Direct link"
   ↓
4. Ve al Admin de tu app
   ↓
5. Pega la URL en el campo de imagen
   ↓
6. Guarda el producto
   ↓
7. ¡La imagen aparece en el catálogo!
```

## 🎨 Ejemplo Práctico

**Producto**: Muzzarella 5kg

1. Saco foto de la horma de muzzarella
2. Subo a ImgBB
3. Obtengo: `https://i.ibb.co/xyz789/muzzarella.jpg`
4. Voy al Admin → Editar productos
5. Busco "Muzzarella 5kg"
6. Click en "Cambiar imagen"
7. Pego la URL
8. Click en "Guardar"
9. ¡Listo! La imagen aparece en el catálogo

## ❓ Problemas Comunes

**"URL de imagen inválida"**
- Verifica que la URL termine en .jpg, .png o .webp
- Asegúrate de copiar el "Direct link" de ImgBB

**"La imagen no se ve"**
- Espera unos segundos y recarga la página
- Verifica que la URL sea pública (no de Google Drive)

**"La imagen se ve pixelada"**
- Sube una imagen de mayor resolución
- Mínimo recomendado: 800x800px

## 🚀 Ventajas

✅ No necesitas programar
✅ Cambios instantáneos
✅ Vista previa antes de guardar
✅ Puedes editar cuando quieras
✅ Gratis con ImgBB

## 📱 Desde el Celular

También podés hacer todo desde tu iPhone:

1. Saca la foto con la cámara
2. Abre Safari → ImgBB.com
3. Sube la foto
4. Copia el link
5. Abre tu Admin
6. Pega y guarda

¡Así de simple!