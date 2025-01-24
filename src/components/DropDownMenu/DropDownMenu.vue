<script setup lang="ts">
import Icon from '../Icon/Icon.vue'
import {
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from 'radix-vue'
import VisuallyHidden from '@/components/VisuallyHidden/VisuallyHidden.vue'

interface Item {
  icon_name?: string
  label: string
  function: () => void
}

interface Props {
  menu_items: Item[]
  label: string
}
const { menu_items, label } = defineProps<Props>()
</script>

<template>
  <DropdownMenuRoot>
    <DropdownMenuTrigger :class="classes.icon_button" :aria-label="label">
      <Icon name="Ellipsis" :size="24" />
      <VisuallyHidden>{{ label }}</VisuallyHidden>
    </DropdownMenuTrigger>

    <DropdownMenuPortal>
      <DropdownMenuContent :class="classes.content" :side-offset="5">
        <DropdownMenuItem
          v-for="item in menu_items"
          :key="item.label"
          :class="classes.menu_item"
          @click="() => item.function()"
        >
          <Icon :size="24" v-if="item.icon_name" :name="item.icon_name" /> {{ item.label }}
        </DropdownMenuItem>

        <DropdownMenuArrow :class="classes.arrow" />
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>

<style module="classes">
.content {
  min-width: 220px;
  background-color: var(--white);
  border-radius: 8px;
  padding: 10px 0px;
  box-shadow:
    0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
}
.content[data-side='top'] {
  animation-name: slideDownAndFade;
}
.content[data-side='right'] {
  animation-name: slideLeftAndFade;
}
.content[data-side='bottom'] {
  animation-name: slideUpAndFade;
}
.content[data-side='left'] {
  animation-name: slideRightAndFade;
}

.menu_item {
  display: flex;
  flex-direction: row;
  align-items: center;
  line-height: 1;
  gap: var(--space-m);
  color: var(--color-primary);
  height: 40px;
  padding: 0 5px;
  position: relative;
  padding-left: 25px;
  cursor: pointer;
  font-weight: 400;
  transition: color 350ms ease-in;

  &:hover,
  &:focus {
    color: var(--color-primary-dark);
    outline: none;
    background-color: var(--color-primary-light);
  }
}

.icon_button {
  font-family: inherit;
  border-radius: 100%;
  height: 35px;
  width: 35px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  background-color: white;
  box-shadow: var(--box-shadow);
  cursor: pointer;
}

.icon_button:focus {
  box-shadow: var(--box-shadow-focus);
}

@keyframes slideUpAndFade {
  from {
    opacity: 0;
    transform: translateY(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideRightAndFade {
  from {
    opacity: 0;
    transform: translateX(-2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideDownAndFade {
  from {
    opacity: 0;
    transform: translateY(-2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideLeftAndFade {
  from {
    opacity: 0;
    transform: translateX(2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
