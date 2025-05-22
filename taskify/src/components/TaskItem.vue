<script setup>
const props = defineProps({
  task: Object,
  readonly: Boolean
})
const emit = defineEmits(['complete', 'delete', 'incomplete'])
</script>

<template>
  <div class="task-card" >
    <h3>{{ task.title }}</h3>
    <p>{{ task.description || 'Sin descripción.' }}</p>

    <div class="actions" v-if="!readonly">
      <button  @click="$emit('complete', task.id)"class="complete-btn">Marcar como completada</button>
      <button  @click="$emit('delete', task.id)" class="delete-btn">Eliminar</button>
    </div>

    <div v-else class="status-completed">
  
  <button @click="$emit('incomplete', task.id)" class="incomplete-btn">Marcar como incompleta</button>
  <button @click="$emit('delete', task.id)" class="delete-btn">Eliminar</button>
  
</div>

  </div>
</template>


<style scoped>
.task-card {
  max-width: 500px;
  margin: 1rem auto;
  padding: 1rem;
  background-color: #f2f2e7;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.task-card h3 {
  margin: 0;
  font-size: 1.25rem;
  color: #333;
}

.task-card p {
  margin: 0.5rem 0;
  color: #666;
}

.actions {
  display: flex;
  justify-content: end;
}

.actions button {
  margin-top: 0.5rem;
  margin-right: 0.5rem;
  background-color: #80b1a1;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
}

.complete-btn:hover {
  background-color: #aab1af;
}
.delete-btn, .incomplete-btn {
 
 margin-top: 0.5rem;
  margin-right: 0.5rem;
  background-color: #80b1a1;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
}

.incomplete-btn:hover {
  background-color: #aab1af;
}

.delete-btn:hover {
  background-color: #ee8080;
}

.status-completed {
  margin-top: 0.5rem;
  font-weight: bold;
  color: #2e7d32;
  display: flex;
  align-items: center;
  justify-content: end;
}

</style>
