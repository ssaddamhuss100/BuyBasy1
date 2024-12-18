
import SignUp from "./Components/SignUp/SignUp";

import { UserContextProvider } from "./userContext";
//GETTING STYLES
import styles from "./App.module.css";

//ROUTERS
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import Login from "./Components/Login/Login";


function App() {



  const router = createBrowserRouter([
    {
      path: "/signup",
      element: (
      <>
        <UserContextProvider>
          <SignUp />
          <Login/>
        </UserContextProvider>
        </>
      )
    },
  ])
  return (
    <div className={styles.main}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;