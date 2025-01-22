<script setup lang="ts">
import Icon from '@/components/Icon/Index.vue'
import { computed } from 'vue'

interface Props {
  icon_right?: string
  icon_left?: string
  variant?: 'filled' | 'outline' | 'link'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'filled',
})

const { variant, icon_right, icon_left } = props

const size = computed(() => (variant === 'link' ? 16 : 24))
</script>

<template>
  <button :class="[classes[variant], classes.button]">
    <Icon v-if="icon_right" :size="size" :name="icon_right" />
    <slot></slot>
    <Icon v-if="icon_left" :size="size" :name="icon_left" />
  </button>
</template>

<style module="classes">
.button {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  /* width: 100%; */
  border-radius: 100rem;
  padding: 10px 26px;
  gap: var(--space-s);
  transition: background 750ms ease-in;
  cursor: pointer;
}

.filled {
  background: var(--color-primary);
  color: var(--white);
  border: none;
}
@media (hover: hover) and (pointer: fine) {
  .filled:hover {
    background: var(--color-primary-dark);
  }
}

.outline {
  background: transparent;
  color: var(--color-primary);
  border: 1px solid;
}
@media (hover: hover) and (pointer: fine) {
  .outline:hover {
    color: var(--color-primary-dark);
  }
}

.link {
  background: transparent;
  color: var(--color-primary);
  border: none;
  padding: 0px;
}
@media (hover: hover) and (pointer: fine) {
  .link:hover {
    color: var(--color-primary-dark);
  }
}
</style>
