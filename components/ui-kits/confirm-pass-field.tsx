'use client';

// Public
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/app/hook';

//* Components
import { Input } from '@nextui-org/react';
import Icon from '../ui/texts/icon';
import PassVisibilityBtn from '../ui/buttons/pass-visibility-btn';

//* Redux
import { setConfirmPassword } from '@/redux/features/form/formSlice';

const ConfirmPassField = () => {
    const dispatch = useAppDispatch();
    // States and variables
    const [passVisibility, setPassVisibility] = useState(false);
    const password = useAppSelector(
        (state) => state.formValues.confirmPassword
    );

    return (
        <Input
            placeholder='Confirm password'
            startContent={<Icon iconName='lock' />}
            value={password}
            onChange={({ target }) =>
                dispatch(setConfirmPassword(target.value))
            }
            isRequired
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
