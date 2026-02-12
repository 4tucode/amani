# Experiencia Estándar - Implementación

## 🎯 **Descripción General**

Se ha implementado una nueva interfaz para la "Experiencia Estándar" que se accede al hacer clic en el botón correspondiente en la página de inicio. Esta interfaz presenta los 5 sentidos humanos con botones interactivos y una portada atractiva.

## 🚀 **Funcionalidades Implementadas**

### **1. Navegación**

- **Ruta**: `/experiencia-estandar`
- **Acceso**: Botón "Experiencia Estándar" en HomeView
- **Componente**: `ExperienciaEstandarView.vue`

### **2. Portada**

- **Imagen de fondo**: `portadaBotones.jpg`
- **Filtro gradiente**: Rojo → Naranja → Amarillo
- **Título principal**: "Experiencia Estándar"
- **Subtítulo descriptivo**: Explicación de la experiencia sensorial

### **3. Botones de los 5 Sentidos**

#### **👁️ Vista**

- **Color**: Azul → Índigo → Púrpura
- **Icono**: Ojo
- **Ruta**: `/experiencia/vista`
- **Descripción**: Experiencias visuales inmersivas

#### **👂 Oído**

- **Color**: Verde → Esmeralda → Verde azulado
- **Icono**: Altavoz
- **Ruta**: `/experiencia/oido`
- **Descripción**: Experiencias auditivas inmersivas

#### **👃 Olfato**

- **Color**: Rosa → Rojo → Rojo
- **Icono**: Bombilla (representa ideas/descubrimientos)
- **Ruta**: `/experiencia/olfato`
- **Descripción**: Aromas y fragancias únicas

#### **👅 Gusto**

- **Color**: Naranja → Ámbar → Amarillo
- **Icono**: Lista de verificación
- **Ruta**: `/experiencia/gusto`
- **Descripción**: Sabores y texturas únicas

#### **✋ Tacto**

- **Color**: Púrpura → Violeta → Índigo
- **Icono**: Manos
- **Ruta**: `/experiencia/tacto`
- **Descripción**: Sensaciones táctiles inmersivas

## 🎨 **Características de Diseño**

### **Layout Responsivo**

- **Grid adaptativo**: 1 columna (móvil) → 2 columnas (tablet) → 3 columnas (desktop)
- **Espaciado**: `gap-8` entre botones
- **Máximo ancho**: `max-w-6xl` para centrado óptimo

### **Efectos Visuales**

- **Hover**: Escala `hover:scale-105` y sombras de color
- **Transiciones**: `transition-all duration-300` para suavidad
- **Backdrop blur**: `backdrop-blur-sm` para profundidad
- **Sombras**: `shadow-2xl` con colores específicos por sentido

### **Tipografía**

- **Título**: `text-4xl md:text-6xl` (responsive)
- **Subtítulo**: `text-xl md:text-2xl` con peso ligero
- **Botones**: `text-2xl` para títulos, `text-base` para descripciones

## 🔧 **Implementación Técnica**

### **Archivos Creados/Modificados**

#### **1. Nueva Vista**

- `src/views/ExperienciaEstandarView.vue` - Vista principal de la experiencia estándar

#### **2. Router Actualizado**

- `src/router/index.ts` - Nueva ruta `/experiencia-estandar`

#### **3. HomeView Modificado**

- `src/views/HomeView.vue` - Botón convertido a RouterLink

### **Estructura del Componente**

```vue
<template>
  <main class="min-h-screen relative overflow-hidden">
    <!-- Imagen de fondo con filtro gradiente -->
    <div class="absolute inset-0 h-full">
      <img src="@/assets/portadaBotones.jpg" />
      <div class="bg-gradient-to-br from-red-600/60 via-orange-500/50 to-yellow-400/40"></div>
    </div>

    <!-- Contenido principal -->
    <div class="relative z-10 min-h-screen flex flex-col items-center justify-center">
      <!-- Portada con título -->
      <!-- Grid de botones de sentidos -->
      <!-- Botón de regreso -->
    </div>
  </main>
</template>
```

## 🎯 **Navegación y Rutas**

### **Flujo de Navegación**

1. **Inicio** (`/`) → Botón "Experiencia Estándar"
2. **Experiencia Estándar** (`/experiencia-estandar`) → Botones de sentidos
3. **Sentidos individuales** (`/experiencia/{sentido}`) → Futuras implementaciones

### **Rutas Configuradas**

```typescript
{
  path: '/experiencia-estandar',
  name: 'experiencia-estandar',
  component: () => import('../views/ExperienciaEstandarView.vue'),
}
```

## 🚀 **Próximos Pasos**

### **Implementaciones Futuras**

1. **Vistas de sentidos individuales**: Crear páginas para cada sentido
2. **Contenido específico**: Agregar contenido real para cada experiencia
3. **Interactividad**: Implementar funcionalidades específicas por sentido
4. **Animaciones**: Agregar transiciones entre vistas

### **Mejoras Sugeridas**

1. **Loading states**: Indicadores de carga para transiciones
2. **Transiciones**: Animaciones entre vistas
3. **Persistencia**: Guardar preferencias del usuario
4. **Accesibilidad**: Mejorar navegación por teclado

## 📱 **Responsive Design**

### **Breakpoints**

- **Móvil**: 1 columna, espaciado compacto
- **Tablet**: 2 columnas, espaciado medio
- **Desktop**: 3 columnas, espaciado amplio

### **Adaptaciones**

- **Texto**: Tamaños responsivos para títulos y subtítulos
- **Botones**: Altura y ancho adaptativos
- **Espaciado**: Márgenes y padding responsivos

## 🎨 **Paleta de Colores**

### **Gradientes por Sentido**

- **Vista**: `from-blue-500 via-indigo-500 to-purple-500`
- **Oído**: `from-green-500 via-emerald-500 to-teal-500`
- **Olfato**: `from-pink-500 via-rose-500 to-red-500`
- **Gusto**: `from-orange-500 via-amber-500 to-yellow-500`
- **Tacto**: `from-purple-500 via-violet-500 to-indigo-500`

### **Filtro de Portada**

- **Gradiente**: `from-red-600/60 via-orange-500/50 to-yellow-400/40`
- **Opacidad**: 60%, 50%, 40% para mantener visibilidad de la imagen

## ✅ **Verificación**

### **Para Probar la Implementación**

1. **Ejecutar**: `npm run dev`
2. **Navegar**: Ir a la página de inicio
3. **Hacer clic**: En "Experiencia Estándar"
4. **Verificar**: Portada con imagen y filtro gradiente
5. **Probar**: Botones de los 5 sentidos
6. **Comprobar**: Responsive design en diferentes tamaños

### **Elementos a Verificar**

- ✅ Navegación desde HomeView
- ✅ Imagen de fondo `portadaBotones.jpg`
- ✅ Filtro gradiente rojo-naranja-amarillo
- ✅ 5 botones de sentidos con colores únicos
- ✅ Iconos SVG apropiados para cada sentido
- ✅ Botón de regreso al inicio
- ✅ Layout responsivo
- ✅ Efectos hover y transiciones

## 🔧 **Solución de Problemas**

### **Error de Imagen Resuelto**

- **Problema**: La imagen `portada botoes.png` no existía
- **Solución**: Se cambió a `portadaBotones.jpg` que sí existe en `src/assets/`
- **Archivo real**: `portadaBotones.jpg` (617KB, formato JPG)
