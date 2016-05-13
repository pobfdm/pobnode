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


var pobPopupCount=0;



function pobPopup () {
    
    this.id;
    this.class;
    this.style;
    this.html="";
    this.top='30%'
    this.left='40%';
    
    this.attrs;
    this.before='';
    this.after='';
    
    this.idHeader;
    this.idBody;
    
    this.containerClass;
    this.headerClass;
    this.bodyClass;
    
    this.jq;
    this.jqHeader;
    this.jqBody;
    
    this.borderSize=2;
    this.border= this.borderSize +'px Solid #023276;'
	this.label='PobPopup';
	this.top;
	this.left;
	
	this.setHtml =function(ht) {
		this.html=ht;
	}
	
	this.append =function(ht) {
		this.html=this.html+ht;
	}
	
	this.addAttr =function(attr, val) {
		this.attrs=this.attrs+' '+attr+'="'+val+'" ';
	}
	
	this.toggle = function() {
			this.jq.fadeToggle();
	}
	
	this.load = function(url)
	{
		this.jqBody.load(url);
	}
	
	
	this.attach = function(container) {
		pobPopupCount++;
		this.id='pobPopup'+pobPopupCount;
		this.idHeader=this.id+'Header';
		this.idBody=this.id+'Body';
		
		var el=this.before+'<div id="'+this.id+'" class="'+this.containerClass+'" style="position: fixed;top: '+this.top+';left:'+this.left+';display:none;border: '+this.border+'" '+this.attrs+'>\
			<div id="'+this.idHeader+'" class="'+this.headerClass+'" style="border-bottom:'+this.border+'">'+this.label+'</div> \
			<div id="'+this.idBody+'" class="'+this.bodyClass+'">'+this.html+'</div> \
		</div>'+this.after;
		
		$(container).append(el);

		//Convert to jquery element
		this.jq =  $('#'+this.id);
		this.jqHeader =  $('#'+this.idHeader);
		this.jqBody=  $('#'+this.idBody);
	}
    
}

	
