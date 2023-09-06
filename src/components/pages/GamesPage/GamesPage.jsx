import styles from "./index.module.css";
import { GamesLayout } from "../../GamesLayout/GamesLayout";
import { useDispatch, useSelector } from "react-redux";
import { GENRES } from "../../../consts/genres";
import { Select, Spin } from "antd";
import { useEffect, useCallback } from "react";
import { fetchWithTimeout } from "../../../libs/fetchWithTimeout";
import {
    getData,
    addSort,
    setPlatform,
    setGenre,
    setLoad,
    setError,
} from "../../../toolkitRedux/toolkitSliceGamesList";
import NotWorkingServicePage from "../NotWorkingServicePage/NotWorkingServicePage";

function GamesPage() {
    const data = useSelector((state) => state.sliceGamesList.gamesList);
    const sortedBy = useSelector((state) => state.sliceGamesList.sortedBy);
    const platform = useSelector((state) => state.sliceGamesList.platform);
    const genre = useSelector((state) => state.sliceGamesList.genre);
    const isload = useSelector((state) => state.sliceGamesList.isload);
    const error = useSelector((state) => state.sliceGamesList.error);

    const dispatch = useDispatch();

    const onChangeSort = (value) => {
        dispatch(addSort(value));
    };
    const onChangePlatform = (value) => {
        dispatch(setPlatform(value));
    };

    const onChangeGenre = (value) => {
        dispatch(setGenre(value));
    };

    const getAsyncGames = useCallback(() => {
        return async (dispatch) => {
            const params = new URLSearchParams(
                [
                    ["platform", platform],
                    ["category", genre],
                    ["sort-by", sortedBy],
                ].filter((item) => item[1] !== null)
            ).toString();

            const options = {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key":
                        "bd3fe325d8mshf112ef355bf466dp1df81cjsnfb70b0c0201e",
                    "X-RapidAPI-Host":
                        "free-to-play-games-database.p.rapidapi.com",
                },
            };
            const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?${params}`;

            dispatch(setLoad(true));
            dispatch(setError(""));

            try {
                const response = await fetchWithTimeout(url, options);
                const jsonData = await response.json();
                dispatch(getData(jsonData));
            } catch (error) {
                if (error.name === "AbortError") {
                    dispatch(setError("AbortError"));
                }
                dispatch(setError(error.message));
            } finally {
                dispatch(setLoad(false));
            }
        };
    }, [sortedBy, platform, genre]);

    useEffect(() => {
        dispatch(getAsyncGames());
    }, [sortedBy, platform, genre]);

    if (error) {
        return <NotWorkingServicePage></NotWorkingServicePage>;
    }

    return (
        <Spin
            tip='Loading'
            className={styles.spin}
            size='large'
            spinning={isload || data.length === 0}
        >
            <div className={styles.root}>
                <div className={styles.selectGroup}>
                    <Select
                        className={styles.select}
                        showSearch
                        placeholder='Select a sort'
                        optionFilterProp='children'
                        onChange={onChangeSort}
                        filterOption={(input, option) =>
                            (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                        value={sortedBy}
                        options={[
                            {
                                value: "release-date",
                                label: "По дате релиза",
                            },
                            {
                                value: "popularity",
                                label: "По популярности",
                            },
                            {
                                value: "alphabetical",
                                label: "По алфавиту",
                            },
                            {
                                value: "relevance",
                                label: "По актуальности",
                            },
                        ]}
                    />

                    <Select
                        className={styles.select}
                        showSearch
                        placeholder='Select a platform'
                        optionFilterProp='children'
                        onChange={onChangePlatform}
                        filterOption={(input, option) =>
                            (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                        value={platform}
                        options={[
                            {
                                value: "pc",
                                label: "ПК",
                            },
                            {
                                value: "browser",
                                label: "Онлайн игры",
                            },
                            {
                                value: "all",
                                label: "Все",
                            },
                        ]}
                    />

                    <Select
                        className={styles.select}
                        showSearch
                        placeholder='Select a person'
                        optionFilterProp='children'
                        onChange={onChangeGenre}
                        filterOption={(input, option) =>
                            (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                        value={genre}
                        options={GENRES.map((item) => {
                            return {
                                label: item,
                                value: item,
                            };
                        })}
                    />
                </div>

                <GamesLayout data={data}></GamesLayout>
            </div>
        </Spin>
    );
}

export default GamesPage;
