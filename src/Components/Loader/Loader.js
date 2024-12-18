// Importing styles for the Loader component
import styles from "./Loader.module.css"

// Defining the Loader functional component
const Loader = () => {
    return (
        <div className={styles.container}>  {/* The container div for the loader */}
            {/* The loader span element that will be styled to show a loading animation */}
            <span className={styles.loader}></span>  
        </div>
    );
}

// Exporting the Loader component to be used in other parts of the app
export default Loader;
