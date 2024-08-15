import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { verifyToken } from '../utils';
import Spinner from '../icons/Spinner';
const PrivateRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const result = await verifyToken();
      setIsAuthenticated(result);
    };

    checkAuth();
  }, []);

  // Show a loading indicator while checking authentication
  if (isAuthenticated === null) {
    return (
            <div id='app'>
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
        </div>
    ); 
  }

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
