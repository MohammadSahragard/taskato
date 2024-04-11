import { getDate } from '@/helper/functions/functions';
// public
export type children = { children: React.ReactNode };

//*------ specials (components and ...)
// ui components
export type Title = {
    title: string;
    additionalClasses?: string;
};

export type Subtitle = {
    subtitle: string;
    additionalClasses?: string;
};

export type Heading = {
    heading: string;
    additionalClasses?: string;
};

export type Icon = {
    style?: 'fas' | 'far';
    iconName: string;
    color?: string;
};

export type BackForwardRoute = {
    route: 'back' | 'forward';
};

// ui kits components
export type MenuItemTypes = {
    href: string;
    label: string;
    iconName: string;
};

export type DateTimePickerType = {
    changeDateTimePicked: Function;
    getDateTime: {
        time: {
            hour: number;
            minute: number;
        };
        date: Date;
        showContent: boolean;
    };
};
