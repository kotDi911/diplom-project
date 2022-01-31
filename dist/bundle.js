/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dark.css":
/*!**********************!*\
  !*** ./src/dark.css ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://diplom/./src/dark.css?");

/***/ }),

/***/ "./src/light.css":
/*!***********************!*\
  !*** ./src/light.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://diplom/./src/light.css?");

/***/ }),

/***/ "./src/main.css":
/*!**********************!*\
  !*** ./src/main.css ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://diplom/./src/main.css?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _main_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.css */ \"./src/main.css\");\n/* harmony import */ var _dark_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dark.css */ \"./src/dark.css\");\n/* harmony import */ var _light_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./light.css */ \"./src/light.css\");\n/* harmony import */ var _js_API__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/API */ \"./src/js/API.js\");\n/* harmony import */ var _js_Auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./js/Auth */ \"./src/js/Auth.js\");\n/* harmony import */ var _js_TaskArea__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./js/TaskArea */ \"./src/js/TaskArea.js\");\n/* harmony import */ var _js_them__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./js/them */ \"./src/js/them.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst appContainer = document.createElement('div');\r\ndocument.body.append(appContainer);\r\nconst taskArea = new _js_TaskArea__WEBPACK_IMPORTED_MODULE_5__.TaskArea({appContainer});\r\nconst logo = document.createElement('h2');\r\nlogo.innerText = 'byte to-do-list';\r\nlogo.classList.add('logo', 'light-theme');\r\nappContainer.prepend(logo);\r\n\r\nconst renderAppLayout = async (user) => {\r\n    auth.user = user;\r\n    auth.renderHeaderControls();\r\n\r\n    taskArea.renderLayout();\r\n    const taskList = await _js_API__WEBPACK_IMPORTED_MODULE_3__.api.getAllTasks();\r\n    taskList.forEach((task) => taskArea.addTask(task))\r\n};\r\n\r\nconst onLoginSuccess = async () => {\r\n    appContainer.innerHTML = \"\";\r\n    const user = await _js_API__WEBPACK_IMPORTED_MODULE_3__.api.getSelf();\r\n    renderAppLayout(user);\r\n};\r\nconst auth = new _js_Auth__WEBPACK_IMPORTED_MODULE_4__[\"default\"]({\r\n    appContainer,\r\n    onLoginSuccess,\r\n    logo,\r\n});\r\n\r\n\r\n\r\nconst init = async () => {\r\n    const isLoggedIn = _js_API__WEBPACK_IMPORTED_MODULE_3__.api.isLoggedIn();\r\n    if (isLoggedIn) {\r\n        logo.remove();\r\n        const user = await _js_API__WEBPACK_IMPORTED_MODULE_3__.api.autoLogin();\r\n        renderAppLayout(user);\r\n    } else {\r\n        auth.renderAuthForm();\r\n    }\r\n    (0,_js_them__WEBPACK_IMPORTED_MODULE_6__.theme)(localStorage.theme);\r\n};\r\n\r\ninit();\r\n\n\n//# sourceURL=webpack://diplom/./src/index.js?");

/***/ }),

