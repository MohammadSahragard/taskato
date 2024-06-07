'use client';

// public
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/app/hook';

//* components
import { Input } from '@nextui-org/react';
import Icon from '../ui/texts/icon';
import PassVisibilityBtn from '../ui/buttons/pass-visibility-btn';

//* redux
import { setPassword } from '@/redux/features/formSlice';

const PassField = ({ validation }: { validation: boolean }) => {
    const dispatch = useAppDispatch();

    // states
    const [passVisibility, setPassVisibility] = useState(false);
    const password = useAppSelector((state) => state.formValues.password);
    const isInvalid = validation && password ? true : false;

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
            isInvalid={isInvalid}
            errorMessage={
                isInvalid ? (
                    <div>
                        <p>Password must be:</p>
                        <ul className='list-disc ps-5'>
                            <li>t least 8 characters</li>
                            <li>
                                include a mix of uppercase letters, lowercase
                                letters, and numbers
                            </li>
                            <li>and one special symbol among @#$%.</li>
                        </ul>
                    </div>
                ) : null
            }
        />
    );
};

export default PassField;
