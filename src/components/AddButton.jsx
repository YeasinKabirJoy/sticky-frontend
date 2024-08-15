import { useRef } from "react"
import Plus from "../icons/Plus"
import colors from "../assets/colors.json"
// import { db } from "../appwrite/databases"
import { useContext } from "react"
// import { NoteContext } from "../context/NotesContext"
import { BoardContext } from "../context/BoardContext"
import { useParams } from "react-router-dom"
const AddButton = () => {
  const {id} = useParams()
  // const { setNotes } = useContext(NoteContext);
  const {setNotes} = useContext(BoardContext)
  const startingPos = useRef(10)

  const addNote = async ()  => {
    const accessToken = localStorage.getItem('access_token');
    const payload = {
        position : JSON.stringify({
            x: startingPos.current,
            y: startingPos.current
        }),
        colors: JSON.stringify(colors[0]),
        board:id
    }

    startingPos.current += 10;

    try {
      const response = await fetch('http://127.0.0.1:8000/api/notes/create/',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setNotes((prevState) => [data, ...prevState]);
      
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}
   

  return (
    <div id="add-btn" onClick={addNote}>
        <Plus />
    </div>
  )
}

export default AddButton
