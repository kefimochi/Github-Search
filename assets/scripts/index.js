// import GitHub from "github-api";
// const Octokit = require("@octokit/rest");
// const octokit = new Octokit();

(function() {
  let form = document.querySelector("#form");

  form.addEventListener("submit", function(e) {
    let input = document.getElementById("search-bar").value;
    console.log("Concole log", input);
    e.preventDefault(); // Stop page refresh.

    let data = new URLSearchParams(new FormData(form));

    let url = `https://api.github.com/search/users?q=${input}`;

    fetch(url, {
      method: "get"
    }).then(res => {
      //   console.log(res.json());
      renameLater(res.json());
      return res.json();
    });

    function renameLater(users) {
      console.log(users);
    }
  });
})();
