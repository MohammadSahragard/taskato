'use client';

// public
import { useAppSelector, useAppDispatch } from '@/redux/app/hook';

//* components
import { Modal, ModalContent } from '@nextui-org/react';
import TaskDetailsComponents from './task-details-components';

//* data
import { mobileTaskDetailsProps } from '@/helper/data/data';
import { setIsOpenedMobileDetailsSidebar } from '@/redux/features/optionsSlice';

const MobileTaskDetails = () => {
    const dispatch = useAppDispatch();
    // states and variables
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
