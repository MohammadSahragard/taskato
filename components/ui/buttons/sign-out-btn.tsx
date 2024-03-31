'use client';

//* components
import { Button } from '@nextui-org/react';
import Icon from '../texts/icon';

const SignOutBtn = () => {
    return (
        <Button
            radius='sm'
            variant='light'
            className='fw-btn'
            startContent={
                <Icon
                    iconName='arrow-right-from-bracket'
                    style='fas'
                />
            }
        >
            Sign out
        </Button>
    );
};

export default SignOutBtn;