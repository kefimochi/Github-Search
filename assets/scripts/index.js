(function() {
  let form = document.querySelector("#form");

  form.addEventListener("submit", function(e) {
    // Captures a string entered in the search field.
    let input = document.getElementById("search-bar").value;
    // Adds searched value to GitHub's API
    let url = `https://api.github.com/search/users?q=${input}`;
    // Prevents page from reloading and sending data to a sever.
    e.preventDefault();

    // Goes to a provided url and converts the received data into JSON object
    fetch(url, {
      method: "get"
    }).then(res => {
      res.json().then(result => {
        console.log(result.items);
      });
    });

    function renameLater(users) {
      console.log(users);
    }
  });
})();
