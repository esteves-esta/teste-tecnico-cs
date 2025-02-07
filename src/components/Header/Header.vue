<script setup lang="ts">
import SearchBar from '@/components/SearchBar/SearchBar.vue'
import Icon from '@/components/Icon/Icon.vue'
import VisuallyHidden from '@/components/VisuallyHidden/VisuallyHidden.vue'
import { useSearch } from '@/stores/search'
import router from '@/router'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const searchStore = useSearch()
const route = useRouter()

const isHomePage = computed(() => route.currentRoute.value.name === 'home')

router.beforeEach((to) => {
  if (searchStore.searchIsVisible && to.name !== 'home') {
    searchStore.query = ''
    searchStore.toogleSearch()
  }
})
</script>

<template>
  <header :class="classes.header">
    <SearchBar v-if="searchStore.searchIsVisible" />
    <template v-else>
      <img alt="App logo" :class="classes.logo" src="@/assets/logo.svg" />
      <button v-if="isHomePage" :class="classes.search_btn" @click="searchStore.toogleSearch">
        <Icon name="Search" :size="18" :stroke_width="2">
          <VisuallyHidden>Pesquisar</VisuallyHidden>
        </Icon>
      </button>
    </template>
  </header>
</template>

<style module="classes">
.header {
  position: relative;
  color: var(--white);
  line-height: 1.5;
  height: 100%;
  display: flex;
  background: var(--color-primary-dark);
  align-items: center;
  box-shadow: 0px 4px 4px 0px hsl(0 0 0% / 0.25);
}

.logo {
  display: block;
  margin: 0 auto;
}

.search_btn {
  cursor: pointer;
  padding: 10px;
  border-radius: 100%;
  margin-right: 64px;
  &:hover,
  &:focus {
    color: var(--color-accent);
  }
}
</style>
