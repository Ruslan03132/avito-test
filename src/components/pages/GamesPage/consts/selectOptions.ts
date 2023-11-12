import { Platform, Sort } from "../../../../toolkitRedux/toolkitSliceGamesList";

export const PLATFORM_OPTIONS = [
    {
        value: Platform.PC,
        label: "ПК",
    },
    {
        value: Platform.BROWSER,
        label: "Онлайн игры",
    },
    {
        value: Platform.ALL,
        label: "Все",
    },
];

export const SORT_OPTIONS = [
    {
        value: Sort.RELEASE_DATE,
        label: "По дате релиза",
    },
    {
        value: Sort.POPULARITY,
        label: "По популярности",
    },
    {
        value: Sort.ALPHABETICAL,
        label: "По алфавиту",
    },
    {
        value: Sort.RELEVANCE,
        label: "По актуальности",
    },
];