/***/ "./src/js/API.js":
/*!***********************!*\
  !*** ./src/js/API.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TOKEN_KEY\": () => (/* binding */ TOKEN_KEY),\n/* harmony export */   \"api\": () => (/* binding */ api)\n/* harmony export */ });\n/* harmony import */ var _them__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./them */ \"./src/js/them.js\");\n\r\n\r\nconst TOKEN_KEY = \"token\";\r\n\r\nclass ApiError extends Error {\r\n    constructor({message, data, status}) {\r\n        super(message);\r\n        this.status = status;\r\n        this.data = data;\r\n    }\r\n}\r\n\r\nclass API {\r\n    constructor() {\r\n        this.baseUrl = \"https://byte-tasks.herokuapp.com/api\";\r\n        this.headers = {\r\n            Authorization: null,\r\n            \"Content-Type\": \"application/json\",\r\n        };\r\n    }\r\n\r\n    async handleErrors(response) {\r\n        const { ok, status, statusText } = response;\r\n        if (!ok) {\r\n            throw new ApiError({\r\n                message: \"Error! \",\r\n                data: await response.json(),\r\n                status: status\r\n            })\r\n        }\r\n    }\r\n\r\n    async register(data) {\r\n        const response = await fetch(`${this.baseUrl}/auth/register`, {\r\n            method: \"POST\",\r\n            headers: this.headers,\r\n            body: JSON.stringify(data),\r\n        });\r\n\r\n        await this.handleErrors(response);\r\n\r\n        const registeredUser = await response.json();\r\n\r\n        return registeredUser;\r\n    }\r\n\r\n    async login(data) {\r\n        const response = await fetch(`${this.baseUrl}/auth/login`, {\r\n            method: \"POST\",\r\n            headers: this.headers,\r\n            body: JSON.stringify(data),\r\n        });\r\n\r\n        await this.handleErrors(response);\r\n\r\n        const { token } = await response.json();\r\n\r\n        this.headers.Authorization = `Bearer ${token}`;\r\n        localStorage.setItem(TOKEN_KEY, token);\r\n    }\r\n\r\n    async getSelf() {\r\n        const response = await fetch(`${this.baseUrl}/auth/user/self`, {\r\n            method: \"GET\",\r\n            headers: this.headers,\r\n        });\r\n\r\n        await this.handleErrors(response);\r\n\r\n        const user = await response.json();\r\n        return user;\r\n    }\r\n\r\n    isLoggedIn() {\r\n        return Boolean(localStorage.getItem(TOKEN_KEY));\r\n    }\r\n\r\n    autoLogin() {\r\n        const localToken = localStorage.getItem(TOKEN_KEY);\r\n        this.headers.Authorization = `Bearer ${localToken}`;\r\n        return this.getSelf();\r\n    }\r\n\r\n    async createTask(data) {\r\n        const response = await fetch(`${this.baseUrl}/task`, {\r\n            method: \"POST\",\r\n            body: JSON.stringify(data),\r\n            headers: this.headers,\r\n        });\r\n\r\n        await this.handleErrors(response);\r\n\r\n        return response.json();\r\n    }\r\n\r\n    async getAllTasks() {\r\n        const response = await fetch(`${this.baseUrl}/task`, {\r\n            method: \"GET\",\r\n            headers: this.headers,\r\n        });\r\n\r\n        await this.handleErrors(response);\r\n\r\n        return await response.json();\r\n    }\r\n\r\n    async editTask(id, data) {\r\n        const res = await fetch(`${this.baseUrl}/task/${id}`, {\r\n            method: \"PATCH\",\r\n            body: JSON.stringify(data),\r\n            headers: this.headers,\r\n        });\r\n\r\n        await this.handleErrors(res);\r\n\r\n        return res.json();\r\n    }\r\n\r\n    async deleteTask(id) {\r\n        const res = await fetch(`${this.baseUrl}/task/${id}`, {\r\n            method: \"DELETE\",\r\n            headers: this.headers,\r\n        });\r\n\r\n        await this.handleErrors(res);\r\n\r\n        return res;\r\n    }\r\n\r\n    logout() {\r\n        localStorage.removeItem(TOKEN_KEY);\r\n        (0,_them__WEBPACK_IMPORTED_MODULE_0__.theme)(localStorage.theme);\r\n    }\r\n}\r\n\r\nconst api = new API();\n\n//# sourceURL=webpack://diplom/./src/js/API.js?");

/***/ }),

