// const request = window.indexedDB.open("firstDatabase", 1);

// request.onsuccess = event => {
//   console.log(request.result.name);
// };

const request = window.indexedDB.open("budgetTracker", 1);
var db;
// Create an object store inside the onupgradeneeded method.
request.onupgradeneeded = ({ target }) => {
    db = target.result;
    const objectStore = db.createObjectStore("budgetTracker", { autoIncrement: true });
    // objectStore.createIndex("transaction", "transaction");
};

// On success console the result.
request.onsuccess = event => {
    console.log(request.result);
    db = event.target.result;
    const transaction = db.transaction(["budgetTracker"], "readwrite");
    const store = transaction.objectStore("budgetTracker");
    // store.add({ transaction: 1, name: "credit card", value: 5000 });
    var getAll = store.getAll()
    getAll.onsuccess = function () {
        console.log(getAll.result)
    }
};

function saveRecord(transaction) {
    console.log("hi");
    console.log(transaction);
}
