<script setup lang="ts">
import { SwitchRoot, SwitchThumb, useId } from 'radix-vue'
const id = useId()
const switchState = defineModel<boolean>()
const { label } = defineProps<{ label: string }>()
</script>

<template>
  <div :class="classes.container">
    <SwitchRoot :id="id" v-model:checked="switchState" :class="classes.switch_root">
      <SwitchThumb :class="classes.switch_thumb" />
    </SwitchRoot>
    <label class="Label" :for="id"> {{ label }} </label>
  </div>
</template>

<style module="classes">
.container {
  display: flex;
  align-items: center;
  gap: var(--space-s);
}

.switch_root {
  width: 48px;
  height: 24px;
  background-color: var(--color-grey);
  border-radius: 9999px;
  position: relative;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.switch_root:focus {
  box-shadow: var(box-shadow-focus);
}
.switch_root[data-state='checked'] {
  background-color: var(--color-accent);
}

.switch_thumb {
  display: block;
  width: 12px;
  height: 12px;
  background-color: var(--white);
  border-radius: 100%;
  transition: transform 100ms;
  transform: translateX(6px);
  will-change: transform;
}
.switch_thumb[data-state='checked'] {
  transform: translateX(26px);
}

.Label {
  color: var(--color-text);
  line-height: 1;
  font-weight: 400;
}
</style>
