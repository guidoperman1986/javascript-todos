//Referencias html

import { Todo } from "../classes";
import { todoList } from '../index';


const divTodoList       = document.querySelector('.todo-list');
const txtInput          = document.querySelector('.new-todo');
const borrarCompletados = document.querySelector('.clear-completed');
const ulFiltros         = document.querySelector('.filters');
const todoContador      = document.querySelector('#counter');
const anchorFiltro      = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) => {
    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : ''}>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>
    `;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;    

    divTodoList.append(div.firstElementChild);
    return div.firstElementChild;
}

export const todoCounter = () => {
    
    let contador = 0;
    todoList.todos.forEach(todo => {
        if (!todo.completado){
            contador ++;
        }
    });
    todoContador.innerHTML = `<span id='counter' class="todo-count"><strong>${contador}</strong> pendiente(s)</span>`;
}

txtInput.addEventListener('keyup', (event)=>{
    if (event.keyCode === 13 && txtInput.value.length > 0){        
        const nuevoTodo = new Todo(txtInput.value);        
        todoList.nuevoTodo(nuevoTodo);

        crearTodoHtml(nuevoTodo);
        todoCounter();
        txtInput.value = "";
    }
})

divTodoList.addEventListener('click', (event)=>{
    const nombreElemento = event.target.localName;
    const todoElemento   = event.target.parentElement.parentElement;
    const todoId         = todoElemento.getAttribute('data-id');

    console.log(nombreElemento);
    if (nombreElemento.includes('input')){
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed')
        todoCounter();
    }else if (nombreElemento.includes('button')){
        todoList.eliminarTodo(todoId);
        todoElemento.innerHTML = "";
        todoCounter()
    }else if (nombreElemento.includes('label')){
        /* todoElemento.selected(). */
        
    }

    
});

borrarCompletados.addEventListener('click',(event)=>{
   todoList.eliminarCompletados();

    for (let i=divTodoList.children.length-1;i>=0;i--){
        const elemento = divTodoList.children[i];

        if (elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }

    this.todoContador();

});

ulFiltros.addEventListener('click',(event)=>{    
    const filtro = event.target.text;    
    event.target.classList.add('selected');

    if (!filtro){
        return;
    }

    anchorFiltro.forEach(elem => elem.classList.remove('selected'))

    for (const elemento of divTodoList.children){
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        console.log(completado);

        switch(filtro){
            case 'Pendientes':
                if (completado){
                    elemento.classList.add('hidden');
                }
                break;
            
            case 'Completados':
                if (!completado){
                    elemento.classList.add('hidden');
                }
                break;
        }
    }

})

