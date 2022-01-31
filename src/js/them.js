export class Theme {
    constructor(){

    }

    darkTheme(){
        let lightAll = document.querySelectorAll('.light-theme');
        lightAll.forEach((selector) => {
           selector.classList.remove('light-theme') ;
           selector.classList.add('dark-theme') ;
        });
    }

    lightTheme(){
        let darkAll = document.querySelectorAll('.dark-theme');
        darkAll.forEach((selector) => {
            selector.classList.remove('dark-theme') ;
            selector.classList.add('light-theme') ;
        });
    }
}