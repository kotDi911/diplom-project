import {api} from "./API";
import Form from "./Form";
import Input from "./Input";
import {loginConfig, registerConfig} from "./formConfigs";
import {Theme, theme} from "./them";

const getLoginForm = (onSuccess) =>
    new Form({
        title: "Login",
        inputs: loginConfig.map((input) => new Input(input)),
        submitBtnText: "Submit",
        onSubmit: async (data) => {
            await api.login(data);
            onSuccess();
        },
    });

const getRegisterForm = (onSuccess) =>
    new Form({
        title: "Register",
        inputs: registerConfig.map((input) => new Input(input)),
        submitBtnText: "Submit",
        onSubmit: async (data) => {
            await api.register(data);
            onSuccess();
        },
    });

export class Auth {
    constructor({appContainer, onLoginSuccess}) {
        this.appContainer = appContainer;
        this.logo = document.createElement('div');
        this.logoutContainer = document.createElement('div');
        this.formContainer = document.createElement('div');
        this.switchBtn = document.createElement('button');
        this.logoutBtn = document.createElement('button');
        this.avatar = document.createElement('span');
        this.theme = document.createElement('button');

        this.form = null;
        this.user = null;
        this.isLogin = true;

        this.loginForm = getLoginForm(onLoginSuccess);
        this.registerForm = getRegisterForm(this.renderAuthForm.bind(this));

        this.createFormContainer();
        this.createHeaderControls();

        if(this.switchTheme !== "2"){
            this.switchTheme = "1";
            console.log("constructor", localStorage.theme);
        }else {
            this.switchTheme = localStorage.theme;
            console.log("constructor", localStorage.theme);
        }
    }

    createFormContainer() {
        this.formContainer.classList.add('auth-form', 'light-theme');
        this.switchBtn.classList.add('switch', 'light-theme');
        this.switchBtn.innerText = "Register";

        this.switchBtn.addEventListener("click", () => {
            this.renderAuthForm();
        });
    }

    createHeaderControls() {

        this.logo.classList.add('logo', 'light-theme');
        this.logo.innerText = "byte tasks";
        this.logoutContainer.classList.add('logout-container', 'light-theme');
        this.logoutBtn.classList.add('logout-btn', 'light-theme');
        this.logoutBtn.innerText = "Logout";
        this.avatar.classList.add('avatar');
        this.theme.classList.add('theme-btn', 'light-theme');
        this.theme.innerText = "theme";

        this.theme.addEventListener("click", () => {
            if(this.switchTheme === "1"){
               new Theme().darkTheme();
                localStorage.theme = 1;
                this.switchTheme = "2"
            }else {
                new Theme().lightTheme();
                localStorage.theme = 2;
                this.switchTheme = "1"
            }
        });

        this.logoutBtn.addEventListener("click", () => {
            this.logout();
            api.logout();
        });

    }

    renderHeaderControls() {
        const controlsContainer = document.createElement('div');
        controlsContainer.classList.add('header-controls', 'light-theme');

        this.avatar.innerText = this.user.name[0];
        this.logoutContainer.append( this.logoutBtn, this.avatar, this.theme);
        controlsContainer.append(this.logo, this.logoutContainer);
        this.appContainer.append(controlsContainer);
    }


    renderAuthForm() {
        this.isLogin = !this.isLogin;

        if (this.form) {
            this.form.form.remove();
        }

        if (this.isLogin) {
            this.switchBtn.innerText = "Register";
            this.form = this.registerForm;
        } else {
            this.switchBtn.innerText = "Login";
            this.form = this.loginForm;
        }

        this.formContainer.append(this.switchBtn);
        this.form.render(this.formContainer);
        this.appContainer.append(this.formContainer);
    }

    logout() {
        this.logo.innerText = 'byte to-do-list';
        this.avatar.remove();
        this.logoutBtn.remove();
        this.appContainer.innerHTML = "";
        this.appContainer.prepend(this.logo);
        this.isLogin = true;

        this.renderAuthForm();

        if(this.switchTheme === "1"){
            new Theme().darkTheme();
        }else {
            new Theme().lightTheme();
        }
    }
}

export default Auth