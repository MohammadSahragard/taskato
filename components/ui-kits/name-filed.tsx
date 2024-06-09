'use client';

// Public
import { useAppSelector, useAppDispatch } from '@/redux/app/hook';

//* Components
import { Input } from '@nextui-org/react';
import Icon from '../ui/texts/icon';

//* Redux
import { setFirstName, setLastName } from '@/redux/features/form/formSlice';

const NameField = () => {
    const dispatch = useAppDispatch();
    // States and variables
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
