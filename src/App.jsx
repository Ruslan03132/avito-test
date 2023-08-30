import { Button, ConfigProvider, Space } from "antd";
import { GamesLayout } from "./GamesLayout";
import { useDispatch, useSelector } from "react-redux";

import { SelectProps, RadioChangeEvent } from "antd";
import { Radio, Select } from "antd";
import { useEffect, useCallback } from "react";
import {
  getData,
  addSort,
  setPlatform,
  setGenre,
} from "./toolkitRedux/toolkitSlice";

function App() {
  const data = useSelector((state) => state.toolkit.gamesList);
  const sortedBy = useSelector((state) => state.toolkit.sortedBy);
  const platform = useSelector((state) => state.toolkit.platform);
  const genre = useSelector((state) => state.toolkit.genre);

  let genres =
    "mmorpg, shooter, strategy, moba, racing, sports, social, sandbox, open-world, survival, pvp, pve, pixel, voxel, zombie, turn-based, first-person, third-Person, top-down, tank, space, sailing, side-scroller, superhero, permadeath, card, battle-royale, mmo, mmofps, mmotps, 3d, 2d, anime, fantasy, sci-fi, fighting, action-rpg, action, military, martial-arts, flight, low-spec, tower-defense, horror, mmorts";
  let genresArr = genres.split(",");

  const dispatch = useDispatch();

  const onChangeSort = (value) => {
    console.log(`selected ${value}`);
    dispatch(addSort(value));
  };
  const onChangePlatform = (value) => {
    console.log(`selected ${value}`);
    dispatch(setPlatform(value));
  };

  const onChangeGenre = (value) => {
    console.log(`selected ${value}`);
    dispatch(setGenre(value));
  };

  const onSearchSort = (value) => {
    console.log("search:", value);
  };
  console.log(data);

  const getAsyncGames = useCallback(() => {
    return async (dispatch) => {
      let url = "";
      if (sortedBy || platform || genre) {
        url = `https://free-to-play-games-database.p.rapidapi.com/api/games?${
            platform ? "platform=" + platform + "&" : ""
        }
        ${genre ? "category=" + genre + "&" : ""}${
          sortedBy ? "sort-by=" + sortedBy : ""
        }`;
        console.log("url",url)
      } else {
        url = "https://free-to-play-games-database.p.rapidapi.com/api/games";
      }

      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "bd3fe325d8mshf112ef355bf466dp1df81cjsnfb70b0c0201e",
          "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
      };

      try {
        const gamesData = await fetch(url, options);
        const gamesJson = await gamesData.json();
        dispatch(getData(gamesJson));
      } catch (error) {
        console.error(error);
      }
    };
  },[sortedBy, platform, genre]);

  useEffect(() => {
    dispatch(getAsyncGames());
  },[sortedBy, platform, genre]);

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#00b96b",
            borderRadius: 2,
            colorBgContainer: "#f6ffed",
          },
        }}
      ></ConfigProvider>

      <Select
        showSearch
        placeholder="Select a sort"
        optionFilterProp="children"
        onChange={onChangeSort}
        onSearch={onSearchSort}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        //,
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
        showSearch
        placeholder="Select a platform"
        optionFilterProp="children"
        onChange={onChangePlatform}
        
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        //,pc, browser or all
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
        showSearch
        placeholder="Select a person"
        optionFilterProp="children"
        onChange={onChangeGenre}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={genresArr.map((item) => {
          return {
            label: item.trim(),
            value: item.trim(),
          };
        })}
      />

      <GamesLayout data={data}></GamesLayout>
    </>
  );
}

export default App;
