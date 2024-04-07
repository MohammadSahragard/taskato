import AddDateBtn from '@/components/ui/buttons/add-date-btn';
import AddToFavoriteBtn from '@/components/ui/buttons/add-to-favorite-btn';
import BackForwardRoutBtn from '@/components/ui/buttons/back-forward-route';

export default function Home() {
    return (
        <div className=''>
            <BackForwardRoutBtn route='back' />
            <BackForwardRoutBtn route='forward' />
            <AddToFavoriteBtn />
            <AddDateBtn />
        </div>
    );
}
