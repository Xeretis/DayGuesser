import { LocaleContext } from "./localeContext";
import { useContext } from "react";

export function useLanguage() {
    const localeContext = useContext(LocaleContext);
    return localeContext.currentLocale.lang;
}

export function useLocales() {
    const localeContext = useContext(LocaleContext);
    return localeContext.locales;
}

export function useSetLocale() {
    const localeContext = useContext(LocaleContext);
    return localeContext.setCurrentLocale;
}

export function useCurrentLocale() {
    const localeContext = useContext(LocaleContext);
    return localeContext.currentLocale;
}
