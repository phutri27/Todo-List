import "./styles/styles.css"
import { AddProjectAndTodos } from "./modules/AddProjectAndTodos.js";
import { Utils } from "./modules/utils.js";

function loadPage(){
    //Dialog 1
    const dialog1 = document.querySelector(".dialog-1");
    const dialog1Btn = document.querySelector(".add-project");
    const form1 = document.querySelector(".dialog-1 form");
    const closeProjectBtn = document.querySelector(".close-project-btn");
    const title = document.querySelector("#title");

    //Dialog 2
    const dialog2 = document.querySelector(".dialog-2");
    const dialog2Btn = document.querySelector(".add-todos");
    const form2 = document.querySelector(".dialog-2 form");
    const closeTodosBtn = document.querySelector(".close-todos-btn");
    const select = document.querySelector(".dialog-2 #project");

    //Cac thanh phan dung de add vao Todos
    const tasks = document.querySelector("#tasks");
    const description = document.querySelector("#description");
    const dueDate = document.querySelector("#dueDate");
    const priority = document.querySelector("#priority");

    // thanh phan dung de them vao project list
    const projectList = document.querySelector(".project-list");
    const todosList = document.querySelector(".todos-list");
    const project = AddProjectAndTodos.project;
    let mock;

    const loadProjectOption = () => {
        select.innerHTML = ''
        project.forEach((projectItem)=>{
            const option = document.createElement("option");
            option.value = projectItem.id;
            option.textContent = projectItem.title;
            select.appendChild(option);
        })
    }

    const loadProjectList = () => {
        projectList.innerHTML = '';
        project.forEach((projectItem)=>{
            const div = document.createElement("div");
            const projectName = document.createElement("button");
            const delBtn = document.createElement("button");
            projectName.classList.add("prj-name");
            delBtn.classList.add("del-btn");
            projectName.dataset.projectId = projectItem.id;
            delBtn.dataset.projectId = projectItem.id;
            projectName.textContent = projectItem.title;
            delBtn.textContent = "delete";
            div.append(projectName, delBtn);
            projectList.appendChild(div);
        })
    }

    const loadTodos = (currentProject) =>{
        todosList.innerHTML = '';
        currentProject.todos.forEach((todosItem)=>{
            const article = document.createElement("article");

            const task = document.createElement("p");
            task.textContent = todosItem.task;
            
            const content = document.createElement("p");
            content.textContent = todosItem.description;
            
            const dueDateElem = document.createElement("p");
            dueDateElem.textContent = todosItem.dueDate;

            const priorityElem = document.createElement("p");
            priorityElem.textContent = todosItem.priority;

            const delBtn = document.createElement("button");
            delBtn.textContent = "Complete";
            delBtn.classList.add("list-del-btn");
            delBtn.dataset.todosId = todosItem.id;

            const changeBtn = document.createElement("button");
            changeBtn.textContent = "Change";
            changeBtn.classList.add("change-btn");
            changeBtn.dataset.todosId = todosItem.id;

            article.append(task, content, dueDateElem, priorityElem, delBtn, changeBtn);
            Utils.addPriorityColor(article, todosItem.priority);
            todosList.appendChild(article);
        })
    }

    const loadTodosList = (e) => {
        const selectedProject = e.target.dataset.projectId;
        let currentProject;
        project.forEach((projectItem)=>{
            if (projectItem.id === selectedProject){
                currentProject = projectItem;
            }
        })
        loadTodos(currentProject);
    }

    const changeTodos = (parentElem, id) =>{
        const taskChange = document.createElement("input");
        taskChange.id = "task-change";
        taskChange.name = "task-change";
        taskChange.type = "text"

        taskChange.value = parentElem.children[0].textContent;
        parentElem.children[0].replaceWith(taskChange);

        const descriptionChange =document.createElement("input");
        descriptionChange.id = "description-change";
        descriptionChange.name = "description-change";
        descriptionChange.type = "text"

        descriptionChange.value = parentElem.children[1].textContent;
        parentElem.children[1].replaceWith(descriptionChange);

        const dateChange = document.createElement("input");
        dateChange.id = "date-change";
        dateChange.name = "date-change";
        dateChange.type = "date"

        dateChange.value = parentElem.children[2].textContent;
        parentElem.children[2].replaceWith(dateChange);

        const priorityChange = document.createElement("select");
        priorityChange.id = "priority-change";
        priorityChange.name = "priority-change";

        const option1 = document.createElement("option");
        option1.value = "1";
        option1.textContent = "1";
        const option2 = document.createElement("option");
        option2.value = "2";
        option2.textContent = "2";
        const option3 = document.createElement("option");
        option3.value = "3";
        option3.textContent = "3";
        const option4 = document.createElement("option");
        option4.value = "4";
        option4.textContent = "4";

        priorityChange.appendChild(option1)
        priorityChange.appendChild(option2)
        priorityChange.appendChild(option3)
        priorityChange.appendChild(option4)

        priorityChange.value = parentElem.children[3].textContent;
        parentElem.children[3].replaceWith(priorityChange);

        const saveChange = document.createElement("button");
        saveChange.textContent = "Save changes";
        saveChange.dataset.todosId = id;
        saveChange.classList.add("save-change-btn");
        parentElem.children[5].replaceWith(saveChange);
    }
    //EventListener cua dialog 1
    dialog1Btn.addEventListener("click", (e)=>{
        dialog1.showModal();
    })

    form1.addEventListener("submit", (e) =>{
        e.preventDefault();
        AddProjectAndTodos.addProject(title);
        loadProjectOption();
        loadProjectList();
        title.value = '';
        dialog1.close();
    })

    closeProjectBtn.addEventListener("click", (e) =>{
        dialog1.close();
        title.value = ''
    })

    //EventListener cuar dialog 2
    dialog2Btn.addEventListener("click",(e)=>{
        dialog2.showModal();
    })

    form2.addEventListener("submit", (e) =>{
        e.preventDefault();
        AddProjectAndTodos.addTodos(tasks, description, dueDate, priority, select.value);
        const prjIndex = project.findIndex(p => p.id === select.value);
        Utils.sorting(project);
        if (mock === select.value)
            loadTodos(project[prjIndex]);
        tasks.value = '';
        description.value = '';
        dueDate.value = '';
        priority.value = '';
        dialog2.close()
    })

    closeTodosBtn.addEventListener("click", (e)=>{
        dialog2.close();
        tasks.value = '';
        description.value = ''; 
        dueDate.value = '';
        priority.value = '';
    })

    //MVC thay doi project list va todos list
    projectList.addEventListener("click", (e)=>{
        const id = e.target.dataset.projectId;
        mock = id;
        if (!id || !e.target.matches(".prj-name, .del-btn"))
            return;
        const index = project.findIndex(b => b.id === id);
        if (index === -1)
            return;
        if (e.target.matches(".prj-name")){
            loadTodosList(e);
        }
        else if (e.target.matches(".del-btn")){
            project.splice(index, 1);
            loadProjectList(e)
        }
        AddProjectAndTodos.saveProject();
    });

    todosList.addEventListener("click", (e)=>{
        const id = e.target.dataset.todosId;
        let currentTodos;
        let prjIndex;
        let todosIndex;
        project.forEach((projectItem, idx)=>{
            projectItem.todos.forEach((todosItem, index)=>{
                if (todosItem.id === id){
                    currentTodos = todosItem;
                    prjIndex = idx;
                    todosIndex = index;
                }
            })
        })
        if (e.target.matches(".list-del-btn")){
            project[prjIndex].todos.splice(todosIndex, 1);
            loadTodos(project[prjIndex]);
        }
        else if(e.target.matches(".change-btn")){
            const parentElem = e.target.parentElement;
            changeTodos(parentElem, id);
        }
        else if (e.target.matches(".save-change-btn")){
            const taskChange = document.querySelector("#task-change");
            const descriptionChange = document.querySelector("#description-change");
            const dateChange = document.querySelector("#date-change");
            const priorityChange = document.querySelector("#priority-change");

            project[prjIndex].todos[todosIndex].task = taskChange.value;
            project[prjIndex].todos[todosIndex].description = descriptionChange.value;
            project[prjIndex].todos[todosIndex].dueDate = dateChange.value;
            project[prjIndex].todos[todosIndex].priority = priorityChange.value;
            Utils.sorting(project);
            loadTodos(project[prjIndex]);
        }
        AddProjectAndTodos.saveProject();
    })

    loadProjectOption();
    loadProjectList();
}

loadPage();