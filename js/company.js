// Declaration

const urlParams = new URLSearchParams(window.location.search);
const companySymbol = urlParams.get("symbol");
const companyUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${companySymbol}`;
const historicalPrice = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${companySymbol}?serietype=line`;
const companyName = document.querySelector("#companyName");
const companyImg = document.querySelector("#companyImg");
const stockPrice = document.querySelector("#stockPrice");
const stockChangePrice = document.querySelector("#stockChangePrice");
const companyDescription = document.querySelector("#companyDescription");
const sector = document.querySelector("#sector");
const exchangeMarket = document.querySelector("#exchangeMarket");
const industry = document.querySelector("#industry");
const averageVol = document.querySelector("#averageVol");
const fullTimeEmployees = document.querySelector("#fullTimeEmployees");
const loader = document.querySelector(".loader");
const mainPage = document.querySelector(".for-spinner");
const companyWebsite = document.querySelector("#companyWebsite");

// Get Company Profile

const getCompany = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const makeCompanyProfile = async () => {
  const data = await getCompany(companyUrl);
  companyName.innerText = data.profile.companyName;
  companyImg.setAttribute("src", data.profile.image);
  stockPrice.innerHTML = `<b>Stock Price:</b> ${data.profile.price}$`;
  stockChangePrice.innerText = `${parseFloat(
    data.profile.changesPercentage
  ).toFixed(2)}%`;
  if (data.profile.changes < 0) stockChangePrice.style.color = "#f70d1a";
  if (data.profile.changes === 0) stockChangePrice.style.color = "#6c757d";
  if (data.profile.changes > 0) stockChangePrice.style.color = "#7CFC00";
  companyDescription.innerText = data.profile.description;
  exchangeMarket.innerHTML = `<b>Exchange Market:</b> ${data.profile.exchangeShortName}`;
  sector.innerHTML = `<b>Sector:</b> ${data.profile.sector}`;
  industry.innerHTML = `<b>Industry:</b> ${data.profile.industry}`;
  averageVol.innerHTML = `<b>Average Volume:</b> ${data.profile.volAvg}$`;
  fullTimeEmployees.innerHTML = `<b>Full Time Employees:</b> ${data.profile.fullTimeEmployees}`;
  companyWebsite.innerHTML = `<b>Company Website: </b><a href='${data.profile.website}'>${data.profile.companyName}</a>`;
};

// Get Company Chart

const showHistoricalPrice = () => {
  getCompany(historicalPrice).then((res) => {
    const history = res.historical;
    history.reverse();
    let dateArray = [];
    let priceArray = [];
    history.map((e) => {
      dateArray.push(e.date);
      priceArray.push(e.close);
    });
    loader.classList.add("d-none");
    mainPage.classList.remove("d-none");
    const labels = dateArray;
    const data = {
      labels: labels,
      datasets: [
        {
          label: "Stock's Price",
          backgroundColor: "white",
          data: priceArray,
          borderColor: "#2541B2",
          fill: true,
          pointRadius: 0,
          borderWidth: 1,
          backgroundColor: "#E8F0F2",
        },
      ],
    };

    const config = {
      type: "line",
      data,
      options: {},
    };

    const myChart = new Chart(document.getElementById("myChart"), config);
  });
};

loader.classList.remove("d-none");
makeCompanyProfile();
showHistoricalPrice();
