let inputString = "";
// A string that shows how many users were found
let numFound = document.querySelector("#users-found");
// Selects a container that shows a brief users desciption and
// a total amount of users found.
let userList = document.querySelector(".all-users-container");
// Selects a page showing no results
let noResult = document.querySelector(".no-result");
// Selects a section where a detailed display will be generated
let detailedUserSection = document.querySelector(".detailed-user");
// Page number that will be needed for pagination
let pageNum = 0;
// Selects the arrow container
let arrowContainer = document.querySelector(".arrows-container");
// To use for pagination and displaying on screen
let totalUsersFound = 0;

// Accepts string input, fetches data from GitHub's API
(function() {
  let form = document.querySelector("#form");
  form.addEventListener("submit", e => {
    // Prevents page from reloading and sending data to a sever.
    e.preventDefault();
    // Finds total every time a new form is submitted, not
    // affected by pagination
    search();
  });
})();

function search() {
  // Captures a string entered in the search field.
  inputString = document.getElementById("search-bar").value;
  // Adds searched value to GitHub's API
  console.log("Page num is ", pageNum);
  let url = `https://api.github.com/search/users?q=${inputString}&per_page=10&page=${pageNum}`;
  // let url = `https://api.github.com/search/users?q=${inputString}`;
  // Clears any previous user searches
  userList.innerHTML = "";

  // Goes to a provided url and converts the received data into a JSON object
  totalFound();
  axios
    .get(url, {
      method: "get"
    })
    .then(res => {
      // console.log(res.data.total_count);
      // pagination(res);
      res.data.items.length > 0 ? addUsersToDOM(res.data) : noUsersFound();
    })
    .catch(err => console.log(err));
}

function addUsersToDOM(users) {
  userList.style.display = "flex";
  noResult.style.display = "none";
  arrowContainer.style.display = "flex";
  // console.log(users.items);
  users.items.forEach(person => {
    // Prevents undefined profiles from showing
    if (person === undefined) return;
    // Shows small cards for all found users
    extractUserObject(person);
  });
}

// Resets everything to default if GitHub user is not found and
// alerts about it.
function noUsersFound() {
  numFound.style.display = "none";
  userList.style.display = "none";
  arrowContainer.style.display = "none";
  noResult.style.display = "flex";
  alert(`No ${inputString} users found. Please try again!`);
}

function extractUserObject(user) {
  axios
    .get(user.url, {
      method: "get"
    })
    .then(res => {
      // Creates a brief user component & attaches to the DOM
      let simpleUser = createUserComponent(res.data);
      // Shows full profile of a user when clicked
      simpleUser.addEventListener("click", () => {
        showFullUser(user, res.data);
      });
    })
    .catch(err => {
      console.log(err);
    });
}

// Sends a request to the last search page and gets the total found results count
function totalFound() {
  numFound.style.display = "block";
  axios
    .get(
      `https://api.github.com/search/users?q=${inputString}&per_page=10&page=${pageNum}:last`,
      {
        method: "get"
      }
    )
    .then(res => {
      totalUsersFound = res.data.total_count;
      numFound.textContent = `Found ${totalUsersFound} results for "${inputString}", page ${pageNum +
        1}`;
    });
}

function createUserComponent(user) {
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

  return simpleUser;
}

function showFullUser(user, detailedUser) {
  arrowContainer.style.display = "none";
  noResult.style.display = "none";
  numFound.style.display = "none";
  userList.style.display = "none";
  detailedUserSection.style.display = "flex";
  detailedUserComponent.innerHTML = "";
  detailedUserComponent(user, detailedUser);
}

function detailedUserComponent(user, detailedUser) {
  console.log("USER", user);
  console.log("DTAILD", detailedUser);

  //detailedUserSection

  // -------------Top section of container  --------------------- //
  let topDetailed = document.createElement("div");
  topDetailed.classList.add("top-detailed");
  detailedUserSection.appendChild(topDetailed);

  let avatar = document.createElement("img");
  avatar.setAttribute("src", user.avatar_url);
  topDetailed.appendChild(avatar);

  let detailedInfo = document.createElement("div");
  detailedInfo.classList.add("detailed-info");
  topDetailed.appendChild(detailedInfo);

  let name = document.createElement("h2");
  console.log(user.name);
  name.textContent = detailedUser.name;
  detailedInfo.appendChild(name);

  let desciption = document.createElement("p");
  desciption.textContent = detailedUser.bio;
  detailedInfo.appendChild(desciption);

  let allStats = document.createElement("div");
  allStats.classList.add("all-numbers");
  detailedInfo.appendChild(allStats);

  let numContainer1 = document.createElement("div");
  numContainer1.classList.add("num-container");
  allStats.appendChild(numContainer1);

  let cont1Title = document.createElement("h2");
  cont1Title.textContent = detailedUser.following;
  numContainer1.appendChild(cont1Title);

  let cont1Desc = document.createElement("h5");
  cont1Desc.textContent = "Following";
  numContainer1.appendChild(cont1Desc);

  let numContainer2 = document.createElement("div");
  numContainer2.classList.add("num-container");
  allStats.appendChild(numContainer2);

  let cont2Title = document.createElement("h2");
  cont2Title.textContent = detailedUser.followers;
  numContainer2.appendChild(cont2Title);

  let cont2Desc = document.createElement("h5");
  cont2Desc.textContent = "Followers";
  numContainer2.appendChild(cont2Desc);

  let numContainer3 = document.createElement("div");
  numContainer3.classList.add("num-container");
  allStats.appendChild(numContainer3);

  let cont3Title = document.createElement("h2");
  cont3Title.textContent = detailedUser.public_repos;
  numContainer3.appendChild(cont3Title);

  let cont3Desc = document.createElement("h5");
  cont3Desc.textContent = "Repositories";
  numContainer3.appendChild(cont3Desc);

  //public_repos

  // -------------Bottom section of container  --------------------- //
  let bottomDetailed = document.createElement("div");
  bottomDetailed.classList.add("bottom-detailed");
  detailedUserSection.appendChild(bottomDetailed);

  let repoContainer = document.createElement("div");
  repoContainer.classList.add("repo-container");
  bottomDetailed.appendChild(repoContainer);

  let topRepo = document.createElement("div");
  topRepo.classList.add("top-repo");
  repoContainer.appendChild(topRepo);

  let bottomRepo = document.createElement("div");
  bottomRepo.classList.add("bottom-repo");
  repoContainer.appendChild(bottomRepo);

  // Get an API request for all user repos, afte which iterate through the array using forEach

  //         <div class="top-repo">
  //           <h2>MDN Search Extension</h2>
  //           <p>
  //             Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ex
  //             alias at explicabo assumenda harum maxime provident facilis
  //             temporibus earum. Delectus totam rerum ut, tempore perferendis sed
  //             qui distinctio tenetur.
  //           </p>
  //         </div>
  //         <div class="bottom-repo">
  //           <img src="assets/images/star-solid.svg" alt="Star icon" />
  //           <h4>30</h4>
  //           <img src="assets/images/code-branch-solid.svg" alt="Branch icon" />
  //           <h4>5</h4>
  //         </div>
}

// Allows user to traverse through pages
let arrowLeft = document.querySelector("#arrow-left");
let arrowRight = document.querySelector("#arrow-right");
arrowLeft.addEventListener("click", () => {
  if (pageNum > 0) {
    pageNum--;
    search();
  }
});
arrowRight.addEventListener("click", () => {
  if (pageNum < totalUsersFound / 10) {
    pageNum++;
    search();
  }
});
