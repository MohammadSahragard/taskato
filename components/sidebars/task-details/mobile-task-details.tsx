'use client';

// public
import { useSelector, useDispatch } from 'react-redux';

//* components
import { Modal, ModalContent } from '@nextui-org/react';
import TaskDetailsComponents from './task-details-components';

//* data
import { mobileTaskDetailsProps } from '@/helper/data/data';
import { setIsOpenedDetailsSidebar } from '@/redux/features/optionsSlice';

const MobileTaskDetails = () => {
    const dispatch = useDispatch();
    // states and variables
    const isOpenSidebar = useSelector(
        (state: any) => state.options.isOpenedDetailsSidebar
    );

    return (
        <Modal
            className='lg:hidden'
            isOpen={isOpenSidebar}
            hideCloseButton
            onOpenChange={() =>
                dispatch(setIsOpenedDetailsSidebar(!isOpenSidebar))
            }
            classNames={{
                base: 'rounded-e-none w-[300px]',
            }}
            motionProps={mobileTaskDetailsProps}
        >
            <ModalContent className='fixed right-0 h-full !m-0'>
                <TaskDetailsComponents />
            </ModalContent>
        </Modal>
    );
};

export default MobileTaskDetails;
