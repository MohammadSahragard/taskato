'use client';

//* components
import { Button } from '@nextui-org/react';
import Icon from '../texts/icon';

//* theme config
import { useTheme } from 'next-themes';

const ThemeToggleBtn = () => {
    const { theme, setTheme } = useTheme();

    return (
        <Button
            radius='sm'
            variant='light'
            className='fw-btn'
            startContent={
                <Icon
                    iconName={theme === 'light' ? 'sun-bright' : 'moon'}
                    color={theme === 'light' ? 'text-warning' : 'text-primary'}
                    style='fas'
                />
            }
            onClick={() =>
                theme === 'light' ? setTheme('dark') : setTheme('light')
            }
        >
            Theme : {theme}
        </Button>
    );
};

export default ThemeToggleBtn;
