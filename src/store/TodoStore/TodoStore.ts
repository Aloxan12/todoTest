import {action, makeAutoObservable, observable} from 'mobx'
import {ITodo} from "../../types/todo";
import {api} from "../../api/api";

class TodoStore {
    @observable
    todoList: ITodo[] = []

    @observable
    totalCount: number = 0

    @observable
    isLoading: boolean = false

    @action
    setIsLoading(loading: boolean){
        this.isLoading = loading
    }

    @action
    setTotalCount(totalCount: number){
        this.totalCount = totalCount
    }

    @action
    setTodoList(todoList: ITodo[]){
        this.todoList = todoList
    }

    @action
    getTodoList = async (page: number = 1) => {
        this.setIsLoading(true)
        try {
            const result = await api.get('todos', { params: { _page: page } });
            const todoList = await result.data;
            if (todoList) {
                this.setTodoList(todoList);
            }
        } catch (e) {
            console.log(e);
        }
        this.setIsLoading(false)
    }

    @action
    getTotalCount = async () => {
        try {
            const response = await api.get('todos'+'?_limit=0', { method: 'HEAD' });
            const totalCount  =  await response.headers.get('x-total-count');
            this.setTotalCount(Number(totalCount) || 0)
        } catch (e) {
            console.log(e);
        }
    }

    constructor() {
        makeAutoObservable(this,{
            todoList: observable,
            isLoading: observable,
            totalCount: observable,
            setTodoList: action,
            getTodoList: action,
            setTotalCount: action,
            getTotalCount: action
        });
    }
}

const todoStore = new TodoStore();
export default todoStore;
