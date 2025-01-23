<script setup lang="ts">
import type { Project } from '@/shared/models/Project'
import { formatDate } from '@/shared/utils/DateFormat'
import defaultImg from '@/assets/Image.jpg'
import Icon from '../Icon/Icon.vue'
import FavoriteToggle from '../FavoriteToggle/FavoriteToggle.vue'
import DropDownMenu from '../DropDownMenu/DropDownMenu.vue'
import ProjectService from '@/shared/services/project.ts'
import router from '@/router'
import AlertDialog from '../AlertDialog/AlertDialog.vue'
import { ref } from 'vue'

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

function toogleFavorite() {
  try {
    ProjectService.toggleFavorite(project.id)
    emit('updated')
  } catch (error) {
    console.error('Error on favorite toogle: ', error)
  }
}

const openRemoveConfirmationDialog = ref(false)

function toogleRemoveDialog() {
  openRemoveConfirmationDialog.value = true
}

function remove() {
  try {
    ProjectService.remove(project.id)
    emit('updated')
  } catch (error) {
    console.error('Error on project removal: ', error)
  }
}
</script>

<template>
  <div :class="classes.container">
    <div :class="classes.img_container">
      <img v-if="project.cover_url" :src="project.cover_url" />
      <img v-else :src="defaultImg" />
      <div :class="classes.action_btns">
        <FavoriteToggle :value="project.isFavorite" @click="toogleFavorite" />
        <DropDownMenu :menu_items="menu" />
      </div>
    </div>
    <div :class="classes.info_container">
      <h2>
        {{ project.name }}
      </h2>
      <p>
        <strong>Cliente:</strong>
        {{ project.client }}
      </p>
      <ul>
        <li>
          <Icon name="Calendar1" :size="24" />
          {{ formatDate(project.date_start) }}
        </li>
        <li>
          <Icon name="CalendarCheck" :size="24" />
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
.info_container {
  padding: var(--space-m);
  h2 {
    font-size: calc(20rem / 16);
    color: var(--color-secondary);
  }
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
