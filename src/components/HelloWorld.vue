<script setup lang="ts">
import Icon from './Icon/Icon.vue'
const props = defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    
    <Icon name="Airplay" />
    
  </div>
</template>
