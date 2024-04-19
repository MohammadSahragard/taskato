//* components
import AddTodoBar from '@/components/ui-kits/add-todo-bar';
import TodoItem from '@/components/ui-kits/todo-item';
import BackForwardRoutBtn from '@/components/ui/buttons/back-forward-route';

export default function Home() {
    return (
        <div>
            <BackForwardRoutBtn route='back' />
            <BackForwardRoutBtn route='forward' />
            <TodoItem
                todoText='This is a Todo item'
                isInFavorite
                todoSubDetail
            />
            <TodoItem
                todoText='This is a Todo item 2'
                isCompleted
            />
            <br />
            <AddTodoBar />
        </div>
    );
}
