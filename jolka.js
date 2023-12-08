function jolkaFormFunction(event) {
  event.preventDefault();
  let jolkaSearchInput = document.querySelector("#jolka-search-input");
  let citySearch = document.querySelector("#city");
  citySearch.innerHTML = jolkaSearchInput.value;
}

let jolkaSerachForm = document.querySelector("#search-form");
jolkaSerachForm.addEventListener(`submit`, jolkaFormFunction);
