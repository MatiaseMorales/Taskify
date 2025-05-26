<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase'

const emit = defineEmits(['task-added'])

const title = ref('')
const description = ref('')
const dueDate = ref('')


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
    due_date: dueDate.value ? new Date(dueDate.value).toISOString() : null,
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
  dueDate.value = ''

 

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
    <div class="form-group">
  <label>Fecha y hora límite</label>
  <input v-model="dueDate" type="datetime-local" />
</div>


   
<div class="form-actions">
    <button @click="addTask">Agregar</button>
</div>
   <p :class="{ error: error, success: success }">{{ error || success || '\u00A0' }}</p>
  </div>
</template>

<style scoped>

.form-container {
  max-width: 600px;
  margin: 3rem auto;
  padding: 1.5rem;
  background-color: #f5f6fa;
  border: 1px solid #ccc;
  border-radius: 8px;
}


.form-container h2 {
 
  margin-top: 10px;
  margin-bottom: 15px;
  text-align: center;
  color: #2c3e50;
  font-size: 2rem;
  
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
  width: 97%;
  padding: 0.5rem;
  font-size: 1rem;
  font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif ;
}

.form-group input[type="datetime-local"] {
  margin-top: 5px;
  width: 97%;
  padding: 0.5rem;
  font-size: 1rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}




.form-group textarea {
  margin-top: 5px;
  width: 97%;
  height: 70px;
  padding: 0.5rem;
  font-size: 1rem;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}



button {
  padding: 0.5rem 1rem;
  font-weight: bold;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  margin-right: rem;
}

button:hover {
  background-color: #34495e;
}



.form-actions {
  display: flex;
  justify-content: flex-end;
}



.error {
  color: red;
  
}

.success {
  color: rgb(127, 143, 127);
}



@media (max-width: 768px) {
  .form-actions {
    justify-content: center;
  }

  .form-actions button {
    width: 100%;
  }
}


</style>
