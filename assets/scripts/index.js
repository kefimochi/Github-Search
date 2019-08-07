(function() {
  let form = document.querySelector("#form");

  form.addEventListener("submit", function(e) {
    // Captures a string entered in the search field.
    let input = document.getElementById("search-bar").value;
    // Adds searched value to GitHub's API
    let url = `https://api.github.com/search/users?q=${input}`;
    // Selects a container that shows a brief users desciption and
    // a total amount of users found.
    let userList = document.querySelector(".all-users-container");
    // Selects a page showing no results
    let noResult = document.querySelector(".no-result");
    // Prevents page from reloading and sending data to a sever.
    e.preventDefault();

    // Goes to a provided url and converts the received data into a JSON object
    fetch(url, {
      method: "get"
    }).then(res => {
      res.json().then(result => {
        result.total_count !== 0 ? addUsersToDOM(result) : noUsersFound();
      });
    });

    function addUsersToDOM(users) {
      userList.style.display = "flex";
      noResult.style.display = "none";
      totalFound(users.items);
      console.log(users.items);
      users.items.forEach(person => {
        let detailedProfile = extractUserObject(person);
        console.log("Detailed", detailedProfile);
      });
    }

    function noUsersFound() {
      numFound.style.display = "none";
      userList.style.display = "none";
      noResult.style.display = "flex";
      alert(`No ${input} users found. Please try again!`);
    }

    function extractUserObject(user) {
      let detailedData;
      fetch(user.url, {
        method: "get"
      }).then(res => {
        res.json().then(result => {
          console.log(result);
          detailedData = result;
        });
      });
      return detailedData;
    }

    function totalFound(users) {
      const numFound = document.querySelector("#users-found");
      numFound.style.display = "block";
      numFound.textContent = `Found ${users.length} results for ${input}`;
    }
  });
})();
