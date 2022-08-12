import { EnUsLang } from "./locales/en-US";

export type ITranslation = typeof EnUsLang;

export interface ILocale {
    name: string;
    lang: ITranslation;
    translateCode: string;
}
