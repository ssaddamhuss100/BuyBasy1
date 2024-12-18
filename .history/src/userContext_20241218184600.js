//IMPORT HOOK AND CONTEXT
import { useContext, createContext } from 'react'

//IMPORT DATABASE
import { db } from "./firebaseinit"

//IMPORT FIREBASE KEYWORDS
import {addDoc,collection} from 'firebase/firestore';

//GETTING TOAST
import { toast } from 'react-toastify';

//CREATE CONTEXT
const userContext = createContext();

//USE CUSTOM HOOK
export const useUserContext = () => {
    const value = useContext(userContext);
    return value;
}

//USE CUSTOM CONTEXT
export const UserContextProvider = ({ children }) => {
    //add new user
    const newUser = (name, email, password) => {
        const user = {
            name: name,
            email: email,
            password: password,
            cart: [],
            orders: []
        }
        const useRef = collection(db, "users");
        const docRef = addDoc(useRef, user);
        setA
        toast.success("New User Created Successfully")
    }
    return (
        <userContext.Provider value={{newUser}}>
            {children}
        </userContext.Provider>
    )
}