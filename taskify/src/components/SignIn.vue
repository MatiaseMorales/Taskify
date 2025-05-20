<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/user'

const email = ref('')
const password = ref('')
const error = ref(null)

const userStore = useUserStore()
const router = useRouter()

const handleSignIn = async () => {
  
  try {
    await userStore.signIn(email.value, password.value)
    console.log('Login successful, redirecting...')
    router.push('/dashboard') 
  } catch (err) {
    console.error('Login failed:', err)
    error.value = err.message || 'Error al iniciar sesión'
  }
}
</script>

<template>
  <div>
    <h2>Iniciar sesión</h2>
    <form @submit.prevent="handleSignIn">
      <input v-model="email" type="email" placeholder="Email" autocomplete="email" required />
      <input v-model="password" type="password" placeholder="Contraseña"   required />
      <button type="submit">Entrar</button>
      <p v-if="error" style="color: red;">{{ error }}</p>
    </form>
  </div>
</template>
