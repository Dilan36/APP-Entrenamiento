# Mi Entrenamiento

App personal de ejercicio: biblioteca de +1300 ejercicios con animaciones e instrucciones en español, registro de sesiones (series/reps/peso) y progreso histórico — corriendo 100% gratis en GitHub Pages + Google Sheets.

## Estructura

```
index.html          → Biblioteca de ejercicios (buscar, filtrar, ver gif + instrucciones)
registro.html        → Registrar la sesión de hoy (series, reps, peso)
progreso.html        → Ver historial y gráfico de progreso por ejercicio
css/style.css        → Estilos
js/config.js         → AQUÍ va la URL de tu Apps Script (paso 3)
js/api.js            → Lógica para leer/escribir en tu Sheet
data/exercises_es.json → Dataset de ejercicios (español), basado en hasaneyldrm/exercises-dataset
apps-script/Code.gs   → Código para pegar en tu Google Sheet
```

## Puesta en marcha (15-20 min)

### 1. Sube este proyecto a un repo de GitHub
- Crea un repo nuevo (puede ser privado, GitHub Pages funciona igual).
- Sube todos estos archivos tal cual, respetando la estructura de carpetas.

### 2. Activa GitHub Pages
- Settings → Pages → Source: rama `main`, carpeta `/ (root)`.
- Te dará una URL tipo `https://tuusuario.github.io/tu-repo/`.
- Ábrela desde tu celular y guárdala en la pantalla de inicio (Safari/Chrome → "Agregar a inicio") para que se sienta como app.

### 3. Crea tu Google Sheet y conecta el Apps Script
1. Ve a [sheets.google.com](https://sheets.google.com) y crea una hoja nueva (llámala como quieras, ej. "Mi Entrenamiento - Datos").
2. Menú **Extensiones → Apps Script**.
3. Borra el contenido de `Code.gs` que aparece por defecto y pega el contenido de `apps-script/Code.gs` de este proyecto.
4. Guarda (ícono de disquete).
5. Click en **Implementar → Nueva implementación**.
   - Tipo: **Aplicación web**.
   - Ejecutar como: **Yo** (tu cuenta).
   - Quién tiene acceso: **Cualquier usuario**.
6. Autoriza los permisos cuando te lo pida (es tu propio script, es seguro).
7. Copia la URL que termina en `/exec`.

### 4. Conecta el sitio con tu Sheet
- Abre `js/config.js` en tu repo (puedes editarlo directo en github.com).
- Pega la URL copiada:
  ```js
  const API_URL = "https://script.google.com/macros/s/TU_ID/exec";
  ```
- Guarda el cambio (commit). GitHub Pages se actualiza solo en 1-2 minutos.

### 5. Prueba
- Entra a la app desde el celular.
- En **Biblioteca**, busca un ejercicio y toca "Agregar a la sesión de hoy".
- Ve a **Registrar**, llena reps/peso, y toca "Guardar sesión en mi hoja".
- Revisa tu Google Sheet: debería aparecer una pestaña "Registros" con la fila nueva.
- Ve a **Progreso**, selecciona el ejercicio y deberías ver el dato reflejado.

## Notas

- Los gifs e imágenes se cargan directo desde el repo original (`hasaneyldrm/exercises-dataset`) — así tu repo pesa poco (~1.3 MB de datos, nada de imágenes). Requiere internet para verlas, pero el celular ya lo necesita para cargar la página de todas formas.
- Los **nombres** de ejercicios están en inglés (el dataset original no los tradujo), pero las instrucciones sí están en español.
- La media (gifs/imágenes) es © Gym visual, redistribuida con permiso en el repo original. Para uso estrictamente personal esto no debería ser un problema, pero si en algún momento quieres publicar la app públicamente vale la pena revisar los términos de gymvisual.com.
- Si quieres agregar ejercicios propios que no estén en el dataset, se pueden anexar directo al archivo `data/exercises_es.json` siguiendo el mismo formato.

## Próximos pasos posibles (cuando quieras)
- Plantillas de rutina (ej. "Día de piernas") para no armar la sesión desde cero cada vez.
- Recordatorio/notificación para no olvidar registrar.
- Exportar el historial a un reporte semanal (ahí sí podríamos usar n8n si quieres automatizarlo).
