import dayjs, { Dayjs } from "dayjs";

export const randomDayjsBetween = (from: string, to: string) => {
    const fromMilli = dayjs(from).valueOf();
    const max = dayjs(to).valueOf() - fromMilli;

    const dateOffset = Math.floor(Math.random() * max + 1);

    const newDate = dayjs(fromMilli + dateOffset);

    return dayjs(newDate);
};

export const checkDay = (dayjs: Dayjs, dayValue: number) => {
    return dayjs.day() === dayValue;
};
