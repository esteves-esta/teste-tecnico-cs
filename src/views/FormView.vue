<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import ProjectService from '@/shared/services/project.ts'
import router from '@/router/index'
import Button from '@/components/Button/Button.vue'
import TextField from '@/components/TextField/TextField.vue'
import { Project } from '@/shared/models/Project'
import { isPast, isToday, isEqual, isBefore } from 'date-fns'
import DateField from '@/components/DateField/DateField.vue'
import FileField from '@/components/FileField/Index.vue'
import { getLocalTimeZone } from '@internationalized/date'

class RequiredFields {
  [name: string]: boolean
  name = false
  client = false
  date_start = false
  date_end = false
}
const dateErrorMessage = 'Selecione uma data válida'
const project = reactive<Project>(new Project())
const isEdit = ref()
const touchedFields = reactive<RequiredFields>(new RequiredFields())

onMounted(() => {
  isEdit.value = router.currentRoute.value.name?.toString().includes('edit')
})

const validation = computed(() => {
  const dateValidations = { date_start: false, date_end: false }
  let date_start: Date | null = null
  if (project.date_start) {
    date_start = project.date_start.toDate(getLocalTimeZone())
    dateValidations.date_start =
      touchedFields.date_start && isPast(date_start) && !isToday(date_start)
  }

  if (project.date_end) {
    const date_end = project.date_end.toDate(getLocalTimeZone())
    const isDifferent = date_start ? isEqual(date_start, date_end) : false
    const isBeforeStart = date_start ? isBefore(date_end, date_start) : false
    console.log({ isBeforeStart })
    dateValidations.date_end =
      (touchedFields.date_end && isPast(date_end) && !isToday(date_end)) ||
      isDifferent ||
      isBeforeStart
  }
  return {
    name: touchedFields.name && project.name.trim().indexOf(' ') === -1,
    client: touchedFields.client && project.client.trim().length <= 0,
    ...dateValidations,
  }
})

const disabledSubmit = computed(() => {
  return (
    project.name != '' &&
    project.client != '' &&
    project.date_start != null &&
    project.date_end != null
  )
})

function setFieldAsTouched(field: string) {
  touchedFields[field] = true
}

function submit() {
  try {
    ProjectService.create(project as Project)
    router.push({ name: 'home' })
  } catch (error) {
    console.error(error)
  }
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
          @update:modelValue="() => setFieldAsTouched('name')"
        />
        <TextField
          v-model="project.client"
          :required="true"
          label="Cliente"
          v-model:error="validation.client"
          errorMessage="Por favor, digite ao menos uma palavra"
          @update:modelValue="() => setFieldAsTouched('client')"
        />
        <div :class="classes.date_row">
          <DateField
            label="Data de Início"
            v-model="project.date_start"
            icon="Calendar1"
            v-model:error="validation.date_start"
            :errorMessage="dateErrorMessage"
            :required="true"
            @update:modelValue="() => setFieldAsTouched('date_start')"
          />
          <DateField
            label="Data Final"
            icon="CalendarCheck"
            v-model="project.date_end"
            v-model:error="validation.date_end"
            :errorMessage="dateErrorMessage"
            :required="true"
            @update:modelValue="() => setFieldAsTouched('date_end')"
          />
        </div>

        <FileField label="Capa do projeto" v-model="project.cover_url" />

        <Button :disabled="!disabledSubmit" type="submit" icon_right="CirclePlus">
          Salvar projeto
        </Button>
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

.date_row {
  display: flex;
  flex-direction: row;
  gap: var(--space-l);
}
</style>
