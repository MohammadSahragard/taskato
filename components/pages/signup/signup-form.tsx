'use client';

// public
import { useState } from 'react';

//* components
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import Subtitle from '@/components/ui/texts/subtitle';
import PassField from '@/components/ui-kits/pass-field';
import ConfirmPassField from '@/components/ui-kits/confirm-pass-field';
import EmailField from '@/components/ui-kits/email-field';
import NameField from '@/components/ui-kits/name-filed';

const SignupForm = () => {
    // hooks, states and variables

    return (
        <form className='signup-form'>
            <NameField />
            <EmailField />
            <PassField />
            <ConfirmPassField />

            <section className='form-CTA'>
                <Button
                    type='submit'
                    fullWidth
                    color='primary'
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
