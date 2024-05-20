import { ReactNode } from 'react';

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
    style?: 'fas' | 'far' | 'fad';
    iconName: string;
    color?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    forceColor?: string;
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

export type TaskListTypes = {
    id: string;
    userEmail: string;
    href: string;
    label: string;
    listColor: string;
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

export type ListItemOptionsTypes = {
    listId: string;
    listTitle: string;
    userEmail: string;
    isOpenOptions: boolean;
    closeOptionsMenu: (isOpen: boolean) => void;
    children: ReactNode;
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

//* functions helper
// signup submit
export type SignupSubmitTypes = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

// login submit
export type LoginSubmitTypes = {
    email: string;
    password: string;
};

// types for isUserLoggedIn function
export type IsUserLoggedInTypes = {
    condition: boolean;
    pathname: string;
    router: any;
};

// types for add task list
export type AddTaskListTypes = {
    email: string;
    listTitle: string;
    listColor: string;
};
