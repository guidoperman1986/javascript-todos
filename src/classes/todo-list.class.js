import { Todo } from "./todo.class";

export class TodoList{

    constructor(){        

        this.todos = (localStorage.getItem('todo')) 
                        ? this.cargarLocalStorage() 
                        : [];
        
        this.todos = this.todos.map(obj => Todo.fromJson(obj));
        
    }

    nuevoTodo(todo){
        this.todos.push(todo);
        this.guardarLocalStorage()
    }

    eliminarTodo(id){        
        this.todos = this.todos.filter(todo=>todo.id != id);
        this.guardarLocalStorage();
    }

    marcarCompletado(id){
        this.todos.forEach(todo =>{

            console.log(id, todo.id);
            if(todo.id == id){
                todo.completado = !todo.completado;
                /* break; */
            }
        });
    }

    eliminarCompletados(){
        this.todos = this.todos.filter(todo=>todo.completado != true);
        this.guardarLocalStorage();
    }

    guardarLocalStorage(){
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }
    
    cargarLocalStorage(){
        return JSON.parse(localStorage.getItem('todo'))
    }
}