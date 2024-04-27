//* data needed
import { days } from '../data/data';

// date to local date string
export const dateToLocalDateString = (date: Date): string =>
    date.toLocaleDateString().split('/').join('-');

// get day of the week (today and tomorrow)
export const getDayOfWeek = () => {
    const day = new Date().getDay();

    const today = days[day];
    const tomorrow = day > 5 ? days[0] : days[day + 1];

    return {
        today,
        tomorrow,
    };
};

// get date (today, tomorrow, next week and so on)
export const getDate = () => {
    const today = new Date();

    const tomorrow = new Date(new Date());
    tomorrow.setDate(tomorrow.getDate() + 1);

    const restOfWeek = () => {
        const today = new Date().getDay() + 1;
        return 7 - today === 0 ? 7 : 7 - today === 1 ? 14 : 7 - today;
    };
    const nextWeek = new Date(new Date());
    nextWeek.setDate(nextWeek.getDate() + restOfWeek());

    return {
        today,
        tomorrow,
        nextWeek,
    };
};

// add zero before the single time
export const zeroBeforeSingle = (date: number) =>
    date < 10 ? `0${date}` : date;

// get local date string (mm-dd-yyyy)
export const getLocalDateString = (date: Date) =>
    String(dateToLocalDateString(date));

// return later time for reminder
export const laterTime = () => {
    const hour: number = new Date().getHours();
    const finalHour: number = hour > 23 || hour < 6 ? 7 : hour + 2;
    return finalHour;
};

// words separation (word-word => word word)
export const wordsSeparator = (content: string): string =>
    content.replace(/[^A-Za-z0-9]/g, ' ');

// close-open todo details panel
export const toggleTodoDetailPanel = () => {
    const body = document.querySelector('body');

    if (body?.className.includes('isOpenedDetailsBar')) {
        body?.classList.remove('isOpenedDetailsBar');
    } else {
        body?.classList.add('isOpenedDetailsBar');
    }
};
