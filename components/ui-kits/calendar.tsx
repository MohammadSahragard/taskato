'use client';

//* components
import { DayPicker } from 'react-day-picker';
import Icon from '../ui/texts/icon';

//* types
export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const Calendar = ({
    className,
    classNames,
    showOutsideDays = true,
    ...props
}: CalendarProps) => {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className='p-3 bg-background w-max rounded-xl'
            classNames={{
                months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
                month: 'space-y-4',
                caption: 'flex justify-center pt-1 relative items-center',
                caption_label: 'text-sm font-medium',
                nav: 'space-x-1 flex items-center',
                nav_button:
                    'border dark:border-primary-200/40 rounded-lg h-7 w-7 hover:bg-default/40 p-0 opacity-50 hover:opacity-100 transition-all',
                nav_button_previous: 'absolute left-1',
                nav_button_next: 'absolute right-1',
                table: 'w-full border-collapse space-y-1',
                head_row: 'flex',
                head_cell:
                    'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
                row: 'flex w-full mt-2',
                cell: 'relative p-0 text-center text-sm',
                day: 'h-8 w-8 p-0 font-normal hover:bg-default/40 rounded transition-all',
                day_selected:
                    'bg-foreground text-background hover:bg-foreground hover:text-background',
                day_today: 'bg-default/40',
                day_outside:
                    'day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
                day_disabled: 'text-muted-foreground opacity-50',
                ...classNames,
            }}
            components={{
                IconLeft: ({ ...props }) => <Icon iconName='angle-left' />,
                IconRight: ({ ...props }) => <Icon iconName='angle-right' />,
            }}
            {...props}
        />
    );
};
Calendar.displayName = 'Calendar';

export default Calendar;
