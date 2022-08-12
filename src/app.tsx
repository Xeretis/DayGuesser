import {
    Anchor,
    Box,
    Button,
    Center,
    Group,
    NumberInput,
    Stack,
    Tabs,
    Text,
    createStyles,
} from "@mantine/core";
import { checkDay, randomDayjsBetween } from "./utils/dateUtils";
import {
    useCurrentLocale,
    useLanguage,
    useLocales,
    useSetLocale,
} from "./localization/localeHooks";

import { Dayjs } from "dayjs";
import { useLocalStorage } from "@mantine/hooks";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
    container: {
        height: "100vh",
    },
    title: {
        fontSize: 64,
        [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
            fontSize: 34,
        },
        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            fontSize: 24,
        },
    },
    date: {
        fontSize: 56,
        [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
            fontSize: 28,
        },
        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            fontSize: 20,
        },
    },
    buttons: {
        padding: theme.spacing.xl,
    },
    languages: {
        position: "fixed",
        width: "100%",
        top: theme.spacing.sm,
    },
    range: {
        position: "fixed",
        width: "100%",
        bottom: theme.spacing.sm,
    },
    rangeContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: theme.spacing.sm,
    },
    rangeInput: {
        width: 100,
    },
}));

const App = () => {
    const { classes } = useStyles();
    const {
        title,
        dateFormat,
        days,
        correct,
        incorrect,
        reset,
        previous,
        start,
        end,
    } = useLanguage();
    const locales = useLocales();
    const currentLocale = useCurrentLocale();
    const setLocale = useSetLocale();

    const [range, setRange] = useLocalStorage<[number, number]>({
        key: "range",
        defaultValue: [1000, 3000],
    });
    const [date, setDate] = useState(randomDayjsBetween(range[0] + "-01-01", range[1] + "-12-31"));
    const [previousDate, setPreviousDate] = useState<Dayjs | undefined>(undefined);
    const [correctCount, setCorrectCount] = useLocalStorage({ key: "correct", defaultValue: 0 });
    const [incorrectCount, setIncorrectCount] = useLocalStorage({
        key: "incorect",
        defaultValue: 0,
    });

    const resetStats = () => {
        setPreviousDate(undefined);
        setCorrectCount(0);
        setIncorrectCount(0);
    };

    const handleAnswer = (dayValue: number) => {
        setPreviousDate(date);
        setDate(randomDayjsBetween(range[0] + "-01-01", range[1] + "-12-31"));

        if (checkDay(date, dayValue)) {
            setCorrectCount(correctCount + 1);
            return;
        }

        setIncorrectCount(incorrectCount + 1);
    };

    return (
        <>
            <Center className={classes.languages}>
                <Tabs
                    defaultValue={currentLocale.translateCode}
                    variant="pills"
                    onTabChange={(value) =>
                        setLocale(locales.find((l) => l.translateCode === value)!)
                    }
                >
                    <Tabs.List>
                        {locales.map((locale) => (
                            <Tabs.Tab key={locale.translateCode} value={locale.translateCode}>
                                {locale.name}
                            </Tabs.Tab>
                        ))}
                    </Tabs.List>
                </Tabs>
            </Center>
            <Center className={classes.container}>
                <Stack align="center" spacing="sm">
                    <Text
                        className={classes.title}
                        weight="bold"
                        variant="gradient"
                        gradient={{ from: "indigo", to: "cyan", deg: 45 }}
                        align="center"
                    >
                        {title}
                    </Text>
                    <Text className={classes.date}>{date.format(dateFormat)}</Text>
                    <Text color="gray.6">
                        {previous +
                            ": " +
                            (previousDate
                                ? previousDate.format(dateFormat) +
                                  ", " +
                                  days.find((day) => day.value === previousDate.day())!.text
                                : "-")}
                    </Text>
                    <Text>
                        {correct}:{" "}
                        <Text inherit component="span" color="green">
                            {correctCount}
                        </Text>
                        , {incorrect}:{" "}
                        <Text inherit component="span" color="red">
                            {incorrectCount}
                        </Text>
                        {" - "}
                        <Anchor inherit component="button" onClick={() => resetStats()}>
                            {reset}
                        </Anchor>
                    </Text>
                    <Group position="center" className={classes.buttons} spacing="sm">
                        {days.map((day) => (
                            <Button
                                key={day.value}
                                onClick={() => handleAnswer(day.value)}
                                variant="default"
                                gradient={{ from: "indigo", to: "cyan", deg: 45 }}
                            >
                                {day.text}
                            </Button>
                        ))}
                    </Group>
                </Stack>
            </Center>
            <Center className={classes.range}>
                <Box className={classes.rangeContainer}>
                    <NumberInput
                        value={range[0]}
                        onChange={(val) => setRange([val || range[0], range[1]])}
                        label={start}
                        min={1000}
                        max={range[1]}
                        className={classes.rangeInput}
                    />
                    <NumberInput
                        value={range[1]}
                        onChange={(val) => setRange([range[0], val || range[1]])}
                        label={end}
                        min={range[0]}
                        max={9999}
                        className={classes.rangeInput}
                    />
                </Box>
            </Center>
        </>
    );
};

export default App;
