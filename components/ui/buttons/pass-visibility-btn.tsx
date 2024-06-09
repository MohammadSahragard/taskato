'use client';

//* Components
import { Button } from '@nextui-org/react';
import Icon from '../texts/icon';

//* Types
import { PassVisibilityTypes } from '@/types/types';

const PassVisibilityBtn = ({
    visibility,
    setVisibility,
}: PassVisibilityTypes) => {
    // variables
    const iconName = visibility ? 'eye-slash' : 'eye';

    // Functions
    const changeVisibility = () => setVisibility(!visibility);

    return (
        <Button
            isIconOnly
            onClick={changeVisibility}
            size='sm'
            variant='light'
        >
            <Icon iconName={iconName} />
        </Button>
    );
};

export default PassVisibilityBtn;
