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


var pobTabsCount=0;


function bindClickLabels(LabelsContainer ,body,cssClassClickedTab,loadingMessage)
{
	
	//Prevent default and load tab content
	$(LabelsContainer+' a').bind('click',function(e){
					 e.preventDefault();
					 var url=$(this).attr('href');
					 body.html(loadingMessage).load(url);
					 $(LabelsContainer+ ' a').removeClass(cssClassClickedTab);
					 $(this).addClass(cssClassClickedTab);
				});
		
}

function pobTabs () {
    
    this.id;
    this.cssClass;
    this.cssClassLabelContainer;
    this.cssClassBody;
    this.cssClassClickedTab='';
    this.loadingMessage='<p>Loading...</p>'
    this.jq;
    this.jqBody;
    this.jqLabelsContainer;
    this.attrs;
    this.before='';
    this.after='';
    this.border='1px Solid blue';
    this.min_height= 200;
    this.labels='';
	
	
	
	this.addTab =function(label,url,id,cssClass) {
		this.labels=this.labels+'<a id="'+id+'" href="'+url+'" class="'+cssClass+'"  \
		style="border: '+this.border+';">'+label+'</a>';
	}
	
	this.loadTab =function(id, url) {
		this.jqBody.html(this.loadingMessage).load(url);
		$('#'+this.id+'LabelsContainer a').removeClass(this.cssClassClickedTab);
		$('#'+id).addClass(this.cssClassClickedTab);
	}
	
	
	
	this.attach = function(container) {
		pobTabsCount++;
		this.id='pobTabs'+pobTabsCount;
		
		var el=this.before+'<div id="'+this.id+'" class="'+this.cssClass+'" style="">\
		<div id="'+this.id+'LabelsContainer" class="'+ this.cssClassLabelContainer+'" >'+this.labels+'\
		</div>\
		<div id="'+this.id+'TabBody" class="'+ this.cssClassBody+'" style="border:'+this.border+';min-height: '+this.min_height+'px" ></div>\
	</div>'+this.after;
		
		$(container).append(el);

		//Convert to jquery element
		this.jq =  $('#'+this.id);
		this.jqBody = $('#'+this.id+'TabBody');
		this.jqLabelsContainer=$('#'+this.id+'LabelsContainer');
		
		bindClickLabels('#'+this.id+'LabelsContainer',this.jqBody,this.cssClassClickedTab,this.loadingMessage);
	}
    
}
