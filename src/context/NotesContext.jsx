import { createContext } from "react";
import { useState, useEffect } from "react";
import Spinner from "../icons/Spinner";
// import { db } from "../appwrite/databases";
 
export const NoteContext = createContext();
 
const NotesProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);

     useEffect(() => {
        init();
    }, []);

    const init = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/notes/list/');
            
            // Check if the response is OK
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setNotes(data);
            setLoading(false)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

   
 
    // const init = async () => {
    //     const response = await db.notes.list();
    //     setNotes(response.documents);
    //     setLoading(false);
    // };
 
    const contextData = { notes, setNotes, selectedNote, setSelectedNote };
 
    return (
        <div id="app">
            <NoteContext.Provider value={contextData}>
            {loading ? (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100vh",
                    }}
                >
                    <Spinner size="100" />
                </div>
            ) : (
                children
            )}
        </NoteContext.Provider>
        </div>
    );
};
export default NotesProvider;