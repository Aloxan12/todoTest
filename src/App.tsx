import './App.scss'
import {TodoList} from "./components/TodoList/TodoList";
import {useEffect, useState} from "react";
import todoStore from "./store/TodoStore/TodoStore";
import {observer} from "mobx-react";


const App = observer(() => {
    const [loadMore, setLoadMore] = useState(false)
    const {todoList, isLoading, getTodoList, getTotalCount, totalCount} = todoStore

    useEffect(()=>{
        getTotalCount()
    },[getTotalCount])

    useEffect(()=>{
        if(loadMore){
            getTodoList()
                .finally(()=> setLoadMore(false))
        }
    },[loadMore])

    const scrollHandler = (e: Event)=>{
        const doc = (e.target as Document).documentElement
        if(doc.scrollHeight - (doc.scrollTop + window.innerHeight) < 100 && (todoList.length < totalCount)){
            setLoadMore(true)
        }
    }

    useEffect(()=>{
        document.addEventListener('scroll', scrollHandler)
        return ()=>{
            document.removeEventListener('scroll', scrollHandler)
        }
    },[])

    return (
        <div className='app'>
            <TodoList todoList={todoList} isLoading={isLoading}/>
        </div>
    )
})

export default App
