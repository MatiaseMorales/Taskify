<script setup>
import AppHeader from '../components/AppHeader.vue'
import NewTask from '../components/NewTask.vue'
import TaskItem from '../components/TaskItem.vue'
import { ref, computed, onMounted, watch } from 'vue'
import { useUserStore } from '../store/user'
import AppFooter from '../components/AppFooter.vue'

import {
  fetchTasks as fetchTasksService,
  markAsCompleted as markAsCompletedService,
  updateTask as updateTaskService,
  deleteTask as deleteTaskService,
  markAsIncomplete as markAsIncompleteService,
} from '../store/task.js'

const tasks = ref([])
const activeTab = ref('pending')
const userStore = useUserStore()
const sortBy = ref('due_date')
const sortAsc = ref(true)

const fetchTasks = async () => {
  try {
    tasks.value = await fetchTasksService(userStore.user.id, sortBy.value, sortAsc.value)
  } catch (error) {
    console.error('Error al obtener tareas:', error)
  }
}

const toggleSortDirection = () => {
  sortAsc.value = !sortAsc.value
  fetchTasks()
}

const markAsCompleted = async (taskId) => {
  try {
    await markAsCompletedService(taskId)
    fetchTasks()
  } catch (error) {
    console.error('Error al marcar como completada:', error)
  }
}

const updateTask = async (updatedTask) => {
  try {
    await updateTaskService(updatedTask)
    fetchTasks()
  } catch (error) {
    console.error('Error al actualizar tarea:', error)
  }
}

const deleteTask = async (taskId) => {
  const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')
  if (!confirmDelete) return

  try {
    await deleteTaskService(taskId)
    fetchTasks()
  } catch (error) {
    console.error('Error al eliminar tarea:', error)
  }
}

const markAsIncomplete = async (taskId) => {
  try {
    await markAsIncompleteService(taskId)
    fetchTasks()
  } catch (error) {
    console.error('Error al marcar como incompleta:', error)
  }
}

const pendingTasks = computed(() => tasks.value.filter((t) => !t.completed))
const completedTasks = computed(() => tasks.value.filter((t) => t.completed))

onMounted(fetchTasks)

watch([sortBy, sortAsc], fetchTasks)

const scrollToTasksSection = () => {
  const section = document.querySelector('.tabs')
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<template>
  <div class="dashboard">
    <AppHeader @scrollToTasks="scrollToTasksSection" />
    <main>
      <NewTask @task-added="fetchTasks" />

      <div class="tabs">
        <button :class="{ active: activeTab === 'pending' }" @click="activeTab = 'pending'">
          Tareas Pendientes
        </button>
        <button :class="{ active: activeTab === 'completed' }" @click="activeTab = 'completed'">
          Tareas Completadas
        </button>
      </div>

      <section v-if="activeTab === 'pending'" class="tasks-section">
        <h2>Tareas Pendientes</h2>

        <div class="sort-selector">
          <label for="sort">Ordenar por:</label>
          <select id="sort" v-model="sortBy" @change="fetchTasks">
            <option value="due_date">Fecha límite (más cercana)</option>
            <option value="created_at">Fecha de creación (más reciente)</option>
          </select>
          <button
            @click="toggleSortDirection"
            class="sort-toggle-btn"
            :title="sortAsc ? 'Ascendente' : 'Descendente'"
          >
            <span v-html="sortAsc ? '&#x21E7;' : '&#x21E9;'"></span>
          </button>
        </div>

        <div v-if="pendingTasks.length === 0" class="no-tasks">No hay tareas pendientes.</div>
        <div v-else class="tasks-container">
          <TaskItem
            v-for="task in pendingTasks"
            :key="task.id"
            :task="task"
            @complete="markAsCompleted"
            @delete="deleteTask"
            @update="updateTask"
          />
        </div>
      </section>

      <section v-if="activeTab === 'completed'" class="tasks-section">
        <h2>Tareas Completadas</h2>

        <div class="sort-selector">
          <label for="sort">Ordenar por:</label>
          <select id="sort" v-model="sortBy" @change="fetchTasks">
            <option value="due_date">Fecha límite (más cercana)</option>
            <option value="created_at">Fecha de creación (más reciente)</option>
          </select>
          <button
            @click="toggleSortDirection"
            class="sort-toggle-btn"
            :title="sortAsc ? 'Ascendente' : 'Descendente'"
          >
            <span v-html="sortAsc ? '&#x21E7;' : '&#x21E9;'"></span>
          </button>
        </div>

        <div v-if="completedTasks.length === 0" class="no-tasks">No hay tareas completadas.</div>
        <div v-else class="tasks-container">
          <TaskItem
            v-for="task in completedTasks"
            :key="task.id"
            :task="task"
            :readonly="true"
            @delete="deleteTask"
            @incomplete="markAsIncomplete"
          />
        </div>
      </section>
    </main>
  </div>
    <AppFooter />
</template>



<style scoped>

*{
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.dashboard {
  background-color: rgb(215, 214, 211);
  padding-bottom: 1rem;
}

.tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 3rem 0 0.5rem;
}

.tabs button {
  background: #ecf0f1;
  border: 1px solid #ccc;
  border-bottom: none;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  border-radius: 6px 6px 0 0;
  font-weight: bold;
  color: #2c3e50;
  transition: background-color 0.3s;
  margin-top: 1rem;
}

.tabs button:hover {
  background-color: #dfe6e9;
}

.tabs button.active {
  background-color: white;
  border-bottom: 2px solid white;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.05);
}

.tasks-section {
  background-color: white;
  padding: 1.5rem;
  margin: 0 auto;
  max-width: 600px;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.tasks-section h2 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 1rem;
}

.no-tasks {
  text-align: center;
  color: #888;
}

.tasks-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.sort-selector {
  width: 53%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.sort-selector select {
  width: 42%;
  padding: 0rem;
  font-size: 0.8rem;
}

.sort-toggle-btn {
  font-size: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f0f0f0;
  cursor: pointer;
  transition: background-color 0.2s;
}

.sort-toggle-btn:hover {
  background-color: #e0e0e0;
}
</style>

