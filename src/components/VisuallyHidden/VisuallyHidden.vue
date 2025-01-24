<!-- Component from josh comeau - just changed it to vue https://www.joshwcomeau.com/snippets/react-components/visually-hidden/ -->
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

export interface Props {
  type?: 'default' | 'label'
}
const props = withDefaults(defineProps<Props>(), {
  type: 'default',
})

const forceShow = ref(false)

const handleKeyDown = (ev: KeyboardEvent) => {
  if (ev.key === 'Alt') {
    forceShow.value = true
  }
}
const handleKeyUp = (ev: KeyboardEvent) => {
  if (ev.key === 'Alt') {
    forceShow.value = false
  }
}
onMounted(() => {
  if (import.meta.env.DEV) {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
  }
})

onUnmounted(() => {
  if (import.meta.env.DEV) {
    window.removeEventListener('keydown', handleKeyDown)
    window.removeEventListener('keyup', handleKeyUp)
  }
})
</script>

<template>
  <component :is="type === 'label' ? 'label' : 'span'" v-bind="props">
    <span v-if="forceShow"> <slot></slot></span>

    <span v-else :class="classes.visually_hidden">
      <slot></slot>
    </span>
  </component>
</template>

<style module="classes">
.visually_hidden {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
}
</style>
