import AddTodoBar from '@/components/ui-kits/add-todo-bar';
import AddToFavoriteBtn from '@/components/ui/buttons/add-to-favorite-btn';
import BackForwardRoutBtn from '@/components/ui/buttons/back-forward-route';

export default function Home() {
    return (
        <div>
            <BackForwardRoutBtn route='back' />
            <BackForwardRoutBtn route='forward' />
            <AddToFavoriteBtn />
            <AddTodoBar />
        </div>
    );
}
