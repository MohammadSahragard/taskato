//* children
export type Children = React.ReactNode;

//*------ specials (components and ...)
// ui components
export type TitleTypes = {
    title: string;
    additionalClasses?: string;
};

export type SubtitleTypes = {
    subtitle?: string;
    additionalClasses?: string;
    children?: Children;
};

export type HeadingTypes = {
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

export type TaskReminderTypes = {
    time: {
        hour: number;
        minute: number;
    };
    date?: Date;
    isTrueReminder: boolean;
};

// signup submit
export type SignupSubmitTypes = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

// login submit
export type LoginSubmitTypes = Pick<SignupSubmitTypes, 'email' | 'password'>;

// types for isUserLoggedIn function
export type IsUserLoggedInTypes = {
    condition: boolean;
    pathname: string;
    router: any;
};

// types for add task list
export type AddTaskListTypes = {
    _id?: string;
    email: string;
    list_title: string;
    list_color: string;
    createdAt?: Date;
};

// types for selected task for details sidebar
export type TaskContentTypes = {
    _id?: string;
    email?: string;
    task_title: string;
    task_description: string;
    task_due_date?: Date;
    task_list: {
        list_title: string;
        list_color: string;
    };
    task_reminder_date: TaskReminderTypes;
    subtasks?: {
        subtask_title: string;
        subtask_completion: boolean;
    }[];
    task_complete?: boolean;
    is_in_important?: boolean;
    createdAt?: Date;
};

// types for notes data
export type NoteDataTypes = {
    _id?: string;
    note_title: string;
    note_content: string;
    note_color?: string;
};

// context menu slice
export type ItemDataTypes = {
    id: string;
    title?: string;
    content?: string;
    isCompleted?: boolean;
    isImportant?: boolean;
    checkHandler?: React.MouseEventHandler;
    onOpen?: () => void;
    completionTransition?: React.TransitionStartFunction;
    importantTransition?: React.TransitionStartFunction;
};
export type MenuPositionTypes = {
    x: number;
    y: number;
    XAxisSide: 'left' | 'right';
    YAxisSide: 'top' | 'bottom';
};
export type ContextMenuTypes = {
    menuName: 'tasks' | 'lists' | 'subtasks' | 'notes';
    itemData: ItemDataTypes;
    isShownMenu: boolean;
    menuPosition: MenuPositionTypes;
};

// data fetches
export type GetDataTypes = {
    beforeLoading?: boolean;
    loading: boolean;
    data: AddTaskListTypes[];
    error: string;
};
