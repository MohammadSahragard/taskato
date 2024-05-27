'use client';

// public
import { useState, useTransition, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//* components
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import Subtitle from '@/components/ui/texts/subtitle';
import PassField from '@/components/ui-kits/pass-field';
import EmailField from '@/components/ui-kits/email-field';
import ResultSubmit from '@/components/ui/texts/result-submit';

//* functions
import { loginSubmit } from '@/helper/functions/auth-functions';

//* redux
import { setClearFields } from '@/redux/features/formSlice';

const LoginForm = () => {
    const dispatch = useDispatch();

    // hooks, states and variables
    const email = useSelector((state: any) => state.formValues.email);
    const password = useSelector((state: any) => state.formValues.password);
    const [isPending, startTransition] = useTransition();
    const [showResult, setShowResult] = useState(false);
    const [resultSubmit, setResultSubmit] = useState({
        message: '',
        status: 200,
    });

    // functions
    const formSubmit = async (event: any) => {
        event.preventDefault();

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
            <EmailField />
            <PassField />

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
