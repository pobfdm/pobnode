/*

    Copyright (c) 2016 Fabio Di Matteo


    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation
    files (the "Software"), to deal in the Software without restriction,
    including without limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of the Software,
    and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be 
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF 
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS 
    BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN 
    ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN 
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
    IN THE SOFTWARE.
*/


var pobNodeCount=0;

function pobNode (type) {
    
    this.type=type;
    this.id;
    this.class;
    this.style;
    this.html="";
    this.jq;
    this.attrs;
    this.before='';
    this.after='';
	
	this.setHtml =function(ht) {
		this.html=ht;
	}
	
	this.append =function(ht) {
		this.html=this.html+ht;
	}
	
	this.addAttr =function(attr, val) {
		this.attrs=this.attrs+' '+attr+'="'+val+'" ';
	}
	
	this.attach = function(container) {
		pobNodeCount++;
		this.id='pobNode'+pobNodeCount;
		
		if(this.type!='img')
		{
			var el=this.before+'<'+this.type+ ' style="'+this.style+'"id="'+this.id+'"  class="'+this.class+'" '+this.attrs+'>'+this.html+'</'+this.type+'>'+this.after;
		}else{
			var el=this.before+'<'+this.type+ ' style="'+this.style+'"id="'+this.id+'"  class="'+this.class+'" '+this.attrs+'>'+this.after;
		}
		$(container).append(el);
		
		//Convert to jquery element
		this.jq =  $('#'+this.id);
	}
    
}

	
function pobAjax (type,target,outDiv) {
	
	var onError;
	var beforeSend;
	var complete;

	this.onError =function(str) {
		onError=str;
	}
	
	this.beforeSend =function(str) {
		beforeSend=str;
	}
	
	this.complete =function(str) {
		complete=str;
	}
	
	
	this.sendForm =function(fm) {
		 $(fm).submit(function(){ //intercetto il submit del form
                 
                 var querystring = $(fm).serialize();
 
                 $.ajax({
                    url: target,    
                    type: type,       
                    dataType: 'html',   
                    data: querystring, 
                    success: function(data) {
                                $(outDiv).html(data);
                            },
                    complete: complete,        
                    error: onError,
                    beforeSend: beforeSend,        
                    statusCode: { 
                            404: function() {
                                    alert( "Page not found" );
                                }
                        }
                 });
 
                    return false;
          });
	
	
	
	
	}

}	
	


function hasTouch() {
    return (('ontouchstart' in window) ||       // html5 browsers
            (navigator.maxTouchPoints > 0) ||   // future IE
            (navigator.msMaxTouchPoints > 0));  // current IE10
}


var isMobile = {
Android: function() {
	return navigator.userAgent.match(/Android/i);
},
BlackBerry: function() {
	return navigator.userAgent.match(/BlackBerry/i);
},
iOS: function() {
	return navigator.userAgent.match(/iPhone|iPad|iPod/i);
},
Opera: function() {
	return navigator.userAgent.match(/Opera Mini/i);
},
Windows: function() {
	return navigator.userAgent.match(/IEMobile/i);
},
any: function() {
	return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
}
};
