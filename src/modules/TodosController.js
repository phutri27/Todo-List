import { Todos } from "./createProjectAndTodos.js";
let todos =  loadTodo() || [];
function todoControl(){
    const findIndex = (todoId) => {
        const index = todos.findIndex(p => p.id === todoId);
        if (index === -1)
            return;
        return index;
    }
    const addTodos = (tasks, description, dueDate, priority, projectId) => {
        const data = new Todos(tasks, description, dueDate, priority, projectId);
        if (!tasks || !dueDate || priority === "Select"){
            console.log("todo error");
            return;
        }
        todos.push(data);
        saveTodo();
        console.log(todos);
    }

    const deleteTodo = (todoId) =>{
        const index = findIndex(todoId);
        todos.splice(index, 1)
        saveTodo()
    }

    const editTodosData = (tasks, description, dueDate, priority, todoId) => {
        const index = findIndex(todoId);
        todos[index].change(tasks, description, dueDate, priority);
        saveTodo();
    }

    const getTodos = () => {
        return todos.slice();
    }

    const getTodo = (todoId) =>{
        const i = findIndex(todoId);
        return todos[i];
    }

    const deleteTodoAfterProject  = (projectId) => {
        todos.slice().forEach((todo) => {
            if (todo.projectId === projectId)
                deleteTodo(todo.id);
        })
    }

    const saveTodo = () => {
        localStorage.setItem("todo", JSON.stringify(todos.slice()));
    }
    return{
        findIndex,
        addTodos,
        deleteTodo,
        editTodosData,
        getTodos,
        getTodo,
        deleteTodoAfterProject,
    }
}

function loadTodo(){
    const raw = JSON.parse(localStorage.getItem("todo")) || [];
    return raw.map(obj => Object.assign(new Todos(obj.tasks, obj.description, obj.dueDate, obj.priority, obj.projectId), obj))
}

export const todoFunction = todoControl();