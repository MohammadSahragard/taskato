'use client';

// public
import { useAppSelector, useAppDispatch } from '@/redux/app/hook';

//* components
import { Input } from '@nextui-org/react';
import Icon from '../ui/texts/icon';

//* redux
import { setFirstName, setLastName } from '@/redux/features/formSlice';

const NameField = () => {
    const dispatch = useAppDispatch();
    // hooks and variables
    const firstName = useAppSelector((state) => state.formValues.firstName);
    const lastName = useAppSelector((state) => state.formValues.lastName);

    return (
        <section className='form-name'>
            <Input
                placeholder='First name'
                startContent={<Icon iconName='user' />}
                value={firstName}
                onChange={({ target }) => dispatch(setFirstName(target.value))}
                isRequired
            />
            <Input
                placeholder='Last name'
                startContent={<Icon iconName='user' />}
                value={lastName}
                onChange={({ target }) => dispatch(setLastName(target.value))}
                isRequired
            />
        </section>
    );
};

export default NameField;
