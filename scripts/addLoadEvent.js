function addLoadEvent(func){
    var oldonload=window.onload;
    if (typeof window.onload != 'function') {
        window.onload=func;
    }
    else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}//当需要window.onload许多个函数时，采用这种方式，并且通过addLoadEvent(func)导入需要加载的函数。



