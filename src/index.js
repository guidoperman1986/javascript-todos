import './styles.css';

import { Todo,TodoList } from './classes/index';
import { crearTodoHtml,todoCounter } from './js/componentes';

export const todoList = new TodoList();

/* const tarea = new Todo('Aprender Javascript');
tarea.completado = false;

todoList.nuevoTodo(tarea)

crearTodoHtml(todo);
 */

console.log(todoList.todos);

todoList.todos.forEach(todo => crearTodoHtml(todo));
todoCounter();
