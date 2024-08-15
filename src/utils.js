export const setNewOffset = (card,mouseMoveDir= {x:0,y:0}) => {
    const offsetLeft = card.offsetLeft - mouseMoveDir.x
    const offsetTop = card.offsetTop - mouseMoveDir.y

    return {
        x: offsetLeft<0 ? 0 : offsetLeft,
        y: offsetTop<0 ? 0 : offsetTop,
    }
}


export const autoGrow = (textAreaRef) => {
    const { current } = textAreaRef;
    current.style.height = "auto"; // Reset the height
    current.style.height = current.scrollHeight + "px"; // Set the new height
  }


  export const setZIndex = (selectedCard) => {
    selectedCard.style.zIndex = 999;
 
    Array.from(document.getElementsByClassName("card")).forEach((card) => {
        if (card !== selectedCard) {
            card.style.zIndex = selectedCard.style.zIndex - 1;
        }
    });
};

export const saveTokens = (accessToken, refreshToken) => {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  };


export const parser = (value) => {
    try{
        return JSON.parse(value);
    }catch(error){
        return value;
    }
}

export const isLoggedIn = () => {
    const accessToken = localStorage.getItem('access_token');
    return !!accessToken; // Returns true if accessToken exists
  };


export const verifyToken = async () => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
  
    // Step 1: Check if access token exists
    if (!accessToken) {
      console.log('No access token found. User is not logged in.');
      return false;
    }
  
    try {
      // Step 2: Try to verify the access token by accessing a protected endpoint
      const verifyResponse = await fetch('http://127.0.0.1:8000/api/accounts/token/verify/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: accessToken }),
      });
  
      if (verifyResponse.ok) {
        console.log('Access token is valid.');
        return true; // Token is valid
      } else if (verifyResponse.status === 401) {
        // Step 3: If the token is expired (status 401), try to use the refresh token
        console.log('Access token expired, trying to refresh...');
        const refreshResponse = await fetch('http://127.0.0.1:8000/api/accounts/token/refresh/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refresh: refreshToken }),
        });
  
        if (refreshResponse.ok) {
          const data = await refreshResponse.json();
          const newAccessToken = data.access;
  
          // Step 4: Save the new access token in localStorage
          localStorage.setItem('access_token', newAccessToken);
          console.log('Access token refreshed.');
          return true; // Token refreshed successfully
        } else {
          console.log('Failed to refresh the token. User needs to log in again.');
          return false; // Refresh token failed
        }
      } else {
        console.error('Verification failed for unknown reasons.');
        return false; // Some other error occurred
      }
    } catch (error) {
      console.error('Error verifying or refreshing token:', error);
      return false;
    }
  };


  export const logout = async () => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
  
    // Send a request to block the refresh token
    if (refreshToken) {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/accounts/logout/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ refresh_token: refreshToken }),
        });
  
        if (response.ok) {
          // Remove tokens from localStorage
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
  
          // Navigate to the login page
          window.location.href = '/login'; // Use window.location.href to navigate
        } else {
          console.error('Logout failed:', response.statusText);
        }
      } catch (error) {
        console.error('Error during logout:', error);
      }
    } else {
      console.log('No refresh token found. User might not be logged in.');
      // If no refresh token is found, still clear localStorage and navigate
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/'; // Use window.location.href to navigate
    }
  };


  
  