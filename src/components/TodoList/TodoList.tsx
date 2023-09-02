import {memo, useEffect} from "react";
import todoStore from "../../store/TodoStore/TodoStore";
import {observer} from "mobx-react";
import cls from './TodoList.module.scss'
import {TodoListHeader} from "./components/TodoListHeader/TodoListHeader";
import {TodoItem} from "./components/TodoItem/TodoItem";

export const TodoList = observer(() => {
    const {todoList, isLoading, getTodoList, getTotalCount, totalCount} = todoStore

    useEffect(()=>{
        getTotalCount().finally(()=> console.log('success'))
        getTodoList(1)
    },[])

    return (
        <div className={cls.todoListWrap}>
            <TodoListHeader count={totalCount}/>
            {todoList.map((todo)=> <TodoItem todo={todo} key={todo.id}/>)}
        </div>
    );
})