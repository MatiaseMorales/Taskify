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


<style scoped>

div h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  margin-top: 0.5rem;
}
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}

button {
  padding: 0.6rem;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background-color: #34495e;
}

p {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  text-align: center;
}

p.error {
  color: red;
}

p.success {
  color: green;
}


</style>
