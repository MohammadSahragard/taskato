'use client';

// public
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

//* components
import ProfileName from '../ui/texts/profile-name';
import ProfileEmail from '../ui/texts/profile-email';
import ProfilePicture from '../ui/texts/profile-picture';

//* hooks
import { useUserLoggedIn } from '@/hooks/use-user-logged-in';

//* redux
import { setUserEmail } from '@/redux/features/optionsSlice';

const ProfileAccount = () => {
    const dispatch = useDispatch();
    const getUser: any = useUserLoggedIn('/api/user');
    const user = getUser?.message || null;

    useEffect(() => {
        if (user) {
            dispatch(setUserEmail(user.email));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

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
