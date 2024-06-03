'use client';

// public
import { useSelector } from 'react-redux';

//* components
import Image from 'next/image';

const LogoLoading = () => {
    // states and variables
    const isPreloading = useSelector((state: any) => state.options.userLoading);
    const conditionClass = isPreloading ? '' : '!hidden';

    return (
        <div className={`logo-loading ${conditionClass}`}>
            <Image
                src='/images/taskato-logo.gif'
                alt='Logo loading image'
                width='250'
                height='250'
            />
        </div>
    );
};

export default LogoLoading;
