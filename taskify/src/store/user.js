import { defineStore } from 'pinia'
import { supabase } from '../supabase'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null
  }),
  actions: {
    async signUp(email, password) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      })
      if (error) throw error
      this.user = data.user
    },
    async signIn(email, password) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) throw error
      this.user = data.user
    },
    async signOut() {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      this.user = null
    },
    async fetchUser() {
      const { data: { user } } = await supabase.auth.getUser()
      this.user = user
    }
  },
  persist: true
})
