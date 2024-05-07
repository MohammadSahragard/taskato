'use client';

//* components
import ProfileName from '../ui/texts/profile-name';
import ProfileEmail from '../ui/texts/profile-email';
import ProfilePicture from '../ui/texts/profile-picture';

//* hooks
import { useUserLoggedIn } from '@/hooks/use-user-logged-in';

const ProfileAccount = () => {
    const getUser: any = useUserLoggedIn('/api/user');
    const user = getUser?.message || null;

    return (
        <div className='profile-account'>
            <ProfilePicture email={user?.email ?? ''} />

            <section className='overflow-hidden'>
                <ProfileName name={user?.name ?? ''} />
                <ProfileEmail email={user?.email ?? ''} />
            </section>
        </div>
    );
};

export default ProfileAccount;
