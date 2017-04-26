

var buttonOnSite = document.getElementById("productTitle");
if(!buttonOnSite){
	buttonOnSite = document.getElementById("mocaBBProductTitle");
}

var parent = buttonOnSite.parentElement,
    next = buttonOnSite.nextSibling,
    button = document.createElement("button"),
    text = document.createTextNode("Add to Gift Aid");  

button.appendChild(text);
button.className="a-button a-spacing-small a-button-preorder a-button-icon";
button.id="gift_aid_submit";

var s = document.createElement("script");
s.type = "text/javascript";
s.src = "http://www.parsecdn.com/js/parse-1.4.0.min.js";
s.onload = function(){
        console.log("remote script has loaded");
    };
document.head.appendChild(s);

var s1 = document.createElement("script");
s1.type = "text/javascript";
s1.src = "http://cdnjs.cloudflare.com/ajax/libs/qtip2/2.2.1/jquery.qtip.min.js";
document.head.appendChild(s1);





/*items=document.getElementsByClassName("a-spacing-small item");
console.log( items[2].innerHTML );
console.log("There are " + items.length + " small pictures");
large_items=document.getElementsByClassName("imgTagWrapper");
console.log("There are " + large_items.length + " large pictures before");
//items[0].click();
//items[1].click();
items[2].click();
//items[3].click();
//document.querySelector("#a-autoid-12 > span > input").click();
large_items=document.getElementsByClassName("imgTagWrapper");
console.log("There are " + large_items.length + " large pictures after");*/




