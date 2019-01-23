﻿function addLoadEvent(func){
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





function insertAfter(newElement, targetElement) {
    var parent=targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    }
    else {
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}


function addClass(element,value) {
    if (!element.className) {element.className=value;}
    else{
        var newClassName;
        newClassName=element.className;
        newClassName+=" ";
        newClassName+=value;
        element.className=newClassName;
    }
}

function highlightPage() {
    var headers=document.getElementsByTagName("header");
    if(headers.length==0)return false;
    var navs=headers[0].getElementsByTagName("nav");
    if(navs.length==0)return false;
    var links=navs[0].getElementsByTagName("a");
    var linkurl;
    for (var i = 0; i < links.length; i++) {
        linkurl=links[i].getAttribute("href");
        if (window.location.href.indexOf(linkurl) != -1) {
            links[i].className="here";
            var linktext=links[i].lastChild.nodeValue.toLowerCase();
            document.body.setAttribute("id",linktext);
        }
    }
}
addLoadEvent(highlightPage);


function moveElement(element_ID,final_x,final_y,interval) {
    if(!document.getElementById)return false;
    if(!document.getElementById(element_ID))return false;
    var elem=document.getElementById(element_ID);
    if (elem.movement) {
        clearTimeout(elem.movement);
    }
    if (!elem.style.left) {
        elem.style.left="0px";
    }
    if (!elem.style.top) {
        elem.style.top="0px";
    }
    var xpos=parseInt(elem.style.left);
    var ypos=parseInt(elem.style.top);
    if (xpos == final_x && ypos==final_y) {
        return true;
    }
    if (xpos < final_x) {
        var dist=Math.ceil((final_x-xpos)/10);
        xpos=xpos+dist;
    }
    if (xpos >final_x) {
        var dist=Math.ceil((xpos-final_x)/10);
        xpos=xpos-dist;
    }
    if(ypos<final_y){
        var dist=Math.ceil((final_y-ypos)/10);
       ypos=ypos+dist
    }
    if (ypos > final_y) {
        var dist=Math.ceil((ypos-final_y)/10);
        ypos=ypos+dist;
    }
    console.log("x is "+xpos+" y is "+ypos);
    elem.style.left=xpos+"px";
    elem.style.top=ypos+"px";
    var repeat="moveElement('"+element_ID+"',"+final_x+","+final_y+","+interval+")";
    elem.movement=setTimeout(repeat,interval);
}

function prepareSlideshow() {
    if(!document.getElementById("intro"))return false;
    var intro=document.getElementById("intro");
    var slideshow=document.createElement("div");
    slideshow.setAttribute("id","slideshow");
    var frame=document.createElement("img");
    frame.setAttribute("src","images/frame.gif");
    frame.setAttribute("alt","");
    frame.setAttribute("id","frame");
    slideshow.appendChild(frame);
    var preview=document.createElement("img");
    preview.setAttribute("src","images/slideshow.gif");
    preview.setAttribute("alt","a glimpse of what awaits for you");
    preview.setAttribute("id","preview");
    slideshow.appendChild(preview);
    insertAfter(slideshow,intro);
    var links=document.getElementsByTagName("a");
    var destination;
    for (var i = 0; i < links.length; i++) {
        links[i].onmouseover = function() {
            destination=this.getAttribute("href");
            if (destination.indexOf("Default.aspx") != -1) {
                moveElement("preview",0,0,5);
            }
            if (destination.indexOf("about.html") != -1) {
                moveElement("preview",-150,0,5);
            }
            if (destination.indexOf("photos.html") != -1) {
                moveElement("preview",-300,0,5);
            }
            if (destination.indexOf("live.html") != -1) {
                moveElement("preview",-450,0,5);
            }
            if (destination.indexOf("contact.html") != -1) {
                moveElement("preview",-600,0,5);
            }
        }
    }
}

addLoadEvent(prepareSlideshow);

function showSection(id) {
    var sections=document.getElementsByTagName("section");
    for (var i = 0; i < sections.length; i++) {
        if (sections[i].getAttribute("id") != id) {
            sections[i].style.display="none";
        }
        else {
            sections[i].style.display="block";
        }
    }
}

function prepareInternalnav() {
    if(!document.getElementsByTagName)return false;
    if(!document.getElementById)return false;
    var articles=document.getElementsByTagName("article");
    if(articles.length==0)return false;
    var navs=articles[0].getElementsByTagName("nav");
    if(navs.length==0)return false;
    var nav=navs[0];
    var links=nav.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        var sectionId=links[i].getAttribute("href").split("#")[1];
        if(!document.getElementById(sectionId))continue;
        document.getElementById(sectionId).style.display="none";
        links[i].destination=sectionId;
        links[i].onclick = function() {
            showSection(this.destination);
        }
    }
}

addLoadEvent(prepareInternalnav);





