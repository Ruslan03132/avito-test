import { Link } from "react-router-dom";
import styles from "./index.module.css";

export function GameCard({ book }) {
    const { genre, id, publisher, release_date, thumbnail, title } = book;
    return (
        <Link to={`/${id}`}>
            <div>
                <div>{title}</div>
                <div>{release_date}</div>
                <div>{publisher}</div>
                <div>{genre}</div>
                <img src={thumbnail} width={"auto"} height={"auto"}></img>
            </div>
        </Link>
    );
}
