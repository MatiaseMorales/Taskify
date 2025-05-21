<script setup>
const props = defineProps({
  task: Object,
  readonly: Boolean
})
const emit = defineEmits(['complete', 'delete'])
</script>

<template>
  <div class="task-card">
    <h3>{{ task.title }}</h3>
    <p>{{ task.description || 'Sin descripción.' }}</p>

    <div class="actions">
      <button 
        v-if="!readonly" 
        @click="$emit('complete', task.id)"
        class="complete-btn"
      >
        Marcar como completada
      </button>
      
    </div>

    <div v-if="readonly" class="status-completed">
  <span>✅ Completada</span>
  <button @click="$emit('delete', task.id)" class="delete-btn">Eliminar</button>
</div>

  </div>
</template>


<style scoped>
.task-card {
  max-width: 500px;
  margin: 1rem auto;
  padding: 1rem;
  background-color: #fafafa;
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

.actions button {
  margin-top: 0.5rem;
  margin-right: 0.5rem;
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn {
 margin-top: 0.5rem;
  margin-right: 0.5rem;
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #d32f2f;
}

.status-completed {
  margin-top: 0.5rem;
  font-weight: bold;
  color: #2e7d32;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
