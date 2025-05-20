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
  error.value = null
  try {
    console.log('handleSignIn triggered') // Para debug
    await userStore.signIn(email.value, password.value)
    router.push('/dashboard') // redirige al dashboard después del login
  } catch (err) {
    error.value = err.message || 'Error al iniciar sesión'
  }
}
</script>

<template>
  <div>
    <h2>Iniciar sesión</h2>
    <form @submit.prevent="handleSignIn">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Contraseña" required />
      <button type="submit">Entrar</button>
    </form>
    <p v-if="error" style="color: red; margin-top: 10px;">{{ error }}</p>
  </div>
</template>

 <style scoped></style>