/***/ "./src/js/Auth.js":
/*!************************!*\
  !*** ./src/js/Auth.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Auth\": () => (/* binding */ Auth),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _API__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./API */ \"./src/js/API.js\");\n/* harmony import */ var _Form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Form */ \"./src/js/Form.js\");\n/* harmony import */ var _Input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Input */ \"./src/js/Input.js\");\n/* harmony import */ var _formConfigs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./formConfigs */ \"./src/js/formConfigs.js\");\n/* harmony import */ var _them__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./them */ \"./src/js/them.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nconst getLoginForm = (onSuccess) =>\r\n    new _Form__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\r\n        title: \"Login\",\r\n        inputs: _formConfigs__WEBPACK_IMPORTED_MODULE_3__.loginConfig.map((input) => new _Input__WEBPACK_IMPORTED_MODULE_2__[\"default\"](input)),\r\n        submitBtnText: \"Submit\",\r\n        onSubmit: async (data) => {\r\n            await _API__WEBPACK_IMPORTED_MODULE_0__.api.login(data);\r\n            onSuccess();\r\n        },\r\n    });\r\n\r\nconst getRegisterForm = (onSuccess) =>\r\n    new _Form__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\r\n        title: \"Register\",\r\n        inputs: _formConfigs__WEBPACK_IMPORTED_MODULE_3__.registerConfig.map((input) => new _Input__WEBPACK_IMPORTED_MODULE_2__[\"default\"](input)),\r\n        submitBtnText: \"Submit\",\r\n        onSubmit: async (data) => {\r\n            await _API__WEBPACK_IMPORTED_MODULE_0__.api.register(data);\r\n            onSuccess();\r\n        },\r\n    });\r\n\r\nclass Auth {\r\n    constructor({appContainer, onLoginSuccess}) {\r\n        this.appContainer = appContainer;\r\n        this.logo = document.createElement('div');\r\n        this.logoutContainer = document.createElement('div');\r\n        this.formContainer = document.createElement('div');\r\n        this.switchBtn = document.createElement('button');\r\n        this.logoutBtn = document.createElement('button');\r\n        this.avatar = document.createElement('span');\r\n        this.theme = document.createElement('button');\r\n\r\n        this.form = null;\r\n        this.user = null;\r\n        this.isLogin = true;\r\n\r\n        this.loginForm = getLoginForm(onLoginSuccess);\r\n        this.registerForm = getRegisterForm(this.renderAuthForm.bind(this));\r\n\r\n        this.baseThem();\r\n\r\n        this.createFormContainer();\r\n        this.createHeaderControls();\r\n    }\r\n\r\n    baseThem(){\r\n        if(!this.switchTheme){\r\n            this.switchTheme = \"light\";\r\n            console.log(\"constructor\", localStorage.theme);\r\n            console.log(\"this.switchTheme\", this.switchTheme);\r\n        }else {\r\n            this.switchTheme = localStorage.theme;\r\n            console.log(\"constructor\", localStorage.theme);\r\n            console.log(\"this.switchTheme\", this.switchTheme);\r\n        }\r\n        return this.switchTheme;\r\n    }\r\n\r\n    createFormContainer() {\r\n        this.formContainer.classList.add('auth-form', 'light-theme');\r\n        this.switchBtn.classList.add('switch', 'light-theme');\r\n        this.switchBtn.innerText = \"Register\";\r\n\r\n        this.switchBtn.addEventListener(\"click\", () => {\r\n            this.renderAuthForm();\r\n        });\r\n    }\r\n\r\n    createHeaderControls() {\r\n\r\n        this.logo.classList.add('logo', 'light-theme');\r\n        this.logo.innerText = \"byte tasks\";\r\n        this.logoutContainer.classList.add('logout-container', 'light-theme');\r\n        this.logoutBtn.classList.add('logout-btn', 'light-theme');\r\n        this.logoutBtn.innerText = \"Logout\";\r\n        this.avatar.classList.add('avatar');\r\n        this.theme.classList.add('theme-btn', 'light-theme');\r\n        this.theme.innerText = \"theme\";\r\n\r\n        this.theme.addEventListener(\"click\", () => {\r\n            this.baseThem();\r\n            if(this.switchTheme === \"dark\"){\r\n                (0,_them__WEBPACK_IMPORTED_MODULE_4__.theme)(this.switchTheme);\r\n                this.switchTheme = \"light\";\r\n                localStorage.setItem(\"theme\", this.switchTheme)\r\n            }else {\r\n                (0,_them__WEBPACK_IMPORTED_MODULE_4__.theme)(this.switchTheme);\r\n                this.switchTheme = \"dark\";\r\n                localStorage.setItem(\"theme\", this.switchTheme)\r\n            }\r\n        });\r\n\r\n        this.logoutBtn.addEventListener(\"click\", () => {\r\n            this.logout();\r\n            _API__WEBPACK_IMPORTED_MODULE_0__.api.logout();\r\n        });\r\n\r\n    }\r\n\r\n    renderHeaderControls() {\r\n        const controlsContainer = document.createElement('div');\r\n        controlsContainer.classList.add('header-controls', 'light-theme');\r\n\r\n        this.avatar.innerText = this.user.name[0];\r\n        this.logoutContainer.append( this.logoutBtn, this.avatar, this.theme);\r\n        controlsContainer.append(this.logo, this.logoutContainer);\r\n        this.appContainer.append(controlsContainer);\r\n    }\r\n\r\n\r\n    renderAuthForm() {\r\n        this.isLogin = !this.isLogin;\r\n\r\n        if (this.form) {\r\n            this.form.form.remove();\r\n        }\r\n\r\n        if (this.isLogin) {\r\n            this.switchBtn.innerText = \"Register\";\r\n            this.form = this.registerForm;\r\n        } else {\r\n            this.switchBtn.innerText = \"Login\";\r\n            this.form = this.loginForm;\r\n        }\r\n\r\n        this.formContainer.append(this.switchBtn);\r\n        this.form.render(this.formContainer);\r\n        this.appContainer.append(this.formContainer);\r\n    }\r\n\r\n    logout() {\r\n        this.logo.innerText = 'byte to-do-list';\r\n        this.avatar.remove();\r\n        this.logoutBtn.remove();\r\n        this.appContainer.innerHTML = \"\";\r\n        this.appContainer.prepend(this.logo);\r\n        this.isLogin = true;\r\n\r\n        this.renderAuthForm();\r\n\r\n        (0,_them__WEBPACK_IMPORTED_MODULE_4__.theme)(localStorage.getItem(\"theme\"))\r\n    }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Auth);\n\n//# sourceURL=webpack://diplom/./src/js/Auth.js?");

