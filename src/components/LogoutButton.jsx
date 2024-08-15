import Shutdown from "../icons/Shutdown"
import { logout } from "../utils"

const LogoutButton = () => {
  return (
    <div id="delete-btn" onClick={logout} >
      <Shutdown />
    </div>
  )
}

export default LogoutButton
