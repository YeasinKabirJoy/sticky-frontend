// import { useEffect } from 'react';
// import { useParams} from 'react-router-dom';
import { useContext } from 'react'
import { BoardContext } from '../context/BoardContext';
import NoteCard from '../components/NoteCard';
import Controls from '../components/Controls'

const BoardPage = () => {
    const {notes} = useContext(BoardContext)
    return (
      <div>
      {notes.map((note) => (
          <NoteCard note={note} key={note.id} />
      ))}
      <Controls />
      </div>
    )

}

export default BoardPage



// useEffect(() => {
//     getBoardContent();
// }, []);

// const { id } = useParams()

// const getBoardContent = async () => {

// try {
//     const response = await fetch(`http://127.0.0.1:8000/api/boards/detail/${id}/`,{
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//     }else{
//         console.log(response.json())
//     }
    

    
// } catch (error) {
//     console.error('Error fetching data:', error);
// }
// }

// return (
// <div id="app">
//     <Controls />
// </div>
// )