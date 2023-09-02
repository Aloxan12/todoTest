import cls from './TodoItem.module.scss'
import {ITodo} from "../../../../types/todo";
import {memo} from "react";
import {AppCheckbox} from "../../../Checkbox/AppCheckbox";

interface ITodoItemProps{
    todo: ITodo
}

export const TodoItem = memo(({todo}:ITodoItemProps) => {
    return (
        <div className={cls.todoItemWrapBg}>
            <div className={cls.todoItemWrap}>
                <div className={cls.title}>
                    <AppCheckbox id={`${todo.id}`} value={todo.completed} />
                    {todo.title} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur impedit quod reprehenderit sapiente sit tenetur voluptatibus. Doloremque optio repudiandae ullam?
                </div>
                <div className={cls.date}>
                    <div className={cls.dateItem}>1</div>
                    <div className={cls.dateItem}>2</div>
                </div>
                <div className={cls.description}>описание</div>
                <div className={cls.footer}>тэги</div>
            </div>
        </div>
    );
})