let dropSelect = document.querySelector(".dropdown .select");
let dropList = document.querySelector(".dropdown .list");
dropSelect.addEventListener("click", () => {
  if (dropList.style.display == "none") {
    dropList.style.display = "block";
  } else {
    dropList.style.display = "none";
  }
});
// Fetch api
function getFlags() {
  return new Promise((res) => {
    let url = "https://restcountries.com/v3.1/all";
    fetch(url).then((response) => {
      res(response.json());
    });
  });
}
getFlags();
async function displayData() {
  let Flags = document.querySelector(".flags .container");
  try {
    let flag = ``;
    const data = await getFlags();
    console.log(data);
    data.forEach((d) => {
      {
        if (d.name.common == "Israel") {
          d.name.common = "Palestine";
          d.flags.png ='https://flagcdn.com/w320/ps.png';
          d.name.official = "Palestine";
          d.capital = "Ramallah";
          d.population = "4803269";
          d.region ='Asia';
        }
        flag += `
            <div class="box">
                <img src="${d.flags.png}" alt="flag">
                <div class="txt">
                    <h2>${d.name.common}</h2>
                    <span><span>Population: </span>${d.population}</span>
                    <span><span>Region:</span> ${d.region}</span>
                    <span><span>Capital:</span> ${d.capital}</span>
                </div>
            </div>
            `;
      }
    });
    Flags.innerHTML = flag;
  } catch (e) {
    console.log(e);
  }
}
displayData();
