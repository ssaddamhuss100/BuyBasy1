// Importing styles for the Order component
import styles from './Order.module.css'

// Importing the user context to get the user's orders and authentication status
import { useUserContext } from '../../userContext';

// Importing Navigate from react-router-dom to redirect if not authenticated
import { Navigate } from 'react-router-dom';

const Order = () => {

    // Destructuring userOrder and authenticate values from the user context
    const {userOrder, authenticate} = useUserContext();

    // If the user is not authenticated, redirect to the homepage
    if (!authenticate) {
        return (
            <Navigate to='/' replace={true} />  // Redirecting to the homepage if not authenticated
        );
    }

    return (
        <div className={styles.container}>
            <h1>My Orders</h1>  {/* Heading for the order page */}

            {/* Mapping over the user's orders to display each one */}
            {userOrder.map((orders) => {
                return (
                    <div className={styles.orderDetails} key={orders.date}>  {/* Displaying order details */}
                        <h2>Order on: {orders.date}</h2>  {/* Displaying order date */}

                        {/* Creating a table to show the items in the order */}
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    {/* Table headers for each column */}
                                    <th>Title</th>  {/* Column for product title */}
                                    <th>Price</th>  {/* Column for product price */}
                                    <th>Quantity</th>  {/* Column for product quantity */}
                                    <th>Total Price</th>  {/* Column for total price of each item */}
                                </tr>
                            </thead>
                            <tbody>
                                {/* Mapping through the order items to display them in the table */}
                                {orders.order.map((item) => {
                                    return (
                                        <tr key={item.title}>
                                            <td>{item.title}</td>  {/* Displaying item title */}
                                            <td>{item.price}</td>  {/* Displaying item price */}
                                            <td>{item.count}</td>  {/* Displaying item quantity */}
                                            <td>{item.price * item.count}</td>  {/* Displaying total price for this item */}
                                        </tr>
                                    );
                                })}
                            </tbody>

                            <tfoot>
                                <tr>
                                    {/* Empty cells for spacing */}
                                    <th colSpan="2"></th>
                                    <th></th>

                                    {/* Calculating and displaying the total price of the order */}
                                    <th>Total:-</th>
                                    <th>&#x20B9; {orders.order.reduce((total, product) => total + product.price * product.count, 0)}/-</th> {/* Total price for the entire order */}
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                );
            })}
        </div>
    );
}

export default Order;
