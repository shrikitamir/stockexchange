class Marquee {
  constructor(div) {
    const p = document.createElement("p");
    this.p = p;
    p.id = "movingMarquee";
    div.appendChild(p);
  }

  getMarquee = async () => {
    const response = await fetch(
      `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/etf/list`
    );
    const data = await response.json();
    let marqueeString = "";
    data.forEach((element) => {
      marqueeString += `${element.symbol} <span>$${element.price}</span> &nbsp;&nbsp;`;
    });
    this.p.innerHTML = marqueeString;
  };
}
