// Wait for the page to load
window.addEventListener("load", function () {
    // Make the GET request   

    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(function (response) {
            // Convert the response to JSON
            return response.json();
        })
        .then(function (json) {
            console.log(json); // Log the JSON data

            const div = document.getElementById("postList");

            // Add HTML that includes the JSON data
            let titleInput = document.getElementById('titleInput');
            let titleOutputs = [];
            let bodyInput = document.getElementById('bodyInput');
            let bodyOutputs = [];

            const submit = document.getElementById("submit"); // submits title and body to arrays for new posts
            submit.addEventListener("click", function () {
                titleOutputs.push(titleInput.value);
                titleInput.value = "";
                bodyOutputs.push(bodyInput.value);
                bodyInput.value = "";
            });

            const fetch = document.getElementById("fetchButton");
            fetch.addEventListener("click", function () {

                let loadingMessage = document.createElement('li');
                loadingMessage.textContent = "loading, please wait..."
                document.getElementById("error").appendChild(loadingMessage); // Not sure if this is what was meant by loading message

                document.getElementById("postList").textContent = ""; // refreshes page

                for (let i = titleOutputs.length - 1; i > -1; i--) { // lists all newly submitted posts from newest first to oldest last
                    let postBreak = document.createElement('br');
                    document.getElementById("postList").appendChild(postBreak);

                    let postTitleRecents = document.createElement('li');
                    postTitleRecents.textContent = `TITLE: ${titleOutputs[i]}`
                    document.getElementById("postList").appendChild(postTitleRecents);

                    let postBodyRecents = document.createElement('li');
                    postBodyRecents.textContent = `BODY: ${bodyOutputs[i]}`
                    document.getElementById("postList").appendChild(postBodyRecents);
                }

                for (let i = json.length - 1; i > -1; i--) { // lists all posts in api from newest first to oldest last
                    let postBreak = document.createElement('br');
                    document.getElementById("postList").appendChild(postBreak);

                    let postTitleHistory = document.createElement('li');
                    postTitleHistory.textContent = `TITLE: ${json[i].title}`
                    document.getElementById("postList").appendChild(postTitleHistory);

                    let postBodyHistory = document.createElement('li');
                    postBodyHistory.textContent = `BODY: ${json[i].body}`
                    document.getElementById("postList").appendChild(postBodyHistory);
                }

                loadingMessage.remove();

            });

            

        })
        .catch(function (error) {
            console.error("Error fetching the data:", error);
        });
});