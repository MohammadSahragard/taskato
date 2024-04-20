//* components
import AddTodoBar from '@/components/ui-kits/add-todo-bar';
import TodoItem from '@/components/ui-kits/todo-item';

export default function Home() {
    return (
        <div>
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
