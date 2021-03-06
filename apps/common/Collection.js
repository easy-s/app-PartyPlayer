/*
 * Code contributed to the webinos project.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * (C) Copyright 2012, TNO
 *
 * Creates a new Collection Library with the provided Name
 */
function Collection(name, /* optional */ randomKey){	
	randomKey = randomKey || Math.random().toString(36).substr(2,16);
	this.name=name;
	this.coll={};
	this.lastID = randomKey;
}

/***
 * Add item to the collection
 * @param the item.
 * returns the key if the item was successfully added
 * returb false 
 **/
Collection.prototype.addItem = function (item,/* optional */ key){
	key = key || undefined
	if (key!=undefined){
		if (key in this.coll){
			return false;		
		}
		else{
			this.coll[key]=item;
		}	
	}
	else{
		newID="";		
		do{		
			newID = Math.random().toString(36).substr(2,16);
		}while (newID in this.coll)	
		this.coll[newID] = item;
		return newID;
	}	
};

/**
 * Remove the provided item from the selected userID
 * @param item - the item to be removed
 * @param the userID
 **/
Collection.prototype.removeItem = function(id){
	if(id in this.coll){
		console.log("remove item by id, id found:"+id);
		tmp = this.coll[id];
		delete this.coll[id];
		console.log("Removed item with id:"+tmp.itemID+" from user:"+tmp.userID+" item: "+tmp.item);
		return tmp.itemID;
	}
	return false;
};

/**
 * Remove the provided item from the collection
 * @param itemID - the item to be removed
 **/
Collection.prototype.removeItem = function(itemID){
	if (this.coll.hasOwnProperty(itemID)){
		delete this.coll[itemID];
		return true;
	}
	else{
		return false;
	}
};


/**
 * getItem from the collection
 * @param item - the item id
 *
 **/
Collection.prototype.getItem = function(itemID){
	if (this.coll.hasOwnProperty(itemID)){
		item = this.coll[itemID]
		//return ({"itemID":itemID,"userID":item.userID, "item": item.item})
		return item;
	}
	else{
		return false;
	}
};


/**
 * Get all items provided by the user, identified by the userID.
 * @param limit=max number of items
 * @param userID
 * @param filterCriteria - associative array
 * @returns array with [user,item] pairs 
 **/
Collection.prototype.getItems = function (){
	return this.coll;
};



/**
 * Replace the item identified with the provided itemID
 * @param itemID the item 
 * @param item the new item corresponding for the itemID
 * return true if item is succesfully replaced 
 **/
Collection.prototype.replaceItem = function(itemID, item){
	if (this.coll.hasOwnProperty(itemID)){
		this.coll[itemID] = item;
		return true;
	}
	else{
		return false;
	}
};


Collection.prototype.getRandom = function(){
    var keys = Object.keys(this.coll);
    if (keys.length >0){
         var key = keys[Math.floor(Math.random() * keys.length)];
         return key;
    }
    else{
        return false;
    }
};

/**
 * Updates the properties for the provided itemID
 * @param itemID identifier 
 * @param properties  -the properties that need to be updated. Max depth level is 2
 * @TODO - > max two levels
 * @TODO -> is this possible with recursiveness
 * @returns true if the item was succesfully updated
 * 	    false if the item does not exists of the properties have a depth > 2
 **/
Collection.prototype.updateItem = function (itemID, properties){
	if (this.coll.hasOwnProperty(itemID)){
		item = this.coll[itemID];
	}
	else{
		return false;
	}
	if (getDepth(properties)>2){
		return false;
	}
	else{
		if (item != undefined){
			for (key in properties){
				if (typeof(properties[key])!='object'){
					item[key] = properties[key];
				}
				if (typeof(properties[key])=='object'){
					for (propKey in properties[key]){
						if (typeof(properties[key][propKey])!='object'){
							if (item[key] == undefined){
								item[key]= {};
							}
							item[key][propKey] = properties[key][propKey];
						}
						if (typeof(properties[key][propKey])=='object'){
							for (propPropKey in properties[key][propKey]){
								if (typeof(properties[key][propKey][propPropKey])!='object'){
									if (item[key][propKey] == undefined){
										item[key][propKey] = {};
									}
									item[key][propKey][propPropKey] = properties[key][propKey][propPropKey];
								}
								if (typeof(properties[key][propKey])=='object'){
									//not touching this
			
								}
							}									
						}
					}	
				}
			}
		}
	}
	this.coll[itemID] = item;
	return true;
}


/**
 * Determine depth of the object
 **/
function getDepth (o, depth){
var depth = depth || 0;
 for(var prop in o){
    if(o.hasOwnProperty(prop)){
      if(typeof o[prop] == 'object'){
	depth = getDepth(o[prop], ++depth );
      }
    }
  }
  return depth;
};


