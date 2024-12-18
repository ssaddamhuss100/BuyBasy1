// Importing styles for Cart page from Cart.module.css
import styles from './Cart.module.css'

// Importing the custom UserContext hook to access global state like cart, authentication, etc.
import { useUserContext } from '../../userContext';

// Importing NavLink and Navigate from react-router-dom to manage navigation and redirection
import { NavLink, Navigate } from 'react-router-dom';

const Cart = () => {
    // Using the custom hook to get cart data, functions for removing from cart and checking out, 
    // and authentication status from the global context
    const { userCart, removeFromCart, checkOut, authenticate } = useUserContext();

    // If the user is not authenticated, redirect them to the homepage
    if (!authenticate) {
        return (
            <Navigate to='/' replace={true} />
        )
    }

    return (
        <>
            <div className={styles.container}> {/* Container for the cart page */}
                <h1>Cart</h1> {/* Title of the cart page */}

                {/* Displaying the total price of items in the cart */}
                <aside className={styles.cartTotalPrice}>
                    <p>Total Price: &#x20B9; 
                        {/* Calculating the total price by summing the price of each item multiplied by its count */}
                        {userCart.reduce((total, product) => total + product.price * product.count, 0)} 
                        /-
                    </p>
                    {/* Navigation link to the Orders page, triggers the checkout process */}
                    <NavLink to='/orders' onClick={() => { checkOut() }} className={styles.button}>
                        Purchase
                    </NavLink>
                </aside>

                {/* Grid container for displaying products in the cart */}
                <div className={styles.productContainerGrid}>
                    {/* Mapping over the userCart array to display each item */}
                    {userCart.map((item) => (
                        <div className={styles.productContainer} key={item.id}> {/* Using unique key for each item */}
                            <div className={styles.productImageContainer}>
                                {/* Displaying product image */}
                                <img src={item.image} alt="product" />
                            </div>
                            <div className={styles.productDetailContainer}>
                                <div className={styles.name}>
                                    {/* Displaying the product title */}
                                    <p>{item.title}</p>
                                </div>
                                <div className={styles.price}>
                                    {/* Displaying the product price */}
                                    <p>&#x20B9; {item.price}</p>
                                </div>
                                {/* Button to remove the product from the cart */}
                                <button className={styles.btn} onClick={() => removeFromCart(item.id)}>
                                    Remove from Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
};

export default Cart; // Exporting the Cart component for use in other parts of the application
