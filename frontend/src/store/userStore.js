import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import userService from '../services/user'
import todoService from '../services/todos'

const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,

      setUser: (newUser) => {
        if (newUser) { todoService.setToken(newUser.token) }
        
        set({ user: newUser })
      },

      signupUser: async (details) => {
        try {
          await userService.signup(details)
        } catch (exception) {
          console.log(exception)
        }
      },

      loginUser: async (credentials) => {
        try {
          const user = await userService.login(credentials)
          get().setUser(user)
        } catch (exception) {
          console.log(exception)
        }
      },

      logoutUser: () => {
        get().setUser(null)
      },
    }),
    {
      name: 'user-storage',
      getStorage: () => localStorage,
      partialize: (state) => ({ user: state.user })
    }
  )
)

export default useUserStore