import { Link } from "react-router-dom";
import styles from "./index.module.css";
import { DateTime } from "luxon";
import { IGamesListItem } from "../../toolkitRedux/toolkitSliceGamesList";

export function GameCard({
    genre,
    id,
    publisher,
    release_date,
    thumbnail,
    title,
}: IGamesListItem) {
    const releaseDateTime = DateTime.fromSQL(release_date)
        .toLocal()
        .toFormat("dd.LL.yyyy");

    return (
        <Link className={styles.root} to={`/${id}`}>
            <div className={styles.content}>
                <div className={styles.list}>
                    <div className={styles.listContainer}>
                        <div className={styles.listItemKey}>{"Название:"}</div>
                        <div className={styles.listItemValue}>{title}</div>
                    </div>
                    <div className={styles.listContainer}>
                        <div className={styles.listItemKey}>
                            {"Дата релиза:"}
                        </div>
                        <div className={styles.listItemValue}>
                            {releaseDateTime}
                        </div>
                    </div>
                    <div className={styles.listContainer}>
                        <div className={styles.listItemKey}>{"Издатель:"}</div>
                        <div className={styles.listItemValue}>{publisher}</div>
                    </div>
                    <div className={styles.listContainer}>
                        <div className={styles.listItemKey}>{"Жанр:"}</div>
                        <div className={styles.listItemValue}>{genre}</div>
                    </div>
                </div>
                <img
                    className={styles.image}
                    src={thumbnail}
                    width={"auto"}
                    height={"auto"}
                ></img>
            </div>
        </Link>
    );
}
