'use client';

//* components
import { Input } from '@nextui-org/react';
import Icon from '../ui/texts/icon';

//* redux
import { useAppSelector, useAppDispatch } from '@/redux/app/hook';
import { setSearch } from '@/redux/features/optionsSlice';

const Searchbar = () => {
    const searchValue = useAppSelector((state) => state.options.searchValue);
    const dispatch = useAppDispatch();

    return (
        <Input
            startContent={<Icon iconName='search' />}
            placeholder='Search'
            variant='bordered'
            radius='sm'
            size='sm'
            classNames={{
                inputWrapper: 'shadow-none border-2 dark:border-opacity-40',
            }}
            value={searchValue}
            onChange={({ target }: any) => dispatch(setSearch(target.value))}
            isClearable
            onClear={() => dispatch(setSearch(''))}
        />
    );
};

export default Searchbar;
