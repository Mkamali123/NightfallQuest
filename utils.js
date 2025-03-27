//This should point to YOUR copy of the dbCnnector.php file. 
const dbConnectorUrl = "https://ashaju01.webhosting1.eeecs.qub.ac.uk/dbConnector.php";

//Update this with YOUR database credentials. 
let dbConfig = new URLSearchParams({
    hostname: 'localhost',
    username: 'ashaju01',
    password: 'f9Qx9XBPSnqZWBGN',
    database: 'CSC1034_CW_14',
});

//Useful debug function to print the values of all Session Storage items
function printSessionStorage() {
    console.log("Session Storage Items:");
    for (let i = 0; i < sessionStorage.length; i++) {
        let key = sessionStorage.key(i);
        let value = sessionStorage.getItem(key);
        console.log(`${key}: ${value}`);
    }
}

// Check to see if a user is logged in, if not, direct to login page. 
function checkLogin() {
    if (!sessionStorage.getItem('id')) {
        window.location.href = 'login.html';
        return;
    }
}