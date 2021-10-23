class SearchResult {
  constructor(results) {
    this.searchUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search-ticker?query=`;
    this.searchUrl2 = `&limit=10&exchange=NASDAQ`;
    this.loadCompanyDetailsUrl =
      "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/";
    this.searchList = document.createElement("ul");
    this.spinner = document.createElement("div");
    this.list = document.createElement("span");
    this.resultsList = results;
    this.searchList.id = "searchList";
    this.spinner.classList.add("loader", "d-none");
    this.list.classList.add("list", "d-none");
    this.searchList.appendChild(this.spinner);
    this.searchList.appendChild(this.list);
    results.appendChild(this.searchList);
  }

  renderResults(x) {
    this.list.innerHTML = "";
    this.spinner.classList.remove("d-none");
    this.resultsList.classList.remove("d-none");
    this.showResults(x);
  }

  async getResults(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  async loadCompanyDetails(ticker) {
    const response = await fetch(this.loadCompanyDetailsUrl + ticker);
    const details = await response.json();
    return details;
  }

  async showResults(url) {
    const data = await this.getResults(this.searchUrl + url + this.searchUrl2);
    const regExp = new RegExp(url, "gi");
    let color;
    for (let i = 0; i < data.length; i++) {
      const details = await this.loadCompanyDetails(data[i].symbol);
      if (details.profile) {
        const listItem = document.createElement("li");
        listItem.classList.add("d-none", "oneListItem");
        if (details.profile.changes < 0) color = "#f70d1a";
        if (details.profile.changes === 0) color = "#6c757d";
        if (details.profile.changes > 0) color = "#7CFC00";
        const changesPercentage = details.profile.changesPercentage
          .toString()
          .slice(0, 4);
        listItem.innerHTML += `<img onerror="this.src='./images/Stocks-icon.png'" src="${details.profile.image}" /><a href="html/company.html?symbol=${data[i].symbol}">${data[i].name} (${data[i].symbol})</a><span>$${details.profile.price} <em style='color: ${color}'>${changesPercentage}%</em></span>`;
        this.list.appendChild(listItem);
        const oneResult = listItem.querySelector("a");
        const finalStr = oneResult.innerText.replace(regExp, function (str) {
          return "<span id='marked'>" + str + "</span>";
        });
        oneResult.innerHTML = finalStr;
      }
    }
    this.list.classList.remove("d-none");
    this.spinner.classList.add("d-none");
    for (let one of document.querySelectorAll(".oneListItem")) {
      one.classList.remove("d-none");
    }
  }
}
