function displayAbbreviations() {
    if(!document.getElementsByTagName)return false;
    if(!document.createElement)return false;
    if(!document.createTextNode)return false;
    //取得缩略词
    var abbreviations=document.getElementsByTagName("abbr");
    if(abbreviations.length<1)  { return false;}
    var defs=new Array();
    //console.log("???");
    //遍历缩略词
    for (var i = 0; i < abbreviations.length; i++) {
        if(abbreviations[i].childNodes.length<1)continue;
        var definition=abbreviations[i].getAttribute("title");//获得title
        var key=abbreviations[i].lastChild.nodeValue;//获得结点文本
        defs[key]=definition;//每个key值都对应一个全值definition
    
        //console.log("Key is "+key+"<br> definition is "+definition);
    }
    //获得所需的值后开始创建标记。DL  define list  DT  define title  DD  define description
    //创建定义列表
    var dlist=document.createElement("dl");
    //遍历定义
    for (key in defs) {
        var definition=defs[key];
        //创建定义标题
        var dtitle=document.createElement("dt");
        var dtitle_text=document.createTextNode(key);
        dtitle.appendChild(dtitle_text);
        //创建定义描述
        var ddesc=document.createElement("dd");
        var ddesc_text=document.createTextNode(definition);
        ddesc.appendChild(ddesc_text);
        //把他们都添加到定义列表
        dlist.appendChild(dtitle);
        dlist.appendChild(ddesc);
    
    }
    if(dlist.childNodes.length<1){return false;}
    //创造标题
    var header=document.createElement("h2");
    var header_text=document.createTextNode("Abbreviations");
    header.appendChild(header_text);
    //把标题加到页面主体
    document.getElementsByTagName("article")[0].appendChild(header);
    //把定义列表加到页面主体
    document.getElementsByTagName("article")[0].appendChild(dlist);

}

addLoadEvent(displayAbbreviations);


function stripeTables() {
    if(!document.getElementsByTagName)return false;
    var tables=document.getElementsByTagName("table");
    var odd,rows;
    for (var i = 0; i < tables.length; i++) {
        odd=false;
        rows=document.getElementsByTagName("tr");
        for (var j = 0; j < rows.length; j++) {
            if (odd == true) {
                addClass(rows[j],"odd");
                odd=false;
            }
            else {
                odd=true;
                console.log(rows[j]);
            }
        }

    }
}
addLoadEvent(stripeTables);

function highlightRows() {
    if(!document.getElementsByTagName){return false;}
    var rows=document.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {    
        rows[i].oldClassName=rows[i].className;
        rows[i].onmouseover = function() {
            addClass(this,"highlight");
        }
        rows[i].onmouseout = function() {
            this.className=this.oldClassName;
        }

    }
}
addLoadEvent(highlightRows);







