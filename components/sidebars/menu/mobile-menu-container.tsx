'use client';

//* components
import { Modal, ModalContent } from '@nextui-org/react';
import MenuComponents from './menu-components';

//* data
import { mobileMenuMotionProps } from '@/helper/data/data';

const MobileMenuContainer = ({
    isOpenMenu,
    toggleMenu,
}: {
    isOpenMenu: boolean;
    toggleMenu: any;
}) => {
    return (
        <Modal
            className='md:hidden'
            isOpen={isOpenMenu}
            onOpenChange={toggleMenu}
            classNames={{
                base: 'rounded-s-none w-3/4',
            }}
            motionProps={mobileMenuMotionProps}
        >
            <ModalContent className='fixed left-0 h-full !m-0'>
                <MenuComponents />
            </ModalContent>
        </Modal>
    );
};

export default MobileMenuContainer;
