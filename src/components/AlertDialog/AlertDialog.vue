<script setup lang="ts">
import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogRoot,
  AlertDialogTitle,
} from 'radix-vue'
import Button from '../Button/Button.vue'
import Icon from '../Icon/Icon.vue'

const { icon } = defineProps<{ icon: string }>()
const open = defineModel<boolean>()
const emits = defineEmits(['confirm', 'cancel'])

function handleAction() {
  emits('confirm')
}
function handleCancel() {
  emits('cancel')
  open.value = false
}
</script>

<template>
  <AlertDialogRoot v-model:open="open">
    <AlertDialogPortal>
      <AlertDialogOverlay :class="classes.overlay" />
      <AlertDialogContent :class="classes.content">
        <AlertDialogTitle :class="classes.title">
          <slot name="title"></slot>
          <div :class="[classes.icon_header, classes[icon]]">
            <Icon name="Trash" :size="20" :stroke-width="2" />
          </div>
        </AlertDialogTitle>
        <hr />
        <AlertDialogDescription :class="classes.description">
          <slot name="description"></slot>
          <h2 :class="classes.name">
            <slot name="name"></slot>
          </h2>
        </AlertDialogDescription>
        <div :class="classes.action_btns">
          <Button variant="outline" @click="handleCancel"> Cancelar </Button>
          <Button @click="handleAction"> Confirmar </Button>
        </div>
      </AlertDialogContent>
    </AlertDialogPortal>
  </AlertDialogRoot>
</template>

<style module="classes">
.overlay {
  background-color: var(--black-alpha-9);
  backdrop-filter: blur(10px);
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xl);
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: var(--box-shadow);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 500px;
  max-height: 85vh;
  padding: var(--space-xl);
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
}
hr {
  color: var(--color-hr);
  border-width: 1px;
  width: 100%;
}
.content:focus {
  outline: none;
}

.title {
  position: relative;
  margin: 0;
  color: var(--color-secondary);
  font-size: calc(22rem / 16);
  font-weight: 600;
}

.icon_header {
  position: absolute;
  background-color: var(--color-primary);
  color: var(--white);
  padding: 20px;
  border-radius: 100%;
  top: -200%;
  left: 34%;
}

.description {
  color: var(--color-text);
  line-height: 1.5;
  text-align: center;
  .name {
    color: var(--color-primary-dark);
    font-weight: 500;
    font-size: calc(24rem / 16);
  }
}

.action_btns {
  width: 100%;
  display: flex;
  gap: var(--space-xl);
  button {
    flex: 1 1 auto;
  }
}

@keyframes overlayShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes contentShow {
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
