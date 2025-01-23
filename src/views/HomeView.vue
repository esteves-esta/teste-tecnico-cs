<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { ProjectListResponse, sort_types } from '@/shared/models/ProjectList'
import ProjectService from '@/shared/services/project.ts'
import router from '@/router/index'
import Button from '@/components/Button/Button.vue'
import ProjectCard from '@/components/ProjectCard/ProjectCard.vue'
import SelectField from '@/components/SelectField/SelectField.vue'
import Switch from '@/components/Switch/Switch.vue'

const projectsList = ref<ProjectListResponse>({
  projects: [],
  total: 0,
})

onMounted(() => {
  refreshPage()
})

function refreshPage() {
  projectsList.value = ProjectService.list({
    favoritesOnly: onlyFavorites.value,
    sort: sort.value,
  })
}

function goToNewProject() {
  router.push({ name: 'new' })
}

const onlyFavorites = ref(false)
const sort = ref<sort_types>('default')
const sortingOptions: { text: string; value: sort_types }[] = [
  { text: 'Ordem alfabética', value: 'default' },
  { text: 'Iniciados mais recentes', value: 'recent' },
  { text: 'Prazo mais próximo', value: 'ending' },
]
</script>

<template>
  <div v-if="projectsList.total">
    <div :class="classes.navigation">
      <div :class="classes.nav_title">
        <h1>Projetos</h1>
        <span>({{ projectsList.total }})</span>
      </div>
      <div :class="classes.nav_actions">
        <Switch
          v-model="onlyFavorites"
          label="Apenas Favoritos"
          @update:model-value="refreshPage"
        />
        <SelectField
          label="Ordenação"
          v-model="sort"
          :options="sortingOptions"
          @update:model-value="refreshPage"
        />
        <Button @click="goToNewProject">Novo projeto</Button>
      </div>
    </div>

    <div :class="classes.project_container">
      <ProjectCard
        v-for="project in projectsList.projects"
        :key="project.id"
        :project="project"
        @updated="refreshPage"
      />
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

.navigation {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--space-m);
}

.nav_actions {
  display: flex;
  justify-content: space-between;
  gap: var(--space-xl);
}

.nav_title {
  display: flex;
  gap: var(--space-l);
  span {
    font-size: calc(17rem / 16);
  }
}

.project_container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(346px, 100%), 1fr));
  /* grid-template-rows: 300px; */
  grid-gap: var(--space-l);
}
</style>
