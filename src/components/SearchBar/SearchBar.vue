<script setup lang="ts">
import Icon from '@/components/Icon/Icon.vue'
import VisuallyHidden from '@/components/VisuallyHidden/VisuallyHidden.vue'
import { useSearch } from '@/stores/search'
import { onMounted, ref, useTemplateRef, watch } from 'vue'
import SearchService from '@/shared/services/search'
import { storeToRefs } from 'pinia'

const searchStore = useSearch()
const { query } = storeToRefs(useSearch())
const inputRef = useTemplateRef('my-input')
const history = ref<string[]>([])

onMounted(() => {
  if (inputRef.value) inputRef.value.focus()
  getHistory()
})

watch(
  () => searchStore.query,
  () => {
    if (!searchStore.query) {
      getHistory()
    }
  },
)

async function getHistory() {
  history.value = await SearchService.get()
}

async function removeFromHistory(item: string) {
  await SearchService.remove(item)
  getHistory()
}
function searchItem(item: string) {
  searchStore.query = item
}
</script>

<template>
  <div :class="classes.container">
    <label
      :class="[
        classes.search_container,
        searchStore.query ? classes.filled : classes.empty,
        searchStore.searchIsVisible ? classes.open : classes.closed,
      ]"
    >
      <Icon :class="classes.icon" name="Search" :size="16" :stroke_width="2">
        <VisuallyHidden>Pesquisar</VisuallyHidden>
      </Icon>
      <input
        :required="true"
        ref="my-input"
        v-model="query"
        placeholder="Digite o nome do projeto..."
        type="search"
        :class="classes.search_input"
      />
    </label>
    <div :class="classes.history">
      <ul>
        <li v-for="item in history" :key="item">
          <button :class="classes.history_item_btn" @click="() => searchItem(item)">
            <span :class="classes.history_item">
              <Icon name="History" :size="16" />
              {{ item }}
              <button
                type="button"
                :class="classes.history_remove"
                @click.stop="() => removeFromHistory(item)"
              >
                <Icon name="X" :size="16" />
              </button>
            </span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style module="classes">
.container {
  position: relative;
  width: 100%;
  height: 100%;
}
.search_container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background: var(--white);
  gap: var(--space-m);
  padding: var(--space-m);
  line-height: 1.005;
  transition: color 0.5s ease-in-out;
  position: absolute;
  top: 0px;
  right: -1000px;
  transition: right 0.5s ease-in;
  &:focus-within {
    box-shadow: var(--box-shadow-focus);
  }

  &:hover {
    color: var(--color-primary);
  }
}
.search_container.open {
  right: 0px;
}

.search_container .search_input {
  appearance: none;
  border: none;
  outline: none;
  width: 100%;
  font-size: calc(18rem / 16);
  line-height: calc(24rem / 16);
  font-weight: 400;
  color: var(--color-primary-dark);
  background-color: transparent;
  &::placeholder {
    color: var(--color-hr);
  }
}

.icon {
  color: var(--color-primary);
}

.history {
  visibility: hidden;
  width: 100%;
  height: min-content;
  background: var(--white);
  color: var(--color-text);
  padding-top: var(--space-m);
  position: absolute;
  top: var(--header-height);
  z-index: 2;
  box-shadow: var(--box-shadow);
  ul {
    margin: 0px;
    padding: 0px;
  }
  ul li {
    width: 100%;
    padding: 0px;
    list-style: none;
  }
}

.history_item_btn {
  width: 100%;
  &:focus-within .history_item,
  .history_item:hover {
    color: var(--color-primary-dark);
    background-color: var(--color-primary-light);
  }
}

.history_item {
  width: 100%;
  display: flex;
  align-items: center;
  color: var(--color-text);
  gap: 10px;
  cursor: pointer;
  padding: var(--space-m) 18px;
}

.history_remove {
  cursor: pointer;
  margin-left: auto;
  border-radius: 100%;
  padding: 10px;
  &:hover {
    box-shadow: var(--box-shadow);
  }
  &:focus {
    box-shadow: var(--box-shadow-focus);
  }
}

.history:hover {
  visibility: visible;
}

.search_container:focus-within:is(.empty) + .history {
  visibility: visible;
}
</style>
