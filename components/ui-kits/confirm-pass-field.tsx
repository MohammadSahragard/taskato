'use client';

// public
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//* components
import { Input } from '@nextui-org/react';
import Icon from '../ui/texts/icon';
import PassVisibilityBtn from '../ui/buttons/pass-visibility-btn';

//* redux
import { setConfirmPassword } from '@/redux/features/formSlice';

const ConfirmPassField = () => {
    const dispatch = useDispatch();

    // states
    const [passVisibility, setPassVisibility] = useState(false);
    const password = useSelector((state: any) => state.formValues.confirmPassword);

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
