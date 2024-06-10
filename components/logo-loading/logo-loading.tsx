'use client';

// Public
import { useAppSelector } from '@/redux/app/hook';

//* Styles
import './logo-loading.css';

const LogoLoading = () => {
    // States and variables
    const isPreloading = useAppSelector((state) => state.options.userLoading);
    const conditionClass = true ? '' : '!hidden';

    return (
        <div className={`logo-loading ${conditionClass}`}>
            <svg
                width='468'
                height='620'
                id='logo-loading-svg'
                viewBox='0 0 468 620'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
            >
                <path
                    fillRule='evenodd'
                    id='logo-svg'
                    strokeWidth='10'
                    stroke='url(#paint0_linear_58_2)'
                    clipRule='evenodd'
                    d='M234.092 0.531398L234.033 0.26593L128.504 475.149L234.033 610.734L339.563 475.149L234.107 0.59661L467.801 207.985V0.531387L234.092 0.531398ZM233.768 0.531398L0 207.985L9.07481e-06 0.531387L233.768 0.531398Z'
                    fill='url(#paint0_linear_58_2)'
                />
                <defs>
                    <linearGradient
                        id='paint0_linear_58_2'
                        x1='233.901'
                        y1='0.26593'
                        x2='233.901'
                        y2='610.734'
                        gradientUnits='userSpaceOnUse'
                    >
                        <stop stopColor='#00FFD1' />
                        <stop
                            offset='1'
                            stopColor='#0057FF'
                        />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};

export default LogoLoading;
