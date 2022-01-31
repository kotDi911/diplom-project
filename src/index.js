import "./main.css"
import "./dark.css"
import "./light.css"
import {api} from "./js/API";
import Auth from "./js/Auth";
import {TaskArea} from "./js/TaskArea";
import {theme} from "./js/them";

const appContainer = document.createElement('div');
document.body.append(appContainer);
const taskArea = new TaskArea({appContainer});
const logo = document.createElement('h2');
logo.innerText = 'byte to-do-list';
logo.classList.add('logo', 'light-theme');
appContainer.prepend(logo);

const renderAppLayout = async (user) => {
    auth.user = user;
    auth.renderHeaderControls();

    taskArea.renderLayout();
    const taskList = await api.getAllTasks();
    taskList.forEach((task) => taskArea.addTask(task))
};

const onLoginSuccess = async () => {
    appContainer.innerHTML = "";
    const user = await api.getSelf();
    renderAppLayout(user);
};
const auth = new Auth({
    appContainer,
    onLoginSuccess,
    logo,
});



const init = async () => {
    const isLoggedIn = api.isLoggedIn();
    if (isLoggedIn) {
        logo.remove();
        const user = await api.autoLogin();
        renderAppLayout(user);
    } else {
        auth.renderAuthForm();
    }
    theme(localStorage.theme);
};

init();
