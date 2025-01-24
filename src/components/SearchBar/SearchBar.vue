<script setup lang="ts">
import Icon from '@/components/Icon/Icon.vue'
import VisuallyHidden from '@/components/VisuallyHidden/VisuallyHidden.vue'
import { useSearch } from '@/stores/search'
import { onMounted, useTemplateRef } from 'vue'

const searchStore = useSearch()
const inputRef = useTemplateRef('my-input')

onMounted(() => {
  if (inputRef.value) inputRef.value.focus()
})
</script>

<template>
  <label :class="classes.container">
    <Icon :class="classes.icon" name="Search" :size="16" :stroke_width="2">
      <VisuallyHidden>Pesquisar</VisuallyHidden>
    </Icon>
    <input
      ref="my-input"
      v-model="searchStore.query"
      placeholder="Digite o nome do projeto..."
      type="search"
      :class="classes.search_input"
    />
  </label>
</template>

<style module="classes">
.container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background: var(--white);
  gap: var(--space-m);
  padding: var(--space-m);
  line-height: 1.005;
  transition: color 0.5s ease-in-out;
  &:focus-within {
    box-shadow: var(--box-shadow-focus);
  }

  &:hover {
    color: var(--color-primary);
  }
}

.container .search_input {
  appearance: none;
  border: none;
  outline: none;
  width: 100%;
  font-size: calc(18rem / 16);
  line-height: calc(24rem / 16);
  font-weight: 400;
  color: var(--color-primary-dark);
  &::placeholder {
    color: var(--color-hr);
  }
}

.icon {
  color: var(--color-primary);
}
</style>
