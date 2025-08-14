import { Todos } from "./createProjectAndTodos.js";
import { projectFunction } from "./ProjectController.js";

let todos = [];
function todoControl(){
    const findIndex = (todoId) => {
        const index = todos.findIndex(p => p.id === todoId);
        if (index === -1)
            return;
        return index;
    }
    const addTodos = (tasks, description, dueDate, priority, projectId) => {
        const data = new Todos(tasks, description, dueDate, priority, projectId);
        todos.push(data);
    }

    const deleteTodo = (todoId) =>{
        const index = findIndex(todoId);
        todos.splice(index, 1)
    }

    const editTodosData = (tasks, description, dueDate, priority, todoId) => {
        const index = findIndex(todoId);
        todos[index].change(tasks, description, dueDate, priority);
    }

    const getTodos = () => {
        return todos.slice();
    }

    const getTodo = (todoId) =>{
        const i = findIndex(todoId);
        return todos[i];
    }
    return{
        findIndex,
        addTodos,
        deleteTodo,
        editTodosData,
        getTodos,
        getTodo,
    }
}
export const todoFunction = todoControl();