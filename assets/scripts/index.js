let inputString = "";
// Selects a container that shows a brief users desciption and
// a total amount of users found.
let userList = document.querySelector(".all-users-container");
// Selects a page showing no results
let noResult = document.querySelector(".no-result");
// Prevents page from reloading and sending data to a sever.

// Accepts string input, fetches data from GitHub's API
(function() {
  let form = document.querySelector("#form");

  form.addEventListener("submit", function(e) {
    // Captures a string entered in the search field.
    let input = document.getElementById("search-bar").value;
    inputString = input;
    // Adds searched value to GitHub's API
    let url = `https://api.github.com/search/users?q=${input}`;
    e.preventDefault();
    // Clears any previous user searches
    userList.innerHTML = "";

    // Goes to a provided url and converts the received data into a JSON object
    fetch(url, {
      method: "get"
    })
      .then(res => {
        res.json().then(result => {
          result.total_count !== 0 ? addUsersToDOM(result) : noUsersFound();
        });
      })
      .catch(err => {
        console.log(err);
      });
  });
})();

function addUsersToDOM(users) {
  userList.style.display = "flex";
  noResult.style.display = "none";
  totalFound(users.items);
  console.log(users.items);
  users.items.forEach(person => {
    // Prevents undefined profiles from showing
    if (person === undefined) return;
    extractUserObject(person);
  });
}

// Resets everything to default if GitHub user is not found and
// alerts about it.
function noUsersFound() {
  numFound.style.display = "none";
  userList.style.display = "none";
  noResult.style.display = "flex";
  alert(`No ${inputString} users found. Please try again!`);
}

function extractUserObject(user) {
  return fetch(user.url, {
    method: "get"
  })
    .then(res => {
      res.json().then(result => {
        userComponent(result);
      });
    })
    .catch(err => {
      console.log(err);
    });
}

function totalFound(users) {
  const numFound = document.querySelector("#users-found");
  numFound.style.display = "block";
  numFound.textContent = `Found ${users.length} results for ${inputString}`;
}

function userComponent(user) {
  console.log(user);
  let simpleUser = document.createElement("div");
  simpleUser.classList.add("simple-user");
  userList.appendChild(simpleUser);

  let topDescription = document.createElement("div");
  topDescription.classList.add("top-description");
  simpleUser.appendChild(topDescription);

  let avatar = document.createElement("img");
  avatar.setAttribute("src", user.avatar_url);
  topDescription.appendChild(avatar);

  let userShortInfo = document.createElement("div");
  userShortInfo.classList.add("user-short-info");
  topDescription.appendChild(userShortInfo);

  let name = document.createElement("h3");
  name.textContent = user.name;
  userShortInfo.appendChild(name);

  let login = document.createElement("span");
  login.textContent = `@${user.login}`;
  name.appendChild(login);

  let desciption = document.createElement("p");
  desciption.textContent = user.bio;
  userShortInfo.appendChild(desciption);

  let bottomDescription = document.createElement("div");
  bottomDescription.classList.add("bottom-description");
  simpleUser.appendChild(bottomDescription);

  let location = document.createElement("h4");
  location.textContent = user.location;
  bottomDescription.appendChild(location);

  let followers = document.createElement("h4");
  followers.textContent = `Followers: ${user.followers}`;
  bottomDescription.appendChild(followers);
}

function detailedUserComponent() {}
