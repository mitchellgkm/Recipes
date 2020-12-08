let searchBar = document.getElementById("recipesearch");
let searchButton = document.getElementById("searchbutton");

var offsetValue = 0;

searchBar.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    offsetValue = 0;
    callEndpoint(offsetValue);
  }
});

searchButton.addEventListener("click", (event) => {
  if (searchBar.value != "") {
    offsetValue = 0;
    callEndpoint(offsetValue);
  }
});

let searchArrowsDiv = document.getElementById("searcharrows");
let leftSearchArrow = document.getElementById("leftSearchArrow");
let rightSearchArrow = document.getElementById("rightSearchArrow");

leftSearchArrow.addEventListener("click", () => {
  if (searchBar.value != "") {
    offsetValue -= 10;
    callEndpoint(offsetValue);
  }
});

rightSearchArrow.addEventListener("click", () => {
  if (searchBar.value != "") {
    offsetValue += 10;
    callEndpoint(offsetValue);
  }
});

searchArrowsDiv.style.visibility = "hidden";

let cards = document.getElementsByClassName("card");

for (i = 0; i < cards.length; i++) {
  cards[i].style.visibility = "hidden";
}

let cardImages = document.getElementsByClassName("card-img");
let cardLinks = document.getElementsByClassName("card-link");
let cardTexts = document.getElementsByClassName("card-text");

function callEndpoint(offset) {
  searchArrowsDiv.style.visibility = "visible";

  let searchInput = searchBar.value;

  const endpoint = "https://api.spoonacular.com/recipes/complexSearch";
  const search = searchInput;
  const key = "2d06ef3e1fd943399ea34fce63f0e203";
  const url =
    endpoint +
    "?query=" +
    search +
    "&apiKey=" +
    key +
    "&addRecipeInformation=true" +
    `&offset=${offset}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      var results = data.results;
      console.log(results);

      var maxLength = Math.min(cards.length, results.length);

      for (i = 0; i < maxLength; i++) {
        cards[i].style.visibility = "visible";
        var image = results[i]["image"];
        var title = results[i]["title"];
        var url = String(results[i]["sourceUrl"]);

        cardImages[i].setAttribute("src", `${image}`);
        cardLinks[i].innerText = title;
        cardLinks[i].setAttribute("href", `${url}`);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
