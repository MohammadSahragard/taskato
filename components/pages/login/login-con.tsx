//* Components
import Image from 'next/image';
import Heading from '@/components/ui/texts/heading';
import Subtitle from '@/components/ui/texts/subtitle';
import LoginForm from './login-form';

const LoginCon = () => {
    return (
        <div className='form-con'>
            <div className='form-con-logo'>
                <Image
                    src='/Taskato-logo.svg'
                    alt='taskato logo'
                    width={25}
                    height={25}
                />
            </div>

            <header className='form-header'>
                <Heading heading='Welcome back!' />
                <Subtitle subtitle='Login to access your account' />
            </header>
            <LoginForm />
        </div>
    );
};

export default LoginCon;
