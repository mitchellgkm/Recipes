var cards = document.getElementsByClassName("card");

for (i = 0; i < cards.length; i++) {
  cards[i].style.visibility = "hidden";
}

var cardImages = document.getElementsByClassName("card-img");
var cardTitles = document.getElementsByClassName("card-title");
var cardLinks = document.getElementsByClassName("card-link");
var cardTexts = document.getElementsByClassName("card-text");

function callEndpoint() {
  var searchInput = document.getElementById("recipesearch").value;

  const endpoint = "https://api.spoonacular.com/recipes/complexSearch";
  const search = searchInput;
  const key = "2d06ef3e1fd943399ea34fce63f0e203";
  const url =
    endpoint +
    "?query=" +
    search +
    "&apiKey=" +
    key +
    "&addRecipeInformation=true";

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      var results = data.results;
      console.log(results[0]["title"]);

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