/***/ }),

/***/ "./src/js/Form.js":
/*!************************!*\
  !*** ./src/js/Form.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Form {\r\n    constructor(options) {\r\n        const {inputs} = options;\r\n\r\n        this.submitBtn = document.createElement(\"button\");\r\n        this.inputs = inputs;\r\n        this.form = document.createElement(\"form\");\r\n        this.form.classList.add('form');\r\n        this.createForm(options);\r\n    }\r\n\r\n    static getFormValues(inputs) {\r\n        return inputs.reduce((values, input) => {\r\n            values[input.name] = input.value;\r\n            return values;\r\n        }, {});\r\n    }\r\n\r\n    createForm({onSubmit, submitBtnText, title: titleText}) {\r\n        const title = document.createElement(\"h2\");\r\n        title.innerText = titleText;\r\n        title.classList.add(\"form-title\");\r\n\r\n        this.submitBtn.type = \"submit\";\r\n        this.submitBtn.innerText = submitBtnText;\r\n        this.submitBtn.classList.add(\"btn\", \"btn-form\", \"light-theme\");\r\n\r\n        this.form.addEventListener(\"submit\", async (event) => {\r\n            event.preventDefault();\r\n\r\n            this.formValues = Form.getFormValues(this.inputs);\r\n\r\n            this.submitBtn.setAttribute(\"disabled\", \"\");\r\n\r\n            try {\r\n                await onSubmit(this.formValues, event);\r\n            } catch (err) {\r\n                if (err.data.message) {\r\n                    this.inputs.find((input) => input.updateErrorMessage(err.data.message));\r\n                } else {\r\n                    err.data.details.forEach(({path, message}) => {\r\n                        if (err.data.message) {\r\n                            this.inputs.updateErrorMessage()\r\n                        }\r\n                        const erroredInput = this.inputs.find((input) => {\r\n                            return input.name === path[0];\r\n                        });\r\n                        erroredInput.updateErrorMessage(message);\r\n                    });\r\n                }\r\n            }\r\n\r\n            this.submitBtn.removeAttribute(\"disabled\");\r\n        });\r\n\r\n        this.form.append(title);\r\n\r\n        this.inputs.forEach((input) => {\r\n            input.render(this.form);\r\n        });\r\n\r\n        this.form.append(this.submitBtn);\r\n    }\r\n\r\n    render(container) {\r\n        container.append(this.form);\r\n    }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Form);\n\n//# sourceURL=webpack://diplom/./src/js/Form.js?");

/***/ }),

