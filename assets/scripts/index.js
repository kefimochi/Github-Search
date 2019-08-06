(function() {
  let form = document.querySelector("#form");

  form.addEventListener("submit", function(e) {
    // Captures a string entered in the search field.
    let input = document.getElementById("search-bar").value;
    // Adds searched value to GitHub's API
    let url = `https://api.github.com/search/users?q=${input}`;
    // Selects a container that shows a brief users desciption and
    // a total amount of users found.
    let list = document.querySelector(".all-users-container");
    // Selects a page showing no results
    let noResult = document.querySelector(".no-result");
    // Prevents page from reloading and sending data to a sever.
    e.preventDefault();

    // Goes to a provided url and converts the received data into a JSON object
    fetch(url, {
      method: "get"
    }).then(res => {
      res.json().then(result => {
        if (result.total_count !== 0) {
          list.style.display = "flex";
          noResult.style.display = "none";
          totalFound(result);
          console.log(result.items);
          result.items.forEach(item => {});
        } else {
          list.style.display = "none";
          noResult.style.display = "flex";
          alert(`No ${input} users found. Please try again!`);
        }
      });
    });

    function totalFound(users) {
      const numFound = document.querySelector("#users-found");
      numFound.textContent = `Found ${users.total_count} results for ${input}`;
      console.log(users);
    }
  });
})();
