'use client';

// public
import { useRouter } from 'next/navigation';

//* components
import { Button } from '@nextui-org/react';
import Icon from '../texts/icon';
import { BackForwardRoute } from '@/types/types';

const BackForwardRoutBtn = ({ route }: BackForwardRoute) => {
    // variables and hooks
    const router = useRouter();

    const icon = {
        back: 'chevron-left',
        forward: 'chevron-right',
    };

    // functions
    const go = () => (route === 'back' ? router.back() : router.forward());

    return (
        <Button
            startContent={<Icon iconName={icon[route]} />}
            isIconOnly
            variant='light'
            onClick={go}
        />
    );
};

export default BackForwardRoutBtn;
