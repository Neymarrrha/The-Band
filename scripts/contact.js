function focusLabels() {
    if(!document.getElementsByTagName)return false;
    var labels=document.getElementsByTagName("label");
    for (var i = 0; i < labels.length; i++) {
        if(!labels[i].getAttribute("for"))continue;
        labels[i].onclick = function() {
            var id=this.getAttribute("for");
            if(!document.getElementById(id))return false;
            var element=document.getElementById(id);
            element.focus();
        }
    }
}

function resetFields(whichform) {
    for (var i = 0; i < whichform.elements.length; i++) {
        var element=whichform.elements[i];
        //console.log(element.type);
        if(element.type=="submit")continue;
        var check=element.placeholder||element.getAttribute("placeholder");
        if(!check)continue;
        element.onclick = function() {
            var text=this.placeholder||this.getAttribute("placeholder");
            //console.log(text+'\n'+this.value);
            if (this.value == text) {
                this.className='';
                this.value='';
            }
        }                
        element.onblur = function() {
            var text=this.placeholder||this.getAttribute("placeholder");
            //console.log(text);
            if (this.value == "") {
                this.className="placeholder";
                this.value=text;
            }
        }
        element.onblur();
    }
}


function isFilled(field) {
    console.log("isfilled");
    if(field.value.replace(' ','').length==0)return false;
    var placeholder=field.placeholder||field.getAttribute('placeholder');
    return (field.value!=placeholder);
}

function isEmail(field){
    console.log("isemail");
    return(field.value.indexOf("@")!=-1&&field.value.indexOf(".")!=-1);
}
function validateForm(whichform){
    for(var i=0;i<whichform.elements.length;i++){
        var elem = whichform.elements[i];
        var elem_required = elem.required || elem.getAttribute('required');
        if( elem_required == '' || elem_required == 'required'){
            var elem_name = elem.name || elem.getAttribute('name');
            if( !isFilled(elem) ){
                alert('please fill in '+elem_name +'  '+'field.');
                return false;
            }
            if( elem.getAttribute('id') == 'email'){ //或者elem.type == 'email'
                if( !isEmail(elem)){
                    alert('请输入正确的邮箱地址');
                    return false;
                }
            }
        }
    }
    return true;
}

function prepareForms() {
    for (var i = 0; i < document.forms.length; i++) {
        var thisform=document.forms[i];
        resetFields(thisform);
        thisform.onsubmit = function() {
            return validateForm(this);
            var article=document.getElementsByTagName("article")[0];
            if(submitFormWithAjax(this,article))return false;
            return true;
        }
    }
}


addLoadEvent(focusLabels);
addLoadEvent(prepareForms);

function getHTTPObject() {
    if (typeof XMLHttpRequest == "undefined") {
        XMLHttpRequest = function() {
            try{return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
                catch(e){}
            try{return new ActiveXObject("Msxml2.XMLHTTP.3.0");}
                catch(e){}
            try{return new ActiveXObject("Msxml2.XMLHTTP");}
                catch(e){}
            return false;
        }
    }
    return new XMLHttpRequest();
}

function submitFormWithAjax(whichform,thetarget){
    var request = getHTTPObject();
    if(!request) return false;
    displayAjaxLoading(thetarget);
    var dataParts = [];
    for(i=0;i<whichform.elements.length;i++){
        var elem = whichform.elements[i];s
        dataParts[i] = elem.getAttribute('name') + '=' + encodeURIComponent(elem.value);
    }
    var data = dataParts.join('&');
    request.open('POST',whichform.getAttribute('action'),true);
    request.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    request.onreadystatechange = function(){
        if(request.readyState == '4'){
            if( request.status ==200 || request.status ==0 ){
                var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
                if( matches.length > 0){
                    thetarget.innerHTML = matches[1];
                }else{
                    thetarget.innerHTML = '<p>Oops,there was an error.Sorry.</p>';
                }
            }else{
                thetarget.innerHTML = '<p>' + request.statusText + '</p>';
            }
        }
        
    }
    request.send(data);
    return true;
}


function displayAjaxLoading(element) {
    while (element.hasChildNodes()) {
        element.removeChild(element.lastChild);
    }
    var content=document.createElement("img");
    content.setAttribute("src","images/loading.gif");
    content.setAttribute("alt","Loading");
    element.appendChild(content);
}














