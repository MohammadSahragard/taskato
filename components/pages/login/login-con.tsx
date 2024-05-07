//* components
import Heading from '@/components/ui/texts/heading';
import Subtitle from '@/components/ui/texts/subtitle';
import LoginForm from './login-form';

const LoginCon = () => {
    return (
        <div className='form-con'>
            <header className='form-header'>
                <Heading
                    heading='Welcome back!'
                    additionalClasses='text-white'
                />
                <Subtitle
                    subtitle='Login to access your account'
                    additionalClasses='text-[#DDDDDD]'
                />
            </header>
            <LoginForm />
        </div>
    );
};

export default LoginCon;
