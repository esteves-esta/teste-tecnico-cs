<script setup lang="ts">
import Icon from '../Icon/Icon.vue'

interface Option {
  value: unknown
  text: unknown
}

interface Props {
  label: string
  options: Option[]
}
const { label, options } = defineProps<Props>()
const model = defineModel()
const emit = defineEmits(['change'])

function getDisplayedValue() {
  const selectedChild = options.find((child) => child.value === model.value)

  return selectedChild.text
}
</script>

<template>
  <label :class="classes.container">
    <select :class="classes.select" v-model="model" @change="emit('change')">
      <option v-for="(option, index) in options" :value="option.value" :key="index">
        {{ option.text }}
      </option>
    </select>
    <!-- <VisuallyHidden>{{ label }}</VisuallyHidden> -->
    {{ getDisplayedValue() }}
    <Icon name="ChevronDown" :size="16" :stroke-width="2" />
  </label>
</template>

<style lang="css" module="classes">
.container {
  position: relative;
  font-size: calc(16rem / 16);
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: transparent;
  padding: 12px 10px 12px 16px;
  border-radius: 8px;
  gap: 24px;
  color: var(--color-text);
  border: 1px solid var(--color-text);
  min-width: 300px;
  &:focus-within {
    outline: 2px auto var(--color-primary);
  }

  &:hover {
    border-color: var(--color-primary);
  }
}
.select {
  appearance: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  position: absolute;
}
</style>
