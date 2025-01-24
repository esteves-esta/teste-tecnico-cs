<template>
  <header>
    <img alt="App logo" class="logo" src="@/assets/logo.svg" />
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
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

main {
  margin: 60px 42px;
}
</style>
