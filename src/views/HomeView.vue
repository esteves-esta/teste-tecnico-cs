<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { ProjectListResponse, sort_types } from '@/shared/models/ProjectList'
import ProjectService from '@/shared/services/project.ts'
import SearchService from '@/shared/services/search.ts'
import router from '@/router/index'
import Button from '@/components/Button/Button.vue'
import ProjectCard from '@/components/ProjectCard/ProjectCard.vue'
import SelectField from '@/components/SelectField/SelectField.vue'
import Switch from '@/components/Switch/Switch.vue'
import { useSearch } from '@/stores/search'
import { debounce } from '@/shared/utils/helpers'
import type { Project } from '@/shared/models/Project'

const searchStore = useSearch()

const projectsList = ref<ProjectListResponse>({
  projects: [],
  total: 0,
})

onMounted(() => {
  refreshPage()
})

watch(
  () => searchStore.query,
  () => {
    if (searchStore.query && searchStore.query.length >= 3) {
      SearchService.save(searchStore.query)

      debounce(() => {
        refreshPage()
      }, 500)
    } else {
      if (!searchStore.query)
        debounce(() => {
          refreshPage()
        }, 500)
    }
  },
)

async function refreshPage() {
  projectsList.value = await ProjectService.list({
    favoritesOnly: onlyFavorites.value,
    sort: sort.value,
    query: searchStore.query,
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

function closeSearch() {
  searchStore.query = ''
  searchStore.toogleSearch()
  refreshPage()
}
</script>

<template>
  <article v-if="projectsList.total">
    <template v-if="searchStore.searchIsVisible">
      <div :class="classes.search_navigation">
        <Button @click="closeSearch" type="button" variant="link" icon_right="ArrowLeft"
          >Voltar</Button
        >
        <h1>Resultado da busca</h1>
      </div>
    </template>
    <template v-else>
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
    </template>

    <div v-if="projectsList.projects.length" :class="classes.project_container">
      <ProjectCard
        v-for="project in projectsList.projects"
        :key="project.id"
        :project="project as Project"
        @updated="refreshPage"
      />
    </div>

    <div v-else :class="classes.empty_results">
      <h3 v-if="searchStore.query">A pesquisa atual não retornou resultados.</h3>
      <h3 v-if="onlyFavorites">Favorite um item para que ele apareça neste filtro.</h3>
    </div>
  </article>

  <article v-else :class="classes.empty">
    <h1>Nenhum projeto</h1>
    <p>Clique no botão abaixo para criar o primeiro e gerenciá-lo.</p>
    <Button type="button" icon_right="CirclePlus" @click="goToNewProject">Novo projeto</Button>
  </article>
</template>

<style module="classes">
.empty,
.empty_results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  gap: var(--space-l);
  button {
    margin-top: var(--space-s);
  }
  h3 {
    color: var(--color-primary);
    padding: 15rem 0;
  }
}

.search_navigation {
  margin-bottom: var(--space-m);
}

.navigation {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--space-m);
  flex-direction: column;
  gap: var(--space-m);
}

.nav_actions {
  display: flex;
  justify-content: space-between;
  gap: var(--space-xl);
  flex-direction: column;
}
@media (min-width: 54rem) {
  .nav_actions,
  .navigation {
    flex-direction: row;
  }
}

.nav_title {
  display: flex;
  gap: var(--space-s);
  align-items: center;
  span {
    font-size: calc(17rem / 16);
    color: var(--color-primary);
  }
}

.project_container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(346px, 100%), 1fr));
  /* grid-template-rows: 300px; */
  grid-gap: var(--space-l);
}
</style>
