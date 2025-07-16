import useUserStore from '../store/userStore'

const LogoutButton = () => {
  const handleLogout = () => {
    useUserStore.getState().logoutUser()
  }

  return (
    <button
      onClick={handleLogout}
    >
      logout
    </button>
  )
}

export default LogoutButton