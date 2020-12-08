let randomButton = document.getElementById("randombutton");
let recipeCard = document.getElementById("recipecard");

randomButton.addEventListener("click", () => {
  const endpoint = "https://api.spoonacular.com/recipes/complexSearch";
  const key = "2d06ef3e1fd943399ea34fce63f0e203";
  const url =
    endpoint +
    "?query=" +
    "&apiKey=" +
    key +
    "&addRecipeInformation=true" +
    "&sort=random" +
    "&number=1";

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      var result = data.result;
      //To be edited to mimic the recipes page
      var image = result["url"];

      recipeCard.setAttribute("src", `${image}`);
      recipeCard.innerText = title;
      recipeCard.setAttribute("href", `${url}`);
    })
    .catch((err) => {
      console.log(err);
    });
});
