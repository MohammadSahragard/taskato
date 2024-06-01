'use client';

// public
import { useEffect, useState, useTransition } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

//* components
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import Subtitle from '@/components/ui/texts/subtitle';
import PassField from '@/components/ui-kits/pass-field';
import ConfirmPassField from '@/components/ui-kits/confirm-pass-field';
import EmailField from '@/components/ui-kits/email-field';
import NameField from '@/components/ui-kits/name-filed';
import ResultSubmit from '@/components/ui/texts/result-submit';
import { signupSubmit } from '@/helper/functions/auth-functions';

//* redux
import { setClearFields } from '@/redux/features/formSlice';

const SignupForm = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    // hooks, states and variables
    const firstName = useSelector((state: any) => state.formValues.firstName);
    const lastName = useSelector((state: any) => state.formValues.lastName);
    const email = useSelector((state: any) => state.formValues.email);
    const password: string = useSelector(
        (state: any) => state.formValues.password
    );
    const confirmPassword = useSelector(
        (state: any) => state.formValues.confirmPassword
    );
    const [isPending, startTransition] = useTransition();
    const [showResult, setShowResult] = useState(false);
    const [resultSubmit, setResultSubmit] = useState({
        message: '',
        status: 200,
    });

    // validation
    const emailValidation = !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const passwordValidation =
        !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

    // functions
    const formSubmit = async (event: any) => {
        event.preventDefault();

        // first validation
        if (emailValidation || passwordValidation) return;

        await signupSubmit({
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
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
                    router.replace('/auth/login');
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
            <NameField />
            <EmailField validation={emailValidation} />
            <PassField validation={passwordValidation} />
            <ConfirmPassField />

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
                    Sign up
                </Button>
                <Subtitle>
                    Already a member? <Link href='/auth/login'>Login here</Link>
                </Subtitle>
            </section>
        </form>
    );
};

export default SignupForm;
