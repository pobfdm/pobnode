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
    this.width=0;
    this.cssClassContainer;
    this.cssClassHeader;
    this.cssClassScrolling;
    this.cssClassBody;
    
    this.styleContainer;
    this.styleHeader;
    this.styleScrolling;
    this.styleBody;
    
    this.rowStyle='';
    this.cellStyle='';
    this.evenRowsColor='#E1EEF2';
    this.oddRowsColor='#FFF';
    
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
    this.onClickRow='';
    
    
    this.before='';
    this.after='';
	
	
	this.addAttr =function(attr, val) {
		this.attrs=this.attrs+' '+attr+'="'+val+'" ';
	}
	
	this.addCol =function(colText, width, id) {
		this.cols.push('<td id="'+id+'" style="width: '+width+'px;  word-wrap: break-word;">'+colText+'</td>');
		this.wcols.push(width);  
	}
	
	
	
	this.addCell =function(cellText, cssClass) {
		this.cellCount++;	
		
		if(this.cellCount==1)
		{ 
			this.cells.push('<tr style="'+this.rowStyle+'" onclick="'+this.onClickRow+'">');
		}
		
		this.cells.push('<td style="'+this.cellStyle+'" class="'+cssClass+'">'+cellText+'</td>');
		this.cellStyle='';
		
		if(this.cellCount==this.cols.length)
		{ 
			this.cells.push('</tr>');
			this.cellCount=0;
			this.rowStyle='';
		}
		
		this.onClickRow='';
	}
	
	this.put= function(a){
		var r='';
		for (i = 0; i < a.length; i++) 
		{
			r=r+a[i];
		}
		return r;
	}
	
	this.load = function(url){
		var response;
		$.ajax({ type: "GET",   
			 url: url,   
			 async: false,
			 success : function(text) { response= text;	 }
		});
		this.jqBody.html(response);
		this.resize();
		delete response;
		
	}
	
	this.resize= function(){
		this.jqScrolling.css('height',this.height+'px');
		this.jqScrolling.css('overflow','auto');
		$('#'+this.idBody+' tr:nth-child(even)').css("background", this.evenRowsColor);
		$('#'+this.idBody+' tr:nth-child(odd)').css("background", this.oddRowsColor);
		
		var j=1;
		var totalWidth=0;
		for (i = 0; i <this.cols.length; i++) 
		{
			$('#'+this.idBody+' tr td:nth-child('+j+')').css("width", this.wcols[i]+"px");
			totalWidth+=this.wcols[i];
			j++;
		}
		if(this.width==0)
		{
			$('#'+this.idContainer).css('width',totalWidth+45+'px');
		}else{
			$('#'+this.idContainer).css('width',this.width+'px');
		}
		
	}
	
	
	this.attach = function(container) {
		pobTableCount++;
		this.id='pobTable'+pobTableCount;
		this.idContainer=this.id;
		this.idHeader=this.id+'Header';
		this.idScrolling=this.id+'Scrolling';
		this.idBody=this.id+'Body';
		
		var tTop='<div id="'+this.idContainer+'"  class="'+this.cssClassContainer+'"> \
				<table id="'+this.idHeader+'" class="'+this.cssClassHeader+'" > \
				<tr>'+this.put(this.cols)+'</tr> \
				</table>';
		
		this.cells=this.put(this.cells);
		
		var tBody='<div id="'+this.idScrolling+'"> \
			<table id="'+this.idBody+'" class="'+ this.cssClassBody+'">'+this.cells+ 
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
		
		this.resize();
	}
    
}

