import { supabase } from '../supabase'

export async function fetchTasks(userId, sortBy = 'due_date', sortAsc = true) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', userId)
    .order(sortBy, { ascending: sortAsc })

  if (error) throw error
  return data
}

export async function markAsCompleted(taskId) {
  const { error } = await supabase
    .from('tasks')
    .update({ completed: true })
    .eq('id', taskId)

  if (error) throw error
}

export async function updateTask(updatedTask) {
  const { error } = await supabase
    .from('tasks')
    .update({
      title: updatedTask.title,
      description: updatedTask.description,
    })
    .eq('id', updatedTask.id)

  if (error) throw error
}

export async function deleteTask(taskId) {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', taskId)

  if (error) throw error
}

export async function markAsIncomplete(taskId) {
  const { error } = await supabase
    .from('tasks')
    .update({ completed: false })
    .eq('id', taskId)

  if (error) throw error
}