button.addEventListener ("click", function() {

		
 		//document.querySelector("#a-autoid-10 > span > input").click();
 		//alert("Computer Ji lock");
 		var mainimageurl , img_urls, title , price , elements, description, url, index , details , iFrameBody, imageurls=[] , indexlast , indexfirst;
 		var moca_switch =0 , temp_element, elements1;

 	// get the main product images
		elements  = document.getElementsByClassName("a-dynamic-image  a-stretch-vertical");
		if (typeof elements[0] === 'undefined'){
			elements = document.getElementsByClassName("a-dynamic-image  a-stretch-horizontal");
			if (typeof elements[0] === 'undefined'){
				elements = document.getElementsByClassName("a-dynamic-image image-stretch-vertical frontImage bookFrontTransition");
				if (typeof elements[0] === 'undefined'){
					elements = document.getElementsByClassName("a-dynamic-image image-stretch-vertical frontImage");
					if (typeof elements[0] === 'undefined'){
						elements = document.getElementsByClassName("mocaGlamorImage mocaCenterBackground");
						if(elements){
							moca_switch=1;
						}
					}
				}
			}
		}

		//var images = document.getElementById("a-autoid-10-announce").src; data-a-dynamic-image
		if(moca_switch == 0){
			mainimageurl  = elements[0].getAttribute("src");
			console.log("The main image is " + mainimageurl );
		}
		//images  = elements[0].getAttribute("data-a-dynamic-image");

	// get the additional product images
		elements=document.getElementsByClassName("a-spacing-small item"); 
		if(typeof elements[0] === 'undefined'){
			elements=document.getElementsByClassName("a-column a-span3 a-spacing-micro imageThumb thumb");
		}
		if(moca_switch == 1){
			elements=document.getElementsByClassName("verticalMocaThumb");
			console.log("There are " + elements.length+ " pictures");
			for (i=0;i<elements.length;i++){
				temp_element = elements[i].getElementsByTagName('img')[0];
				temp=temp_element.src;
				if (temp.endsWith('jpg')) {
					indexlast=temp.lastIndexOf(".");
					temp=temp.substring(0,indexlast);
					indexlast=temp.lastIndexOf(".");
					temp=temp.substring(0,indexlast);
					temp = temp + ".jpg";
					imageurls.push(temp);
				}
			}
			mainimageurl  = imageurls[0];
			console.log("The main image is " + mainimageurl );
		}
		else{
			//var elements2 =elements.getElementsByClassName("a-button-text");
			console.log("There are " + elements.length+ " pictures");
			for (i=0;i<elements.length;i++){

				indexlast=elements[i].innerHTML.lastIndexOf("\"");
				indexfirst = elements[i].innerHTML.lastIndexOf("src");
				temp=elements[i].innerHTML.substring(indexfirst+5 , indexlast)
				if (temp.endsWith('jpg')) {
					indexlast=temp.lastIndexOf(".");
					temp=temp.substring(0,indexlast);
					indexlast=temp.lastIndexOf(".");
					temp=temp.substring(0,indexlast);
					temp = temp + ".jpg";
					imageurls.push(temp);
				}
			}
		}

		for (i=0;i<imageurls.length;i++){
			console.log("Image url " + (i+1) + " " + imageurls[i] );
		}


		
		

		//img_urls=elements[0].getAttribute("src");
		//img_urls=images;
		//img_urls=img_urls.trim();

	// get the product descriptions
		elements = document.getElementById("descriptionAndDetails");
		if(!elements){
			elements = document.getElementById("mocaMixedPackWidget");
			if(!elements){
				elements = document.getElementById("mocaProductDetails");
			}
		}

		if (elements){
			description=elements.innerText;
			description=description.trim();
			console.log(description);
		}
		else{
			getFrameContents();
			console.log(description);
		}


		function getFrameContents(){
		   var iFrame =  document.getElementById('product-description-iframe');
		   var iFrame1 =  document.getElementById('bookDesc_iframe');
		   if(!iFrame)
		   		{
		   		iFrame = iFrame1;	
		   		}

		   if (iFrame){
			   if ( iFrame.contentDocument ) 
			   { // FF
			     iFrameBody = iFrame.contentDocument.getElementsByTagName('body')[0];
			   }
			   else if ( iFrame.contentWindow ) 
			   { // IE
			     iFrameBody = iFrame.contentWindow.document.getElementsByTagName('body')[0];
			   }
			   	description=iFrameBody.innerText;
				description=description.trim();
		   }
		  
		 }

	// get the product details

		elements = document.getElementById("detail-bullets_feature_div");

		if (elements){
			details=elements.innerText;
			details=details.trim();
			console.log(details);
		}

	// get the url of the page

		url = document.location.href;
		index=url.indexOf("ref");
		if (index >=0){
			url=url.substring(0,index);
		}

		console.log(url);

	// get the product title

		elements = document.getElementById("productTitle");
		if(!elements){
			elements = document.getElementById("item_name");
		}
		//console.log(elements);
		title=elements.innerText;
		title=title.trim();
		title = title.replace(',',' ');
		console.log(title);

	// get the product price

		priceSpan = document.getElementById("priceblock_ourprice");
		if(!priceSpan){
			priceSpan = document.getElementById("priceblock_saleprice");
		}

		if(priceSpan){
			price=priceSpan.innerText;
			price=price.trim();
			price = price.replace('$','');
			price = price.replace(',','');
			price = parseFloat(price);
			console.log(price);
		}
		
		if(! price){
			elements = document.getElementsByClassName("a-size-medium a-color-price");
			price=elements[0].textContent;
			price=price.trim();
			price = price.replace('$','');
			price = price.replace(',','');
			price = parseFloat(price);
			console.log(price);
		}
		loadDB();

		/*console.log("The picture is " + img_urls);
		img_urls = img_urls.replace("{","");
		var spli1=img_urls.split(",");
		var split2=[], temp, indexlast;
		for (i=0;i<spli1.length;i+=2){
			indexlast=spli1[i].lastIndexOf(":");
			temp=spli1[i].substring(1,indexlast-1);
			imageurls.push(temp);
		}*/

		//console.log("The on of pictures is  " + spli1.length);
		
		/*console.log("The title is " + title);
		console.log("The price is " + price);*/

	// this peice of code export to the datasbase

	//	document.write('<script src="//www.parsecdn.com/js/parse-1.4.0.min.js"></script>');

	function showmessage() {
		e= document.createElement("div");
		e.style.width = "100%";
		e.style.height = "50px";
		e.style.background = "green";
		e.style.color = "white";
		e.style.textAlign = "center";
		e.innerHTML = 
		'<div class="alert alert-success alert-dismissable">'+
            'Import Success <br>' + 
            'Title:'+title +"<br>"+
            'Price:'+ price.toString()+ "<br>"+
         '</div>';
         // e.appendTo("#navbar");
         div=document.getElementById("navbar");
         div.appendChild(e);
         // document.body.appendChild(e);
         window.scrollTo(0, 0);
	}

		function showerror() {
		e= document.createElement("div");
		e.style.width = "100%";
		e.style.height = "50px";
		e.style.background = "red";
		e.style.color = "white";
		e.style.textAlign = "center";
		e.innerHTML = 
		'<div class="alert alert-success alert-dismissable">'+
            'Import Failure <br>' + 
            "Product already imported..<br>"+
            
         '</div>';
         // e.appendTo("#navbar");
         div=document.getElementById("navbar");
         div.appendChild(e);
         // document.body.appendChild(e);
         window.scrollTo(0, 0);
	}

		var store_id="";

		function loadDB(){
		
			Parse.initialize("zqEF2wS6DZxsiDmoNenO2a40FzejoPBvHrEuADbt",
	        "jwSZzqh4YGNu1ddY91dG4rvgqm2SrxWNX3xIqVFp");

			// get the store id from parse databse
	        var Store = Parse.Object.extend("Store");
	        var storequery = new Parse.Query(Store);
	        curr_store_url = url.replace('http://','');
			indexfirst=curr_store_url.indexOf("/");
			curr_store_url=curr_store_url.substring(0,indexfirst)
	        storequery.find().then(function(objs){
		        for (var i = objs.length - 1; i >= 0; i--) {
		       		//console.log(objs[i].get("url") + " " + objs[i].id);
		       		store_url = objs[i].get("url");
		       		if (typeof store_url === 'undefined'){
		       			//console.log("No value");
		       			}
		       		else{
						store_url = store_url.replace('http://','');
						store_url = store_url.replace('/','');
						if(curr_store_url.localeCompare(store_url) == 0){
							store_id = objs[i].id
							console.log("Parse db store URL is " + store_url);
							console.log("The formated current store url is " + curr_store_url);
							console.log("The store id for parse is " + store_id);
							}
		       			}
		        	}
		        //check if store id is obtained
		        if(store_id== ""){
		        	console.log("Error: Store Id not found! - Exiting.");
		        	return false;
		        }
		        else{
				    //first query if this item has been imported before by checking url
					var Item = Parse.Object.extend("Item");
					query= new Parse.Query(Item);
					query.equalTo("url",url);
					query.find().then(function(results){
						if(results.length>0){
							showerror();
						}
						else{
							importProduct();
						}
					});

		        }
	        });

			
	        
		}

		function importProduct(){
	            var Item = Parse.Object.extend("Item");
	            var item =  new Item();
	            item.set("title",title);
	            words = title.toLowerCase().split(" ");
	            item.set("searchkeys",words);
	            item.set("description",description);
	            item.set("price",parseFloat(price));
	            item.set("url",url)
	            domain="amazon.com";
	            // alert(store_id);
	            // if(domain=="amazon.com"){
	            	store={
	                "__type": "Pointer",
	                "className": "Store",
	                //"objectId": "41zVpmfXpW"
	                "objectId": store_id 
	            	}	
	            // }

	            item.set("store",store);
	            poster={
	                "__type": "Pointer",
	                "className": "_User",
	                "objectId": "N1WltdmWUF"   
	            };
	            item.set("poster",poster);
	           // mainimageurl="http://ecx.images-amazon.com/images/I/91rrlAEJybL._SX522_.jpg";
	            item.set("mainimageurl",mainimageurl);
	           // imageurls=[];
	           // imageurls.push("http://ecx.images-amazon.com/images/I/91rrlAEJybL._SX522_.jpg");
	            item.set("imageurls",imageurls);
	            item.save(null,{
	                success:function(obj){
	                    console.log("product imported successfully: "+obj.id);
	                    showmessage();
	                },
	                error:function(obj,error){
	                    console.log(error.message);
	                }

	            })
	        }

		function ucFirstAllWords( str )
{
    var pieces = str.split(" ");
    for ( var i = 0; i < pieces.length; i++ )
    {
        var j = pieces[i].charAt(0).toUpperCase();
        pieces[i] = j + pieces[i].substr(1);
    }
    return pieces.join(" ");
}


/*		<script src="js/parse-1.4.0.min.js"></script>


 <script type="text/javascript">
Parse.initialize("zqEF2wS6DZxsiDmoNenO2a40FzejoPBvHrEuADbt",
        "jwSZzqh4YGNu1ddY91dG4rvgqm2SrxWNX3xIqVFp"); */


	//  This piece of code exports to excel------

/*		var A = [['Picture URL','Title','Price']];
		A.push([img_urls, title , price])

		var csvRows = [];

		csvRows.push(A[0].join(','));
		csvRows.push(A[1].join(','));

		var csvString = csvRows.join("%0A");
		var a         = document.createElement('a');
		a.href        = 'data:attachment/csv,' + csvString;
		a.target      = '_blank';
		a.download    = 'myFile.csv';

		document.body.appendChild(a);
		a.click();*/
		
});

if (next) parent.insertBefore(button, next);
else parent.appendChild(button);
