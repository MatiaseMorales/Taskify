<script setup>
import AppNav from './AppNav.vue'
</script>

<template>
  <header class="app-header">
    <div class="logo">Taskify</div>
    <AppNav />
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f5f5f5;
}

.logo {
  font-weight: bold;
  font-size: 1.5rem;
}
</style>
