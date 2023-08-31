import styles from "./index.module.css";

function Wrapper({ children, className }) {
    return <div className={styles.root + " " + className}>{children}</div>;
}

export default Wrapper;
