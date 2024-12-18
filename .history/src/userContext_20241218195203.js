// IMPORT HOOK AND CONTEXT
import {
    useState, // React's useState hook to manage state
    useContext, // React's useContext hook to consume context
    createContext // React's createContext function to create context
} from 'react'

// IMPORT DATABASE
import { db } from "./firebaseinit" // Import the Firebase initialization file which holds the DB configuration

// IMPORT FIREBASE KEYWORDS
import {
    addDoc, // Firebase function to add new documents
    collection, // Firebase function to get a collection reference
    getDocs, // Firebase function to get documents from a collection
    updateDoc, // Firebase function to update an existing document
    doc // Firebase function to get a reference to a document
} from 'firebase/firestore';

// GETTING TOAST
import { toast } from 'react-toastify'; // For showing notifications like success, error, etc.


// CREATE CONTEXT
const userContext = createContext(); // Create a context to manage and share user data across components

// USE CUSTOM HOOK
export const useUserContext = () => {
    const value = useContext(userContext); // Use the context to access the value
    return value; // Return the value from context
}

// USE CUSTOM CONTEXT
export const UserContextProvider = ({ children }) => {

    // Authentication state to track whether the user is logged in or not
    const [authenticate, setAuthenticate] = useState(false);

    // State to store user cart data
    const [userCart, setUserCart] = useState([]);

    // State to store user orders data
    const [userOrder, setUserOrder] = useState([]);

    // State to store user ID
    const [userId, setUserId] = useState("");

    // Get current date, month, and year to track orders
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const date = currentDate.getDate();

    // Function to check if user credentials are valid
    const authenticateUser = async (email, password) => {
        let isFound = false;
        const users = collection(db, "users"); // Get the users collection from Firebase
        const querySnapshot = await getDocs(users); // Fetch all users from Firebase

        querySnapshot.forEach((doc) => {
            // Check if the email and password match the Firebase records
            if (doc.data().email === email && doc.data().password === password) {
                console.log(doc.id); // Log the user ID
                setUserId(doc.id); // Store the user ID
                setUserOrder(doc.data().orders); // Store the user's orders
                setUserCart(doc.data().cart); // Store the user's cart
                isFound = true;
                setAuthenticate(true); // Set authentication status to true
                console.log("auth", isFound); // Log authentication status
            }
        })

        // Return true if user is found and authenticated, otherwise false
        if (isFound) {
            return true;
        } else {
            return false;
        }
    }

    // Function to add a new user to the database
    const newUser = (name, email, password) => {
        const user = {
            name: name,
            email: email,
            password: password,
            cart: [], // Initialize cart as empty
            orders: [] // Initialize orders as empty
        }
        const useRef = collection(db, "users"); // Reference to the users collection in Firebase
        const docRef = addDoc(useRef, user); // Add the new user to the collection
        setAuthenticate(true); // Set authentication status to true
        toast.success("New User Created Successfully") // Show success toast notification
    }

    // Function to log out the user
    const logout = async () => {
        console.log(userId); // Log the user ID
        const useRef = doc(db, "users", userId); // Get reference to the current user's document
        await updateDoc(useRef, {
            orders: userOrder, // Update the user's orders in Firebase
            cart: userCart // Update the user's cart in Firebase
        });
        setAuthenticate(false); // Set authentication status to false (user logged out)
        toast.success("Log out Successfully"); // Show success toast notification
    }

    // Function to set or update the user's cart
    const setCartUser = (cart) => {
        setUserCart(cart); // Set the cart data for the user
    }

    // Function to handle checkout process
    const checkOut = () => {
        let orderDate = date.toString() + '-' + month.toString() + '-' + year.toString(); // Format the current date
        let newOrder = { date: orderDate, order: userCart }; // Create a new order with date and cart items
        setUserOrder([newOrder, ...userOrder]) // Add the new order to the user's orders
        setUserCart([]); // Clear the user's cart after checkout
        toast.success("Items Purchased Successfully"); // Show success toast notification
    };

    // Function to remove an item from the user's cart
    const removeFromCart = (id) => {
        let updatedCart = userCart.filter((product) => product.id !== id); // Filter out the product by id
        setUserCart(updatedCart); // Update the cart with the new list
        toast.error("Item deleted Successfully") // Show error toast notification (even though item is deleted successfully, the toast is set to error)
    }

    return (
        // Provide the context value to all child components
        <userContext.Provider value={{
            authenticate, // Authentication status
            authenticateUser, // Function to authenticate the user
            newUser, // Function to add a new user
            logout, // Function to log out the user
            setCartUser, // Function to set the user's cart
            removeFromCart, // Function to remove an item from the cart
            checkOut, // Function to handle checkout
            userCart, // User's cart
            setUserCart, // Function to set/update the user's cart
            userOrder // User's orders
        }}>
         {/* Render child components */}
            {children} 
        </userContext.Provider>
    )
}
