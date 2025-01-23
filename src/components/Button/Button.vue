<script setup lang="ts">
import Icon from '@/components/Icon/Icon.vue'
import { computed } from 'vue'

interface Props {
  icon_right?: string
  icon_left?: string
  variant?: 'filled' | 'outline' | 'link'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'filled',
})

const disabled = defineModel<boolean>('disabled')

const { variant, icon_right, icon_left } = props

const size = computed(() => (variant === 'link' ? 16 : 24))
</script>

<template>
  <button
    :disabled="disabled"
    :class="[classes[variant], classes.button, disabled && classes.disabled]"
  >
    <Icon v-if="icon_right" :size="size" :name="icon_right" />
    <slot></slot>
    <Icon v-if="icon_left" :size="size" :name="icon_left" />
  </button>
</template>

<style module="classes">
.button {
  --button-color: var(--color-primary);
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
  background: var(--button-color);
  color: var(--white);
  border: none;
}

.outline {
  background: transparent;
  color: var(--button-color);
  border: 1px solid;
}

.link {
  background: transparent;
  color: var(--button-color);
  border: none;
  padding: 0px;
}

.button.disabled {
  --button-color: var(--color-primary-light);
}

@media (hover: hover) and (pointer: fine) {
  .link:hover,
  .outline:hover,
  .filled:hover {
    --button-color: var(--color-primary-dark);
  }

  .button.disabled:hover {
    --button-color: var(--color-primary-light);
    cursor: default;
  }
}
</style>
