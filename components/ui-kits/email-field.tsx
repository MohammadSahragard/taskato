'use client';

// Public
import { useAppSelector, useAppDispatch } from '@/redux/app/hook';

//* Components
import { Input } from '@nextui-org/react';
import Icon from '../ui/texts/icon';

//* Redux
import { setEmail } from '@/redux/features/form/formSlice';

const EmailField = ({ validation }: { validation: boolean }) => {
    const dispatch = useAppDispatch();
    // States and variables
    const email = useAppSelector((state) => state.formValues.email);
    const isInvalid = validation && email ? true : false;

    return (
        <Input
            placeholder='Email'
            startContent={<Icon iconName='envelope' />}
            value={email}
            onChange={({ target }) => dispatch(setEmail(target.value))}
            isRequired
            isInvalid={isInvalid}
            errorMessage={
                isInvalid ? 'Please enter a valid email address' : null
            }
        />
    );
};

export default EmailField;
