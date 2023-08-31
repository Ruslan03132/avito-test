import { useSelector } from "react-redux";
import styles from "./index.module.css";

function NotWorkingServicePage() {
    const error = useSelector((state) => state.sliceGamesList.error);
    if (error) {
        return (
            <div>
                <div>Service is not working</div>
                <div>{error}</div>
            </div>
        );
    }
    return null;
}
export default NotWorkingServicePage;
