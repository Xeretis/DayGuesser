import App from "./app";
import { LocaleProvider } from "./localization/localeContext";
import { MantineProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: "dark" }}>
            <LocaleProvider>
                <App />
            </LocaleProvider>
        </MantineProvider>
    </React.StrictMode>
);
