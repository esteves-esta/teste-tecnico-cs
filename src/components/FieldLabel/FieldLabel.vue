<script setup lang="ts">
interface Props {
  required?: boolean
}
const props = defineProps<Props>()

const { required } = props
</script>

<template>
  <label :class="classes.label">
    <slot></slot>
    <span v-if="required"> (Obrigatório) </span>
  </label>
</template>

<style module="classes">
.label {
  font-size: calc(18rem / 16);
  font-weight: 500;
  color: var(--color-primary);
  span {
    font-weight: 400;
    font-size: calc(14rem / 16);
    color: var(--color-text);
  }
}
</style>
