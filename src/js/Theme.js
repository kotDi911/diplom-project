export class Theme {
    static actualTheme(container){
        if(!localStorage.getItem("theme")){
            localStorage.setItem("theme", "light");
        }
        if(localStorage.getItem("theme") === "light"){
            Theme.lightTheme(container);
        }else {
            Theme.darkTheme(container);
        }
    }
    static switchTheme(container){
        if(localStorage.getItem("theme") === "light"){
            Theme.darkTheme(container);
            localStorage.setItem("theme", "dark")
        }else {
            Theme.lightTheme(container);
            localStorage.setItem("theme", "light")
        }
        Theme.actualTheme(container)
    }
    static darkTheme(container){
        container.classList.remove('light-theme');
        container.classList.add('dark-theme');
    }

    static lightTheme(container){
        container.classList.remove('dark-theme');
        container.classList.add('light-theme');
    }
}