'use client';

// Public
import { usePathname } from 'next/navigation';

//* Components
import Heading from './heading';
import { wordsSeparator } from '@/helper/functions/functions';

const TabHeading = () => {
    // States and variables
    const pathname = usePathname().split('/');
    const tabName = pathname[pathname.length - 1];

    return (
        <div className='tab-heading'>
            <Heading
                heading={wordsSeparator(tabName) || 'tasks'}
                additionalClasses='capitalize'
            />
        </div>
    );
};

export default TabHeading;
