import styles from "./index.module.css";

function NotWorkingServicePage({ error }: any ) {
    if (error) {
        return (
            <div>
                <div>Service is not working</div>
                <div>{error}</div>
                <div>please reload the page</div>
            </div>
        );
    }
    return null;
}
export default NotWorkingServicePage;
