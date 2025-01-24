<script setup lang="ts">
import Header from '@/components/Header/Header.vue'
import BaseView from '@/views/BaseView.vue'
import { ToastProvider } from 'radix-vue'
</script>

<template>
  <Header />
  <main :class="classes.main">
    <ToastProvider>
      <BaseView />
    </ToastProvider>
  </main>
</template>

<style module="classes">
.main {
  margin: 60px 42px;
}
</style>
