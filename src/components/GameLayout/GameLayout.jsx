import { DateTime } from "luxon";
import styles from "./index.module.css";
import Wrapper from "../Wrapper/Wrapper";
import { Carousel } from "antd";

function GameLayout({ dataGame }) {
    const {
        title,
        thumbnail,
        publisher,
        developer,
        release_date,
        minimum_system_requirements,
        genre,
        screenshots,
    } = dataGame;

    const release_date_time = DateTime.fromSQL(release_date)
        .toLocal()
        .toFormat("dd.LL.yyyy");

    return (
        <div className={styles.root}>
            <Wrapper className={styles.wrapper}>
                <h1 className={styles.title}>{title}</h1>
                <div className={styles.content}>
                    <div className={styles.mainList}>
                        <div className={styles.listContainer}>
                            <div className={styles.listItemKey}>
                                {"Дата релиза:"}
                            </div>
                            <div className={styles.listItemValue}>
                                {release_date_time}
                            </div>
                        </div>
                        <div className={styles.listContainer}>
                            <div className={styles.listItemKey}>
                                {"Издатель:"}
                            </div>
                            <div className={styles.listItemValue}>
                                {publisher}
                            </div>
                        </div>
                        <div className={styles.listContainer}>
                            <div className={styles.listItemKey}>
                                {"Разработчик:"}
                            </div>
                            <div className={styles.listItemValue}>
                                {developer}
                            </div>
                        </div>
                        <div className={styles.listContainer}>
                            <div className={styles.listItemKey}>{"Жанр:"}</div>
                            <div className={styles.listItemValue}>{genre}</div>
                        </div>
                    </div>
                    <img className={styles.image} src={thumbnail}></img>
                </div>

                <Carousel className={styles.carousel}>
                    {screenshots.map((item) => {
                        return (
                            <img
                                key={item.id}
                                className={styles.imageCarousel}
                                src={item.image}
                            ></img>
                        );
                    })}
                </Carousel>

                {minimum_system_requirements && (
                    <ul className={styles.list}>
                        {Object.entries(minimum_system_requirements).map(
                            (item) => {
                                return (
                                    <li
                                        className={styles.listItem}
                                        key={item[0]}
                                    >
                                        <div className={styles.listContainer}>
                                            <div className={styles.listItemKey}>
                                                {item[0]}
                                            </div>
                                            <div
                                                className={styles.listItemValue}
                                            >
                                                {item[1]}
                                            </div>
                                        </div>
                                    </li>
                                );
                            }
                        )}
                    </ul>
                )}
            </Wrapper>
        </div>
    );
}

export default GameLayout;
