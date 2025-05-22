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
  background-color: #a9a7a7;
  
}

.logo {
  font-weight: bold;
  font-size: 2.2rem;
}
</style>
