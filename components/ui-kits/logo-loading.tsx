'use client';

// public
import { useAppSelector } from '@/redux/app/hook';

//* components
import Image from 'next/image';

const LogoLoading = () => {
    // states and variables
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
