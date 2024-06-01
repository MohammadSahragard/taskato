'use client';

// public
import { useSelector, useDispatch } from 'react-redux';

//* components
import { Input } from '@nextui-org/react';
import Icon from '../ui/texts/icon';

//* redux
import { setEmail } from '@/redux/features/formSlice';

const EmailField = ({ validation }: { validation: boolean }) => {
    const dispatch = useDispatch();

    // hooks and variables
    const email = useSelector((state: any) => state.formValues.email);

    return (
        <Input
            placeholder='Email'
            startContent={<Icon iconName='envelope' />}
            value={email}
            onChange={({ target }) => dispatch(setEmail(target.value))}
            isRequired
            isInvalid={validation && email}
            errorMessage={
                validation && email ? 'Please enter a valid email address' : null
            }
        />
    );
};

export default EmailField;
