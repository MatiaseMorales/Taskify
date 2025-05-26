<script setup>
import AppNav from './AppNav.vue'
</script>

<template>
  <header class="app-header">
    <div class="logo-title">
      <img src="/images/logo-taskify.png" alt="Taskify logo" class="logo" />
      <h1>Taskify</h1>
      </div>
    <AppNav />
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
  font-size:2.5rem;
  margin: 0;
  color: white;
}

.logo {
  width: 50px;
  height: 50px;
  object-fit: contain;
  border-radius: 50%;
}

@media (max-width: 768px) {
  .logo {
    display: none;
  }
}

</style>

