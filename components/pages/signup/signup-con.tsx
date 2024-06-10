//* Components
import Image from 'next/image';
import Heading from '@/components/ui/texts/heading';
import Subtitle from '@/components/ui/texts/subtitle';
import SignupForm from './signup-form';

const SignupCon = () => {
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
                <Heading heading='Join us today!' />
                <Subtitle subtitle='Sign up now to become a member' />
            </header>
            <SignupForm />
        </div>
    );
};

export default SignupCon;
