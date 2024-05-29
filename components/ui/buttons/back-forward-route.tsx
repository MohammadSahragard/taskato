'use client';

// public
import { useRouter } from 'next/navigation';

//* components
import { Button, Tooltip } from '@nextui-org/react';
import Icon from '../texts/icon';
import { BackForwardRoute } from '@/types/types';
import TooltipElement from '../texts/tooltip-element';

const BackForwardRoutBtn = ({ route }: BackForwardRoute) => {
    // variables and hooks
    const router = useRouter();

    const icon = {
        back: 'chevron-left',
        forward: 'chevron-right',
    };
    const tooltipContent = route === 'back' ? 'Go back' : 'Go forward';

    // functions
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
