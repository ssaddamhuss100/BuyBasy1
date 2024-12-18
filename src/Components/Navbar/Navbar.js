// Importing the logo and icon images used in the Navbar
import logoImg from "./icons/logo.png"
import homeImg from './icons/home.png'
import cartImg from './icons/cart.png'
import myorderImg from './icons/myorder.png';
import logoutImg from './icons/logout.png'
import signinImg from './icons/signin.png'

// Importing the CSS styles for the Navbar
import styles from "./Navbar.module.css"

// Importing the UserContext to access authentication status and logout functionality
import { useUserContext } from '../../userContext'

// Importing NavLink from react-router-dom for navigation
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    // Destructuring the `authenticate` and `logout` methods from the UserContext to manage user session
    const { authenticate, logout } = useUserContext();

    return (
        <>
            {/* Main navigation bar */}
            <nav className={styles.nav}>
                {/* Logo link that redirects to the homepage */}
                <NavLink to="/" className={styles.logo}>
                    <img src={logoImg} alt="logo" /> {/* Logo image */}
                    <h4> Busy Buy</h4> {/* Store name */}
                </NavLink>

                {/* Buttons section: dynamically displays buttons based on user authentication status */}
                <div className={styles.buttons}>
                    {authenticate ? (
                        // If the user is authenticated, display these buttons
                        <>
                            {/* Home button */}
                            <NavLink to='/' className={styles.btn}>
                                <span>
                                    <img src={homeImg} alt="home" className={styles.img} /> {/* Home icon */}
                                </span>
                                <span className={styles.text}>Home</span> {/* Home label */}
                            </NavLink>

                            {/* My Orders button */}
                            <NavLink to='/orders' className={styles.btn}>
                                <span>
                                    <img src={myorderImg} alt="myorder" className={styles.img} /> {/* Orders icon */}
                                </span>
                                <span className={styles.text}>My Orders</span> {/* My Orders label */}
                            </NavLink>

                            {/* Cart button */}
                            <NavLink to='/cart' className={styles.btn}>
                                <span>
                                    <img src={cartImg} alt="cart" className={styles.img} /> {/* Cart icon */}
                                </span>
                                <span className={styles.text}>Cart</span> {/* Cart label */}
                            </NavLink>

                            {/* Logout button */}
                            <NavLink onClick={() => { logout() }} to='/' className={styles.btn}>
                                <span>
                                    <img src={logoutImg} alt="logout" className={styles.img} /> {/* Logout icon */}
                                </span>
                                <span className={styles.text}>logout</span> {/* Logout label */}
                            </NavLink>
                        </>
                    ) : (
                        // If the user is not authenticated, display these buttons
                        <>
                            {/* Home button (still visible for non-authenticated users) */}
                            <NavLink to='/' className={styles.btn}>
                                <span>
                                    <img src={homeImg} alt="home" className={styles.img} /> {/* Home icon */}
                                </span>
                                <span className={styles.text}>Home</span> {/* Home label */}
                            </NavLink>

                            {/* Login button (only visible for non-authenticated users) */}
                            <NavLink to='/login' className={styles.btn}>
                                <span>
                                    <img src={signinImg} alt="login" className={styles.img} /> {/* Login icon */}
                                </span>
                                <span className={styles.text}>LogIn</span> {/* Login label */}
                            </NavLink>
                        </>
                    )}
                </div>
            </nav>
        </>
    )
}

export default Navbar;
