

//alert("Welcome to GitAid");

a= document.createElement("div");
a.innerHTML = 

	'<button  id="gift_aid_submit" class="btn-container" style="background-color:rgb(200, 49, 30); border-radius: 8px; font-size: 16px; color:white;"> Add to Gift Aid'+
	'</button>';

parent = document.getElementById("experience_title");
//console.log(parent.innerHTML);
child_elements = parent.childNodes;
child = child_elements[1]
parent.insertBefore(a,child);
button=document.getElementById("gift_aid_submit");
//console.log(button.innerText);


button.addEventListener ("click", function() {
	
		

 		var mainimageurl , img_urls, title , price , elements, description, url, index , details , iFrameBody, imageurls=[] , indexlast , indexfirst;

 	// get the main product image & additional product images
		
		elements  = document.getElementsByClassName("more-views");
		if (typeof elements[0] === 'undefined'){
			console.log('No additional images - assigned with mainimageurl');
		}
		else{
			elements  = document.getElementsByClassName("more-views")[0].getElementsByTagName('img');
		}
		//console.log(elements[0].innerHTML);
		for(i=0;i<elements.length;i++){
			src_elements = elements[i].getAttribute("src");
			if (src_elements.endsWith('jpg')){
				src_elements = "http:" + src_elements;
				src_elements = src_elements.replace('/x60/','/340x/');
				imageurls.push(src_elements.trim());
			}
			
		}
		
		elements  = document.getElementsByClassName("gallery")[0].getElementsByTagName('img');
		src_elements = elements[0].getAttribute("src");
		if (src_elements.endsWith('jpg')){
			src_elements = "http:" + src_elements;
			src_elements = src_elements.replace('/x60/','/340x/');
			mainimageurl=src_elements.trim();
			console.log("Main Image url :"+ mainimageurl );
			if (imageurls.length == 0){
				imageurls.push(mainimageurl);
			}
		}
		else{
			console.log("No Main image!" );
		}


		for (i=0;i<imageurls.length;i++){
			console.log("Image url " + (i+1) + " " + imageurls[i] );
		}	


	// get the product descriptions
		elements = document.getElementById("summary");
		description=elements.innerText;
		description=description.trim();
		console.log("The Product description is " + description);

	// get the url of the page

		url = document.location.href;
		index=url.indexOf("?");
		if (index >=0){
			url=url.substring(0,index);
		}

		console.log("The URL is " + url);



	// get the product title


		elements = document.getElementById("details_title");
		//child_elemets = elements.childNodes;
		//console.log(elements);
		title=elements.textContent;
		title=title.trim();
		title=title.replace('Add to Gift Aid','');
		title = title.replace(',',' ');
		title = title.replace(/\s\s+/g, ' ');
		console.log("The title is " + title);



	// get the product price

		elements = document.getElementsByClassName("low")[0];
		if((typeof elements === 'undefined')){
			elements = document.getElementById("add-to-details");
		}
		price = elements.innerText;
		indexfirst=price.lastIndexOf("$");
		price=price.substring(indexfirst,price.length);
		price=price.trim();
		price = price.replace('$','');
		price = price.replace(',','');
		price = price.replace('USD','');
		price = parseFloat(price);
		console.log("The price is " + price);


		loadDB();
		//showmessage();
		//showerror();

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
         div=document.getElementsByClassName("header group")[0];
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
         div=document.getElementsByClassName("header group")[0];
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
	                "objectId": store_id 
	                //"objectId": "DJQci1nvTW" 
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
