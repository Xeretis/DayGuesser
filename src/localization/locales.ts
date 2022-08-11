import { EnUsLang } from "./locales/en-US";
import { HuHuLang } from "./locales/hu-HU";
import { ILocale } from "./iLocale";

const locales: ILocale[] = [
    {
        id: "en-US",
        name: "English",
        lang: EnUsLang,
        translateCode: "en_US",
    },
    {
        id: "hu-HU",
        name: "Magyar",
        lang: HuHuLang,
        translateCode: "hu_HU",
    },
];

export default locales;
