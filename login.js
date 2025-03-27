//This clears the session storage resetting the environmnt for the incoming user. 
sessionStorage.clear();

//A useful function that prints out all session storage variables to the console. 
printSessionStorage();

//This function will toggle between the login form and registration form
//It operates by adding or removing the class name from the listed <div>
//based on it's initial value.
function toggleForms() {
    document.getElementById("loginContainer").classList.toggle("hidden");
    document.getElementById("registerContainer").classList.toggle("hidden");
}

//This function manages the login process for an existing user. 
document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    //Checks the database to see if a matching username and password can be found.
    let sqlQuery = `SELECT id, username FROM users 
    WHERE username = '${username}' AND password = '${password}'`;
    dbConfig.set('query', sqlQuery);

    try {
        let response = await fetch(dbConnectorUrl, {
            method: "POST",
            body: dbConfig
        });
        let result = await response.json();

        //If a matching username and password is found, complete sign in process. 
        if (result.success && result.data.length > 0) {
            let user = result.data[0];
            sessionStorage.setItem("id", user.id);
            sessionStorage.setItem("username", user.username);
            window.location.href = "start.html";
        } else {
            document.getElementById("loginMessage").textContent = "Invalid username or password.";
        }
    } catch (error) {
        console.error("Error completing login:", error);
    }
});

