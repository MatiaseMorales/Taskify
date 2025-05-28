<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SignIn from '../components/SignIn.vue'
import SignUp from '../components/SignUp.vue'
import { supabase } from '../supabase'
import AppFooter from '../components/AppFooter.vue'

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
    <img src="/images/logo-taskify.png" alt="Logo Taskify" class="logo" />

    <h1>Bienvenido a Taskify</h1>
    <p>Organiza tus tareas con facilidad</p>

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
  <AppFooter />
</template>

<style scoped>
body {
  margin: 0;
  
  
}

*{
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;}

.landing-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f5f6fa;
  padding: 0rem;
  text-align: center;
}

h1 {
  font-size: 3.5rem;
  margin-bottom: 0.1rem;
  margin-top: 1rem;
  color: #2c3e50;
}

p {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 2rem;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.button-group button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.button-group button:hover {
  background-color: #34495e;
}

.confirmation-message {
  margin-top: 20px;
  color: #27ae60;
  font-weight: 600;
}


.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal-content {
  background: #fff;
  padding: 5rem;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  position: relative;
}

.modal-content h2 {
  margin-bottom: 1rem;
  color: #2c3e50;
}

.modal-content form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal-content input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}

.modal-content button {
  padding: 0.6rem;
  background-color: #2980b9;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.modal-content button:hover {
  background-color: #dadbde;
  width: 100%;
}

.modal-content > button {
  margin-top: 1rem;
  background-color: transparent;
  color: #999;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
}

.modal-content > button:hover {
  color: #555;
}
.logo {
  width: 250px;
  height: auto;
  border-radius: 50%;

}


@media (max-width: 768px) {
  .landing-container {
    padding: 2rem 1rem;
    
  }

  h1 {
    font-size: 2rem;
  }

  p {
    font-size: 1rem;
  }

  .logo {
    width: 150px;
  }

  .button-group {
    flex-direction: column;
    gap: 0.75rem;
    width: 90%;
  }

  .button-group button {
    width: 100%;
    font-size: 1rem;
  }

  .modal-content {
    padding: 2rem;
    width: 95%;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 1.6rem;
  }

  p {
    font-size: 0.95rem;
  }

  .logo {
    width: 120px;
  }

  .modal-content {
    padding: 1.5rem;
  }
}


</style>
