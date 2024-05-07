//* components
import Subtitle from './subtitle';
import { Skeleton } from '@nextui-org/react';

const ProfileEmail = ({email}: {email: string}) => {
    if (!email) return <Skeleton className='w-full h-3 rounded mt-1' />
    return (
        <Subtitle
            subtitle={email || 'Not Found'}
            additionalClasses='truncate'
        />
    );
};

export default ProfileEmail;
