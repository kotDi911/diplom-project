export class Theme {
    static actualTheme(container){
        if(!localStorage.getItem("theme")){
            localStorage.setItem("theme", "light");
        }
//-----------v1
        // if(localStorage.getItem("theme") === "light"){
        //     Theme.lightTheme(container);
        // }else {
        //     Theme.darkTheme(container);
        // }
//-----------v1

//-----------v2
        switch (localStorage.getItem("theme")) {
            case "light":
                Theme.lightTheme(container);
                break;
            case "dark":
                Theme.darkTheme(container);
                break;
            case "red":
                Theme.redTheme(container);
                break;

        }
    }
//-----------v2
    static switchTheme(container, select){
        // if(localStorage.getItem("theme") === "light"){
        //     Theme.darkTheme(container);
        //     localStorage.setItem("theme", "dark")
        // }else {
        //     Theme.lightTheme(container);
        //     localStorage.setItem("theme", "light")
        // }

        switch (localStorage.setItem("theme", select)) {
            case "light":
                Theme.lightTheme(container);
                localStorage.setItem("theme", "light");
                break;
            case "dark":
                Theme.darkTheme(container);
                localStorage.setItem("theme", "dark");
                break;
            case "red":
                Theme.redTheme(container);
                localStorage.setItem("theme", "red");
                break;

        }
        Theme.actualTheme(container)
    }
    static darkTheme(container){
        container.classList.remove('light-theme', 'red-theme');
        container.classList.add('dark-theme');
    }

    static lightTheme(container){
        container.classList.remove('dark-theme', 'red-theme');
        container.classList.add('light-theme');
    }
    static redTheme(container){
        container.classList.remove('dark-theme', 'light-theme');
        container.classList.add('red-theme');
    }
}