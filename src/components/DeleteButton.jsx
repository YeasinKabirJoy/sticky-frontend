import Trash from "../icons/Trash";
// import { db } from "../appwrite/databases";
import { useContext } from 'react'
// import { NoteContext } from '../context/NotesContext'
import { BoardContext } from "../context/BoardContext"

const DeleteButton = ({ noteId }) => {
    // const {setNotes} =  useContext(NoteContext)
    const {setNotes} =  useContext(BoardContext)

    const handleDelete = async () => {
        const accessToken = localStorage.getItem('access_token');

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/notes/delete/${noteId}/`,{
              method: 'DELETE',
              headers :{
                'Authorization': `Bearer ${accessToken}`,
              }
            });
        
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setNotes((prevState) =>
            prevState.filter((note) => note.id !== noteId)
        );
    };
 
    return (
        <div onClick={handleDelete}>
            <Trash />
        </div>
    );
};

export default DeleteButton