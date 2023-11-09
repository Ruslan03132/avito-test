
import styles from "./index.module.css";

function Wrapper({ children, className } : any) {
    return <div className={styles.root + " " + className}>{children}</div>;
}

export default Wrapper;
