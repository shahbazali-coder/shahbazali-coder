const countryName = new URLSearchParams(window.location.search).get("name");

const flagImg = document.querySelector(".country-details img");
const countryHeader = document.querySelector(".country-details h1");
const nativeName = document.querySelector(".native-name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".sub-region");
const capital = document.querySelector(".capital");
const topLevelDomain = document.querySelector(".top-level-domain");
const currencies = document.querySelector(".currencies");
const language = document.querySelector(".language");
const borderCountries = document.querySelector(".border-countries");
const themeChanger = document.querySelector(".theme-change");
const darkModeIcon = document.getElementById("dark-mode-icon");
const lightModeIcon = document.getElementById("light-mode-icon");
const modeText = document.getElementById("mode-text");

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then((countries) => {
    let country = countries[0];
    flagImg.src = country.flags.svg;
    countryHeader.innerText = country.name.common;
    population.innerText = country.population.toLocaleString("en-IN");
    region.innerText = country.region;
    topLevelDomain.innerText = country.tld;

    if (country.capital) {
      capital.innerText = country.capital;
    }
    if (country.subregion) {
      subRegion.innerText = country.subregion;
    }
    if (country.name.nativeName) {
      nativeName.innerText = Object.values(country.name.nativeName)[0].common;
    } else {
      nativeName.innerText = country.name.common;
    }
    if (country.currencies) {
      currencies.innerText = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(", ");
    }

    if (country.languages) {
      language.innerText = Object.values(country.languages).join(", ");
    }

    if (country.borders) {
      country.borders.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => {
            const borderCountryTag = document.createElement("a");
            borderCountryTag.innerText = borderCountry.name.common;
            borderCountryTag.href = `country.html?name=${borderCountry.name.common}`;
            borderCountries.append(borderCountryTag);
          });
      });
    }
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
