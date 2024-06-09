'use client';

// Public
import { useAppSelector } from '@/redux/app/hook';

//* Components
import Image from 'next/image';

const LogoLoading = () => {
    // States and variables
    const isPreloading = useAppSelector((state) => state.options.userLoading);
    const conditionClass = isPreloading ? '' : '!hidden';

    return (
        <div className={`logo-loading ${conditionClass}`}>
            <Image
                src='/taskato-logo.gif'
                alt='Logo loading image'
                priority
                width='250'
                height='250'
            />
        </div>
    );
};

export default LogoLoading;
