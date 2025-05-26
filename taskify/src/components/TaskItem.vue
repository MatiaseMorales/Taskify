<script setup>
import { ref } from 'vue'
import { computed } from 'vue'

const props = defineProps({
  task: Object,
  readonly: Boolean
})
const emit = defineEmits(['complete', 'delete', 'incomplete', 'update'])

const isEditing = ref(false)
const editedTitle = ref(props.task.title)
const editedDescription = ref(props.task.description || '')

const saveEdit = () => {
  emit('update', {
    ...props.task,
    title: editedTitle.value,
    description: editedDescription.value
  })
  isEditing.value = false
}



const formattedDueDate = computed(() => {
  if (!props.task.due_date) return ''
  const date = new Date(props.task.due_date)
  return date.toLocaleString() 
})

</script>

<template>
  <div class="task-card">
    <div v-if="isEditing">
      <input v-model="editedTitle" placeholder="Título" />
      <textarea v-model="editedDescription" placeholder="Descripción"></textarea>

    </div>
    <div v-else>
      <h3>{{ task.title }}</h3>
      <p>{{ task.description || 'Sin descripción.' }}</p>
      <p v-if="task.due_date" class="due-date">
  🕒 Límite: {{ formattedDueDate }}
</p>

      
    </div>

    <div class="actions" v-if="!readonly">
      <template v-if="!isEditing">
        <button @click="isEditing = true" class="edit-btn">Editar</button>
        <button @click="$emit('complete', task.id)" class="complete-btn">Marcar como completada</button>
        <button @click="$emit('delete', task.id)" class="delete-btn">Eliminar</button>
      </template>
      <template v-else>
        <button @click="saveEdit" class="save-btn">Guardar</button>
        <button @click="isEditing = false" class="cancel-btn">Cancelar</button>
      </template>
    </div>

    <div v-else class="status-completed">
      <button @click="$emit('incomplete', task.id)" class="incomplete-btn">Marcar como incompleta</button>
      <button @click="$emit('delete', task.id)" class="delete-btn">Eliminar</button>
    </div>
  </div>
</template>



<style scoped>
.task-card {
  max-width: 90%;
  
  padding: 1.5rem;
  background-color: #f5f6fa;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.task-card h3 {
  margin: 0;
  font-size: 1.4rem;
  color: #2c3e50;
}

.task-card p {
  margin: 0.5rem 0 1rem;
  color: #555;
  font-size: 1rem;
}

.actions,
.status-completed {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
}

.actions button,
.status-completed button {
  padding: 0.5rem 1rem;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s;
}


.complete-btn:hover{
background-color: rgb(99, 145, 99);
}

.incomplete-btn:hover {
  background-color: #34495e;
}



.delete-btn:hover {
  background-color: #c44436;
}

.edit-btn:hover {
  background-color: #d9be52;
}


.edit-btn {
  background-color: #f39c12;
}
.edit-btn:hover {
  background-color: #f1c40f;
}

.save-btn {
  background-color: #27ae60;
}
.save-btn:hover {
  background-color: #2ecc71;
}

.cancel-btn {
  background-color: #95a5a6;
}
.cancel-btn:hover {
  background-color: #bdc3c7;
}

.task-card input,
.task-card textarea {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}




@media (max-width: 768px) {
  .actions,
  .status-completed {
    flex-direction: column;
    align-items: stretch;
  }

  .actions button,
  .status-completed button {
    width: 100%;
  }
}

</style>
