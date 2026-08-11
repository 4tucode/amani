<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import { imagenABase64 } from '../utils/imagenBase64'

const props = defineProps<{
  modelValue: string
  placeholder?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit.configure({
      link: { openOnClick: false, autolink: true },
    }),
    Image.configure({ HTMLAttributes: { class: 'editor-imagen' } }),
    Placeholder.configure({ placeholder: props.placeholder ?? 'Escribe el contenido del artículo…' }),
  ],
  onUpdate: ({ editor }) => emit('update:modelValue', editor.getHTML()),
})

// Permite resetear el editor cuando el formulario padre cambia de artículo
// (crear → editar, o al reabrir el modal), sin reasignar `editor` entero.
watch(
  () => props.modelValue,
  (valor) => {
    if (editor.value && valor !== editor.value.getHTML()) {
      editor.value.commands.setContent(valor, { emitUpdate: false })
    }
  },
)

onBeforeUnmount(() => editor.value?.destroy())

const insertandoImagen = ref(false)
const inputImagen = ref<HTMLInputElement | null>(null)

const abrirSelectorImagen = () => inputImagen.value?.click()

const onImagenSeleccionada = async (e: Event) => {
  const input = e.target as HTMLInputElement
  const archivo = input.files?.[0]
  input.value = ''
  if (!archivo || !editor.value) return

  insertandoImagen.value = true
  try {
    const base64 = await imagenABase64(archivo)
    editor.value.chain().focus().setImage({ src: base64 }).run()
  } catch (err) {
    console.error(err)
  } finally {
    insertandoImagen.value = false
  }
}

const insertarEnlace = () => {
  if (!editor.value) return
  const previa = editor.value.getAttributes('link').href as string | undefined
  const url = window.prompt('URL del enlace:', previa ?? 'https://')
  if (url === null) return
  if (url === '') {
    editor.value.chain().focus().unsetLink().run()
    return
  }
  editor.value.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}
</script>

<template>
  <div class="rich-editor">
    <div v-if="editor" class="editor-toolbar">
      <button
        type="button"
        class="tb-btn"
        :class="{ active: editor.isActive('bold') }"
        title="Negrita"
        @click="editor.chain().focus().toggleBold().run()"
      >
        <strong>N</strong>
      </button>
      <button
        type="button"
        class="tb-btn"
        :class="{ active: editor.isActive('italic') }"
        title="Cursiva"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        <em>C</em>
      </button>
      <button
        type="button"
        class="tb-btn"
        :class="{ active: editor.isActive('heading', { level: 2 }) }"
        title="Subtítulo"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      >
        H2
      </button>
      <button
        type="button"
        class="tb-btn"
        :class="{ active: editor.isActive('bulletList') }"
        title="Lista"
        @click="editor.chain().focus().toggleBulletList().run()"
      >
        •≡
      </button>
      <button
        type="button"
        class="tb-btn"
        :class="{ active: editor.isActive('blockquote') }"
        title="Cita"
        @click="editor.chain().focus().toggleBlockquote().run()"
      >
        “”
      </button>
      <button
        type="button"
        class="tb-btn"
        :class="{ active: editor.isActive('link') }"
        title="Enlace"
        @click="insertarEnlace"
      >
        🔗
      </button>
      <button
        type="button"
        class="tb-btn"
        title="Insertar imagen"
        :disabled="insertandoImagen"
        @click="abrirSelectorImagen"
      >
        {{ insertandoImagen ? '…' : '🖼️' }}
      </button>
      <input
        ref="inputImagen"
        type="file"
        accept="image/*"
        class="input-oculto"
        @change="onImagenSeleccionada"
      />
    </div>
    <EditorContent :editor="editor" class="editor-contenido" />
  </div>
</template>

<style scoped lang="scss">
.rich-editor {
  border: 1.5px solid rgba(140, 58, 80, 0.25);
  border-radius: 4px;
  overflow: hidden;
  // El componente se usa dentro de un <label class="form-label"> que pone todo
  // en mayúsculas; sin este reset el contenido escrito se vería en mayúsculas.
  text-transform: none;
  letter-spacing: normal;
  font-weight: 400;
}

.editor-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  padding: 0.5rem;
  background: rgba(140, 58, 80, 0.05);
  border-bottom: 1.5px solid rgba(140, 58, 80, 0.15);
}

.tb-btn {
  font-family: inherit;
  font-size: 13px;
  min-width: 30px;
  height: 30px;
  padding: 0 0.4rem;
  border: 1.5px solid transparent;
  border-radius: 4px;
  background: transparent;
  color: #3d1a26;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease;

  &:hover:not(:disabled) {
    background: rgba(140, 58, 80, 0.1);
  }

  &.active {
    border-color: #8c3a50;
    background: rgba(140, 58, 80, 0.12);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.input-oculto {
  display: none;
}

.editor-contenido {
  padding: 0.85rem 1rem;
  max-height: 360px;
  overflow-y: auto;

  :deep(.ProseMirror) {
    outline: none;
    font-family: inherit;
    font-size: 14px;
    color: #3d1a26;
    line-height: 1.7;
    min-height: 160px;
  }

  :deep(p) {
    margin: 0 0 0.75rem;
  }

  :deep(h2) {
    font-size: 15px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    color: #8c3a50;
    margin: 1rem 0 0.5rem;
  }

  :deep(blockquote) {
    border-left: 3px solid rgba(140, 58, 80, 0.3);
    padding-left: 0.9rem;
    margin: 0.75rem 0;
    font-style: italic;
    color: rgba(61, 26, 38, 0.65);
  }

  :deep(ul) {
    padding-left: 1.25rem;
    margin: 0 0 0.75rem;
  }

  :deep(a) {
    color: #8c3a50;
    text-decoration: underline;
  }

  :deep(img.editor-imagen) {
    max-width: 100%;
    border-radius: 4px;
    margin: 0.5rem 0;
    display: block;
  }

  :deep(p.is-editor-empty:first-child::before) {
    content: attr(data-placeholder);
    float: left;
    color: rgba(61, 26, 38, 0.35);
    pointer-events: none;
    height: 0;
  }
}
</style>
