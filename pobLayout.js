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


var pobLayoutCount=0;

function autoResize(container,header,sidebar,body, offset, borderSize)
{
	container.height(  $(window).height() - offset );
	
	containerHeight=container.height();
	headerHeight=header.height();
	leftSidebarHeight=containerHeight-headerHeight-borderSize;
	sidebar.height(leftSidebarHeight);
	body.height(sidebar.height());
	body.width(container.width()-sidebar.width());
	
	$(window).bind('ready resize', function() {
			container.height(  $(window).height() - offset );
			
			containerHeight=container.height();
			headerHeight=header.height();
			leftSidebarHeight=containerHeight-headerHeight-borderSize;
			
			sidebar.height(leftSidebarHeight);
			body.height(sidebar.height());
			body.width(container.width()-sidebar.width());
		});
}


function pobLayout () {
    
    this.id;
    this.idLeftSidebar;
    this.idHeader;
    this.idBody;
    
    this.containerClass;
    this.headerClass;
    this.leftSidebarClass;
    this.bodyClass;
    
    this.leftSideWidth=200;
    this.html='';
    this.htmlLeftSidebar='';
    
    this.jq;
    this.jqHeader;
    this.jqLeftSidebar;
    this.jqBody;
    
    this.attrs;
    this.before='';
    this.after='';
    this.marginTop=20;
    this.borderSize=2;
    this.border= this.borderSize +'px Solid #023276;'
	this.label='PobLayout';
	
	
	this.setHtml =function(ht) {
		this.html=ht;
	}
	this.setHtmlSidebar =function(ht) {
		this.htmlLeftSidebar=ht;
	}
	
	
	this.append =function(ht) {
		this.html=this.html+ht;
	}
	this.appendLeftSidebar =function(ht) {
		this.htmlLeftSidebar=this.htmlLeftSidebar+ht;
	}
	
	
	this.addAttr =function(attr, val) {
		this.attrs=this.attrs+' '+attr+'="'+val+'" ';
	}
	
	
	
	this.attach = function(container) {
		pobLayoutCount++;
		this.id='pobLayout'+pobLayoutCount;
		this.idLeftSidebar=this.id+'LeftSidebar';
		this.idHeader=this.id+'Header';
		this.idBody=this.id+'Body';
		
		var el=this.before+'<div id="'+this.id+'" class="'+this.containerClass+'" style="width: 100%; border: '+this.border+'" '+this.attrs+'>\
			<div id="'+this.idHeader+'" class="'+this.headerClass+'" style="width: 100%;border-bottom:'+this.border+'">'+this.label+'</div> \
			<div id="'+this.idLeftSidebar+'" class="'+this.leftSidebarClass+'" style="width:'+this.leftSideWidth+'px;position: relative; float:left">'+this.htmlLeftSidebar+'</div> \
			<div id="'+this.idBody+'" class="'+this.bodyClass+'" style="float: left; position: relative; overflow-y: auto;">'+this.html+'</div> \
		</div>'+this.after;
		
		
		$(container).append(el);
		
		//Convert to jquery element
		this.jq =  $('#'+this.id);
		this.jqHeader =  $('#'+this.idHeader);
		this.jqLeftSidebar=  $('#'+this.idLeftSidebar);
		this.jqBody=  $('#'+this.idBody);
		
		autoResize(this.jq,this.jqHeader,this.jqLeftSidebar,this.jqBody, this.marginTop, this.borderSize);
		
	}
	
	
    
}

