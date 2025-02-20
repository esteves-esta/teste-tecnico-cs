<script setup lang="ts">
import { ToastAction, ToastDescription, ToastRoot, ToastTitle, ToastViewport } from 'radix-vue'
import { useToast } from '@/stores/toast'
import Icon from '../Icon/Icon.vue'
import VisuallyHidden from '../VisuallyHidden/VisuallyHidden.vue'
import { storeToRefs } from 'pinia'
const toastStore = useToast()
const { open, toast } = storeToRefs(useToast())
</script>

<template>
  <ToastRoot v-model:open="open" :class="classes.root" :duration="toast.duration">
    <ToastTitle :class="classes.title"> {{ toast.title }} </ToastTitle>
    <ToastDescription as-child :class="classes.description">
      {{ toast.message }}
    </ToastDescription>
    <ToastAction :class="classes.action" as-child alt-text="Fechar">
      <button :class="classes.btn_close" @click="toastStore.closeToast">
        <VisuallyHidden>Fechar</VisuallyHidden>
        <Icon name="X" :size="24" />
      </button>
    </ToastAction>
  </ToastRoot>
  <ToastViewport :class="classes.ToastViewport" />
</template>

<style lang="css" module="classes">
.ToastViewport {
  --viewport-padding: 25px;
  --radix-toast-swipe-move-x: 20;
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: var(--viewport-padding);
  gap: 10px;
  width: 390px;
  max-width: 100vw;
  margin: 0;
  list-style: none;
  z-index: 2147483647;
  outline: none;
}

.root {
  background-color: white;
  border-radius: 6px;
  box-shadow:
    hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  padding: 15px;
  display: grid;
  grid-template-areas: 'title action' 'description action';
  grid-template-columns: auto max-content;
  column-gap: 15px;
  align-items: center;
}
.root[data-state='open'] {
  animation: slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1);
}
.root[data-state='closed'] {
  animation: hide 100ms ease-in;
}
.root[data-swipe='move'] {
  transform: translateX(var(--radix-toast-swipe-move-x));
}
.root[data-swipe='cancel'] {
  transform: translateX(0);
  transition: transform 200ms ease-out;
}
.root[data-swipe='end'] {
  animation: swipeOut 100ms ease-out;
}

@keyframes hide {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes slideIn {
  from {
    transform: translateX(calc(100% + var(--viewport-padding)));
  }
  to {
    transform: translateX(0);
  }
}

@keyframes swipeOut {
  from {
    transform: translateX(var(--radix-toast-swipe-end-x));
  }
  to {
    transform: translateX(calc(100% + var(--viewport-padding)));
  }
}

.title {
  grid-area: title;
  margin-bottom: 5px;
  font-weight: 500;
  color: var(--color-primary-dark);
  font-size: 15px;
}

.description {
  grid-area: description;
  margin: 0;
  color: var(--color-text);
  font-size: 13px;
  line-height: 1.3;
}

.action {
  grid-area: action;
}

.btn_close {
  border-radius: 100%;
  padding: 10px;
  color: var(--color-primary-dark);
  &:hover,
  &:focus {
    box-shadow: var(--box-shadow);
  }
}
</style>
