import * as React from "react";

import { ILocale } from "./iLocale";
import locales from "./locales";
import { useLocalStorage } from "@mantine/hooks";

export interface ILocaleContext {
    currentLocale: ILocale;
    locales: ILocale[];
    setCurrentLocale: (locale: ILocale) => void;
}

const defaultState: ILocaleContext = {
    locales: locales,
    currentLocale: locales[0],
    setCurrentLocale: () => {},
};

const LocaleContext = React.createContext<ILocaleContext>(defaultState);

const LocaleProvider = (props: any) => {
    const [currentLocale, setCurrentLocale] = useLocalStorage<ILocale>({
        key: "lang",
        defaultValue: locales.find((l) => l.translateCode === "en_US")!,
        serialize: (locale) => locale.translateCode,
        deserialize: (code) => locales.find((l) => l.translateCode === code)!,
    });

    return (
        <LocaleContext.Provider
            value={{
                currentLocale,
                locales: locales,
                setCurrentLocale: setCurrentLocale,
            }}
        >
            {props.children}
        </LocaleContext.Provider>
    );
};

export { LocaleContext, LocaleProvider };
