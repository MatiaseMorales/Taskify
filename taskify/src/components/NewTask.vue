<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase'

const emit = defineEmits(['task-added'])

const title = ref('')
const description = ref('')

const error = ref(null)
const success = ref(null)

const addTask = async () => {
  error.value = null
  success.value = null

  if (!title.value) {
    error.value = 'El título es obligatorio.'
    return
  }

  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    error.value = 'No se pudo obtener el usuario.'
    return
  }

  const { error: insertError } = await supabase.from('tasks').insert([
    {
      title: title.value,
      description: description.value,
     
      user_id: user.id
    }
  ])

  if (insertError) {
    error.value = insertError.message
    return
  }

  success.value = 'Tarea agregada exitosamente.'
  title.value = ''
  description.value = ''
 

  emit('task-added')
setTimeout(() => {
  success.value = null
}, 3000)
}
</script>



<template>
  <div class="form-container">
    <h2>Nueva Tarea</h2>
    <div class="form-group">
      <label>Título</label>
      <input v-model="title" type="text" placeholder="Título de la tarea" />
    </div>

    <div class="form-group">
      <label>Descripción</label>
      <textarea v-model="description" placeholder="Descripción (opcional)"></textarea>
    </div>

   

    <button @click="addTask">Agregar</button>

   <p :class="{ error: error, success: success }">{{ error || success || '\u00A0' }}</p>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 500px;
  margin: 1rem auto;
  padding: 1rem;
  background: #fafafa;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.form-container h2 {
 
  margin-top: 10px;
  margin-bottom: 15px;
  
}

.form-container p {
  text-align: center;
  margin-top: 0px;
  margin-bottom: 0px;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group input {
  margin-top: 5px;
  width: 95%;
  padding: 0.5rem;
  font-size: 1rem;
  font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif ;
}
.form-group textarea {
  margin-top: 5px;
  width: 95%;
  height: 70px;
  padding: 0.5rem;
  font-size: 1rem;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}



button {
  padding: 0.5rem 1rem;
  font-weight: bold;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
}

.error {
  color: red;
  
}

.success {
  color: green;
}
</style>
