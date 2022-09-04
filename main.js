let dropSelect = document.querySelector(".dropdown .select");
let dropList = document.querySelector(".dropdown .list");
let Region = document.querySelectorAll(".dropdown .list li");
let main = document.querySelector("main");
let darkIcon = document.querySelector(".dark");
let details = document.querySelector(".details");

darkIcon.addEventListener("click", () => {
  if (main.className === "dark-theme") {
    main.classList.remove("dark-theme");
  } else {
    main.classList.add("dark-theme");
  }
});
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
    data.forEach((d) => {
      {
        if (d.name.common == "Israel") {
          d.name.common = "Palestine";
          d.flags.png = "https://flagcdn.com/w320/ps.png";
          d.name.official = "Palestine";
          d.capital = "Ramallah";
          d.population = "4803269";
          d.region = "Asia";
        }
        flag += `
                      <div class="box all ${d.region}">
                          <img src="${d.flags.png}" alt="flag">
                          <div class="txt">
                              <h2 class="name">${d.name.common}</h2>
                              <span><span>Population: </span>${d.population}</span>
                              <span><span>Region:</span> ${d.region}</span>
                              <span><span>Capital:</span> ${d.capital}</span>
                          </div>
                      </div>
                      `;
        Flags.innerHTML = flag;
        // select filter
        /*
        let _box = document.querySelectorAll(".box");
        _box.forEach((el) => {
          el.addEventListener("click", () => {
            details.classList.toggle("show");
            showCountryDetails(d);
          });
        });
        */
        Region.forEach((el) => {
          el.addEventListener("click", showcards);
        });
      }
    });
  } catch (e) {
    console.log(e);
  }
}
displayData();

function showcards() {
  let _card = document.querySelectorAll(".flags .container .box");
  _card.forEach((card) => {
    card.style.display = "none";
  });
  document.querySelectorAll(this.dataset.region).forEach((el) => {
    el.style.display = "block";
  });
}

// let search
let search = document.querySelector(".search input");
function searchCountry() {
  let _card = document.querySelectorAll(".flags .container .box");
  let searchValue = search.value.toUpperCase();
  _card.forEach((el) => {
    if (!el.innerHTML.toUpperCase().includes(searchValue)) {
      el.style.display = "none";
    } else {
      el.style.display = "block";
    }
  });
}
search.addEventListener("keyup", searchCountry);

// Details
/*
function showCountryDetails(d) {
  details.innerHTML = `
  <div class="container">
  <button class="back">&larr; Back</button>
  <div class="detail">
      <div class="img">
          <img src="${d.flags.png}" alt="flag">
      </div>
      <div class="info">
          <h2>Palestine</h2>
          <ul>
              <li>Native Name: <span>${d.name.common}</span></li>
              <li>Population: <span>ppp</span></li>
              <li>Region: <span>ppp</span></li>
              <li>Sub Region: <span>ppp</span></li>
              <li>Capital: <span>ppp</span></li>
              <li>Top level Domain: <span>ppp</span></li>
              <li>Currencies: <span>ppp</span></li>
              <li>Languages: <span>ppp</span></li>
          </ul>
      </div>
  </div>
</div>
  `;
  let back = document.querySelector(".back");
back.addEventListener("click", () => {
  details.classList.toggle("show");
});
}
*/
