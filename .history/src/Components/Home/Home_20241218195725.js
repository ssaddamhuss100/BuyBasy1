// Importing styles for the Home page
import styles from "./Home.module.css"

// Importing Loader component to show loading state while fetching data
import Loader from "../Loader/Loader"

// Importing the custom hook to access global state from UserContext (cart, authentication, etc.)
import { useUserContext } from "../../userContext"

// Importing React hooks
import { useState, useEffect } from "react"

// Importing NavLink for routing to login page if user is not authenticated
import { NavLink } from "react-router-dom"

// Importing toast for displaying notifications (e.g., when adding an item to cart)
import { toast } from 'react-toastify';

const Home = () => {
    // Accessing the cart state, setUserCart function, and authentication status from context
    const { userCart, setUserCart, authenticate } = useUserContext();

    // State variables for filtering and searching
    const [priceFilter, setPriceFilter] = useState(1000); // Default price filter value
    const [searchQuery, setSearchQuery] = useState("");   // Search input value
    const [products, setProducts] = useState([]);         // List of products fetched from API
    const [loading, setLoading] = useState(true);         // State for loading status
    const [selectedCategories, setSelectedCategories] = useState([]); // Selected categories for filtering

    // Function to handle price filter change
    const handlePriceFilter = (e) => {
        setPriceFilter(Number(e.target.value));  // Update price filter value
    };

    // Function to handle category filter change
    const handleCategoryFilter = (e) => {
        const category = e.target.value;
        if (selectedCategories.includes(category)) {
            // Deselect category if it's already selected
            setSelectedCategories(selectedCategories.filter((c) => c !== category));
        } else {
            // Select category if it's not already selected
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    // Function to handle search input change
    const handleSearchQuery = (e) => {
        setSearchQuery(e.target.value);  // Update the search query
    };

    // Fetching product data from the fake store API and setting it to state
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((res) => res.json())  // Parse the response as JSON
            .then((data) => {
                setProducts(data);  // Set fetched products to state
                setLoading(false);   // Set loading to false once data is fetched
            })
            .catch((error) => {
                console.log("Error fetching data:", error);
                setLoading(false);   // Set loading to false even if there’s an error
            });
    }, []);

    // Display loading screen while data is being fetched
    if (loading) {
        return (
            <Loader />  // Show loader until the data is fetched
        )
    }

    // Filtering products based on search query, price, and selected categories
    const filteredProducts = products.filter((product) => {
        const matchSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchPrice = product.price <= priceFilter;  // Check if product price is within the price filter
        const matchCategory = selectedCategories.length === 0 || selectedCategories.some((category) => product.category.toLowerCase() === category.toLowerCase());

        return matchCategory && matchSearch && matchPrice;  // Only return products that match all conditions
    })

    // Function to add a product to the cart
    const addToCart = (id) => {
        let alreadyInCart = userCart.find((product) => product.id === id);  // Check if the product is already in the cart
        let newCartProduct = products.find((product) => product.id === id);  // Get the product details from the product list

        if (alreadyInCart) {
            // If product is already in cart, increase its count
            setUserCart(
                userCart.map((item) =>
                    item.id === id ? { ...item, count: item.count + 1 } : item
                )
            )
            toast.success("Item Added to Cart");  // Show success notification
        }
        else {
            // If product is not in cart, add it with count 1
            newCartProduct.count = 1;
            setUserCart([...userCart, newCartProduct]);
            toast.success("Item Added to Cart");  // Show success notification
        }
    }

    // Function to check if a category is selected
    const isCategorySelected = (category) => {
        return selectedCategories.includes(category);  // Check if the category is in the selected categories array
    };

    return (
        <>
            <div className={styles.container}>  {/* Main container for the Home page */}
                <aside className={styles.filterContainer}>
                    <h2>Filter</h2>
                    <form>
                        <label htmlFor="price" className={styles.pricel}>
                            Price: {priceFilter}
                        </label>
                        <input
                            type="range"
                            name="price"
                            min="1"
                            max="1000"
                            step="20"
                            value={priceFilter}
                            className={styles.pricei}
                            onChange={handlePriceFilter}  // Update price filter when the range slider is changed
                        />

                        <h2>Category</h2>
                        <div className={styles.catagoryContainer}>
                            {/* Rendering category checkboxes */}
                            <div className={styles.catagory}>
                                <input
                                    type="checkbox"
                                    id="mensFashion"
                                    value="Men's Clothing"
                                    onChange={handleCategoryFilter}
                                    checked={isCategorySelected("Men's Clothing")}
                                />
                                <label htmlFor="mensFashion">Men's Clothing</label>
                            </div>
                            <div className={styles.catagory}>
                                <input
                                    type="checkbox"
                                    id="womensFashion"
                                    value="Women's Clothing"
                                    onChange={handleCategoryFilter}
                                    checked={isCategorySelected("Women's Clothing")}
                                />
                                <label htmlFor="womensFashion">Women's Clothing</label>
                            </div>
                            <div className={styles.catagory}>
                                <input
                                    type="checkbox"
                                    id="jewelery"
                                    value="jewelery"
                                    onChange={handleCategoryFilter}
                                    checked={isCategorySelected("jewelery")}
                                />
                                <label htmlFor="jewelery">Jewelery</label>
                            </div>
                            <div className={styles.catagory}>
                                <input
                                    type="checkbox"
                                    id="electronics"
                                    value="Electronics"
                                    onChange={handleCategoryFilter}
                                    checked={isCategorySelected("Electronics")}
                                />
                                <label htmlFor="electronics">Electronics</label>
                            </div>
                        </div>
                    </form>
                </aside>

                {/* Search bar to search products */}
                <form className={styles.searchContainer}>
                    <input
                        type="search"
                        placeholder="search your item here..."
                        onChange={handleSearchQuery}  // Update search query on input change
                    />
                </form>

                {/* Displaying filtered products */}
                <div className={styles.productContainerGrid}>
                    {filteredProducts.map((item) => (
                        <div className={styles.productContainer} key={item.id}>  {/* Each product container */}
                            <div className={styles.productImageContainer}>
                                <img src={item.image} alt="product" />  {/* Display product image */}
                            </div>
                            <div className={styles.productDetailContainer}>
                                <div className={styles.name}>
                                    <p>{item.title}</p>  {/* Display product title */}
                                </div>
                                <div className={styles.price}>
                                    <p>&#x20B9; {item.price}</p>  {/* Display product price */}
                                </div>

                                {/* Conditionally render Add to Cart button depending on authentication */}
                                {authenticate ? (
                                    <button className={styles.btn} onClick={() => addToCart(item.id)}>
                                        Add to Cart
                                    </button>
                                ) : (
                                    <NavLink to='/login' className={styles.btn}>Add to Cart</NavLink>  // Redirect to login page if not authenticated
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
};

export default Home;
