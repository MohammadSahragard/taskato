// Menu links
export const menuLinks = [
    {
        id: '1tasks',
        title: 'Tasks',
        iconName: 'house-blank',
        href: '/',
    },
    {
        id: '2today',
        title: 'Today',
        iconName: 'list-check',
        href: '/today',
    },
    {
        id: '3important',
        title: 'Important',
        iconName: 'star',
        href: '/important',
    },
    {
        id: '4stickynotes',
        title: 'Sticky Notes',
        iconName: 'note-sticky',
        href: '/sticky-notes',
    },
];

// Date format
export const days: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

// List color
export const listColorItems: string[] = [
    '#e11d48',
    '#c026d3',
    '#7c3aed',
    '#2563eb',
    '#14b8a6',
    '#84cc16',
    '#fcd34d',
    '#f97316',
];

// The motion props of mobile sidebars
export const mobileMenuMotionProps = {
    variants: {
        enter: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.3,
                ease: 'easeOut',
            },
        },
        exit: {
            x: -20,
            opacity: 0,
            transition: {
                duration: 0.2,
                ease: 'easeIn',
            },
        },
    },
};
export const mobileTaskDetailsProps = {
    variants: {
        enter: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.3,
                ease: 'easeOut',
            },
        },
        exit: {
            x: 20,
            opacity: 0,
            transition: {
                duration: 0.2,
                ease: 'easeIn',
            },
        },
    },
};
