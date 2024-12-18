// Importing styles for the Login component from the CSS module
import styles from "./Login.module.css"

// Importing the custom hook to use the UserContext for authentication functionality
import { useUserContext } from "../../userContext";

// Importing necessary components from 'react-router-dom' for navigation
import { NavLink, useNavigate } from "react-router-dom";

// Importing useState hook to manage local state
import { useState } from "react";

// Importing the toast function for showing success/error messages
import { toast } from 'react-toastify';

// Defining the Login functional component
const Login = () => {
    // Initializing navigate function from react-router for page navigation
    const navigate = useNavigate();

    // States for username and password input fields
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    // Handling the change in username input field
    const handleUsername = (e) => {
        setUserName(e.target.value);
    };

    // Handling the change in password input field
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    // Destructuring the authenticateUser function from UserContext to handle authentication
    const { authenticateUser } = useUserContext();

    // Function to handle the login logic
    const login = async () => {
        // Checking if username or password are empty
        if (username.trim() === "" || password.trim() === "") {
            toast.error("Please Enter Username and Password"); // Display error if fields are empty
        } else {
            // Trying to authenticate the user with the entered username and password
            const result = await authenticateUser(username, password);
            if (!result) {
                toast.error("Invalid Username/Password"); // Display error if credentials are invalid
            } else {
                toast.success("Login Successfully"); // Display success if login is successful
                navigate("/"); // Navigate to the homepage after successful login
            }
        }
    }

    return (
        <>
            <div className={styles.container}>
                <h2>Login</h2>
                <form className={styles.form}>
                    {/* Username input field */}
                    <div className={styles.inputContainer}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email here..."
                            id="email"
                            onChange={handleUsername} // Update username state on input change
                        />
                    </div>

                    {/* Password input field */}
                    <div className={styles.inputContainer}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password here..."
                            id="password"
                            onChange={handlePassword} // Update password state on input change
                        />
                    </div>

                    {/* Login button that triggers the login function on click */}
                    <NavLink onClick={login} className={styles.button}>Login</NavLink>
                    <br />

                    {/* Link to the SignUp page for new users */}
                    <span className={styles.text}>
                        New User? <NavLink to='/signup' className={styles.link}>Sign Up</NavLink>
                    </span>
                </form>
            </div>
        </>
    )
}

// Exporting the Login component to be used in other parts of the application
export default Login;
