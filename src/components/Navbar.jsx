import { useState } from "react";
import { logout } from "../utils";
import { jwtDecode } from 'jwt-decode';

const Navbar = ({addBoard}) => {
const [boardName,setBoardName] = useState('')
  const accessToken = localStorage.getItem('access_token');
  const decoded = jwtDecode(accessToken);
  return (
    <nav className="navbar">
  <div className="user-info">
    Hello, {decoded.username}
  </div>
  <div className="search-container">
    <input type="text" placeholder="Add Board" className="search-input" onChange={(e)=>{setBoardName(e.target.value)}}/>
    <button className="search-btn" onClick={()=>{addBoard(boardName)}}>Add</button>
  </div>
  <button onClick={logout} className="logout-btn">Logout</button>
</nav>
  )
}

export default Navbar



// const logout = async () => {
//   const accessToken = localStorage.getItem('access_token');
//   const refreshToken = localStorage.getItem('refresh_token');

//   // Send a request to block the refresh token
//   if (refreshToken) {
//     try {
//       const response = await fetch('http://127.0.0.1:8000/api/accounts/logout/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${accessToken}`,
          
//         },
//         body: JSON.stringify({ refresh_token: refreshToken }),
//       });

//       if (response.ok) {
//         // Remove tokens from localStorage
//         localStorage.removeItem('access_token');
//         localStorage.removeItem('refresh_token');

//         // Navigate to the home page
//         navigate('/login');
//       } else {
//         console.error('Logout failed:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error during logout:', error);
//     }
//   } else {
//     console.log('No refresh token found. User might not be logged in.');
//     // If no refresh token is found, still clear localStorage and navigate
//     localStorage.removeItem('access_token');
//     localStorage.removeItem('refresh_token');
//     navigate('/');
//   }
// };