/***/ "./src/js/Input.js":
/*!*************************!*\
  !*** ./src/js/Input.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Input {\r\n    constructor(options) {\r\n        const {\r\n            name,\r\n            placeholder,\r\n            label,\r\n            type = \"text\",\r\n            onInput,\r\n            onChange,\r\n        } = options;\r\n\r\n        this.input = document.createElement(\"input\");\r\n        this.errorMessageElement = document.createElement(\"span\");\r\n\r\n        this.name = name;\r\n        this.input.name = name;\r\n        this.input.type = type;\r\n\r\n        this.input.placeholder = placeholder;\r\n        this.label = label;\r\n        this.value = this.input.value;\r\n\r\n        this.control = this.createControl();\r\n    }\r\n\r\n    createControl(onInput, onChange) {\r\n        const container = document.createElement(\"div\");\r\n        const label = document.createElement(\"label\");\r\n\r\n        const inputId = `_${this.name}`;\r\n\r\n        container.classList.add(\"text-control\");\r\n        this.errorMessageElement.classList.add(`error-${this.name}`, 'input-error');\r\n        this.input.classList.add(\"input\");\r\n\r\n        this.input.id = inputId;\r\n        label.setAttribute(\"for\", inputId);\r\n        label.classList.add('label');\r\n\r\n        label.innerText = this.label;\r\n\r\n        container.append(label, this.input, this.errorMessageElement);\r\n\r\n        this.input.addEventListener(\"input\", (event) => {\r\n            this.value = event.target.value;\r\n            this.updateErrorMessage('');\r\n            if (onInput) {\r\n                onInput(event);\r\n            }\r\n        });\r\n\r\n        if (onChange) {\r\n            this.input.addEventListener(\"change\", (event) => {\r\n                onChange(event);\r\n            });\r\n        }\r\n\r\n        return container;\r\n    }\r\n\r\n    updateErrorMessage(message) {\r\n        this.errorMessageElement.innerText = message;\r\n    }\r\n\r\n    render(container) {\r\n        container.append(this.control);\r\n    }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Input);\n\n//# sourceURL=webpack://diplom/./src/js/Input.js?");

/***/ }),

