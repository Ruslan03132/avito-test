import styles from "./index.module.css";
import { GamesLayout } from "../../GamesLayout/GamesLayout";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../toolkitRedux/hooks";
import { AppDispatch } from "../../../toolkitRedux";
import { GENRES } from "../../../consts/genres";
import { Select, Spin } from "antd";
import React, { useEffect, useCallback, useLayoutEffect, FC } from "react";
import { fetchWithTimeout } from "../../../libs/fetchWithTimeout";
import {
    Sort,
    Platform,
    gamesState,
} from "../../../toolkitRedux/toolkitSliceGamesList";
import { Genre } from "../../../types/genre";
import {
    setData,
    addSort,
    setPlatform,
    setGenre,
    setLoad,
    setError,
} from "../../../toolkitRedux/toolkitSliceGamesList";
import NotWorkingServicePage from "../NotWorkingServicePage/NotWorkingServicePage";
import { PLATFORM_OPTIONS, SORT_OPTIONS } from "./consts/selectOptions";
import { string } from "yargs";

const GamesPage: FC = () => {
    const data = useAppSelector((state) => state.sliceGamesList.gamesList);
    const sortedBy = useAppSelector((state) => state.sliceGamesList.sortedBy);
    const platform = useAppSelector((state) => state.sliceGamesList.platform);
    const genre = useAppSelector((state) => state.sliceGamesList.genre);
    const isload = useAppSelector((state) => state.sliceGamesList.isload);
    const error = useAppSelector((state) => state.sliceGamesList.error);

    let countRequests = 0;
    const maxRequests = 3;

    const dispatch = useAppDispatch();

    const onChangeSort = (value: gamesState["sortedBy"]) => {
        dispatch(addSort(value));
    };
    const onChangePlatform = (value: gamesState["platform"]) => {
        dispatch(setPlatform(value));
    };

    const onChangeGenre = (value: gamesState["genre"]) => {
        dispatch(setGenre(value));
    };

    const getAsyncGames = useCallback(() => {
        return async (dispatch: AppDispatch) => {
            const params: [string, string | null][] = [
                ["platform", platform],
                ["category", genre],
                ["sort-by", sortedBy],
            ];
            const filteredParams: string[][] = [];
            params.forEach((value) => {
                if (value[1] !== null) {
                    filteredParams.push([value[0], value[1]]);
                }
            });

            const requestParams = new URLSearchParams(
                filteredParams
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
            console.log(url);
            dispatch(setLoad(true));
            dispatch(setError(""));
            while (countRequests < maxRequests) {
                try {
                    const response = await fetchWithTimeout(url, options);
                    const jsonData = await response.json();
                    dispatch(setData(jsonData));
                    countRequests = 0;
                    dispatch(setError(""));
                    break;
                } catch (error) {
                    if (error instanceof Error) {
                        if (error.name === "AbortError") {
                            dispatch(setError("AbortError"));
                        }
                        dispatch(setError(error.message));
                        countRequests++;
                    }
                } finally {
                    dispatch(setLoad(false));
                }
            }
        };
    }, [sortedBy, platform, genre]);

    useLayoutEffect(() => {
        dispatch(getAsyncGames());
    }, [sortedBy, platform, genre]);

    if (error) {
        return <NotWorkingServicePage error={error}></NotWorkingServicePage>;
    }

    if (data === null || data.length === 0 || isload) {
        return (
            <Spin tip="Loading" className={styles.spin} size="large" spinning />
        );
    }

    if (data && !isload) {
        return (
            <div className={styles.root}>
                <div className={styles.selectGroup}>
                    <Select
                        className={styles.select}
                        showSearch
                        placeholder="Select a sort"
                        optionFilterProp="children"
                        onChange={onChangeSort}
                        filterOption={(input, option) =>
                            (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                        value={sortedBy}
                        options={SORT_OPTIONS}
                    />

                    <Select
                        className={styles.select}
                        showSearch
                        placeholder="Select a platform"
                        optionFilterProp="children"
                        onChange={onChangePlatform}
                        filterOption={(input, option) =>
                            (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                        value={platform}
                        options={PLATFORM_OPTIONS}
                    />

                    <Select
                        className={styles.select}
                        showSearch
                        placeholder="Select a person"
                        optionFilterProp="children"
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
        );
    }
};

export default GamesPage;
