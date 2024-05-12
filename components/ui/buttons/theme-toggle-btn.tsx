'use client';

// public
import { useEffect, useState } from 'react';

//* components
import { Button } from '@nextui-org/react';
import Icon from '../texts/icon';

//* theme config
import { useTheme } from 'next-themes';

const ThemeToggleBtn = () => {
    // states
    const [hasMounted, setHasMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => setHasMounted(true), []);
    
    // this line is the key to avoid the error.
    if (!hasMounted) return null;

    return (
        <Button
            radius='sm'
            variant='light'
            className='fw-btn p-3'
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