/***/ "./src/js/Task.js":
/*!************************!*\
  !*** ./src/js/Task.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Task\": () => (/* binding */ Task)\n/* harmony export */ });\n/* harmony import */ var _API__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./API */ \"./src/js/API.js\");\n\r\n\r\nclass Task {\r\n    constructor({\r\n                    name,\r\n                    description,\r\n                    timeTracked,\r\n                    isFinished,\r\n                    isActive,\r\n                    _id,\r\n                    createdAt,\r\n                }) {\r\n        this.name = name;\r\n        this.description = description;\r\n        this.timeTracked = timeTracked;\r\n        this.isActive = isActive;\r\n        this.isFinished = isFinished;\r\n        this.createdAt = new Date(createdAt);\r\n\r\n        this.id = _id;\r\n\r\n        this.taskCard = document.createElement('div');\r\n        this.deleteBtn = document.createElement('button');\r\n        this.timerBtn = document.createElement('button');\r\n        this.timeTrackedElement = document.createElement('span');\r\n        this.markAsDoneBtn = document.createElement('button');\r\n        this.timeTrakedIntervalId = null;\r\n    }\r\n\r\n    renderCard(container) {\r\n        const titleElem = document.createElement('h3');\r\n        const descriptionElem = document.createElement('p');\r\n        const timeTracker = document.createElement('div');\r\n        const dateElement = document.createElement('p');\r\n\r\n        titleElem.classList.add('task-title');\r\n        descriptionElem.classList.add('task-description');\r\n        timeTracker.classList.add('time-tracker');\r\n        dateElement.classList.add('task-date');\r\n\r\n        this.taskCard.classList.add('task-card', 'light-theme');\r\n        this.deleteBtn.classList.add('task-delete-btn');\r\n        this.timerBtn.classList.add('timer-btn');\r\n        this.markAsDoneBtn.classList.add('btn', 'btn-form', 'light-theme');\r\n\r\n        if (this.isFinished) {\r\n            this.timerBtn.setAttribute(\"disabled\", '');\r\n            this.taskCard.classList.add('task-finished');\r\n            this.markAsDoneBtn.innerText = \"Restart\";\r\n        } else {\r\n            this.timerBtn.classList.add(\r\n                this.isActive ? \"timer-btn-stop\" : \"timer-btn-play\"\r\n            );\r\n            this.markAsDoneBtn.innerText = \"Mark as done\";\r\n        }\r\n\r\n        titleElem.innerText = this.name;\r\n        descriptionElem.innerText = this.description;\r\n\r\n        dateElement.innerText = Task.getFormattedDate(this.createdAt);\r\n        this.timeTrackedElement.innerText = Task.getFormattedTimeTracked(\r\n            this.timeTracked\r\n        );\r\n\r\n\r\n        this.deleteBtn.innerHTML = '<i class=\"fas fa-times\"></i>';\r\n\r\n        if (this.isActive) {\r\n            this.startTracker();\r\n            this.taskCard.classList.add('play');\r\n            this.taskCard.classList.add('active');\r\n            this.timerBtn.innerHTML = `<i class=\"fas fa-pause\"></i>`;\r\n        } else {\r\n            this.taskCard.classList.add('pause');\r\n            if (this.isFinished){\r\n                this.taskCard.classList.remove('pause');\r\n                this.taskCard.classList.remove('active');\r\n                this.taskCard.classList.add('done');\r\n            }\r\n            this.timerBtn.innerHTML = `<i class=\"fas fa-play\"></i>`;\r\n        }\r\n\r\n        timeTracker.append(this.timerBtn, this.timeTrackedElement);\r\n\r\n        this.taskCard.append(\r\n            titleElem,\r\n            descriptionElem,\r\n            timeTracker,\r\n            dateElement,\r\n            this.markAsDoneBtn,\r\n            this.deleteBtn\r\n        );\r\n\r\n        container.append(this.taskCard);\r\n\r\n        this.timerBtn.addEventListener(\"click\", this.toggleTimeTracker);\r\n        this.deleteBtn.addEventListener(\"click\", this.removeTask);\r\n        this.markAsDoneBtn.addEventListener(\"click\", this.toggleTaskFinished);\r\n    }\r\n\r\n    removeTask = async () => {\r\n        await _API__WEBPACK_IMPORTED_MODULE_0__.api.deleteTask(this.id);\r\n        this.taskCard.remove();\r\n    };\r\n\r\n    toggleTaskFinished = async () => {\r\n        this.isFinished = !this.isFinished;\r\n\r\n        await _API__WEBPACK_IMPORTED_MODULE_0__.api.editTask(this.id, { isFinished: this.isFinished });\r\n\r\n        this.taskCard.classList.toggle('task-finished');\r\n\r\n        if (this.isFinished) {\r\n            this.timerBtn.setAttribute(\"disabled\", \"\");\r\n            this.markAsDoneBtn.innerText = \"Restart\";\r\n            this.taskCard.classList.remove('active');\r\n            this.taskCard.classList.remove('pause');\r\n            this.taskCard.classList.add('done');\r\n            this.isActive = !this.isActive;\r\n            this.stopTracker();\r\n        } else {\r\n            this.timerBtn.removeAttribute(\"disabled\");\r\n            this.taskCard.classList.remove('done');\r\n            this.markAsDoneBtn.innerText = \"Mark as done\";\r\n        }\r\n    };\r\n\r\n    toggleTimeTracker = async () => {\r\n        this.isActive = !this.isActive;\r\n\r\n        await _API__WEBPACK_IMPORTED_MODULE_0__.api.editTask(this.id, { isActive: this.isActive });\r\n        if (this.isActive) {\r\n            this.taskCard.classList.remove('pause');\r\n            this.taskCard.classList.add('active');\r\n            this.startTracker();\r\n        } else {\r\n            this.taskCard.classList.remove('active');\r\n            this.taskCard.classList.add('pause');\r\n            this.stopTracker();\r\n        }\r\n    };\r\n\r\n    startTracker() {\r\n        this.timerBtn.classList.remove('timer-btn-play');\r\n        this.timerBtn.classList.add('timer-btn-stop');\r\n        this.timerBtn.innerHTML = `<i class=\"fas fa-pause\"></i>`;\r\n\r\n        this.timeTrakedIntervalId = setInterval(() => {\r\n            this.timeTracked += 1000;\r\n            this.updateTimeTracker();\r\n        }, 1000);\r\n    }\r\n\r\n    stopTracker() {\r\n        this.timerBtn.classList.remove(\"timer-btn-stop\");\r\n        this.timerBtn.classList.add('timer-btn-play');\r\n        this.timerBtn.innerHTML = `<i class=\"fas fa-play\"></i>`;\r\n        clearInterval(this.timeTrakedIntervalId);\r\n    }\r\n\r\n    updateTimeTracker() {\r\n        const formatted = Task.getFormattedTimeTracked(this.timeTracked);\r\n        this.timeTrackedElement.innerText = formatted;\r\n    }\r\n\r\n    static getFormattedDate(d) {\r\n        const date = d.toLocaleDateString();\r\n        const time = d.toLocaleTimeString();\r\n\r\n        return `${date} ${time}`;\r\n    }\r\n\r\n    static timerZero(value) {\r\n        return value > 9 ? value : `0${value}`;\r\n    }\r\n\r\n    static getFormattedTimeTracked(timeTracked) {\r\n        const timeTrackedSeconds = Math.floor(timeTracked / 1000);\r\n        const hours = Math.floor(timeTrackedSeconds / 3600);\r\n        const minutes = Math.floor((timeTrackedSeconds - hours * 3600) / 60);\r\n        const seconds = timeTrackedSeconds - hours * 3600 - minutes * 60;\r\n\r\n        return `${this.timerZero(hours)}:${this.timerZero(\r\n            minutes\r\n        )}:${this.timerZero(seconds)}`;\r\n    }\r\n}\n\n//# sourceURL=webpack://diplom/./src/js/Task.js?");

