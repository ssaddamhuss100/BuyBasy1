// Importing necessary components and pages
import Navbar from "./Components/Navbar/Navbar"; // Navbar component for navigation bar
import Login from "./Components/Login/Login"; // Login page component
import SignUp from "./Components/SignUp/SignUp"; // SignUp page component
import Home from "./Components/Home/Home"; // Home page component

// Importing the styles for the App
import styles from "./App.module.css"; // Styling for the application

// Importing the necessary router functions from react-router-dom
import {
  createBrowserRouter, // Used to create a router
  RouterProvider // Provides routing context to the app
} from 'react-router-dom'

// Importing custom context provider to manage user data and authentication state
import { UserContextProvider } from "./userContext";

// Importing components for Cart and Order pages
import Cart from "./Components/Cart/Cart"; // Cart page component where users can view items in their cart
import Order from "./Components/Order/Order"; // Order page component to view past orders

// Importing Helmet for managing the document head (SEO optimization)
import { Helmet } from 'react-helmet'; 

function App() {
  // Creating the router with multiple routes for different pages
  const router = createBrowserRouter([
    {
      path: "/", // Home page route
      element: (
        <UserContextProvider> 
          {/* Wrapping Home page with UserContextProvider for user state management */}
          <Navbar /> 
          <Home /> 
        </UserContextProvider>
      )
    },
    {
      path: "/login", // Login page route
      element: (
        <UserContextProvider> 
          {/* Wrapping Login page with UserContextProvider for user state management */}
          <Navbar /> 
          <Login /> 
        </UserContextProvider>
      )
    },
    {
      path: "/signup", // SignUp page route
      element: (
        <UserContextProvider> 
          {/* Wrapping SignUp page with UserContextProvider for user state management */}
          <Navbar /> 
          <SignUp /> 
        </UserContextProvider>
      )
    },
    {
      path: "/cart", // Cart page route
      element: (
        <UserContextProvider> 
          {/* Wrapping Cart page with UserContextProvider for user state management */}
          <Navbar /> 
          <Cart /> 
        </UserContextProvider>
      )
    },
    {
      path: "/orders", // Orders page route
      element: (
        <UserContextProvider> 
          {/* Wrapping Order page with UserContextProvider for user state management */}
          <Navbar /> 
          <Order /> 
        </UserContextProvider>
      )
    }
  ])

  return (
    <div className={styles.main}> {/* Main container with applied CSS */}
      {/* Helmet component to modify the document head for SEO */}
      <Helmet>
        <meta charSet="utf-8" /> 
        <title>Busy Buy</title> {/* Title of the page */}
        <meta name="description" content="Busy buy is an e-commerce website where we purchase any items." /> {/* Description of the website */}
      </Helmet>
      
      {/* RouterProvider providing the routing context */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App; // Exporting the App component
