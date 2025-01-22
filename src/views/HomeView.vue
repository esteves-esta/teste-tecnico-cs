<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { ProjectListResponse } from '@/shared/models/ProjectList'
import ProjectService from '@/shared/services/project.ts'
import router from '@/router/index'
import Button from '@/components/Button/Index.vue'
const projectsList = ref<ProjectListResponse>({
  projects: [],
  total: 0,
})

onMounted(() => {
  projectsList.value = ProjectService.list({
    favoritesOnly: false,
    sort: 'default',
  })
})

function goToNewProject() {
  router.push({ path: 'create' })
}
</script>

<template>
  <div v-if="projectsList.total">
    <div :class="classes.navigation">
      <div :class="classes.nav_title">
        <h1>Nenhum projeto</h1>
        <span>({{ projectsList.total }})</span>
      </div>
      <div :class="classes.nav_actions">
        <button @click="goToNewProject">Novo projeto</button>
      </div>
    </div>
  </div>

  <div v-else :class="classes.empty">
    <h1>Nenhum projeto</h1>
    <p>Clique no botão abaixo para criar o primeiro e gerenciá-lo.</p>
    <Button type="button" icon_right="CirclePlus" @click="goToNewProject">Novo projeto</Button>
  </div>
</template>

<style module="classes">
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: var(--space-l);
  button {
    margin-top: var(--space-s);
  }
}

.nav_title {
  display: flex;
  gap: var(--space-l);
  span {
    font-size: calc(17rem / 16);
  }
}
</style>
