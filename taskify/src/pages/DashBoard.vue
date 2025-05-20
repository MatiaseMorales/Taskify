<script setup>
import AppHeader from '../components/AppHeader.vue'

import NewTask from '../components/NewTask.vue'
import TaskItem from '../components/TaskItem.vue'

const tasks = [
  { id: 1, title: 'Tarea 1' },
  { id: 2, title: 'Tarea 2' }
]
</script>

<template>
  <div>
    <AppHeader />
 
    <NewTask />
    <div v-for="task in tasks" :key="task.id">
      <TaskItem :task="task" />
    </div>
  </div>
</template>
