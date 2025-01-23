<script setup lang="ts">
import { useId } from 'radix-vue'
import FieldLabel from '@/components/FieldLabel/FieldLabel.vue'
import { ref, useTemplateRef } from 'vue'
import Button from '@/components/Button/Button.vue'
import Icon from '@/components/Icon/Index.vue'

const inputId = useId()

interface Props {
  label: string
  required?: boolean
  errorMessage?: string
}
const files = ref<FileList>(new DataTransfer().files)
const value = defineModel<string | undefined>()
const error = defineModel<boolean>('error', { required: false })
const props = defineProps<Props>()

const { required, label, errorMessage } = props

const preview = ref()

const inputRef = useTemplateRef('my-input')

function selectFiles() {
  if (!inputRef.value) return
  inputRef.value.click()
}
const onChange = (e: unknown) => {
  files.value = e.target.files
  if (files.value.length === 0) return
  const name = files.value[0].name
  if (name.includes('.png') || name.includes('.jpg')) {
    preview.value = URL.createObjectURL(files.value[0])
    value.value = URL.createObjectURL(files.value[0])
    error.value = false
  } else {
    error.value = true
    value.value = undefined
    preview.value = ''
  }
}
const clear = () => {
  files.value = new DataTransfer().files
  preview.value = ''
  value.value = undefined
}
</script>

<template>
  <div :class="[classes.input_container, error && classes.error]">
    <FieldLabel :required="required" :for="inputId">{{ label }} </FieldLabel>
    <div :class="classes.preview_container" v-if="preview">
      <img :src="preview" />
      <button :class="classes.delete_btn" @click="clear" type="button">
        <Icon name="Trash" :size="32" />
      </button>
    </div>
    <div v-else :class="classes.container">
      <Icon name="HardDriveUpload" :size="24" />
      <p>Escolha uma imagem .jpg ou .png no seu dispositivo</p>
      <input
        ref="my-input"
        type="file"
        :files="files"
        @change="onChange"
        :required="required"
        :id="inputId"
        :class="classes.input"
        accept="image/*"
      />
      <Button @click="selectFiles" type="button" variant="outline">Selecionar</Button>
    </div>

    <span v-if="error" :class="classes.error_help_text">
      {{ errorMessage }}
    </span>
  </div>
</template>

<style module="classes">
.input_container.error {
  transition: background 750ms ease-in;
  label,
  input,
  span {
    color: var(--color-error);
    border-color: var(--color-error);
  }
}

.container {
  margin-top: 4px;
  gap: var(--space-m);
  position: relative;
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: var(--space-l) 0px;
  width: 100%;
  font-weight: 400;
  border: 0.5px dashed var(--color-text);
  border-radius: 4px;
  color: var(--color-text);
  transition: border-color 750ms ease-in;
  outline: none;
  button {
    margin-top: var(--space-s);
  }
}

.input {
  appearance: none;
  opacity: 0;
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
}

.preview_container {
  border-radius: 4px;
  height: 395px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  img {
    background-size: contain;
    background-position: center;
  }
}
.delete_btn {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  color: var(--color-primary);
  padding: 0.5rem;
  box-shadow: 5px 10px var(--black);
  cursor: pointer;
  border-radius: 100%;
  background-color: var(--white);
  box-shadow: 0px 7px 4px 0px var(--black-alpha);
}
</style>
