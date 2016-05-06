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


var pobTableCount=0;

function pobTable () {
    
    this.id;
    this.idContainer;
    this.idHeader;
    this.idScrolling;
    this.idBody;
    
    this.height=150;
    this.cssClassContainer;
    this.cssClassHeader;
    this.cssClassScrolling;
    this.cssClassBody;
    
    this.styleContainer;
    this.styleHeader;
    this.styleScrolling;
    this.styleBody;
    
    this.attrsContainer;
    this.attrsHeader;
    this.attrsScrolling;
    this.attrsBody;
    
    
    this.jq;
    this.jqContainer;
    this.jqHeader;
    this.jqScrolling;
    this.jqBody;
    
    this.cols = [];
    this.wcols= [];
    this.cells = [];
    this.cellCount=0;
    this.rowEnd=false; 
    
    this.before='';
    this.after='';
	
	
	this.addAttr =function(attr, val) {
		this.attrs=this.attrs+' '+attr+'="'+val+'" ';
	}
	
	this.addCol =function(colText, width, id) {
		this.cols.push('<td id="'+id+'" style="width: '+width+'px">'+colText+'</td>');
		this.wcols.push(width);  
	}
	
	this.rowStart =function(fn, cssClass) {
		this.cells.push('<tr onClick="'+fn+'" class="'+cssClass+'">');
	}
	
	this.rowEnd =function() {
		this.cells.push('</tr>');
	}
	
	this.addCell =function(cellText, cssClass) {
		this.cells.push('<td class="'+cssClass+'">'+cellText+'</td>');
	}
	
	this.put= function(a){
		var r='';
		for (i = 0; i < a.length; i++) 
		{
			r=r+a[i];
		}
		return r;
	}
	
	this.attach = function(container) {
		pobTableCount++;
		this.id='pobTable'+pobTableCount;
		this.idContainer=this.id;
		this.idHeader=this.id+'Header';
		this.idScrolling=this.id+'Scrolling';
		this.idBody=this.id+'Body';
		
		var tTop='<div id="'+this.idContainer+'" class="'+this.cssClassContainer+'"> \
				<table id="'+this.idHeader+'" class="'+this.cssClassHeader+'"> \
				<tr>'+this.put(this.cols)+'</tr> \
				</table>';

			var tBody='<div id="'+this.idScrolling+'"> \
				<table id="'+this.idBody+'" class="'+ this.cssClassBody+'">'+this.put(this.cells)+ 
				'</table> \
				</div>	\
				</div>';
		
		$(container).append(tTop+tBody);

		//Convert to jquery element
		this.jq =  $('#'+this.idContainer);
		this.jqContainer=this.jq;
		this.jqHeader=$('#'+this.idHeader);
		this.jqBody=$('#'+this.idBody);
		this.jqScrolling=$('#'+this.idScrolling);
		
		//Css styling
		this.jqScrolling.css('height',this.height+'px');
		this.jqScrolling.css('overflow','auto');
		//$(".tbody tr td:nth-child(1)").css("width","200px");
		
		var j=1;
		for (i = 0; i <this.cols.length; i++) 
		{
			$('#'+this.idBody+' tr td:nth-child('+j+')').css("width", this.wcols[i]+"px");
			j++;
		}
		
		alert(this.cols); 
		
	}
    
}

