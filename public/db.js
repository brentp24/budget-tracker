
const request = window.indexedDB.open("budgetTrackerDB", 1);
var db;
// Create an object store inside the onupgradeneeded method.
request.onupgradeneeded = ({ target }) => {
    db = target.result;
    const objectStore = db.createObjectStore("budgetTracker", { autoIncrement: true });
    // objectStore.createIndex("transaction", "transaction");
};

// On success console the result.
request.onsuccess = event => {
    db = event.target.result;
    if (navigator.onLine) {
        checkDatabase();
    }

};

function checkDatabase() {
    const transaction = db.transaction(["budgetTracker"], "readwrite");
    const store = transaction.objectStore("budgetTracker");
    // store.add({ transaction: 1, name: "credit card", value: 5000 });
    var getAll = store.getAll()
    getAll.onsuccess = function () {
        if (getAll.result.length > 0) {
            fetch("/api/transaction/bulk", {
                method: "POST",
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then(() => {
                    // delete if successful
                    const transaction = db.transaction(["budgetTracker"], "readwrite");
                    const store = transaction.objectStore("budgetTracker");
                    store.clear();

                });
        }
    }
}

request.onerror = function (event) {
    console.log("Error Code: " + event.target.errorCode);
};




function saveRecord(record) {
    const transaction = db.transaction(["budgetTracker"], "readwrite");
    const store = transaction.objectStore("budgetTracker");
    store.add(record);


}

// listen for app coming back online
window.addEventListener("online", checkDatabase);