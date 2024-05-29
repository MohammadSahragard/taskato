'use client';

// public
import { useEffect } from 'react';

//* components
import { Button } from '@nextui-org/react';
import Icon from '../texts/icon';

//* functions
import { toggleTaskDetailsSidebarBtn } from '@/helper/functions/functions';
import TooltipElement from '../texts/tooltip-element';

const CloseTaskDetails = () => {
    // close sidebar with 'Escape' key
    useEffect(() => {
        const closeTaskDetails = (event: any) => {
            if (document.body.className.includes('isOpenedDetailsSidebar')) {
                if (event.key === 'Escape') {
                    toggleTaskDetailsSidebarBtn();
                }
            }
        };

        window.addEventListener('keydown', closeTaskDetails);
    }, []);

    return (
        <TooltipElement title='Esc'>
            <Button
                isIconOnly
                size='sm'
                radius='sm'
                variant='light'
                startContent={<Icon iconName='close' />}
                onClick={toggleTaskDetailsSidebarBtn}
            />
        </TooltipElement>
    );
};

export default CloseTaskDetails;
