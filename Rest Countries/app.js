const countriesContainer = document.querySelector(".countries-container");
const filterByRegion = document.querySelector(".filter-by-region");
const searchInput = document.querySelector(".search-container input");
const themeChanger = document.querySelector(".theme-changer");
const darkModeIcon = document.getElementById("dark-mode-icon");
const lightModeIcon = document.getElementById("light-mode-icon");
const modeText = document.getElementById("mode-text");

let apiData =
  "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital";
let allCountriesData;

fetch(apiData)
  .then((res) => res.json())
  .then((data) => {
    renderCountriesData(data);
    allCountriesData = data;
  });

filterByRegion.addEventListener("change", () => {
  const region = filterByRegion.value;
  fetch(
    `https://restcountries.com/v3.1/region/${region}?fields=name,flags,population,region,capital`
  )
    .then((response) => response.json())
    .then(renderCountriesData);
});

function renderCountriesData(countries) {
  countriesContainer.innerHTML = "";
  countries.forEach((country) => {
    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = `./country.html?name=${country.name.common}`;
    countryCard.innerHTML = ` <img src="${country.flags.svg}" alt="${
      country.name.common
    } flag">
      <div class="card-text">
      <h2 class="card-title">${country.name.common}</h2>
      <p><b>Population: </b>${country.population.toLocaleString("en-IN")}</p>
      <p><b>Region: </b>${country.region}</p>
    <p><b>Capital: </b>${country.capital}</p>
    </div>`;
    countriesContainer.append(countryCard);
  });
}

searchInput.addEventListener("input", (e) => {
  const filteredCoutries = allCountriesData.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value)
  );
  renderCountriesData(filteredCoutries);
});

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
}

themeChanger.addEventListener("click", () => {
  let isDark = document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }

  if (isDark) {
    darkModeIcon.style.display = "none";
    lightModeIcon.style.display = "inline-block";
    modeText.textContent = "Light Mode";
  } else {
    darkModeIcon.style.display = "inline-block";
    lightModeIcon.style.display = "none";
    modeText.textContent = "Dark Mode";
  }
});
