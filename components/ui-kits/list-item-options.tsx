'use client';

//* components
import { ListItemOptionsTypes } from '@/types/types';
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    useDisclosure,
} from '@nextui-org/react';
import DeleteListOption from '../ui/buttons/delete-list-option';
import RenameListOption from '../ui/buttons/rename-list-option';
import RenameListModal from '../modals/rename-list-modal';

const ListItemOptions = ({
    neededId,
    neededTitle,
    userEmail,
    isOpenOptions,
    closeOptionsMenu,
    children,
}: ListItemOptionsTypes) => {
    // states and variables
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Dropdown
                isOpen={isOpenOptions}
                radius='sm'
                onOpenChange={closeOptionsMenu}
                className='bg-primary-100'
            >
                <DropdownTrigger>{children}</DropdownTrigger>
                <DropdownMenu variant='flat'>
                    <DropdownItem className='p-0 rounded'>
                        <RenameListOption onOpenModal={onOpen} />
                    </DropdownItem>
                    <DropdownItem className='p-0 rounded'>
                        <DeleteListOption
                            id={neededId}
                            userEmail={userEmail}
                        />
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>

            {/* modal for rename list */}
            <RenameListModal
                neededId={neededId}
                neededTitle={neededTitle}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            />
        </>
    );
};

export default ListItemOptions;
