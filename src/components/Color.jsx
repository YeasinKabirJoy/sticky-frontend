import { useContext } from "react"
// import { NoteContext } from "../context/NotesContext"
import { BoardContext } from "../context/BoardContext";
// import { db } from "../appwrite/databases";
const Color = ({ color }) => {
    // const {notes,setNotes,selectedNote} = useContext(NoteContext)
    const {notes,setNotes,selectedNote} = useContext(BoardContext)
    

    const changeColor = async () => {
        const accessToken = localStorage.getItem('access_token');
        try {
            const currentNoteIndex = notes.findIndex(
                (note) => note.id === selectedNote.id
            );
     
            const updatedNote = {
                ...notes[currentNoteIndex],
                colors: JSON.stringify(color),
            };
     
            const newNotes = [...notes];
            newNotes[currentNoteIndex] = updatedNote;
            setNotes(newNotes);

            const payload = {
                colors: JSON.stringify(color)
            }

            const response = await fetch(`http://127.0.0.1:8000/api/notes/partial_update/${selectedNote.id}/`,{
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(payload)
              });
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response}`);
            }
        } catch (error) {
            // alert("You must select a note before changing colors");
            console.log(error)
        }
    };
 
    return (
        <div
            onClick={changeColor}
            className="color"
            style={{ backgroundColor: color.colorHeader }}
        ></div>
    );
};

export default Color