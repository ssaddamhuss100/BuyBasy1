
import SignUp from "./Components/SignUp/SignUp";

import { UserContextProvider } from "./userContext";
//GETTING STYLES
import styles from "./App.module.css";

//ROUTERS
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'


function App() {



  const router = createBrowserRouter([
    {
      path: "/signup",
      element: (
      <>
        <UserContextProvider>
          <SignUp />
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