<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
// import ProjectService from '@/shared/services/project.ts'
import router from '@/router/index'
import Button from '@/components/Button/Index.vue'
import TextField from '@/components/TextField/Index.vue'
import { Project } from '@/shared/models/Project'
import { isPast } from 'date-fns'
import DateField from '@/components/DateField/Index.vue'

const project = ref<Project>(new Project())
const isEdit = ref()
const hasTriedSubmitting = ref(false)

onMounted(() => {
  isEdit.value = router.currentRoute.value.name?.toString().includes('edit')
  console.log(isEdit.value)
})

const validation = computed(() => {
  if (hasTriedSubmitting.value)
    return {
      name: project.value.name.trim().indexOf(' ') === -1,
      client: project.value.client.trim().length <= 0,
      date_start: project.value.date_start && isPast(project.value.date_start),
      date_end: project.value.date_end && isPast(project.value.date_end),
    }

  return {
    name: false,
    client: false,
    date_start: false,
    date_end: false,
  }
})

function submit() {
  alert('oi')
  hasTriedSubmitting.value = true
}

function goBack() {
  router.push({ name: 'home' })
}
</script>

<template>
  <article :class="classes.form">
    <section>
      <Button @click="goBack" type="button" variant="link" icon_right="ArrowLeft">Voltar</Button>
      <h1>{{ isEdit ? 'Editar' : 'Novo' }} projeto</h1>
    </section>
    <section>
      <form @submit.prevent="submit">
        <TextField
          v-model="project.name"
          :required="true"
          label="Nome do projeto"
          v-model:error="validation.name"
          errorMessage="Por favor, digite ao menos duas palavras"
        />
        <TextField
          v-model="project.client"
          :required="true"
          label="Cliente"
          v-model:error="validation.client"
          errorMessage="Por favor, digite ao menos uma palavra"
        />
        <div>
          <DateField />
        </div>
        <Button type="submit" icon_right="CirclePlus">Salvar projeto</Button>
      </form>
    </section>
  </article>
</template>

<style module="classes">
.form section:not(:has(form)) {
  margin-bottom: var(--space-l);
}

.form section:has(form) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--color-border);
  padding: 52px 0px;
  border-radius: var(--space-s);
}
.form form {
  width: 704px;
  display: flex;
  flex-direction: column;
  gap: var(--space-l);
}
</style>
