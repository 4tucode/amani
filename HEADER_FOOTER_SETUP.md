# Implementación de Header y Footer

## ✅ Componentes Creados

### 🎯 **TheHeader.vue**

- **Logo a la izquierda**: Con icono de ojo y texto "Amani"
- **Menú a la derecha**: Navegación principal con enlaces
- **Menú hamburguesa**: Para dispositivos móviles
- **Responsive**: Se adapta a todos los tamaños de pantalla

### 🎯 **TheFooter.vue**

- **Información de la empresa**: Logo, descripción y enlaces
- **Enlaces rápidos**: Navegación secundaria
- **Información de contacto**: Email, teléfono y ubicación
- **Barra inferior**: Copyright y enlaces legales

## 🎨 Características de Diseño

### Colores y Estilos

- **Gradientes cálidos**: Ámbar, naranja y rojo
- **Efectos de difuminado**: `backdrop-blur-md` para transparencia
- **Sombras**: `shadow-2xl` para profundidad
- **Transiciones**: Efectos hover suaves y animaciones

### Responsive Design

- **Desktop**: Menú horizontal completo
- **Tablet**: Menú adaptativo
- **Móvil**: Menú hamburguesa desplegable

## 🔧 Implementación en App.vue

El archivo `App.vue` ahora incluye:

```vue
<template>
  <div class="min-h-screen flex flex-col">
    <TheHeader />
    <main class="flex-1 pt-16">
      <RouterView />
    </main>
    <TheFooter />
  </div>
</template>
```

## 🚀 Funcionalidades del Header

### Navegación

- **Inicio**: Página principal
- **Acerca de**: Información de la empresa
- **Experiencias**: Catálogo de experiencias
- **Contacto**: Formulario de contacto

### Menú Móvil

- **Botón hamburguesa**: Se convierte en X cuando está abierto
- **Desplegable**: Aparece debajo del header
- **Cierre automático**: Al hacer clic en un enlace

## 📱 Características Responsive

### Breakpoints

- **sm**: 640px y superior
- **md**: 768px y superior (menú desktop)
- **lg**: 1024px y superior
- **xl**: 1280px y superior

### Adaptaciones

- **Header fijo**: Siempre visible en la parte superior
- **Padding superior**: `pt-16` para compensar el header fijo
- **Layout flexible**: Se adapta al contenido

## 🎯 Efectos Visuales

### Gradientes

- **Header**: `from-amber-900/90 via-orange-800/90 to-red-900/90`
- **Footer**: `from-amber-900 via-orange-800 to-red-900`
- **Botones**: Diferentes combinaciones de colores cálidos

### Transparencias

- **Backdrop blur**: Efecto de cristal esmerilado
- **Opacidades**: `/90`, `/80`, `/60` para capas
- **Bordes**: `border-amber-500/30` con transparencia

## 🔍 Solución de Problemas

### Si el Header no aparece

1. Verifica que `TheHeader.vue` esté en `src/components/`
2. Asegúrate de que el import en `App.vue` sea correcto
3. Verifica que no haya errores de TypeScript

### Si el Footer no aparece

1. Verifica que `TheFooter.vue` esté en `src/components/`
2. Asegúrate de que el import en `App.vue` sea correcto
3. Verifica que el contenido tenga suficiente altura

### Si hay problemas de responsive

1. Verifica que Tailwind CSS esté funcionando
2. Prueba en diferentes tamaños de pantalla
3. Revisa la consola del navegador

## 📚 Recursos de Tailwind Utilizados

### Layout

- **Flexbox**: `flex`, `flex-col`, `flex-1`
- **Grid**: `grid`, `grid-cols-1`, `md:grid-cols-4`
- **Posicionamiento**: `fixed`, `relative`, `absolute`

### Espaciado

- **Padding**: `px-4`, `py-12`, `pt-16`
- **Margin**: `mx-auto`, `mb-4`, `space-y-4`
- **Gap**: `gap-8`, `space-x-3`

### Efectos

- **Gradientes**: `bg-gradient-to-r`, `from-*`, `via-*`, `to-*`
- **Sombras**: `shadow-lg`, `shadow-2xl`, `drop-shadow-lg`
- **Transiciones**: `transition-all`, `duration-300`, `hover:scale-105`

## 🎨 Personalización

### Cambiar Colores

Modifica las clases de gradiente en ambos componentes:

```vue
<!-- Ejemplo: cambiar a azules -->
class="bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-900"
```

### Cambiar Espaciado

Ajusta las clases de padding y margin:

```vue
<!-- Ejemplo: más espaciado -->
class="px-6 py-16"
```

### Cambiar Tamaños

Modifica las clases de width y height:

```vue
<!-- Ejemplo: header más alto -->
class="h-20"
```

## 🚀 Próximos Pasos

1. **Crear las rutas** para About, Experiences y Contact
2. **Implementar las vistas** correspondientes
3. **Agregar funcionalidad** a los botones de HomeView
4. **Optimizar imágenes** para mejor rendimiento
5. **Agregar animaciones** adicionales si es necesario
