let sessionId;
let id = sessionStorage.getItem('id'); //ID of the player.
let caveNumber; //Current cave number the player is on

async function createNewSession() {
    try {
        //Insert new session
        let insetQuery = `INSERT INTO sessions(id)
        VALUES(${id})`;

        dbConfig.set('query', insertQuery);

        let sessionCreationResponse = await fetch(dbConnectorUrl, {
            method: "POST",
            body: dbConfig
        });

        let sessionCreationResult = await sessionCreationResponse.json();

        if (!sessionCreationResult.success) {
            console.error("Failed to create session.", sessionCreationResult);
            return;
        }

        console.log("Session created successfully.");

        // Once inserted, we need to retrieve the session ID we just created for this user.
        let selectQuery = `SELECT sessionId FROM sessions
        WHERE id = ${id} ORDER BY startedAt DESC LIMIT 1`;

        bConfig.set('query', selectQuery);

        let sessionFetchResponse = await fetch(dbConnectorUrl, {
            method: "POST",
            body: dbConfig
        });

        let sessionFetchResult = await sessionFetchResponse.json();

        if (sessionFetchResult.success && sessionFetchResult.data.length > 0) {
            sessionId = sessionFetchResult.data[0].sessionId;
            sessionStorage.setItem('sessionId', sessionId);
            console.log("Latest session ID retrieved:", sessionId);
        } else {
            console.error("Failed to retrieve session ID.", sessionFetchResult);
        }
    
    } catch (error) {
    console.error("Error creating session:", error);
    }

}
