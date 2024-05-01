'use client';

// public
import { useSelector, useDispatch } from 'react-redux';

//* components
import { Input } from '@nextui-org/react';
import Icon from '../ui/texts/icon';

//* redux
import { setFirstName, setLastName } from '@/redux/features/formSlice';

const NameField = () => {
    const dispatch = useDispatch();
    // hooks and variables
    const firstName = useSelector((state: any) => state.formValues.firstName);
    const lastName = useSelector((state: any) => state.formValues.lastName);

    return (
        <section className='form-name'>
            <Input
                placeholder='First name'
                startContent={<Icon iconName='user' />}
                value={firstName}
                onChange={({ target }) =>
                    dispatch(setFirstName(target.value))
                }
            />
            <Input
                placeholder='Last name'
                startContent={<Icon iconName='user' />}
                value={lastName}
                onChange={({ target }) =>
                    dispatch(setLastName(target.value))
                }
            />
        </section>
    );
};

export default NameField;
