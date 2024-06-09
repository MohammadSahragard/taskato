'use client';

// Public
import { useRouter } from 'next/navigation';

//* Components
import { Button } from '@nextui-org/react';
import Icon from '../texts/icon';
import { BackForwardRoute } from '@/types/types';
import TooltipElement from '../texts/tooltip-element';

const BackForwardRoutBtn = ({ route }: BackForwardRoute) => {
    const router = useRouter();
    // States and variables
    const icon = {
        back: 'chevron-left',
        forward: 'chevron-right',
    };
    const tooltipContent = route === 'back' ? 'Go back' : 'Go forward';

    // Functions
    const go = () => (route === 'back' ? router.back() : router.forward());

    return (
        <TooltipElement title={tooltipContent}>
            <Button
                startContent={<Icon iconName={icon[route]} />}
                isIconOnly
                radius='sm'
                variant='light'
                onClick={go}
            />
        </TooltipElement>
    );
};

export default BackForwardRoutBtn;
