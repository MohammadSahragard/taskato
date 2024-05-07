//* components
import Heading from '@/components/ui/texts/heading';
import Subtitle from '@/components/ui/texts/subtitle';
import SignupForm from './signup-form';

const SignupCon = () => {
    return (
        <div className='form-con'>
            <header className='form-header'>
                <Heading
                    heading='Join us today!'
                    additionalClasses='text-black'
                />
                <Subtitle subtitle='Sign up now to become a member' />
            </header>
            <SignupForm />
        </div>
    );
};

export default SignupCon;
