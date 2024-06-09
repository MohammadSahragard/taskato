//* Components
import BackForwardRoutBtn from '../ui/buttons/back-forward-route';
import MenuToggleBtn from '../ui/buttons/menu-toggle-btn';
import TabHeading from '../ui/texts/tab-heading';

const MainHeader = () => {
    return (
        <header className='main-header'>
            {/* header options */}
            <section className='hidden md:block'>
                <BackForwardRoutBtn route='back' />
                <BackForwardRoutBtn route='forward' />
            </section>
            <section className='md:hidden'>
                <MenuToggleBtn />
            </section>

            {/* tab heading */}
            <TabHeading />
        </header>
    );
};

export default MainHeader;
