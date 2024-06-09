'use client';

// Public
import { useAppSelector, useAppDispatch } from '@/redux/app/hook';

//* Components
import { Modal, ModalContent } from '@nextui-org/react';
import TaskDetailsComponents from './task-details-components';

//* Data
import { mobileTaskDetailsProps } from '@/helper/data/data';
import { setIsOpenedMobileDetailsSidebar } from '@/redux/features/options/optionsSlice';

const MobileTaskDetails = () => {
    const dispatch = useAppDispatch();
    // States and variables
    const isOpenSidebar = useAppSelector(
        (state) => state.options.isOpenedMobileDetailsSidebar
    );

    return (
        <Modal
            className='rounded-e-none lg:hidden w-[300px]'
            isOpen={isOpenSidebar}
            hideCloseButton
            onOpenChange={() =>
                dispatch(setIsOpenedMobileDetailsSidebar(!isOpenSidebar))
            }
            motionProps={mobileTaskDetailsProps}
        >
            <ModalContent className='fixed right-0 h-full !m-0'>
                <TaskDetailsComponents />
            </ModalContent>
        </Modal>
    );
};

export default MobileTaskDetails;
