import Navbar from "../components/Navbar";
import HomeCard from "../components/HomeCard";
import { useEffect,useState } from "react";
import Spinner from "../icons/Spinner";

const HomePage = () => {

    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);

  useEffect(()=>{
    getBoards();
  },[])

  const getBoards = async () => {

    const accessToken = localStorage.getItem('access_token');
    try {
        const response = await fetch('http://127.0.0.1:8000/api/boards/list',{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            }
        });
        
        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setBoards(data) 
        setLoading(false)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  }

  const addBoard = async (boardName) => {
    const payload = {
        "name":boardName
    }
    const accessToken = localStorage.getItem('access_token');
    try {
        const response = await fetch('http://127.0.0.1:8000/api/boards/create/',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body:JSON.stringify(payload)
        });
        
        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setBoards((prevState) => [data, ...prevState]);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  }


  const handleDelete = async (boardId) => {

    const accessToken = localStorage.getItem('access_token');
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/boards/delete/${boardId}`,{
            method:'Delete',
            headers:{
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        setBoards((prevState) => prevState.filter((board) => board.id !== boardId))

    } catch (error) {
        console.error('Error Deleting data:', error);
    }
  }



return (
    <>
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
        <div className="home-container">
          <Navbar addBoard={addBoard}/>
          <HomeCard boards={boards} handleDelete={handleDelete} />
        </div>
      )}
    </>
  );
}

export default HomePage;


