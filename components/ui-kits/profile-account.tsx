'use client';

// Public
import { useAppSelector } from '@/redux/app/hook';

//* Components
import ProfileName from '../ui/texts/profile-name';
import ProfileEmail from '../ui/texts/profile-email';
import ProfilePicture from '../ui/texts/profile-picture';

const ProfileAccount = () => {
    const user = useAppSelector((state) => state.options);

    return (
        <div className='profile-account'>
            <ProfilePicture email={user.userEmail} />

            <section className='overflow-hidden'>
                <ProfileName name={user.userName} />
                <ProfileEmail email={user.userEmail} />
            </section>
        </div>
    );
};

export default ProfileAccount;
