

//alert("Welcome to GitAid");

a= document.createElement("div");
a.innerHTML = 

	'<button class="pp-atc-btn os-btn btn-md success os-icon os-icon-cart-fill split-btn" id="gift_aid_submit" width =100% > Add to Gift Aid'+
	'</button>';

//parent = document.getElementsByClassName("col-xs-9")[0];
parent = document.getElementsByClassName("row ratings-container")[0];
child_elements = parent.childNodes;
child = child_elements
parent.insertBefore(a,child.nextSibling);
button=document.getElementById("gift_aid_submit");
//console.log(button.innerText);



button.addEventListener ("click", function() {
	
		

 		var mainimageurl , img_urls, title , price , elements, description, url, index , details , iFrameBody, imageurls=[] , indexlast , indexfirst;

 	// get the main product image & additional product images
		
		elements  = document.getElementsByClassName("thumb-frame")[1].getElementsByTagName('li');
		for(i=0;i<elements.length;i++){
			src_elements = elements[i].innerHTML;
			src_elements = src_elements.replace('<img src=\"',' ');
			indexfirst=src_elements.indexOf("\"");
			temp=src_elements.substring(0,indexfirst);	
			if (temp.endsWith('jpg')) {
				indexlast=temp.lastIndexOf("_");
				temp=temp.substring(0,indexlast);
				temp = temp + ".jpg";
				imageurls.push(temp);
			}
		}

		mainimageurl  = imageurls[0];
		console.log("Main Image url :"+ mainimageurl );

		console.log("There are " + imageurls.length+ " pictures");

		for (i=0;i<imageurls.length;i++){
			console.log("Image url " + (i+1) + " " + imageurls[i] );
		}	


	// get the product descriptions
		elements = document.getElementsByClassName("description toggle-content")[0];
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


		elements = document.getElementsByClassName("col-xs-6")[1].getElementsByTagName('span')[0];
		if (typeof elements === 'undefined'){
			elements = document.getElementsByClassName("col-xs-6")[2].getElementsByTagName('span')[0];
		}
		//child_elemets = elements.childNodes;
		//console.log(elements);
		title=elements.innerText;
		title=title.trim();
		title = title.replace(',',' ');
		console.log("The title is " + title);



	// get the product price

		elements = document.getElementsByClassName("price notOnSale")[0];
		if (typeof elements === 'undefined'){
			elements = document.getElementsByClassName("price onSale")[0];
		}
		price = elements.innerText;
		//console.log("The price is " + price);
		indexfirst=price.lastIndexOf("$");
		price=price.substring(indexfirst+1,price.length);
		price=price.trim();
		price = price.replace(',','');
		price = price.replace('USD','');
		price = parseFloat(price);
		console.log("The price is " + price);


		loadDB();

	function showmessage() {
		e= document.createElement("div");
		e.style.width = "100%";
		e.style.height = "50px";
		e.style.background = "green";
		e.style.color = "black";
		e.style.textAlign = "center";
		e.innerHTML = 
		'<div class="alert alert-success alert-dismissable">'+
            'Import Success <br>' + 
            'Title:'+title +"<br>"+
            'Price:'+ price.toString()+ "<br>"+
         '</div>';
         // e.appendTo("#navbar");
         div=document.getElementsByClassName("grid-container-search")[0];
         div.appendChild(e);
         // document.body.appendChild(e);
         window.scrollTo(0, 0);
	}

		function showerror() {
		e= document.createElement("div");
		e.style.width = "100%";
		e.style.height = "50px";
		e.style.background = "red";
		e.style.color = "black";
		e.style.textAlign = "center";
		e.innerHTML = 
		'<div class="alert alert-success alert-dismissable">'+
            'Import Failure <br>' + 
            "Product already imported..<br>"+
            
         '</div>';
         // e.appendTo("#navbar");
         div=document.getElementsByClassName("grid-container-search")[0];
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
