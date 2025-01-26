<script setup lang="ts">
import { ref } from 'vue'
import defaultImg from '@/assets/Image.jpg'
import type { Project } from '@/shared/models/Project'
import { formatDate } from '@/shared/utils/DateFormat'
import ProjectService from '@/shared/services/project.ts'
import router from '@/router'
import Icon from '@/components/Icon/Icon.vue'
import FavoriteToggle from '@/components/FavoriteToggle/FavoriteToggle.vue'
import DropDownMenu from '@/components/DropDownMenu/DropDownMenu.vue'
import AlertDialog from '@/components/AlertDialog/AlertDialog.vue'
import VisuallyHidden from '@/components/VisuallyHidden/VisuallyHidden.vue'
import { useSearch } from '@/stores/search'
import { getHighlightedHtml } from '@/shared/utils/helpers'

const searchStore = useSearch()

interface Props {
  project: Project
}

const { project } = defineProps<Props>()
const emit = defineEmits(['updated'])

const menu = [
  {
    label: 'Editar',
    icon_name: 'Pencil',
    function: goToEditPage,
  },
  {
    label: 'Remover',
    icon_name: 'Trash',
    function: toogleRemoveDialog,
  },
]

function goToEditPage() {
  router.push({ name: 'edit', params: { id: project.id } })
}

async function toogleFavorite() {
  try {
    await ProjectService.toggleFavorite(project.id)
    emit('updated')
  } catch (error) {
    console.error('Error on favorite toogle: ', error)
  }
}

const openRemoveConfirmationDialog = ref(false)

function toogleRemoveDialog() {
  openRemoveConfirmationDialog.value = true
}

async function remove() {
  try {
    await ProjectService.remove(project.id)
    emit('updated')
  } catch (error) {
    console.error('Error on project removal: ', error)
  }
}

function getNameWithHighlight() {
  const name = project.name
  const query = searchStore.query
  if (query.length >= 3) return getHighlightedHtml(name, query)
  return name
}
</script>

<template>
  <div :class="classes.container">
    <div :class="classes.img_container">
      <img v-if="project.cover_url" :src="project.cover_url as string" />
      <img v-else :src="defaultImg" />
      <div :class="classes.action_btns">
        <FavoriteToggle :value="project.isFavorite" @click="toogleFavorite" />
        <DropDownMenu :menu_items="menu" label="Menu de opções do projeto" />
      </div>
    </div>
    <div :class="classes.info_container">
      <h2 v-html="getNameWithHighlight()"></h2>
      <p>
        <strong>Cliente:</strong>
        {{ project.client }}
      </p>
      <ul>
        <li>
          <Icon name="Calendar1" :size="24" />
          <VisuallyHidden>Data de Início</VisuallyHidden>
          {{ formatDate(project.date_start) }}
        </li>
        <li>
          <Icon name="CalendarCheck" :size="24" />
          <VisuallyHidden>Data Final</VisuallyHidden>
          {{ formatDate(project.date_end) }}
        </li>
      </ul>
    </div>
  </div>

  <AlertDialog
    icon="Trash"
    v-model="openRemoveConfirmationDialog"
    @confirm="remove"
    @cancel="toogleRemoveDialog"
  >
    <template #title> Remover projeto </template>
    <template #description> Essa ação removerá definitivamente o projeto: </template>
    <template #name>
      {{ project.name }}
    </template>
  </AlertDialog>
</template>

<style module="classes">
.container {
  height: 430px;
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: var(--space-s);
  overflow: hidden;
  border-radius: 16px;
}
h2 {
  font-size: calc(20rem / 16);
  color: var(--color-secondary);
  strong {
    background: var(--color-accent);
    color: var(--white);
  }
}

.info_container {
  padding: var(--space-m);
  ul {
    margin-top: var(--space-xl);
    padding: 0px;
    display: flex;
    flex-direction: column;
    gap: var(--space-m);
  }
  ul li {
    display: flex;
    gap: var(--space-m);
    align-items: center;
    list-style: none;
  }
}
.img_container {
  overflow: hidden;
  height: 232px;
  display: flex;
  align-items: center;
  position: relative;
  img {
    width: 100%;
    background-size: cover;
  }
}
.action_btns {
  display: flex;
  gap: var(--space-m);
  position: absolute;
  bottom: 16px;
  right: 16px;
}
</style>
