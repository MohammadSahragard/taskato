// Data needed
import { days } from '../data/data';

// Redux
import { updateSelectedTask } from '@/redux/features/selected-task/selectedTaskSlice';
import {
    setIsOpenedDetailsSidebar,
    setIsOpenedMobileDetailsSidebar,
} from '@/redux/features/options/optionsSlice';
import {
    setIsShownMenu,
    setItemData,
    setMenuName,
    setMenuPosition,
} from '@/redux/features/context-menu/contextMenuSlice';

// Types
import { ItemDataTypes } from '@/types/types';

//* Converting date to local date string
export const dateToLocalDateString = (date: Date | undefined) =>
    date?.toLocaleDateString()?.split('/')?.join('-') ?? '';

//* Getting day of the week (today and tomorrow)
export const getDayOfWeek = () => {
    const day = new Date().getDay();

    const today = days[day];
    const tomorrow = day > 5 ? days[0] : days[day + 1];

    return {
        today,
        tomorrow,
    };
};

//* Getting date (today, tomorrow, next week and so on)
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

//* Adding zeros before single-digit times
export const zeroBeforeSingle = (date: number) =>
    date < 10 ? `0${date}` : date;

//* Getting local date string (mm-dd-yyyy)
export const getLocalDateString = (date: Date) =>
    String(dateToLocalDateString(date));

//* Getting time for later time option of the reminder
export const laterTime = () => {
    const hour: number = new Date().getHours();
    const finalHour: number = hour > 23 || hour < 6 ? 7 : hour + 2;
    return finalHour;
};

//* Words separation (word-word => word word)
export const wordsSeparator = (content: string): string =>
    content.replace(/[^A-Za-z0-9]/g, ' ');

//* Close-pen (toggle) task details sidebar
export const toggleTaskDetailsSidebar = (dispatch: Function, data: any) => {
    dispatch(setIsOpenedDetailsSidebar(true));
    dispatch(updateSelectedTask(data));
    if (window.innerWidth < 1024) {
        dispatch(setIsOpenedMobileDetailsSidebar(true));
    }
};

//* Checking if the due date has passed or not
export const checkDueDate = (date: Date) => {
    const today = dateToLocalDateString(getDate().today);
    const taskDueDate = dateToLocalDateString(new Date(date));

    const result = taskDueDate < today;
    return result;
};

//* Converting the title to a pathname
export const convertTitleToPathname = (title: string) => {
    const titleArray = title.split(' ');
    const titlePathname = titleArray.join('-').toLowerCase();
    return titlePathname;
};
export const convertPathnameToTitle = (pathname: string) => {
    const pathnameArray = pathname.split('-');
    const pathnameTitle = pathnameArray.join(' ').toLowerCase();
    return pathnameTitle;
};

//* Setting context menu data
export const setContextMenuData = (
    event: any,
    menuName: string,
    itemData: any,
    dispatch: any
) => {
    event.preventDefault();

    // Variables
    const position = {
        x: event.pageX,
        y: event.pageY,
        innerWidth: event.view.innerWidth,
        innerHeight: event.view.innerHeight,
    };

    let data: ItemDataTypes = {
        id: itemData?.id,
    };

    // Setting data depending on the menu name
    if (menuName === 'tasks') {
        data.isCompleted = itemData?.isCompleted;
        data.isImportant = itemData?.isImportant;
        data.completionTransition = itemData?.completionTransition;
        data.importantTransition = itemData?.importantTransition;
    }
    if (menuName === 'lists') {
        data.title = itemData?.title;
        data.onOpen = itemData?.onOpen;
    }
    if (menuName === 'subtasks') {
        data.isCompleted = itemData?.isCompleted;
        data.checkHandler = itemData?.checkHandler;
    }
    if (menuName === 'notes') {
        data.title = itemData?.title;
        data.content = itemData?.content;
        data.onOpen = itemData?.onOpen;
    }

    // Dispatches
    dispatch(setMenuName(menuName));
    dispatch(setMenuPosition(position));
    dispatch(setIsShownMenu(true));
    dispatch(setItemData(data));
};
