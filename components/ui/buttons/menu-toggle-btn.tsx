'use client';

// Public
import { useAppSelector, useAppDispatch } from '@/redux/app/hook';

//* Components
import { Button } from '@nextui-org/react';
import Icon from '../texts/icon';

//* Redux
import { setIsOpenedMobileMenu } from '@/redux/features/options/optionsSlice';
import MobileMenuContainer from '@/components/sidebars/menu/mobile-menu-container';

const MenuToggleBtn = () => {
    const dispatch = useAppDispatch();
    // States and variables
    const isOpenMenu = useAppSelector(
        (state) => state.options.isOpenedMobileMenu
    );

    // Functions
    const toggleMenu = () => dispatch(setIsOpenedMobileMenu(!isOpenMenu));

    return (
        <>
            <Button
                size='sm'
                isIconOnly
                radius='sm'
                variant='light'
                onClick={toggleMenu}
            >
                <Icon iconName='bars' />
            </Button>

            {/* mobile menu */}
            <MobileMenuContainer
                isOpenMenu={isOpenMenu}
                toggleMenu={toggleMenu}
            />
        </>
    );
};

export default MenuToggleBtn;
