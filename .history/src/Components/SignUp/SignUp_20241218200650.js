// Importing styles for the SignUp component
import styles from "./SignUp.module.css"

// Importing user context to handle user-related data like newUser
import { useUserContext } from "../../userContext";

// Importing NavLink and useNavigate from react-router-dom for navigation
import { NavLink, useNavigate } from "react-router-dom";

// Importing useState hook to manage form state
import { useState } from "react";

// Importing toast for displaying success and error messages
import { toast } from "react-toastify";

const SignUp = () => {
    // Destructuring the newUser function from the user context
    const { newUser } = useUserContext();
    
    // Defining state variables to store the user's input (name, email, password)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Using useNavigate for redirecting after successful signup
    const navigate = useNavigate();

    // Handler for updating the name state variable
    const handleUsernameChange = (e) => {
        setName(e.target.value);
    }

    // Handler for updating the password state variable
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    // Handler for updating the email state variable
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    // Function to handle the signup process
    const signup = () => {
        // Checking if all fields are filled
        if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
            // Displaying an error message if any field is empty
            toast.error("Please Enter Name, Username and Password");
        } else {
            // If all fields are filled, calling the newUser function to register the user
            newUser(name, email, password);
            // Redirecting to the homepage after successful signup
            navigate("/");
        }
    }

    return (
        <div className={styles.container}>
            <h2>Sign Up</h2> {/* Heading for the SignUp page */}
            
            {/* SignUp form */}
            <form className={styles.form}>
                <div className={styles.inputContainer}>
                    {/* Label and input for Name */}
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name here..."
                        id="name"
                        onChange={(e) => handleUsernameChange(e)} // Setting name onChange
                    />
                </div>
                <div className={styles.inputContainer}>
                    {/* Label and input for Email */}
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email here..."
                        id="email"
                        onChange={(e) => handleEmailChange(e)} // Setting email onChange
                    />
                </div>
                <div className={styles.inputContainer}>
                    {/* Label and input for Password */}
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password here..."
                        id="password"
                        onChange={(e) => handlePasswordChange(e)} // Setting password onChange
                    />
                </div>

                {/* Sign Up button */}
                <NavLink onClick={signup} className={styles.button}>Sign Up</NavLink>
                
                <br />
                
                {/* Link to Login page if the user already has an account */}
                <span className={styles.text}>Already User? <NavLink to='/login' className={styles.link}>Login</NavLink></span>
            </form>
        </div>
    );
}

export default SignUp;
