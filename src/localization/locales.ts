import { EnUsLang } from "./locales/en-US";
import { HuHuLang } from "./locales/hu-HU";
import { ILocale } from "./iLocale";

const locales: ILocale[] = [
    {
        name: "English",
        lang: EnUsLang,
        translateCode: "en_US",
    },
    {
        name: "Magyar",
        lang: HuHuLang,
        translateCode: "hu_HU",
    },
];

export default locales;
