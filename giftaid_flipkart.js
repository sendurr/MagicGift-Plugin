

//alert("Welcome to GitAid");


/*var buttonOnSite = document.getElementsByClassName("title-wrap line fk-font-family-museo section omniture-field"),
    parent = buttonOnSite[0].parentElement,
    next = buttonOnSite[0].nextSibling,
    button = document.createElement("button"),
    text = document.createTextNode("Add to Gift Aid");  

button.appendChild(text);

console.log(buttonOnSite[0].innerHTML); */

a= document.createElement("div");
a.innerHTML = 

	'<button class="btn-buy-now btn-big  current" id="gift_aid_submit" width =100% > Add to Gift Aid'+
	'</button>';

parent = document.getElementsByClassName("title-wrap line fk-font-family-museo section omniture-field")[0];
child_elements = parent.childNodes;
//console.log(child_elements[1].textContent); 
child = child_elements[1]
parent.insertBefore(a,child.nextSibling);
button=document.getElementById("gift_aid_submit");





button.addEventListener ("click", function() {
	
		

 		var mainimageurl , img_urls, title , price , elements, description, url, index , details , iFrameBody, imageurls=[] , indexlast , indexfirst;

 	// get the main product image & additional product images
		
		elements  = document.getElementsByClassName("imgWrapper")[0].getElementsByTagName('img');
		//console.log("The image array is :" + elements[1].getAttribute("src"));
		for(i=0;i<elements.length;i++){
			src_elements = elements[i].getAttribute("src");
			src_elements = src_elements.replace(':http',' http');
			imageurls.push(src_elements)	
		}

		mainimageurl  = imageurls[0];
		console.log("Main Image url "+ mainimageurl );

		for (i=0;i<imageurls.length;i++){
			console.log("Image url " + (i+1) + " " + imageurls[i] );
		}	


	// get the product descriptions
		elements = document.getElementsByClassName("specifications-wrap line unit")[0];
		if(elements){
			description=elements.innerText;
			description=description.trim();
			console.log("The Product description is " + description);		
		}
		else{
			elements = document.getElementsByClassName("keyFeatures specSection")[0];
			if(elements){
				description=elements.innerText;
				description=description.trim();
				console.log("The Product description is " + description);
			}
			else{
				elements = document.getElementsByClassName("description specSection")[0];
				description=elements.innerText;
				description=description.trim();
				console.log("The Product description is " + description);

			}
		}




	// get the url of the page

		url = document.location.href;
		index=url.indexOf("?");
		if (index >=0){
			url=url.substring(0,index);
		}

		console.log("The URL is " + url);



	// get the product title


		parent = document.getElementsByClassName("title-wrap line fk-font-family-museo section omniture-field")[0];
		child_elements = parent.childNodes;
		//console.log(elements);
		title=child_elements[1].textContent;
		title=title.trim();
		title = title.replace(',',' ');
		console.log("The title is " + title);



	// get the product price

		elements = document.getElementsByClassName("prices")[0].getElementsByTagName("div");
		console.log(elements[0].innerText);
		price = elements[0].innerText;
		price=price.trim();
		price = price.replace(',','');
		price = price.replace('Rs.','');
		price = parseFloat(price);
		console.log("The price is " + price);


		loadDB();

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
         div=document.getElementById("fk-mainhead-id");
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
         div=document.getElementById("fk-mainhead-id");
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
	            domain="etsy.com";

	            // if(domain=="etsy.com"){
	            	store={
	                "__type": "Pointer",
	                "className": "Store",
	                //"objectId": "DJQci1nvTW" 
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

		


		
 });

//if (next) parent.insertBefore(button, next);
//else parent.appendChild(button);
