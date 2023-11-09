import { DateTime } from "luxon";
import styles from "./index.module.css";
import Wrapper from "../Wrapper/Wrapper";
import { Carousel } from "antd";
import { dataGameProps } from "../../toolkitRedux/toolkitSliceGame";

function GameLayout({
    title,
    thumbnail,
    publisher,
    developer,
    release_date,
    minimumSystemRequirements,
    genre,
    screenshots,
}: dataGameProps) {
    const releaseDateTime = DateTime.fromSQL(release_date)
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
                                {releaseDateTime}
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
                    {/* alt */}
                    <img className={styles.image} src={thumbnail}></img>
                </div>

                <Carousel className={styles.carousel}>
                    {screenshots.map((item: any) => {
                        return (
                            <img
                                key={item.id}
                                className={styles.imageCarousel}
                                src={item.image}
                            ></img>
                        );
                    })}
                </Carousel>

                {minimumSystemRequirements && (
                    <ul className={styles.list}>
                        {Object.entries(minimumSystemRequirements).map(
                            (item: [string, any]) => {
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
