//* components
import Title from './title';
import { Skeleton } from '@nextui-org/react';

const ProfileName = ({name}:{name: string}) => {
    if (!name) return <Skeleton className='w-3/4 h-4 rounded' />
    return (
        <Title
            title={name || 'Not Found'}
            additionalClasses='font-medium capitalize'
        />
    );
};

export default ProfileName;
