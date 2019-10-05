# Heater-Calc
Web app that calculates heater transfer for conduction, convection, radiation, process load and heatup.

Heater Calc only uses html, css, js and bootstrap components. The bootstrap components that are used are cards, modals, navbar and footers. Because of this it is light weight and very fast.

It uses IndexedDB as a client database therefore there is no need for mongoDB to be running on the server.

This is a great example for those who do not want the maintenance of backend components like mongodb but need data persistence on the client side.

Note: Client side browser databases are great for an application like this.  This a simple calculator app with persitant data at no cost.  This is a great use case where you don't want the expense of a server side data base or the maintenance nightmares.

![heater calc image](https://www.jimmysoftllc.com/img/portfolio/02-full.jpg "Heater calc screenshot")

## IndexDB setup

To set up the database on the client side I use the following code.

First you open the data base using `let dbReq = indexedDB.open(name, version);`.  If a database already exists and is the same version it skips `dbReq.onupgradeneeded`.  If the database doesn't exist or the version has changed it will process the code in `dbReq.onupgradeneeded`.

Then the code runs `dbReq.onsuccess` which runs `getAndDisplayHeatTransferElements(db);`.

>Note: The operations performed using IndexedDB are done asynchronously so `getAndDisplayHeatTransferElements(db);` has to be in the callback for `dbReq.onsuccess`.

```
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
```

