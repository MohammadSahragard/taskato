//* Components
import MenuItem from '@/components/ui-kits/menu-item';
import ProfileAccount from '@/components/ui-kits/profile-account';
import Searchbar from '@/components/ui-kits/search-bar';
import TaskListCon from '@/components/ui-kits/task-list-con';
import AddListBtn from '@/components/ui/buttons/add-list-btn';
import SignOutBtn from '@/components/ui/buttons/sign-out-btn';
import ThemeToggleBtn from '@/components/ui/buttons/theme-toggle-btn';
import Divider from '@/components/ui/texts/divider';
import Subtitle from '@/components/ui/texts/subtitle';

//* Data
import { menuLinks } from '@/helper/data/data';

const MenuComponents = () => {
    return (
        <div className='menu-components'>
            {/* Menu header (profile section & searchbar) */}
            <ProfileAccount />
            <Searchbar />

            <div className='my-3'>
                {/* Menu links */}
                <section className='mb-2'>
                    <Subtitle
                        subtitle='TASKS'
                        additionalClasses='text-xs my-2'
                    />

                    {menuLinks.map((link) => (
                        <MenuItem
                            key={link.id}
                            href={link.href}
                            label={link.title}
                            iconName={link.iconName}
                        />
                    ))}
                </section>

                <Divider />

                {/* Lists */}
                <section className='mt-2'>
                    <Subtitle
                        subtitle='LISTS'
                        additionalClasses='text-xs my-2'
                    />

                    <TaskListCon />

                    <AddListBtn />
                </section>
            </div>

            {/* Menu options (theme toggler & sign out button) */}
            <div>
                <ThemeToggleBtn />
                <SignOutBtn />
            </div>
        </div>
    );
};

export default MenuComponents;
