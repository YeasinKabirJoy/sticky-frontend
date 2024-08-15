import { useRef,useEffect,useState } from "react"
import DeleteButton from "./DeleteButton"
import Spinner from "../icons/Spinner"
import { setNewOffset,autoGrow,setZIndex,parser} from "../utils"
// import { db } from "../appwrite/databases"
import { useContext } from "react"
// import { NoteContext } from "../context/NotesContext"
import { BoardContext } from "../context/BoardContext"

const NoteCard = ({note}) => {
  const [saving, setSaving] = useState(false);
  const keyUpTimer = useRef(null);
  const body = parser(note.body)
  // const [position, setPositon] = useState(JSON.parse(note.position));
  const [position, setPositon] = useState(parser(note.position));
  const colors = parser(note.colors)
  let mouseStartPos = { x: 0, y: 0 };
  const cardRef = useRef(null);
  const textAreaRef = useRef(null)
  // const { setSelectedNote } = useContext(NoteContext);
  const { setSelectedNote } = useContext(BoardContext);


  useEffect(()=>{
    autoGrow(textAreaRef)
    setZIndex(cardRef.current);
  },[])


  const mouseDown = (e) => {
    if (e.target.className === "card-header"){
      mouseStartPos.x = e.clientX;
      mouseStartPos.y = e.clientY;
      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
  
      setZIndex(cardRef.current)
      setSelectedNote(note);
    }

};

const mouseMove = (e) => {
  //1 - Calculate move direction
  let mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
  };
  //2 - Update start position for next move.
  mouseStartPos.x = e.clientX;
  mouseStartPos.y = e.clientY;

  //3 - Update card top and left position.

const position = setNewOffset(cardRef.current,mouseMoveDir)
setPositon(position);
};

const mouseUp = () => {
  document.removeEventListener("mousemove", mouseMove);
  document.removeEventListener("mouseup", mouseUp);

  const newPosition = setNewOffset(cardRef.current); //{x,y}
  saveData("position",newPosition)
}
const saveData = async (key,value) => {
  
  const accessToken = localStorage.getItem('access_token');
  const payload =  {[key] : JSON.stringify(value)}

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/notes/partial_update/${note.id}/`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    setSaving(false)
    
} catch (error) {
    console.error('Error fetching data:', error);
}

}

const handleKeyUp = async () => {
  setSaving(true);

  //2 - If we have a timer id, clear it so we can add another two seconds
  if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current);
  }

  //3 - Set timer to trigger save in 2 seconds
  keyUpTimer.current = setTimeout(() => {
      saveData("body", textAreaRef.current.value);
  }, 2000);
};

  return (
    <div className="card" 
        ref={cardRef}
        style={{
          backgroundColor:colors.colorBody,
          left:`${position.x}px`,
          top: `${position.y}px`
      }}
      >
     <div className="card-header"  onMouseDown={mouseDown} style={{backgroundColor:colors.colorHeader}}>
      <DeleteButton noteId={note.id}/>
      {saving && (
        <div className="card-saving">
            <Spinner color={colors.colorText} />
            <span style={{ color: colors.colorText }}>Saving...</span>
        </div>
    )}
     </div>
     <div className="card-body">
          <textarea ref={textAreaRef} onKeyUp={handleKeyUp} onFocus={()=> {setZIndex(cardRef.current);setSelectedNote(note);}} style={{color:colors.colorText}} defaultValue={body} onInput={()=> autoGrow(textAreaRef)}>
              
          </textarea>
      </div>
    </div>
  )
}

export default NoteCard
