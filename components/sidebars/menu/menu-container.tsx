//* components
import MenuItem from '@/components/ui-kits/menu-item';
import ProfileAccount from '@/components/ui-kits/profile-account';
import Searchbar from '@/components/ui-kits/search-bar';
import AddListBtn from '@/components/ui/buttons/add-list-btn';
import MenuToggleBtn from '@/components/ui/buttons/menu-toggle-btn';
import SignOutBtn from '@/components/ui/buttons/sign-out-btn';
import ThemeToggleBtn from '@/components/ui/buttons/theme-toggle-btn';
import Divider from '@/components/ui/texts/divider';
import Heading from '@/components/ui/texts/heading';
import Icon from '@/components/ui/texts/icon';
import ItemsCounter from '@/components/ui/texts/items-counter';
import Subtitle from '@/components/ui/texts/subtitle';
import Title from '@/components/ui/texts/title';

const MenuContainer = () => {
    return (
        <aside className='menu-container'>
            <ProfileAccount />
            {/* text components */}
            <Heading heading='Heading component' />
            <Title title='Title component' />
            <Subtitle subtitle='Subtitle component' />
            <ItemsCounter value={5} />
            <br />
            <br />
            <Divider />
            <br />
            {/* ui kits components */}
            <Searchbar />
            <br />
            <MenuItem
                href='/'
                label='Menu Item (active)'
                iconName='house-blank'
            />
            <MenuItem
                href='/not-active'
                label='Menu Item'
                iconName='star'
            />
            {/* button components */}
            <MenuToggleBtn />
            <AddListBtn />
            <ThemeToggleBtn />
            <SignOutBtn />
        </aside>
    );
};

export default MenuContainer;
