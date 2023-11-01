<template>
  <div>
    <TodoPage/>
  </div>
</template>

<script setup lang="ts">
import TodoPage from './pages/TodoPage.vue'

</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.bg-theme{
  background: #ebeaeaaa;
}

.window-height{
  min-height: 100vh;
}

.window-width{
  min-width: 100vh;
}
</style>