/***/ }),

/***/ "./src/js/TaskArea.js":
/*!****************************!*\
  !*** ./src/js/TaskArea.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TaskArea\": () => (/* binding */ TaskArea)\n/* harmony export */ });\n/* harmony import */ var _Form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Form */ \"./src/js/Form.js\");\n/* harmony import */ var _Input__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Input */ \"./src/js/Input.js\");\n/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Task */ \"./src/js/Task.js\");\n/* harmony import */ var _formConfigs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./formConfigs */ \"./src/js/formConfigs.js\");\n/* harmony import */ var _API__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./API */ \"./src/js/API.js\");\n/* harmony import */ var _them__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./them */ \"./src/js/them.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst getTaskForm = (onTaskCreated) =>\r\n    new _Form__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\r\n        title: 'Add task',\r\n        inputs: _formConfigs__WEBPACK_IMPORTED_MODULE_3__.taskConfig.map((input) => new _Input__WEBPACK_IMPORTED_MODULE_1__[\"default\"](input)),\r\n        submitBtnText: 'Add',\r\n        onSubmit: async (data) => {\r\n            const createdTask = await _API__WEBPACK_IMPORTED_MODULE_4__.api.createTask(data);\r\n            onTaskCreated(createdTask);\r\n        },\r\n    });\r\n\r\nclass TaskArea {\r\n    constructor({appContainer}) {\r\n        this.appContainer = appContainer;\r\n        this.taskForm = getTaskForm(this.addTask.bind(this));\r\n        this.tasksContainer = document.createElement('div');\r\n    }\r\n\r\n    renderLayout() {\r\n        const taskArea = document.createElement('div');\r\n        const formContainer = document.createElement('div');\r\n\r\n        taskArea.classList.add('area');\r\n        formContainer.classList.add('task-form', 'light-theme');\r\n        this.tasksContainer.classList.add('task-cards');\r\n        taskArea.append(formContainer, this.tasksContainer);\r\n        this.taskForm.render(formContainer);\r\n        this.appContainer.append(taskArea);\r\n    }\r\n\r\n    addTask(taskData) {\r\n        const task = new _Task__WEBPACK_IMPORTED_MODULE_2__.Task(taskData);\r\n        task.renderCard(this.tasksContainer);\r\n        (0,_them__WEBPACK_IMPORTED_MODULE_5__.theme)(localStorage.theme)\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://diplom/./src/js/TaskArea.js?");

