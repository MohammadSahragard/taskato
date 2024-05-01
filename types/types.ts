// public
export type children = { children: React.ReactNode };

//*------ specials (components and ...)
// ui components
export type Title = {
    title: string;
    additionalClasses?: string;
};

export type SubtitleTypes = {
    subtitle?: string;
    additionalClasses?: string;
    children?: React.ReactNode;
};

export type Heading = {
    heading: string;
    additionalClasses?: string;
};

export type IconTypes = {
    style?: 'fas' | 'far';
    iconName: string;
    color?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

export type BackForwardRoute = {
    route: 'back' | 'forward';
};

export type PassVisibilityTypes = {
    visibility: boolean;
    setVisibility: Function;
};

// ui kits components
export type MenuItemTypes = {
    href: string;
    label: string;
    iconName: string;
};

export type GetDateTime = {
    todoReminder: {
        time: {
            hour: number;
            minute: number;
        };
        date: Date | undefined;
    };
};

export type TodoItemTypes = {
    todoText: string;
    isCompleted?: boolean;
    isInFavorite?: boolean;
    todoSubDetail?: boolean;
};

// redux slices
export type TodoContent = {
    todoText: string;
    todoList: string;
    todoDate: Date | null;
    todoReminder: {
        time: {
            hour: number;
            minute: number;
        };
        date: Date | null;
        isTrueReminder: boolean;
    };
};
