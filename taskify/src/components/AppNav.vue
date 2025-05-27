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
        <button v-if="userStore.user" @click="logout" class="logout-btn">
          <span class="logout-text">Cerrar sesión</span>
          <svg
            class="logout-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
        </button>
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

.logout-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #9494a7;
  color: white;
  border: none;
  padding: 0.45rem 0.9rem;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: #5d5d67;
}


.logout-icon {
  display: none;
  width: 17px;
  height: 17px;
}

.logout-text {
  display: inline;
}


@media (max-width: 600px) {
  .logout-text {
    display: none;
  }
  .logout-icon {
    display: inline;
  }
}
</style>
