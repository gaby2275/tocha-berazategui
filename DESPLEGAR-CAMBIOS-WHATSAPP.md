# 🚀 Desplegar Cambios de WhatsApp

## ✅ Cambios Realizados

Se ha modificado el checkout para:

1. **Datos prellenados** para facilitar pruebas:
   - Nombre: Juan Pérez
   - Email: juan.perez@ejemplo.com
   - Teléfono: 1132044814
   - Dirección: Av. Mitre 1234
   - Ciudad: Berazategui
   - Código Postal: 1884
   - Notas: Entregar entre 10 y 14hs
   - Método de pago: Transferencia bancaria (seleccionado por defecto)

2. **Envío directo por WhatsApp**:
   - Al confirmar el pedido, se genera un mensaje formateado
   - Se abre WhatsApp automáticamente con el mensaje prellenado
   - El mensaje incluye todos los datos del cliente y productos
   - Después de enviar, vuelve a la página principal

## 📝 Pasos para Desplegar

### Opción 1: Push a GitHub (Recomendado)

Si tienes GitHub configurado con autenticación, ejecuta:

```bash
cd /Users/gabrieladam/client-env/mayorista-virtual
git push --set-upstream origin main
```

Si te pide credenciales, usa tu token de GitHub personal.

### Opción 2: Despliegue Manual desde Vercel

1. Ve a https://vercel.com/dashboard
2. Busca tu proyecto "mayorista-virtual"
3. Ve a la pestaña "Deployments"
4. Haz clic en "Redeploy" en el último deployment
5. Selecciona "Use existing Build Cache" y confirma

### Opción 3: Conectar GitHub (Primera vez)

Si no tienes el repositorio conectado:

1. Ve a https://vercel.com/dashboard
2. Selecciona tu proyecto "mayorista-virtual"
3. Ve a Settings → Git
4. Conecta tu repositorio de GitHub
5. Vercel desplegará automáticamente en cada push

## 🧪 Cómo Probar en iPhone

1. **Abre la app** en tu iPhone:
   - URL: https://mayorista-virtual.vercel.app

2. **Agrega productos al carrito**:
   - Navega por el catálogo
   - Agrega algunos productos

3. **Ve al checkout**:
   - Haz clic en el carrito (esquina superior derecha)
   - Haz clic en "Finalizar Compra"

4. **Verifica los datos prellenados**:
   - Todos los campos deben estar completos
   - "Transferencia bancaria" debe estar seleccionada

5. **Confirma el pedido**:
   - Haz clic en "Confirmar Pedido"
   - Se abrirá WhatsApp automáticamente
   - Verás el mensaje formateado con todos los datos

6. **Envía el mensaje**:
   - Revisa que todo esté correcto
   - Envía el mensaje al número 5491132044814
   - La app te redirigirá a la página principal

## 📱 Formato del Mensaje de WhatsApp

El mensaje que se genera tiene este formato:

```
🛒 *NUEVO PEDIDO - Rocha Berazategui*

👤 *Cliente:* Juan Pérez
📧 *Email:* juan.perez@ejemplo.com
📱 *Teléfono:* 1132044814
📍 *Dirección:* Av. Mitre 1234, Berazategui (CP: 1884)

📦 *PRODUCTOS:*
1. Producto 1
   Cantidad: 2 x $100.00 = $200.00
2. Producto 2
   Cantidad: 1 x $50.00 = $50.00

💰 *TOTAL: $250.00*

💳 *Forma de pago:* Transferencia bancaria

📝 *Notas:* Entregar entre 10 y 14hs

✅ *Pedido confirmado y listo para procesar*
```

## 🔧 Personalización

Si quieres cambiar los datos prellenados, edita el archivo:
`/Users/gabrieladam/client-env/mayorista-virtual/app/checkout/page.tsx`

Busca la línea que dice:
```typescript
const [formData, setFormData] = useState({
  name: 'Juan Pérez',
  email: 'juan.perez@ejemplo.com',
  // ... etc
});
```

## ⚠️ Notas Importantes

- Los cambios están commiteados localmente pero NO pusheados a GitHub
- Vercel desplegará automáticamente cuando hagas push
- El despliegue tarda aproximadamente 1-2 minutos
- Puedes verificar el estado en https://vercel.com/dashboard

## 🎯 Próximos Pasos

Una vez desplegado y probado:

1. ✅ Verificar que el mensaje de WhatsApp se genera correctamente
2. ✅ Confirmar que todos los datos se incluyen
3. ✅ Probar con diferentes productos y cantidades
4. 📝 Ajustar el formato del mensaje si es necesario
5. 🎨 Personalizar los datos dummy si lo deseas

## 📞 Contacto

- WhatsApp: 5491132044814
- Instagram: @rochaberazategui
- Dirección: Av. 21 y Dardo Rocha, Berazategui