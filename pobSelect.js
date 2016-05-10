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


var pobSelectCount=0;

function pobSelect () {
    
    this.id;
    this.class;
    this.style;
    this.options=[];
    this.jq;
    this.attrs;
    this.before='';
    this.after='';
	
	
	this.addAttr =function(attr, val) {
		this.attrs=this.attrs+' '+attr+'="'+val+'" ';
	}
	
	this.put= function(a){
		var r='';
		for (i = 0; i < a.length; i++) 
		{
			r=r+a[i];
		}
		return r;
	}
	
	this.addOption = function(id,cssClass,name,attrs,style,value,text){
		var option='<option id="'+id+'" class="'+cssClass+'" name="'+name+'" '+attrs+'style="'+style+'" value="'+value+'">'+text+'</option>';
		this.options.push(option);
	}
	
	this.append = function(option){
		this.options.push(option);
	}
	
	this.attach = function(container) {
		pobSelectCount++;
		this.id='pobSelect'+pobSelectCount;
		
		//var el=this.before+'<'+this.type+ ' style="'+this.style+'"id="'+this.id+'"  class="'+this.class+'" '+this.attrs+'>'+this.html+'</'+this.type+'>'+this.after;
		var el=this.before+'<select style="'+this.style+'"id="'+this.id+'"  class="'+this.class+'" '+this.attrs+'>'+this.put(this.options)+'</select>'+this.after;
		
		$(container).append(el);

		//Convert to jquery element
		this.jq =  $('#'+this.id);
	}
    
}
