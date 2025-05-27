<script setup>
import AppNav from './AppNav.vue'
import { defineEmits } from 'vue'

const emit = defineEmits(['scrollToTasks'])

const scrollToTasks = () => {
  emit('scrollToTasks')
}
</script>

<template>
  <header class="app-header">
    <div class="logo-title">
      <img src="/images/logo-taskify.png" alt="Taskify logo" class="logo" />
      <h1>Taskify</h1>
    </div>

    
    <div class="right-controls">
      <button class="btn-tasks" @click="scrollToTasks">Mis tareas</button>
      <AppNav />
    </div>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #2c3e50;
  color: white;
}

.logo-title {
  display: flex;
  flex-direction: row; 
  align-items: center;
  gap: 0.75rem;
}

.logo-title h1 {
  font-size: 2.5rem;
  margin: 0;
  color: white;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.logo {
  width: 50px;
  height: 50px;
  object-fit: contain;
  border-radius: 50%;
}

.right-controls {
  display: flex;
  align-items: center;
  gap: 1rem; 
}

.btn-tasks {
  background-color: #2980b9;
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-tasks:hover {
  background-color: #1c5980;
}

@media (max-width: 768px) {
  .logo {
    display: none;
  }
}
</style>
