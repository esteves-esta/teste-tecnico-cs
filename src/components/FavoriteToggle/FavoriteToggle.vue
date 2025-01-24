<script setup lang="ts">
import { Toggle } from 'radix-vue'
import Icon from '../Icon/Icon.vue'
import { computed } from 'vue'
import VisuallyHidden from '@/components/VisuallyHidden/VisuallyHidden.vue'

const { value } = defineProps({
  value: Boolean,
})

const label = computed(() => (value ? 'Desfavoritar' : 'Favoritar'))
</script>

<template>
  <Toggle :pressed="value" :aria-label="label" :class="classes.toggle">
    <Icon name="Star" :size="20" :stroke-width="2" />
    <VisuallyHidden>{{ label }}</VisuallyHidden>
  </Toggle>
</template>

<style lang="css" module="classes">
button {
  all: unset;
}

.toggle {
  background-color: transparent;
  color: var(--white);
  height: 35px;
  width: 35px;
  border-radius: 100%;
  display: flex;
  font-size: 15px;
  line-height: 1;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px var(--black-a7);
}
.toggle:hover svg {
  fill: var(--color-accent);
}
.toggle[data-state='on'] svg {
  fill: var(--color-accent);
}
.toggle:focus {
  box-shadow: var(--box-shadow-focus);
}
</style>
