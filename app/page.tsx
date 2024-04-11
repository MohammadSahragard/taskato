import AddDateBtn from '@/components/ui/buttons/add-date-btn';
import AddReminderBtn from '@/components/ui/buttons/add-reminder-btn';
import AddToFavoriteBtn from '@/components/ui/buttons/add-to-favorite-btn';
import AddToListBtn from '@/components/ui/buttons/add-to-list-btn';
import BackForwardRoutBtn from '@/components/ui/buttons/back-forward-route';

export default function Home() {
    return (
        <div className=''>
            <BackForwardRoutBtn route='back' />
            <BackForwardRoutBtn route='forward' />
            <AddToFavoriteBtn />
            <AddDateBtn />
            <AddToListBtn />
            <AddReminderBtn />
        </div>
    );
}
