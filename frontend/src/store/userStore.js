import { create } from 'zustand'
import loginService from '../services/login'

const useUserStore = create((set, get) => ({
  user: null,

  setUser: (newUser) => {
    set({
      user: newUser
    })
  },

  loginUser: async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      console.log(user)
      get().setUser(user)

      console.log('user in state', get().user)
    } catch (exception) {
      console.log(exception)
    }
  },
}))

export default useUserStore