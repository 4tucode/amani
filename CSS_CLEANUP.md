# Limpieza de Archivos CSS

## ✅ Archivos Eliminados

### 🗑️ **main.css** - ELIMINADO

- **Razón**: Contenía estilos personalizados que ya no son necesarios
- **Funcionalidad**: Estilos de enlaces y layout que Tailwind CSS maneja mejor
- **Reemplazo**: Todas las funcionalidades se implementan con clases de Tailwind

### 🗑️ **base.css** - ELIMINADO

- **Razón**: Contenía variables CSS y estilos base del tema Vue
- **Funcionalidad**: Variables de color, tipografía y estilos base
- **Reemplazo**: Tailwind CSS maneja todos los estilos base y la fuente Montserrat

## 🎯 **Archivo CSS Principal**

### **tailwind.css** - MANTENIDO

- **Contenido**: Directivas de Tailwind CSS y configuración de fuentes
- **Funcionalidad**:
  - `@tailwind base` - Estilos base de Tailwind
  - `@tailwind components` - Componentes de Tailwind
  - `@tailwind utilities` - Utilidades de Tailwind
  - Importación de fuente Montserrat
  - Configuración de tipografía base

## 🔧 **Cambios en main.ts**

### **Antes**:

```typescript
import './assets/tailwind.css'
import './assets/main.css'
```

### **Después**:

```typescript
import './assets/tailwind.css'
```

## 🚀 **Beneficios de la Limpieza**

### **Simplicidad**

- **Un solo archivo CSS**: Solo `tailwind.css` para todos los estilos
- **Sin conflictos**: No hay estilos CSS personalizados que puedan interferir
- **Mantenimiento**: Más fácil de mantener y actualizar

### **Performance**

- **Menos archivos**: Reducción en el número de archivos CSS
- **Sin duplicación**: No hay estilos duplicados o conflictivos
- **Optimización**: Tailwind CSS está optimizado para producción

### **Consistencia**

- **Diseño unificado**: Todos los estilos vienen de Tailwind
- **Responsive**: Tailwind maneja automáticamente el responsive design
- **Tema**: Colores y espaciado consistentes en toda la aplicación

## 📚 **Configuración de Tailwind**

### **tailwind.config.js**

```javascript
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

### **tailwind.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

@layer base {
  html,
  body {
    font-family: 'Montserrat', system-ui, sans-serif;
  }
}
```

## 🎨 **Estilos Implementados con Tailwind**

### **Header y Footer**

- **Gradientes**: `bg-gradient-to-r from-amber-900/90 via-orange-800/90 to-red-900/90`
- **Transparencias**: `backdrop-blur-md`, `border-amber-500/30`
- **Sombras**: `shadow-2xl`, `shadow-lg`

### **HomeView**

- **Layout**: `min-h-screen`, `w-full`, `relative`, `overflow-hidden`
- **Posicionamiento**: `absolute inset-0`, `relative z-10`
- **Tipografía**: `text-3xl md:text-5xl`, `font-light`, `italic`

### **Botones**

- **Gradientes**: `bg-gradient-to-r from-amber-500 via-orange-500 to-red-500`
- **Efectos**: `hover:scale-105`, `transition-all duration-300`
- **Sombras**: `shadow-2xl`, `hover:shadow-amber-500/40`

## 🔍 **Verificación Post-Limpieza**

### **1. Ejecutar el proyecto**

```bash
npm run dev
```

### **2. Verificar que funcione**

- Header con logo y navegación
- HomeView con fondo y botones
- Footer con información y enlaces
- Fuente Montserrat aplicada correctamente

### **3. Verificar responsive**

- Menú hamburguesa en móvil
- Layout adaptativo en diferentes tamaños
- Estilos consistentes en todas las pantallas

## 📁 **Estructura Final de Assets**

```
src/assets/
├── tailwind.css      # Único archivo CSS - configuración de Tailwind
├── sinfondo2.png     # Logo de Amani
└── fondo3.png        # Imagen de fondo
```

## 🚀 **Próximos Pasos**

1. **Verificar funcionamiento**: Probar que todo funcione correctamente
2. **Optimizar producción**: Configurar PurgeCSS para eliminar CSS no usado
3. **Mantener consistencia**: Usar solo clases de Tailwind para nuevos estilos
4. **Documentar**: Mantener esta documentación actualizada

## 💡 **Consejos para el Futuro**

- **Siempre usar Tailwind**: Para cualquier nuevo estilo o componente
- **Evitar CSS personalizado**: A menos que sea absolutamente necesario
- **Mantener configuración**: Actualizar `tailwind.config.js` según necesidades
- **Revisar documentación**: Consultar la documentación oficial de Tailwind CSS
