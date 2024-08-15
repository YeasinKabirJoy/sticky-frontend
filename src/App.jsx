import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
}from 'react-router-dom'


// import NotesPage from './pages/NotesPage'
// import NotesProvider from './context/NotesContext'
import PrivateRoute from './components/PrivateRoute'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'
import BoardProvider from './context/BoardContext'
import BoardPage from './pages/BoardPage'
import HomePage from './pages/HomePage'

function App() {
 
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* <Route path='/' element={
            <NotesProvider>
              <NotesPage />
            </NotesProvider>
          } 
        /> */}
        <Route path="/" element={<PrivateRoute element={<HomePage />} />} />
        {/* <Route path='/' element={<HomePage />} /> */}

        <Route path='/board/:id' element={
            <PrivateRoute element={
              <BoardProvider>
              <BoardPage />
            </BoardProvider>
            }/>
          } 
        />
        {/* <Route path='/board/:id' element={<BoardPage />}/> */}
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegistrationPage />} />
      </>
    )
  );

  return <RouterProvider router={router} />
}

export default App
