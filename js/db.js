//
// Database management
//
let db;
let dbReq = indexedDB.open('heatTransferElementsDB', 1);

dbReq.onupgradeneeded = function (event) { // Fires when the version of the database goes up, or the database is created for the first time
    db = event.target.result;
    let heatTransferElements;
    if (!db.objectStoreNames.contains('heatTransferElements')) { // Create an object store named heatTransferElements, or retrieve it if it already exists.
        heatTransferElements = db.createObjectStore('heatTransferElements', {
            autoIncrement: true
        });
    } else {
        heatTransferElements = dbReq.transaction.objectStore('heatTransferElements');
    }
}

dbReq.onsuccess = function (event) { // Fires once the database is opened and onupgradeneeded completes  
    db = event.target.result; // Set the db variable to our database so we can use it
    getAndDisplayHeatTransferElements(db);
}

dbReq.onerror = function (event) { // Fires when we can't open the database
    console.log('error opening database ' + event.target.errorCode);
}

//
// IndexedDB functions
//

function addHeatTransferElement(db, hcTitle, hcDate, hcType, hcData, hcResult, hccustomer, hcdescription){
    // Start a database transaction and get the heatTransferElements object store
    let transaction = db.transaction(['heatTransferElements'], 'readwrite');
    let objectStore = transaction.objectStore('heatTransferElements');
    var timestamp = Date.now() //timestamps are used as keys

    // Put the heat transfer element in the object store  
    objectStore.add(new heatTransferElement(hcTitle, hcDate, hcType, hcData, hcResult, hccustomer, hcdescription, timestamp),timestamp);

    // Wait for the database transaction to complete
    transaction.oncomplete = function () {
        getAndDisplayHeatTransferElements(db);
    }
    transaction.onerror = function (event) {
        console.log('error storing note ' + event.target.errorCode);
    }
}

function getAndDisplayHeatTransferElements(db) { // getAndDisplayHeatTransferElements retrieves all heatTransferElements in the notes object store using an IndexedDB cursor and sends them to DisplayElements so they can be displayed
    let transaction = db.transaction(['heatTransferElements'], 'readonly');
    let objectStore = transaction.objectStore('heatTransferElements');   
    let req = objectStore.openCursor(); // Create our openCursor request to get all items in the store, which we collect in the allHeaterTransferElements array.
    
    heatTransferElements.length = 0;

    req.onsuccess = function (event) {    
        let cursor = event.target.result; // The result of req.onsuccess is an IDBCursor
        if (cursor != null) { // If the cursor isn't null, we got an IndexedDB item. Add it to the heatTransferElements array and have the cursor continue
            heatTransferElements.push(new heatTransferElement(cursor.value.title,                                            
                                                            cursor.value.date, 
                                                            cursor.value.type, 
                                                            cursor.value.data, 
                                                            cursor.value.result, 
                                                            cursor.value.customer, 
                                                            cursor.value.description, 
                                                            cursor.value.timestamp))
            cursor.continue();
        } else { //If we have a null cursor, it means we've gotten all the items in the store, so display the heatTransferElements we got
            DisplayElements(heatTransferElements);
        }
    }

    req.onerror = function (event) {
        console.log('error in cursor request ' + event.target.errorCode);
    }
}

function DeleteHeatTransferElement(myIndex) {
    let transaction = db.transaction(['heatTransferElements'], 'readwrite');
    let objectStore = transaction.objectStore('heatTransferElements');
    var result = objectStore.delete(myIndex);
    result.onsuccess = function (myIndex) {
        console.log('Successfully edited key')
        getAndDisplayHeatTransferElements(db);
    }

    result.onerror = function (event) {
        console.log('error in cursor request ' + event.target.errorCode);
    }
}

function UpdateHeatTransferElement(key, newValue) {
    let transaction = db.transaction(['heatTransferElements'], 'readwrite');
    let objectStore = transaction.objectStore('heatTransferElements');   
    var result = objectStore.put(newValue, key);
    result.onsuccess = function (event) {
        console.log('Successfully edited key')
        getAndDisplayHeatTransferElements(db);
    };

    result.onerror = function (event) {
        console.log('error in cursor request ' + event.target.errorCode);
    };
};

function AddHeatTransferElementByType(itemType) {
        switch(itemType) {
        case 'conduction':
            console.log(defaultDataString(5,6));
            addHeatTransferElement(db, "","", "conduction", defaultDataString(5,6), "0", "", "");
            break;
        case 'radiation':
            addHeatTransferElement(db, "", "", "radiation", defaultDataString(4,5), "0", "", "");
            break;
        case 'convection':
            addHeatTransferElement(db, "", "", "convection", "", "0", "", "");
            break;
        case 'heatup':
            addHeatTransferElement(db, "", "", "heatup", defaultDataString(6,7), "0", "", "");
            break;
        case 'processload':
            addHeatTransferElement(db, "", "", "processload", defaultDataString(6,7), "0", "", "");
            break;
        default:
            addHeatTransferElement(db, "", "", "conduction", "", "0", "", "");
            break;
        }
}



