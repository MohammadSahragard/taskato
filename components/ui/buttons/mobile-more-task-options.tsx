//* components
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
} from '@nextui-org/react';
import Icon from '../texts/icon';
import TooltipElement from '../texts/tooltip-element';
import AddDateBtn from './add-date-btn';
import AddToListBtn from './add-to-list-btn';
import AddReminderBtn from './add-reminder-btn';

const MobileMoreTaskOPtions = () => {
    return (
        <Dropdown className='more-task-options'>
            <TooltipElement title='More options'>
                <div>
                    <DropdownTrigger>
                        <Button
                            variant='light'
                            className='capitalize md:hidden'
                            radius='sm'
                            isIconOnly
                            startContent={<Icon iconName='ellipsis-v' />}
                        />
                    </DropdownTrigger>
                </div>
            </TooltipElement>

            <DropdownMenu className='w-max'>
                <DropdownItem
                    isReadOnly
                    className='p-0 max-w-max'
                >
                    <AddDateBtn />
                </DropdownItem>

                <DropdownItem
                    isReadOnly
                    className='p-0 max-w-max'
                >
                    <AddToListBtn />
                </DropdownItem>

                <DropdownItem
                    isReadOnly
                    className='p-0 max-w-max'
                >
                    <AddReminderBtn />
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default MobileMoreTaskOPtions;
