import { create } from 'zustand'
import userService from '../services/user'
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
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
    } catch (exception) {
      console.log(exception)
    }
  },

  logoutUser: () => {
    get().setUser(null)
    window.localStorage.removeItem('loggedInUser')
  }
}))

export default useUserStore