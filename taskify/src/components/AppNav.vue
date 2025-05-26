<script setup>
import { useUserStore } from '../store/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const logout = async () => {
  try {
    await userStore.signOut()
    router.push('/')
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
  }
}
</script>

<template>
  <nav class="nav">
    <ul>
      <li>
        <button v-if="userStore.user" @click="logout">Cerrar sesión</button>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.nav ul {
  list-style: none;
  display: flex;
  gap: 1rem;
  padding: 0;
  margin: 0;
}

.nav button {
  background-color: #9494a7;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.nav button:hover {
  background-color: #aeaec4;
}
</style>

