<script setup>
import AppHeader from '../components/AppHeader.vue'
import NewTask from '../components/NewTask.vue'
import TaskItem from '../components/TaskItem.vue'
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../supabase'
import { useUserStore } from '../store/user'

const tasks = ref([])
const userStore = useUserStore()

const fetchTasks = async () => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', userStore.user.id)
    .order('created_at', { ascending: false })

  if (!error) tasks.value = data
}

const markAsCompleted = async (taskId) => {
  const { error } = await supabase
    .from('tasks')
    .update({ completed: true })
    .eq('id', taskId)

  if (!error) fetchTasks()
}

const deleteTask = async (taskId) => {
  const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')
  if (!confirmDelete) return

  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', taskId)

  if (!error) fetchTasks()
}

const markAsIncomplete = async (taskId) => {
  const { error } = await supabase
    .from('tasks')
    .update({ completed: false })
    .eq('id', taskId)

  if (!error) fetchTasks()
}


const pendingTasks = computed(() => tasks.value.filter(t => !t.completed))
const completedTasks = computed(() => tasks.value.filter(t => t.completed))

onMounted(fetchTasks)
</script>

<template>
  <div class="dashboard">
    <AppHeader />
    <main>
      <NewTask @task-added="fetchTasks" />

      <section class="tasks-section">
        <h2>Tareas Pendientes</h2>
        <div v-if="pendingTasks.length === 0" class="no-tasks">No hay tareas pendientes.</div>
        <div v-else class="tasks-container">
          <TaskItem
            v-for="task in pendingTasks"
            :key="task.id"
            :task="task"
            @complete="markAsCompleted"
            @delete="deleteTask"
           

          />
        </div>
      </section>

      <section class="tasks-section">
        <h2>Tareas Completadas</h2>
        <div v-if="completedTasks.length === 0" class="no-tasks">No hay tareas completadas.</div>
        <div v-else>
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
</template>


<style scoped>


.dashboard{
  background-color: rgb(215, 214, 211);
}

.tasks-section {
  margin: 2rem 0;
}

.tasks-section h2 {
  text-align: center;
}


.no-tasks {
  text-align: center;
  color: #888;
}
</style>
