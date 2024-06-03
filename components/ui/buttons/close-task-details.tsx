'use client';

// public
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

//* components
import { Button } from '@nextui-org/react';
import Icon from '../texts/icon';

//* functions
import TooltipElement from '../texts/tooltip-element';
import { setIsOpenedDetailsSidebar } from '@/redux/features/optionsSlice';

const CloseTaskDetails = () => {
    const dispatch = useDispatch();

    // close sidebar with 'Escape' key
    useEffect(() => {
        const closeTaskDetails = (event: any) => {
            if (event.key === 'Escape') {
                dispatch(setIsOpenedDetailsSidebar(false));
            }
        };

        window.addEventListener('keydown', closeTaskDetails);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <TooltipElement title='Esc'>
            <Button
                isIconOnly
                size='sm'
                radius='sm'
                variant='light'
                startContent={<Icon iconName='close' />}
                onClick={() => dispatch(setIsOpenedDetailsSidebar(false))}
            />
        </TooltipElement>
    );
};

export default CloseTaskDetails;
