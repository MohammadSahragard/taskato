'use client';

// public
import { usePathname } from 'next/navigation';

//* components
import Spline from '@splinetool/react-spline';

const FormPageBg = () => {
    const pathname = usePathname();
    const isSignup = pathname.includes('signup');

    const blueScene =
        'https://prod.spline.design/EW-TR4UmK05eyBEI/scene.splinecode';
    const redScene =
        'https://prod.spline.design/zJBLtHyUck5b2wUz/scene.splinecode';

    const splineScene = isSignup ? blueScene : redScene;

    return (
        <div className='absolute inset-0'>
            <Spline scene={splineScene} />
        </div>
    );
};

export default FormPageBg;