/***/ }),

/***/ "./src/js/formConfigs.js":
/*!*******************************!*\
  !*** ./src/js/formConfigs.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"loginConfig\": () => (/* binding */ loginConfig),\n/* harmony export */   \"registerConfig\": () => (/* binding */ registerConfig),\n/* harmony export */   \"taskConfig\": () => (/* binding */ taskConfig)\n/* harmony export */ });\nconst loginConfig = [\r\n    {\r\n        name: \"email\",\r\n        placeholder: \"Enter email\",\r\n        label: \"Email\",\r\n    },\r\n    {\r\n        name: \"password\",\r\n        placeholder: \"Enter password\",\r\n        label: \"Password\",\r\n        type: \"password\",\r\n    },\r\n];\r\n\r\nconst registerConfig = [\r\n    {\r\n        name: \"email\",\r\n        placeholder: \"Enter email\",\r\n        label: \"Email\",\r\n    },\r\n    {\r\n        name: \"name\",\r\n        placeholder: \"Your name\",\r\n        label: \"Name\",\r\n    },\r\n    {\r\n        name: \"password\",\r\n        placeholder: \"Enter password\",\r\n        label: \"Password\",\r\n        type: \"password\",\r\n    },\r\n];\r\n\r\nconst taskConfig = [\r\n    {\r\n        name: \"name\",\r\n        placeholder: \"Task name\",\r\n        label: \"Name\",\r\n    },\r\n    {\r\n        name: \"description\",\r\n        placeholder: \"Task description\",\r\n        label: \"Description\",\r\n    },\r\n];\n\n//# sourceURL=webpack://diplom/./src/js/formConfigs.js?");

/***/ }),

/***/ "./src/js/them.js":
/*!************************!*\
  !*** ./src/js/them.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Theme\": () => (/* binding */ Theme),\n/* harmony export */   \"theme\": () => (/* binding */ theme)\n/* harmony export */ });\nclass Theme {\r\n    constructor(){\r\n\r\n    }\r\n\r\n    darkTheme(){\r\n        let lightAll = document.querySelectorAll('.light-theme');\r\n        lightAll.forEach((selector) => {\r\n           selector.classList.remove('light-theme') ;\r\n           selector.classList.add('dark-theme') ;\r\n        });\r\n    }\r\n\r\n    lightTheme(){\r\n        let darkAll = document.querySelectorAll('.dark-theme');\r\n        darkAll.forEach((selector) => {\r\n            selector.classList.remove('dark-theme') ;\r\n            selector.classList.add('light-theme') ;\r\n        });\r\n    }\r\n}\r\nconst theme = (switchTheme) => {\r\n    if(switchTheme === \"dark\"){\r\n        new Theme().darkTheme();\r\n    }else {\r\n        new Theme().lightTheme();\r\n    }\r\n};\n\n//# sourceURL=webpack://diplom/./src/js/them.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;