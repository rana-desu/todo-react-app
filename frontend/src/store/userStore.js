import { create } from 'zustand'
import loginService from '../services/login'
import todoService from '../services/todos'

const useUserStore = create((set, get) => ({
  user: null,

  setUser: (newUser) => {
    if (newUser) {
      todoService.setToken(newUser.token) 
    }
    set({
      user: newUser
    })
  },

  loginUser: async (credentials) => {
    try {
      const user = await loginService.login(credentials)

      get().setUser(user)
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
    } catch (exception) {
      console.log(exception)
    }
  },

  logoutUser: () => {
    get().setUser(null)
    window.localStorage.removeItem('loggeInUser')
  }
}))

export default useUserStore