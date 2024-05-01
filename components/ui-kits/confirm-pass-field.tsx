'use client';

// public
import { useState } from 'react';

//* components
import { Input } from '@nextui-org/react';
import Icon from '../ui/texts/icon';
import PassVisibilityBtn from '../ui/buttons/pass-visibility-btn';

const ConfirmPassField = () => {
    // states
    const [passVisibility, setPassVisibility] = useState(false);

    return (
        <Input
            placeholder='Confirm password'
            startContent={<Icon iconName='lock' />}
            type={passVisibility ? 'text' : 'password'}
            endContent={
                <PassVisibilityBtn
                    visibility={passVisibility}
                    setVisibility={setPassVisibility}
                />
            }
        />
    );
};

export default ConfirmPassField;
