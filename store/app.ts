import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    user: {
      list: [] as any,
    }
  }),
  actions: {
  }
})
