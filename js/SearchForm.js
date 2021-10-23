class SearchForm {
  constructor(form) {
    const searchBar = document.createElement("input");
    const buttonHolder = document.createElement("div");
    const searchButton = document.createElement("button");
    searchBar.classList.add("search-bar", "form-control");
    searchBar.type = "text";
    searchBar.placeholder = "Symbol, eg. AAPL";
    buttonHolder.classList.add("input-group-append");
    searchButton.classList.add("btn-outline-secondary", "btn");
    searchButton.id = "searchButton";
    searchButton.type = "button";
    searchButton.innerText = "Search";
    buttonHolder.appendChild(searchButton);
    form.appendChild(searchBar);
    form.appendChild(buttonHolder);
    this.searchBar = searchBar;
    searchButton.addEventListener("click", () => {
      if (this.searchBar.value == "") return;
      this.callback(searchBar.value);
    });
  }

  onSearch(cb) {
    this.callback = cb;
  }
}
