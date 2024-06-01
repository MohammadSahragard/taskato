'use client';

// public
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//* components
import { Input } from '@nextui-org/react';
import Icon from '../ui/texts/icon';
import PassVisibilityBtn from '../ui/buttons/pass-visibility-btn';

//* redux
import { setPassword } from '@/redux/features/formSlice';

const PassField = ({ validation }: { validation: boolean }) => {
    const dispatch = useDispatch();

    // states
    const [passVisibility, setPassVisibility] = useState(false);
    const password = useSelector((state: any) => state.formValues.password);

    return (
        <Input
            placeholder='Password'
            startContent={<Icon iconName='lock' />}
            value={password}
            onChange={({ target }) => dispatch(setPassword(target.value))}
            isRequired
            type={passVisibility ? 'text' : 'password'}
            endContent={
                <PassVisibilityBtn
                    visibility={passVisibility}
                    setVisibility={setPassVisibility}
                />
            }
            isInvalid={validation && password}
            errorMessage={
                validation && password
                    ? 'Password must be at least 8 characters and include a mix of uppercase letters, lowercase letters, numbers, and one special symbol among @#$%.'
                    : null
            }
        />
    );
};

export default PassField;
