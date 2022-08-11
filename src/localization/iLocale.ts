import { EnUsLang } from "./locales/en-US";

export type ITranslation = typeof EnUsLang;

export interface ILocale {
    id: string;
    name: string;
    lang: ITranslation;
    translateCode: string;
}
