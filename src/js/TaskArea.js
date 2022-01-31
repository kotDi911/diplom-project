import Form from "./Form";
import Input from "./Input";
import {Task} from "./Task";
import {taskConfig} from "./formConfigs";
import {api} from "./API";
import {theme} from "./them";

const getTaskForm = (onTaskCreated) =>
    new Form({
        title: 'Add task',
        inputs: taskConfig.map((input) => new Input(input)),
        submitBtnText: 'Add',
        onSubmit: async (data) => {
            const createdTask = await api.createTask(data);
            onTaskCreated(createdTask);
        },
    });

export class TaskArea {
    constructor({appContainer}) {
        this.appContainer = appContainer;
        this.taskForm = getTaskForm(this.addTask.bind(this));
        this.tasksContainer = document.createElement('div');
    }

    renderLayout() {
        const taskArea = document.createElement('div');
        const formContainer = document.createElement('div');

        taskArea.classList.add('area');
        formContainer.classList.add('task-form', 'light-theme');
        this.tasksContainer.classList.add('task-cards');
        taskArea.append(formContainer, this.tasksContainer);
        this.taskForm.render(formContainer);
        this.appContainer.append(taskArea);
    }

    addTask(taskData) {
        const task = new Task(taskData);
        task.renderCard(this.tasksContainer);
        theme(localStorage.theme)
    }
}
