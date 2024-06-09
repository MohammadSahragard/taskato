//* Components
import Image from 'next/image';
import Heading from '@/components/ui/texts/heading';
import Subtitle from '@/components/ui/texts/subtitle';
import LoginForm from './login-form';

const LoginCon = () => {
    return (
        <div className='form-con'>
            <Image
                src='/taskato-logo.png'
                alt='taskato logo'
                width={60}
                height={60}
                className='form-con-logo'
            />

            <header className='form-header'>
                <Heading heading='Welcome back!' />
                <Subtitle subtitle='Login to access your account' />
            </header>
            <LoginForm />
        </div>
    );
};

export default LoginCon;
