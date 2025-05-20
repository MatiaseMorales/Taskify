<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SignIn from '../components/SignIn.vue'
import SignUp from '../components/SignUp.vue'
import { supabase } from '../supabase'

const showSignIn = ref(false)
const showSignUp = ref(false)
const confirmationMessage = ref(null)

const route = useRoute()
const router = useRouter()

onMounted(async () => {
  const query = route.query

  // Detecto tokens
  if (query.access_token && query.refresh_token) {
    const { error } = await supabase.auth.setSession({
      access_token: query.access_token,
      refresh_token: query.refresh_token
    })
    if (!error) {
      // limpio url para no ver tokens
      window.history.replaceState({}, document.title, '/')
      // Redirige al dashboard
      router.push('/dashboard')
    } else {
      console.error('Error setting session:', error)
    }
  }

  // Mensaje para link en mail de confirmacion
  if (query.type === 'signup') {
    confirmationMessage.value = '¡Gracias por confirmar tu email! Ahora podés iniciar sesión.'
  }
})

const openSignIn = () => {
  showSignIn.value = true
  showSignUp.value = false
}

const openSignUp = () => {
  showSignUp.value = true
  showSignIn.value = false
}

const closeModals = () => {
  showSignIn.value = false
  showSignUp.value = false
}
</script>


<template>
  <div class="landing-container">
    <h1>Bienvenido a Taskify</h1>
    <p>Organizá tus tareas con facilidad</p>

    <div class="button-group">
      <button @click="openSignIn">Iniciar sesión</button>
      <button @click="openSignUp">Registrarse</button>
    </div>

    <div v-if="confirmationMessage" class="confirmation-message">
      {{ confirmationMessage }}
    </div>

    
    <div v-if="showSignIn" class="modal-overlay" @click.self="closeModals">
      <div class="modal-content">
        <SignIn />
        <button @click="closeModals">Cerrar</button>
      </div>
    </div>

   
    <div v-if="showSignUp" class="modal-overlay" @click.self="closeModals">
      <div class="modal-content">
        <SignUp />
        <button @click="closeModals">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.landing-container {
  text-align: center;
  padding: 2rem;
}

.button-group button {
  margin: 0 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
}

.confirmation-message {
  margin-top: 20px;
  color: green;
  font-weight: bold;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  min-width: 300px;
}
</style>
