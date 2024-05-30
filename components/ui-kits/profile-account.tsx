'use client';

// public
import { useSelector } from 'react-redux';

//* components
import ProfileName from '../ui/texts/profile-name';
import ProfileEmail from '../ui/texts/profile-email';
import ProfilePicture from '../ui/texts/profile-picture';

const ProfileAccount = () => {
    const user = useSelector((state: any) => state.options);

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
