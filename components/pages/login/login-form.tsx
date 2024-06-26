'use client';

// Public
import { useState, useTransition, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/app/hook';

//* Components
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import Subtitle from '@/components/ui/texts/subtitle';
import PassField from '@/components/ui-kits/pass-field';
import EmailField from '@/components/ui-kits/email-field';
import ResultSubmit from '@/components/ui/texts/result-submit';

//* Functions
import { loginSubmit } from '@/helper/functions/auth-functions';

//* Redux
import { setClearFields } from '@/redux/features/form/formSlice';

const LoginForm = () => {
    const dispatch = useAppDispatch();

    // States and variables
    const email = useAppSelector((state) => state.formValues.email);
    const password = useAppSelector((state) => state.formValues.password);
    const [isPending, startTransition] = useTransition();
    const [showResult, setShowResult] = useState(false);
    const [resultSubmit, setResultSubmit] = useState({
        message: '',
        status: 200,
    });

    // Validation
    const emailValidation = !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const passwordValidation =
        !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

    // Functions
    const formSubmit = async (event: any) => {
        event.preventDefault();

        // Initial validation
        if (emailValidation || passwordValidation) return;

        await loginSubmit({
            email,
            password,
        }).then((res) => {
            setShowResult(true);
            setResultSubmit({
                message: res.message,
                status: res.status,
            });

            setTimeout(() => {
                setShowResult(false);
                if (res.status === 200) {
                    dispatch(setClearFields());
                    window.location.href = '/';
                }
            }, 3000);
        });
    };

    useEffect(() => {
        dispatch(setClearFields());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <form
            className='signup-form'
            onSubmit={(event: any) => startTransition(() => formSubmit(event))}
        >
            <EmailField validation={emailValidation} />
            <PassField validation={passwordValidation} />

            <section className='form-CTA'>
                {showResult ? (
                    <ResultSubmit
                        text={resultSubmit.message}
                        status={resultSubmit.status}
                    />
                ) : null}
                <Button
                    type='submit'
                    fullWidth
                    color='primary'
                    isLoading={isPending}
                >
                    Login
                </Button>
                <Subtitle>
                    Not a member? <Link href='/auth/signup'>Sign up here</Link>
                </Subtitle>
            </section>
        </form>
    );
};

export default LoginForm;
