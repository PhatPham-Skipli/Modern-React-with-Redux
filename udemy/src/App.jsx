import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify'
import { UserProvider } from './context/UserContext'

const clientId = import.meta.env.VITE_CLIENT_ID;

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <UserProvider>
          <RouterProvider router={router} />
          <ToastContainer />
        </UserProvider>
      </GoogleOAuthProvider>
    </>
  )
}

export default App