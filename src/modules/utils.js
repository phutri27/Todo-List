export class Utils{
    static sorting(project){
        project.forEach((projectItem) => {
            projectItem.todos.sort((a, b) => {
                return Number(a.priority) - Number(b.priority);
            })
        })
    }

    static addPriorityColor(article, priority){
        if (priority === "1")
            article.style.backgroundColor = 'red';
        else if (priority === "2")
            article.style.backgroundColor = 'yellow';
        else if (priority === "3")
            article.style.backgroundColor = 'green';
        else if (priority === "4")
            article.style.backgroundColor = 'lightblue';
    }

}