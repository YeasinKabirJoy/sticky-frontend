import Back from "../icons/Back"
import { useNavigate } from "react-router-dom"
const BackButton = () => { 

  const navigate = useNavigate();
   
  const back = () => {
    navigate('/')
  }

  return (
    <div id="delete-btn" onClick={back}>
        <Back />
  </div>
  )
}

export default BackButton
