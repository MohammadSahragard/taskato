//* components
import { Avatar } from '@nextui-org/react';
import Title from '../ui/texts/title';
import Subtitle from '../ui/texts/subtitle';

const ProfileAccount = () => {
    return (
        <div className='profile-account'>
            <Avatar
                src='https://avatars.githubusercontent.com/u/77649975?v=4'
                classNames={{ icon: 'text-primary-200' }}
            />

            <section className='overflow-hidden'>
                <Title
                    title='Mohammad Sahragard'
                    additionalClasses='font-medium'
                />
                <Subtitle
                    subtitle='mohammadsahragard@gmail.com'
                    additionalClasses='truncate'
                />
            </section>
        </div>
    );
};

export default ProfileAccount;
