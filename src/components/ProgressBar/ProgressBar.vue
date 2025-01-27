<script setup lang="ts">
import { useProgress } from '@/stores/progress'
import { storeToRefs } from 'pinia'
import { ProgressIndicator, ProgressRoot } from 'radix-vue'
import VisuallyHidden from '../VisuallyHidden/VisuallyHidden.vue'
const { progress } = storeToRefs(useProgress())
</script>

<template>
  <ProgressRoot v-if="progress" :class="classes.ProgressRoot" style="transform: translateZ(0)">
    <ProgressIndicator
      :class="classes.ProgressIndicator"
      :style="`transform: translateX(-${100 - 23}%)`"
    />
    <VisuallyHidden>Carregando...</VisuallyHidden>
  </ProgressRoot>
  <div :class="classes.placeholder" v-else></div>
</template>

<style lang="css" module="classes">
.placeholder {
  width: 100%;
  height: var(--progress-height);
}
.ProgressRoot {
  position: relative;
  overflow: hidden;
  background: var(--grey);
  width: 100%;
  height: var(--progress-height);

  /* Fix overflow clipping in Safari */
  /* https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0 */
  transform: translateZ(0);
}

.ProgressIndicator {
  background-color: var(--color-primary);
  width: 100%;
  height: 100%;
  animation: indeterminateAnimation 1s infinite linear;
  transform-origin: 0% 50%;
}

@keyframes indeterminateAnimation {
  0% {
    transform: translateX(0) scaleX(0);
  }
  40% {
    transform: translateX(0) scaleX(0.4);
  }
  100% {
    transform: translateX(100%) scaleX(0.5);
  }
}
</style>
