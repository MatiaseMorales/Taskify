<!-- SignUp.vue -->
<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref(null)
const success = ref(null)

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const isStrongPassword = (password) => {
  // Mínimo 8 caracteres, una mayúscula, una minúscula, un número
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
  return strongPasswordRegex.test(password)
}

const handleSignUp = async () => {
  error.value = null
  success.value = null

  
  if (!isValidEmail(email.value)) {
    error.value = 'Por favor ingresá un correo válido.'
    return
  }

if (!isStrongPassword(password.value)) {
  error.value = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.'
  return
}

  if (password.value !== confirmPassword.value) {
    error.value = 'Las contraseñas no coinciden.'
    return
  }

  const { error: signUpError } = await supabase.auth.signUp({
    email: email.value,
    password: password.value
  })

  if (signUpError) {
    error.value = signUpError.message
  } else {
    success.value = 'Registrado correctamente. Revisá tu email para confirmar.'
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
  }
}
</script>

<template>
  <div>
    <h2>Registrarse</h2>
    <form @submit.prevent="handleSignUp">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Contraseña" required />
      <input v-model="confirmPassword" type="password" placeholder="Confirmar contraseña" required />
      <button type="submit">Registrarse</button>
    </form>
    <p v-if="error" style="color: red; margin-top: 10px;">{{ error }}</p>
    <p v-if="success" style="color: green; margin-top: 10px;">{{ success }}</p>
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
