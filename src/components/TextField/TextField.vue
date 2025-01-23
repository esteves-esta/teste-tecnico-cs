<script setup lang="ts">
import { useId } from 'radix-vue'

const inputId = useId()

interface Props {
  label: string
  required?: boolean
  errorMessage: string
}
const value = defineModel()
const error = defineModel('error')
const props = defineProps<Props>()

const { required, label, errorMessage } = props
</script>

<template>
  <div :class="[classes.input_container, error && classes.error]">
    <label :for="inputId"
      >{{ label }}
      <span>
        {{ required && '(Obrigatório)' }}
      </span>
    </label>
    <input v-model="value" :required="required" :id="inputId" type="text" :class="classes.input" />
    <span v-if="error" :class="classes.error_help_text">
      {{ errorMessage }}
    </span>
  </div>
</template>

<style module="classes">
.input_container.error {
  transition: background 750ms ease-in;
  label,
  input,
  span {
    color: var(--color-error);
    border-color: var(--color-error);
  }
}
.input_container {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.input_container label {
  font-size: calc(18rem / 16);
  font-weight: 500;
  color: var(--color-primary);
  span {
    font-weight: 400;
    font-size: calc(14rem / 16);
    color: var(--color-text);
  }
}
.input {
  width: 100%;
  font-weight: 400;
  border: 1px solid var(--color-text);
  border-radius: var(--space-s);
  padding: 8px 16px 10px 16px;
  color: var(--color-primary-dark);
  transition: border-color 750ms ease-in;
  outline: none;
  &:focus {
    border-color: var(--color-primary-dark);
  }
}

@media (hover: hover) and (pointer: fine) {
  .filled:hover {
    background: var(--color-primary-dark);
  }
}
</style>
