<script setup lang="ts">
import { computed } from 'vue'
import * as icons from 'lucide-vue-next'

interface Props {
  name: string
  size?: number
  color?: string
  stroke_width?: number
  default_class?: string
}

const props = withDefaults(defineProps<Props>(), {
  stroke_width: 1.7,
  size: 16,
})

const icon = computed(() => {
  const iconList: { [name: string]: unknown } = icons
  return iconList[props.name]
})
</script>

<template>
  <component
    :is="icon"
    :size="size"
    :color="color"
    :stroke-width="stroke_width"
    :default-class="default_class"
  />
</template>
