import {action, makeAutoObservable, observable} from 'mobx'
import {ITodo} from "../../types/todo";
import {api} from "../../api/api";

class TodoStore {
    @observable
    todoList: ITodo[] = []

    @observable
    page: number = 1

    @observable
    totalCount: number = 1

    @observable
    isLoading: boolean = false

    @action
    setPage(page: number){
        this.page = page
    }

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
        this.todoList = [...this.todoList, ...todoList]
    }

    @action
    getTodoList = async () => {
        this.setIsLoading(true)
        try {
            const result = await api.get('todos', { params: { _page: this.page } });
            const todoList = await result.data;
            if (todoList) {
                this.setTodoList(todoList);
                this.setPage(this.page + 1)
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
            page: observable,
            totalCount: observable,
            setTodoList: action,
            setPage: action,
            getTodoList: action,
            setTotalCount: action,
            getTotalCount: action
        });
    }
}

const todoStore = new TodoStore();
export default todoStore;
