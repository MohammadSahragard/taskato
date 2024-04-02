'use client';

//* components
import { Input } from '@nextui-org/react';
import Icon from '../ui/texts/icon';

//* redux
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '@/redux/features/optionsSlice';

const Searchbar = () => {
    const searchValue = useSelector((state: any) => state.options.searchValue);
    const dispatch = useDispatch();

    return (
        <Input
            startContent={<Icon iconName='search' />}
            placeholder='Search'
            variant='bordered'
            radius='sm'
            classNames={{
                inputWrapper: 'shadow-none',
            }}
            value={searchValue}
            onChange={({ target }: any) => dispatch(setSearch(target.value))}
        />
    );
};

export default Searchbar;
